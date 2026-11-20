/**
 * TradeSpec Pro™ Partner Component 1: Leads & Spend Monitor Dashboard
 * Tracks monthly RFPs, spend ledger, loyalty tier bonuses, wallet top-ups,
 * strict trade-filtered lead dispatch, spec inspection, and instant disputes.
 */

(function (window) {
  'use strict';

  function mountLeadsMonitor(container) {
    const Store = window.PartnerStore;
    let statusFilter = 'all';
    let searchTerm = '';

    function render() {
      const c = Store.contractor;
      if (!c) return;
      const leads = Store.getFilteredLeads();
      const tier = Store.getLoyaltyTier();

      // Monthly metrics (current calendar month)
      const now = new Date();
      const thisMonthLeads = leads.filter((l) => {
        const d = new Date(l.timestamp || Date.now());
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      const claimedLeads = leads.filter((l) => l.status === 'claimed');
      const totalPaidThisMonth = thisMonthLeads
        .filter((l) => l.status === 'claimed')
        .reduce((sum, l) => sum + (Number(l.cost) || 0), 0);

      const estPipeline = claimedLeads.length * 48500;

      // Apply UI filters
      const visible = leads.filter((l) => {
        if (statusFilter !== 'all' && l.status !== statusFilter) return false;
        if (searchTerm) {
          const hay = `${l.company || ''} ${l.name || ''} ${l.location || ''} ${l.zip || ''} ${l.tradeTitle || ''}`.toLowerCase();
          if (!hay.includes(searchTerm.toLowerCase())) return false;
        }
        return true;
      });

      const activeTradeLabels = (c.activeSources || [])
        .map((k) => Store.TRADE_CATALOG[k]?.short || k)
        .join(', ');

      container.innerHTML = `
        <!-- Monthly KPI Summary -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">RFPs This Month</span>
            <span class="kpi-value accent-blue">${thisMonthLeads.length}</span>
            <span class="kpi-sub">Strictly from your ${c.activeSources?.length || 0} active trade source(s)</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Paid for RFPs (This Month)</span>
            <span class="kpi-value accent-gold">${Store.fmtCurrency(totalPaidThisMonth)}</span>
            <span class="kpi-sub">${claimedLeads.length} total claimed &amp; unlocked</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Dispatch Wallet Balance</span>
            <span class="kpi-value accent-green">${Store.fmtCurrency(c.walletBalance || 0)}</span>
            <span class="kpi-sub">${c.autoReload ? 'Auto-Reload ON ($500 when < $150)' : 'Manual Funding Mode'}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Est. Active Bid Pipeline</span>
            <span class="kpi-value">${Store.fmtCurrency(estPipeline)}</span>
            <span class="kpi-sub">Territory: ZIP ${Store.escapeHtml(c.baseZip)} (${c.radius} mi)</span>
          </div>
        </div>

        <!-- Loyalty & Instant Wallet Top-Up Bar -->
        <div class="loyalty-banner">
          <div class="loyalty-info">
            <h3>🏆 ${Store.escapeHtml(tier.name)} ${tier.discountPct > 0 ? `(+${tier.discountPct}% Free Credit Bonus)` : ''}</h3>
            <p>${Store.escapeHtml(tier.nextText)}</p>
          </div>
          <div class="loyalty-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-topup="500">+ Add $500 Credits</button>
            <button type="button" class="btn btn-gold btn-sm" data-topup="1500">+ Add $1,500 Credits</button>
            <button type="button" class="btn btn-primary btn-sm" id="refreshLeadsBtn">↻ Sync Live DB</button>
          </div>
        </div>

        <!-- Live RFP Dispatch Table -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Live Commercial RFP Dispatch Feed</h2>
              <p class="card-subtitle">Active sources: <strong>${Store.escapeHtml(activeTradeLabels || 'None selected')}</strong></p>
            </div>
            <span class="badge ${c.exclusivityMode === 'exclusive_1of1' ? 'badge-gold' : 'badge-blue'}">
              ${c.exclusivityMode === 'exclusive_1of1' ? '1-of-1 Exclusive Mode' : 'Semi-Exclusive (Max 2)'}
            </span>
          </div>

          <div class="toolbar-row">
            <div class="filter-pills">
              <button type="button" class="filter-pill ${statusFilter === 'all' ? 'active' : ''}" data-filter="all">All (${leads.length})</button>
              <button type="button" class="filter-pill ${statusFilter === 'available' ? 'active' : ''}" data-filter="available">Available</button>
              <button type="button" class="filter-pill ${statusFilter === 'claimed' ? 'active' : ''}" data-filter="claimed">Claimed</button>
              <button type="button" class="filter-pill ${statusFilter === 'disputed' ? 'active' : ''}" data-filter="disputed">Disputed</button>
            </div>
            <input type="search" class="search-input" id="leadsSearchInput" placeholder="Filter by company, ZIP, location..." value="${Store.escapeHtml(searchTerm)}">
          </div>

          ${visible.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">📡</div>
              <h4>Listening for Live Commercial RFPs in Your Selected Trades</h4>
              <p>No live RFPs currently match your selected trade sources (<strong>${Store.escapeHtml(activeTradeLabels || 'None')}</strong>) and filter. As soon as a property owner or GC submits a calculation on TradeSpec Pro, it appears here and pushes to your connected CRM.</p>
              <button type="button" class="btn btn-secondary btn-sm" data-nav-jump="sources">Expand Active Lead Sources &rarr;</button>
            </div>
          ` : `
            <div class="table-scroll">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Trade &amp; Project</th>
                    <th>Location / ZIP</th>
                    <th>Contact</th>
                    <th>RFP Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${visible.map((lead) => {
                    const tMeta = Store.TRADE_CATALOG[lead.trade] || { short: lead.trade, exclPrice: 200, semiPrice: 125 };
                    const price = Number(lead.cost) || (c.exclusivityMode === 'exclusive_1of1' ? tMeta.exclPrice : tMeta.semiPrice);
                    const isClaimed = lead.status === 'claimed';
                    const isDisputed = lead.status === 'disputed';
                    const badgeClass = isClaimed ? 'badge-green' : (isDisputed ? 'badge-red' : 'badge-gold');
                    return `
                      <tr>
                        <td>
                          <span class="lead-primary-title">${Store.escapeHtml(tMeta.short)}</span>
                          <span class="lead-meta-sub">${Store.escapeHtml(lead.company || 'Commercial Project')}</span>
                        </td>
                        <td>
                          <span class="lead-primary-title">${Store.escapeHtml(lead.location || 'Commercial Site')}</span>
                          <span class="lead-meta-sub">ZIP ${Store.escapeHtml(lead.zip || '—')}</span>
                        </td>
                        <td>
                          ${isClaimed ? `
                            <span class="lead-primary-title">${Store.escapeHtml(lead.name || 'Project Owner')}</span>
                            <span class="lead-meta-sub">${Store.escapeHtml(lead.phone || '')} · ${Store.escapeHtml(lead.email || '')}</span>
                          ` : `
                            <span class="lead-meta-sub">🔒 Claim RFP to unlock direct phone &amp; email</span>
                          `}
                        </td>
                        <td><strong style="font-family:var(--font-mono);color:var(--accent-gold);">${Store.fmtCurrency(price)}</strong></td>
                        <td><span class="badge ${badgeClass}">${Store.escapeHtml(lead.status || 'available')}</span></td>
                        <td>
                          <div class="action-group">
                            <button type="button" class="btn btn-secondary btn-sm" data-inspect="${Store.escapeHtml(lead.id)}">Specs</button>
                            ${!isClaimed && !isDisputed ? `<button type="button" class="btn btn-primary btn-sm" data-claim="${Store.escapeHtml(lead.id)}">Claim RFP</button>` : ''}
                            ${isClaimed ? `<button type="button" class="btn btn-danger btn-sm" data-dispute="${Store.escapeHtml(lead.id)}">Dispute</button>` : ''}
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;

      bindEvents();
    }

    function openSpecModal(lead) {
      const modal = document.getElementById('portalModal');
      const titleEl = document.getElementById('portalModalTitle');
      const bodyEl = document.getElementById('portalModalBody');
      if (!modal || !titleEl || !bodyEl) return;

      const tMeta = Store.TRADE_CATALOG[lead.trade] || { name: lead.tradeTitle || lead.trade };
      const specs = lead.specs || {};
      const specEntries = Object.entries(specs);

      titleEl.textContent = `Engineering Spec Sheet — ${tMeta.name}`;
      bodyEl.innerHTML = `
        <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:0.8rem;">
          Project: <strong>${Store.escapeHtml(lead.company || 'Commercial RFP')}</strong> · Location: <strong>${Store.escapeHtml(lead.location || '')} (ZIP ${Store.escapeHtml(lead.zip || '')})</strong>
        </p>
        <div class="spec-kv-grid">
          ${specEntries.length > 0
            ? specEntries.map(([k, v]) => `
                <div class="spec-kv-item">
                  <span class="spec-kv-label">${Store.escapeHtml(k)}</span>
                  <span class="spec-kv-val">${Store.escapeHtml(String(v))}</span>
                </div>
              `).join('')
            : '<div class="spec-kv-item"><span class="spec-kv-label">Status</span><span class="spec-kv-val">Verified Calculator Submission</span></div>'
          }
        </div>
        ${lead.status === 'claimed' ? `
          <div style="margin-top:1rem;padding:0.9rem;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;font-size:0.86rem;">
            <strong>Unlocked Buyer Contact:</strong> ${Store.escapeHtml(lead.name)} | ${Store.escapeHtml(lead.phone)} | ${Store.escapeHtml(lead.email)}
          </div>
        ` : ''}
      `;
      modal.classList.remove('hidden');
    }

    function bindEvents() {
      container.querySelectorAll('[data-topup]').forEach((btn) => {
        btn.addEventListener('click', () => Store.topUpWallet(parseInt(btn.getAttribute('data-topup'), 10)));
      });

      container.querySelector('#refreshLeadsBtn')?.addEventListener('click', () => {
        Store.refreshFromSupabase();
        Store.showToast('Synced live RFP dispatch feed from Supabase.', 'info');
      });

      container.querySelectorAll('[data-filter]').forEach((btn) => {
        btn.addEventListener('click', () => {
          statusFilter = btn.getAttribute('data-filter');
          render();
        });
      });

      container.querySelector('#leadsSearchInput')?.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        render();
      });

      container.querySelectorAll('[data-inspect]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-inspect');
          const lead = Store.getFilteredLeads().find((l) => String(l.id) === String(id));
          if (lead) openSpecModal(lead);
        });
      });

      container.querySelectorAll('[data-claim]').forEach((btn) => {
        btn.addEventListener('click', () => Store.claimLead(btn.getAttribute('data-claim')));
      });

      container.querySelectorAll('[data-dispute]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-dispute');
          if (window.confirm('Submit 100% Instant Credit Dispute for this RFP (disconnected phone / out-of-territory / duplicate)?')) {
            Store.disputeLead(id, 'Unreachable or out-of-scope inquiry');
          }
        });
      });

      container.querySelectorAll('[data-nav-jump]').forEach((btn) => {
        btn.addEventListener('click', () => {
          window.PartnerDashboard?.switchView(btn.getAttribute('data-nav-jump'));
        });
      });
    }

    Store.on('contractor:updated', render);
    Store.on('leads:updated', render);
    render();
  }

  window.PartnerComponents = window.PartnerComponents || {};
  window.PartnerComponents.mountLeadsMonitor = mountLeadsMonitor;
})(window);
