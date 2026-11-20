/**
 * TradeSpec Pro™ Partner Component 4: Company Profile & Dispatch Settings
 * Allows subcontractors to save and update legal company details, licensing,
 * GL insurance/bond coverage, dispatch contacts, minimum job threshold, and PIN.
 */

(function (window) {
  'use strict';

  function mountCompanySettings(container) {
    const Store = window.PartnerStore;

    function render() {
      const c = Store.contractor;
      if (!c) return;

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Company Details &amp; Commercial Credentials</h2>
              <p class="card-subtitle">Keep your licensing, bonding, and estimator dispatch info current so RFPs route without delay.</p>
            </div>
            <span class="badge badge-green">✓ Verified B2B Profile</span>
          </div>

          <form id="companySettingsForm" novalidate>
            <div class="form-grid">
              <div class="form-group full">
                <label class="form-label" for="setCompanyName">Legal Company Name</label>
                <input class="form-input" type="text" id="setCompanyName" value="${Store.escapeHtml(c.companyName || '')}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setLicense">State Contractor License #</label>
                <input class="form-input" type="text" id="setLicense" value="${Store.escapeHtml(c.licenseNumber || '')}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setInsurance">Insurance &amp; Bond Coverage</label>
                <select class="form-select" id="setInsurance">
                  <option value="$1M / $2M Commercial GL" ${c.insuranceBond === '$1M / $2M Commercial GL' ? 'selected' : ''}>$1M / $2M Commercial General Liability</option>
                  <option value="$2M / $5M Commercial GL + Bonded" ${c.insuranceBond === '$2M / $5M Commercial GL + Bonded' ? 'selected' : ''}>$2M / $5M Commercial GL + Bonded</option>
                  <option value="$5M+ Heavy Commercial / Umbrella" ${c.insuranceBond === '$5M+ Heavy Commercial / Umbrella' ? 'selected' : ''}>$5M+ Heavy Commercial / Umbrella</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="setContact">Primary Estimator / Dispatch Lead</label>
                <input class="form-input" type="text" id="setContact" value="${Store.escapeHtml(c.contactPerson || '')}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setPhone">Direct Mobile (SMS RFP Alerts)</label>
                <input class="form-input" type="tel" id="setPhone" value="${Store.escapeHtml(c.dispatchPhone || '')}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setEmail">Business Dispatch Email</label>
                <input class="form-input" type="email" id="setEmail" value="${Store.escapeHtml(c.dispatchEmail || '')}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="setMinJob">Minimum Project Value Filter</label>
                <select class="form-select" id="setMinJob">
                  <option value="5000" ${Number(c.minJob) === 5000 ? 'selected' : ''}>$5,000+ (All Commercial)</option>
                  <option value="15000" ${Number(c.minJob) === 15000 ? 'selected' : ''}>$15,000+ (Standard Commercial)</option>
                  <option value="35000" ${Number(c.minJob) === 35000 ? 'selected' : ''}>$35,000+ (Mid-Market Commercial)</option>
                  <option value="75000" ${Number(c.minJob) === 75000 ? 'selected' : ''}>$75,000+ (Heavy Commercial / Enterprise)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="setAutoReload">Dispatch Wallet Auto-Reload</label>
                <select class="form-select" id="setAutoReload">
                  <option value="true" ${c.autoReload ? 'selected' : ''}>Enabled — Auto-add $500 when balance &lt; $150 (Never miss an RFP)</option>
                  <option value="false" ${!c.autoReload ? 'selected' : ''}>Manual — Fund wallet manually</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="setPin">Portal Access PIN (4–8 digits)</label>
                <input class="form-input" type="password" id="setPin" maxlength="8" inputmode="numeric" value="${Store.escapeHtml(c.pin || '')}" required>
                <span class="form-hint">Used with your business email on the Partner Login page.</span>
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1.35rem;padding-top:1rem;border-top:1px solid var(--border-subtle);">
              <button type="submit" class="btn btn-primary" id="saveSettingsBtn">Save Company Details to Supabase</button>
            </div>
          </form>
        </div>
      `;

      container.querySelector('#companySettingsForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pin = (container.querySelector('#setPin')?.value || '').trim();
        if (!/^\d{4,8}$/.test(pin)) {
          Store.showToast('Access PIN must be 4 to 8 numeric digits.', 'error');
          return;
        }

        const patch = {
          companyName: container.querySelector('#setCompanyName').value.trim(),
          licenseNumber: container.querySelector('#setLicense').value.trim(),
          insuranceBond: container.querySelector('#setInsurance').value,
          contactPerson: container.querySelector('#setContact').value.trim(),
          dispatchPhone: container.querySelector('#setPhone').value.trim(),
          dispatchEmail: container.querySelector('#setEmail').value.trim().toLowerCase(),
          minJob: parseInt(container.querySelector('#setMinJob').value, 10) || 15000,
          autoReload: container.querySelector('#setAutoReload').value === 'true',
          pin
        };

        await Store.updateContractor(patch);
        Store.showToast('Company details & dispatch settings saved and synced.', 'success');
      });
    }

    Store.on('contractor:updated', render);
    render();
  }

  window.PartnerComponents = window.PartnerComponents || {};
  window.PartnerComponents.mountCompanySettings = mountCompanySettings;
})(window);
