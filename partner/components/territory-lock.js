/**
 * TradeSpec Pro™ Partner Component 2: Territory Exclusivity & Lock Manager
 * Verifies real Supabase territory occupancy, adjusts dispatch radius/ZIP,
 * and lets contractors lock 1-of-1 exclusive metro rights.
 */

(function (window) {
  'use strict';

  function mountTerritoryLock(container) {
    const Store = window.PartnerStore;
    let lastCheck = null;

    function render() {
      const c = Store.contractor;
      if (!c) return;
      const isExclusive = c.exclusivityMode === 'exclusive_1of1';
      const primaryTrade = (c.activeSources && c.activeSources[0]) || 'charge';
      const tradeOptions = Object.values(Store.TRADE_CATALOG)
        .map((t) => `<option value="${t.key}" ${t.key === primaryTrade ? 'selected' : ''}>${Store.escapeHtml(t.short)} (${Store.escapeHtml(t.name)})</option>`)
        .join('');

      let checkHtml = '';
      if (lastCheck) {
        const pct = isExclusive ? 100 : (lastCheck.claimedCount / 2) * 100;
        const fillClass = isExclusive ? 'locked' : (lastCheck.isFullyLocked ? 'full' : '');
        const badgeClass = lastCheck.isFullyLocked ? 'badge-red' : (lastCheck.claimedCount === 1 ? 'badge-gold' : 'badge-green');
        const statusText = lastCheck.isFullyLocked
          ? '2 / 2 FULL CAPACITY — LOCKED'
          : (lastCheck.claimedCount === 1 ? '1 / 2 SLOTS CLAIMED — 1 OPEN' : '0 / 2 UNCLAIMED — ELIGIBLE FOR 1-OF-1 LOCK');

        checkHtml = `
          <div class="territory-status-card" style="margin-top:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
              <strong>ZIP ${Store.escapeHtml(lastCheck.zip)} · ${Store.escapeHtml(Store.TRADE_CATALOG[lastCheck.trade]?.short || lastCheck.trade)}</strong>
              <span class="badge ${badgeClass}">${statusText}</span>
            </div>
            <div class="slot-meter"><div class="slot-meter-fill ${fillClass}" style="width:${pct}%"></div></div>
            <p class="form-hint">
              ${lastCheck.isLiveDb ? '🟢 Verified live against Supabase contractors &amp; applications registry.' : '🟡 Local verification mode.'}
              ${lastCheck.isFullyLocked ? ' This ZIP is currently closed to new enrollments.' : ' Territory seat is available for immediate reservation.'}
            </p>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Territory Lock &amp; Coverage Control</h2>
              <p class="card-subtitle">Manage your active dispatch ZIP, service radius, and lock competitors out of your metro.</p>
            </div>
            <span class="badge ${isExclusive ? 'badge-gold' : 'badge-blue'}">
              ${isExclusive ? '🔒 1-of-1 Exclusive Territory Active' : 'Semi-Exclusive (Max 2 Partners)'}
            </span>
          </div>

          <div class="territory-hero-grid">
            <div class="territory-status-card">
              <span class="kpi-label">Active Dispatch Territory</span>
              <div class="kpi-value accent-blue" style="margin:0.35rem 0;">ZIP ${Store.escapeHtml(c.baseZip || '—')}</div>
              <p class="kpi-sub">Dispatch Radius: <strong>${c.radius || 50} Miles</strong> · Min Job Filter: <strong>${Store.fmtCurrency(c.minJob || 15000)}+</strong></p>
              <div class="slot-meter">
                <div class="slot-meter-fill ${isExclusive ? 'locked' : ''}" style="width:${isExclusive ? 100 : 50}%"></div>
              </div>
              <p class="form-hint">
                ${isExclusive
                  ? 'You hold 100% exclusive 1st-call rights for all selected trades in this ZIP radius.'
                  : 'Up to 1 other vetted partner may share this ZIP unless you upgrade to 1-of-1 Exclusive Lock.'}
              </p>
            </div>

            <form id="territoryUpdateForm" class="territory-status-card">
              <span class="kpi-label">Update Base ZIP &amp; Radius</span>
              <div class="form-grid" style="margin-top:0.65rem;">
                <div class="form-group">
                  <label class="form-label" for="terrBaseZip">Base 5-Digit ZIP</label>
                  <input class="form-input" type="text" id="terrBaseZip" maxlength="5" value="${Store.escapeHtml(c.baseZip || '')}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="terrRadius">Service Radius</label>
                  <select class="form-select" id="terrRadius">
                    <option value="25" ${c.radius == 25 ? 'selected' : ''}>25 Miles</option>
                    <option value="50" ${c.radius == 50 ? 'selected' : ''}>50 Miles</option>
                    <option value="75" ${c.radius == 75 ? 'selected' : ''}>75 Miles</option>
                    <option value="100" ${c.radius == 100 ? 'selected' : ''}>100 Miles</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-sm" style="margin-top:0.85rem;">Save Territory Coordinates</button>
            </form>
          </div>

          <!-- Live Supabase ZIP Availability Scanner -->
          <div style="margin-top:1.25rem;padding-top:1.15rem;border-top:1px solid var(--border-subtle);">
            <h3 class="card-title" style="font-size:0.98rem;margin-bottom:0.3rem;">Check Live Availability for Any Expansion ZIP</h3>
            <p class="card-subtitle" style="margin-bottom:0.85rem;">Queries real contractor seats and pending applications in Supabase before you expand.</p>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label" for="scanZipInput">Target 5-Digit ZIP</label>
                <input class="form-input" type="text" id="scanZipInput" maxlength="5" placeholder="e.g., 75201" value="${Store.escapeHtml(c.baseZip || '')}">
              </div>
              <div class="form-group">
                <label class="form-label" for="scanTradeSelect">Commercial Trade Vertical</label>
                <select class="form-select" id="scanTradeSelect">${tradeOptions}</select>
              </div>
              <div class="form-group" style="justify-content:flex-end;">
                <button type="button" class="btn btn-gold" id="runTerritoryScanBtn">Check Live Supabase Slots &rarr;</button>
              </div>
            </div>
            ${checkHtml}
          </div>
        </div>

        <!-- Territory Exclusivity Lock Tiers -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Lock Up Your Territory (Competitor Lockout)</h2>
              <p class="card-subtitle">Protect your closing rate by upgrading from Semi-Exclusive to a 1-of-1 Exclusive Anchor Seat.</p>
            </div>
          </div>
          <div class="exclusivity-tiers">
            <div class="tier-card ${!isExclusive ? 'featured' : ''}">
              <div>
                <span class="badge badge-blue" style="margin-bottom:0.5rem;">Flexible Pay-Per-RFP</span>
                <h3 style="font-size:1.05rem;margin-bottom:0.35rem;">Semi-Exclusive Territory (Max 2)</h3>
                <div class="tier-price">$0<span> / mo retainer + Pay-Per-RFP</span></div>
                <ul class="tier-perks" style="margin-top:0.85rem;">
                  <li>✓ Capped strictly at 2 licensed contractors per ZIP</li>
                  <li>✓ Pay only for RFPs you claim ($90–$175 / RFP)</li>
                  <li>✓ Instant 100% credit refund on invalid contacts</li>
                </ul>
              </div>
              <button type="button" class="btn ${!isExclusive ? 'btn-secondary' : 'btn-primary'}" id="selectSemiBtn" ${!isExclusive ? 'disabled' : ''}>
                ${!isExclusive ? '✓ Current Active Mode' : 'Switch to Semi-Exclusive'}
              </button>
            </div>

            <div class="tier-card ${isExclusive ? 'featured' : ''}">
              <div>
                <span class="badge badge-gold" style="margin-bottom:0.5rem;">100% Competitor Lockout</span>
                <h3 style="font-size:1.05rem;margin-bottom:0.35rem;">1-of-1 Exclusive Metro Anchor</h3>
                <div class="tier-price">$950<span> / mo (includes $950 RFP credits)</span></div>
                <ul class="tier-perks" style="margin-top:0.85rem;">
                  <li>✓ <strong>ZERO competing contractors</strong> in your locked ZIP radius</li>
                  <li>✓ Automatic Platinum Partner (+10% free wallet bonus)</li>
                  <li>✓ Priority instant webhook push + SMS dispatch (&lt; 10s)</li>
                  <li>✓ Full $950 retainer rolls 100% into your RFP credits</li>
                </ul>
              </div>
              <button type="button" class="btn ${isExclusive ? 'btn-secondary' : 'btn-gold'}" id="lockExclusiveBtn" ${isExclusive ? 'disabled' : ''}>
                ${isExclusive ? '🔒 Territory Locked (1-of-1 Active)' : '🔒 Lock 1-of-1 Exclusive Territory Now'}
              </button>
            </div>
          </div>
        </div>
      `;

      bindEvents();
    }

    function bindEvents() {
      container.querySelector('#territoryUpdateForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const zip = (container.querySelector('#terrBaseZip')?.value || '').trim();
        const radius = parseInt(container.querySelector('#terrRadius')?.value, 10) || 50;
        if (!/^\d{5}$/.test(zip)) {
          Store.showToast('Please enter a valid 5-digit US ZIP code.', 'error');
          return;
        }
        await Store.updateContractor({ baseZip: zip, radius });
        Store.showToast(`Territory updated to ZIP ${zip} (${radius}-mile dispatch radius).`, 'success');
      });

      container.querySelector('#runTerritoryScanBtn')?.addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        const zip = (container.querySelector('#scanZipInput')?.value || '').trim();
        const trade = container.querySelector('#scanTradeSelect')?.value || 'charge';
        if (!/^\d{5}$/.test(zip)) {
          Store.showToast('Enter a valid 5-digit US ZIP code to check availability.', 'error');
          return;
        }
        btn.disabled = true;
        btn.textContent = 'Querying Supabase...';
        if (window.TradeSpecSupabase && typeof window.TradeSpecSupabase.checkTerritorySlots === 'function') {
          lastCheck = await window.TradeSpecSupabase.checkTerritorySlots(zip, trade);
        } else {
          lastCheck = { zip, trade, claimedCount: 0, slotsAvailable: 2, isFullyLocked: false, isLiveDb: false };
        }
        render();
      });

      container.querySelector('#selectSemiBtn')?.addEventListener('click', async () => {
        await Store.updateContractor({ exclusivityMode: 'semi_max2' });
        Store.showToast('Switched to Semi-Exclusive (Max 2 Partners) pay-per-RFP mode.', 'info');
      });

      container.querySelector('#lockExclusiveBtn')?.addEventListener('click', async () => {
        await Store.updateContractor({ exclusivityMode: 'exclusive_1of1' });
        Store.showToast(`🔒 Territory ZIP ${Store.contractor.baseZip} locked as 1-of-1 Exclusive Metro Anchor!`, 'success');
      });
    }

    Store.on('contractor:updated', render);
    render();
  }

  window.PartnerComponents = window.PartnerComponents || {};
  window.PartnerComponents.mountTerritoryLock = mountTerritoryLock;
})(window);
