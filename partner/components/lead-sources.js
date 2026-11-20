/**
 * TradeSpec Pro™ Partner Component 3: Lead Source Selector (Single to Multi-Source)
 * Lets contractors focus on 1 specialized vertical or activate multiple commercial
 * TradeSpec Pro streams simultaneously. Immediately filters the Leads Monitor.
 */

(function (window) {
  'use strict';

  function mountLeadSources(container) {
    const Store = window.PartnerStore;
    let selectionMode = 'multi';

    function initMode() {
      const active = Store.contractor?.activeSources || [];
      selectionMode = active.length <= 1 ? 'single' : 'multi';
    }

    function render() {
      const c = Store.contractor;
      if (!c) return;
      const active = Array.isArray(c.activeSources) ? [...c.activeSources] : [];

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Commercial Lead Sources (Single to Multi-Source)</h2>
              <p class="card-subtitle">Choose whether to focus on a single specialty trade or capture RFPs across multiple TradeSpec Pro calculators.</p>
            </div>
            <span class="badge badge-blue">${active.length} of 9 Streams Active</span>
          </div>

          <!-- Mode Switcher -->
          <div class="mode-switch-bar">
            <button type="button" class="mode-btn ${selectionMode === 'single' ? 'active' : ''}" data-mode="single">
              <strong>🎯 Single-Source Focus Mode</strong>
              <span>Lock your feed strictly to 1 specialized commercial trade stream.</span>
            </button>
            <button type="button" class="mode-btn ${selectionMode === 'multi' ? 'active' : ''}" data-mode="multi">
              <strong>⚡ Multi-Source Commercial Mode</strong>
              <span>Combine 2 to 9 TradeSpec Pro calculators for multi-trade GCs &amp; EPCs.</span>
            </button>
          </div>

          <!-- 9 Trade Cards -->
          <div class="source-grid">
            ${Object.values(Store.TRADE_CATALOG).map((t) => {
              const isSelected = active.includes(t.key);
              return `
                <div class="source-card ${isSelected ? 'selected' : ''}" data-trade-card="${t.key}" role="button" tabindex="0" aria-pressed="${isSelected}">
                  <div class="source-card-top">
                    <span class="source-name">${Store.escapeHtml(t.short)}™</span>
                    <span class="badge ${isSelected ? 'badge-green' : 'badge-blue'}">${isSelected ? '✓ Active' : '+ Add'}</span>
                  </div>
                  <p class="source-desc">${Store.escapeHtml(t.desc)}</p>
                  <div class="source-pricing">
                    <span>Avg Job: ${Store.escapeHtml(t.avgJob)}</span>
                    <span class="excl">$${t.semiPrice} semi / $${t.exclPrice} excl</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;padding-top:0.85rem;border-top:1px solid var(--border-subtle);">
            <span class="form-hint">Changes sync immediately to Supabase and update your Live RFP Dispatch Feed.</span>
            <div class="action-group">
              ${selectionMode === 'multi' ? '<button type="button" class="btn btn-secondary btn-sm" id="selectAllSourcesBtn">Enable All 9 Streams</button>' : ''}
              <button type="button" class="btn btn-primary" id="saveSourcesBtn">Save Lead Source Preferences</button>
            </div>
          </div>
        </div>
      `;

      bindEvents(active);
    }

    function bindEvents(currentActive) {
      let draft = [...currentActive];

      container.querySelectorAll('[data-mode]').forEach((btn) => {
        btn.addEventListener('click', () => {
          selectionMode = btn.getAttribute('data-mode');
          if (selectionMode === 'single' && draft.length > 1) {
            draft = [draft[0]];
            Store.updateContractor({ activeSources: draft });
          } else {
            render();
          }
        });
      });

      container.querySelectorAll('[data-trade-card]').forEach((card) => {
        const toggleCard = () => {
          const key = card.getAttribute('data-trade-card');
          if (selectionMode === 'single') {
            draft = [key];
          } else {
            if (draft.includes(key)) {
              if (draft.length === 1) {
                Store.showToast('Keep at least 1 commercial lead source active.', 'warning');
                return;
              }
              draft = draft.filter((k) => k !== key);
            } else {
              draft.push(key);
            }
          }
          // Update visual selection immediately before save
          container.querySelectorAll('[data-trade-card]').forEach((cEl) => {
            const k = cEl.getAttribute('data-trade-card');
            const sel = draft.includes(k);
            cEl.classList.toggle('selected', sel);
            cEl.setAttribute('aria-pressed', String(sel));
            const b = cEl.querySelector('.badge');
            if (b) {
              b.className = `badge ${sel ? 'badge-green' : 'badge-blue'}`;
              b.textContent = sel ? '✓ Active' : '+ Add';
            }
          });
        };

        card.addEventListener('click', toggleCard);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCard();
          }
        });
      });

      container.querySelector('#selectAllSourcesBtn')?.addEventListener('click', async () => {
        const allKeys = Object.keys(Store.TRADE_CATALOG);
        await Store.updateContractor({ activeSources: allKeys });
        Store.emit('leads:updated', Store.getFilteredLeads());
        Store.showToast('All 9 TradeSpec Pro commercial lead streams enabled!', 'success');
      });

      container.querySelector('#saveSourcesBtn')?.addEventListener('click', async () => {
        if (draft.length === 0) {
          Store.showToast('Select at least one trade source.', 'error');
          return;
        }
        await Store.updateContractor({ activeSources: draft });
        Store.emit('leads:updated', Store.getFilteredLeads());
        Store.showToast(`Saved! Monitoring ${draft.length} commercial lead source(s).`, 'success');
      });
    }

    initMode();
    Store.on('contractor:updated', render);
    render();
  }

  window.PartnerComponents = window.PartnerComponents || {};
  window.PartnerComponents.mountLeadSources = mountLeadSources;
})(window);
