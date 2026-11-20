/**
 * TradeSpec Pro™ Partner Component 5: CRM, ERP & Business Integrations Hub
 * Lets subcontractors connect whatever tool they use (ServiceTitan, Jobber,
 * Procore, HubSpot, Salesforce, Buildertrend, Zapier/Make, Slack, or Webhook)
 * and push claimed/dispatched RFP data straight into their pipeline.
 */

(function (window) {
  'use strict';

  function mountIntegrations(container) {
    const Store = window.PartnerStore;

    function getSamplePayload(provider) {
      const c = Store.contractor || {};
      const firstTrade = (c.activeSources && c.activeSources[0]) || 'charge';
      const tMeta = Store.TRADE_CATALOG[firstTrade] || Store.TRADE_CATALOG.charge;

      return JSON.stringify({
        event: 'tradespec.rfp.dispatched',
        provider,
        timestamp: new Date().toISOString(),
        partner: {
          company: c.companyName || 'Verified Contractor LLC',
          territory_zip: c.baseZip || '77002',
          exclusivity: c.exclusivityMode || 'semi_max2'
        },
        rfp: {
          trade_key: tMeta.key,
          trade_name: tMeta.name,
          project_location: `ZIP ${c.baseZip || '77002'} Commercial Corridor`,
          buyer_contact: {
            name: 'Project Estimator / Facility Director',
            phone: '(555) 019-4820',
            email: 'projects@commercialowner.com'
          },
          engineering_specs: {
            calculated_code_basis: 'NEC 625 / OSHA 1926 / IBC 2024',
            estimated_budget_band: tMeta.avgJob,
            verified_spec_sheet: true
          }
        }
      }, null, 2);
    }

    function render() {
      const cfg = Store.integrations;
      const activePreset = Store.CRM_PRESETS.find((p) => p.id === cfg.provider) || Store.CRM_PRESETS[0];

      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Connect Your Business CRM, ERP &amp; Dispatch Tools</h2>
              <p class="card-subtitle">Automatically push every commercial RFP—complete with buyer contact &amp; engineering spec sheet—straight into the software your team already uses.</p>
            </div>
            <span class="badge ${cfg.enabled && cfg.endpointUrl ? 'badge-green' : 'badge-gold'}">
              ${cfg.enabled && cfg.endpointUrl ? `✓ Connected: ${Store.escapeHtml(activePreset.name)}` : 'Not Connected Yet'}
            </span>
          </div>

          <!-- CRM / ERP Preset Selector -->
          <div class="integration-grid">
            ${Store.CRM_PRESETS.map((p) => {
              const isSel = cfg.provider === p.id;
              return `
                <div class="integration-card ${isSel ? 'active' : ''}" data-provider="${p.id}" role="button" tabindex="0">
                  <div class="integration-top">
                    <span class="integration-name">${Store.escapeHtml(p.name)}</span>
                    ${isSel ? '<span class="badge badge-green">Selected</span>' : ''}
                  </div>
                  <span class="integration-cat">${Store.escapeHtml(p.category)}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Configuration Form -->
          <form id="integrationConfigForm" novalidate style="padding-top:1rem;border-top:1px solid var(--border-subtle);">
            <p class="form-hint" style="margin-bottom:0.95rem;">
              <strong>${Store.escapeHtml(activePreset.name)} Setup:</strong> ${Store.escapeHtml(activePreset.hint)}
            </p>

            <div class="form-grid">
              <div class="form-group full">
                <label class="form-label" for="intEndpointUrl">${Store.escapeHtml(activePreset.name)} Webhook / API Endpoint URL</label>
                <input class="form-input" type="url" id="intEndpointUrl" placeholder="https://hooks.zapier.com/hooks/catch/... or https://api.servicetitan.io/..." value="${Store.escapeHtml(cfg.endpointUrl || '')}">
              </div>

              <div class="form-group">
                <label class="form-label" for="intAuthHeader">API Key / Authorization Header (Optional)</label>
                <input class="form-input" type="password" id="intAuthHeader" placeholder="Bearer sk_live_..." value="${Store.escapeHtml(cfg.authHeader || '')}">
              </div>

              <div class="form-group">
                <label class="form-label" for="intSigningSecret">HMAC Signing Secret (Optional)</label>
                <input class="form-input" type="text" id="intSigningSecret" placeholder="whsec_tradespec_..." value="${Store.escapeHtml(cfg.signingSecret || '')}">
              </div>

              <div class="form-group">
                <label class="form-label" for="intTriggerMode">Dispatch Trigger Mode</label>
                <select class="form-select" id="intTriggerMode">
                  <option value="on_claim" ${cfg.triggerMode === 'on_claim' ? 'selected' : ''}>Push Immediately When RFP Is Claimed</option>
                  <option value="auto_dispatch" ${cfg.triggerMode === 'auto_dispatch' ? 'selected' : ''}>Auto-Claim &amp; Push Instant Exclusive RFPs</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="intEnabled">Integration Status</label>
                <select class="form-select" id="intEnabled">
                  <option value="true" ${cfg.enabled ? 'selected' : ''}>Active — Auto-Push Enabled</option>
                  <option value="false" ${!cfg.enabled ? 'selected' : ''}>Paused — Manual Portal Only</option>
                </select>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-top:1.15rem;">
              <button type="button" class="btn btn-secondary" id="sendTestPayloadBtn">⚡ Send Live Test RFP Payload</button>
              <button type="submit" class="btn btn-primary" id="saveIntegrationBtn">Save &amp; Sync Integration</button>
            </div>
          </form>

          ${cfg.lastTestStatus ? `
            <p class="form-hint" style="margin-top:0.85rem;">
              Last Test Dispatch (${Store.escapeHtml(cfg.lastTestTime || '')}): <strong>${Store.escapeHtml(cfg.lastTestStatus)}</strong>
            </p>
          ` : ''}
        </div>

        <!-- JSON Payload Preview -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Live Outbound JSON RFP Payload Preview</h3>
              <p class="card-subtitle">Exact structured data pushed to ${Store.escapeHtml(activePreset.name)} on every dispatched commercial lead.</p>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="copyPayloadBtn">Copy JSON Schema</button>
          </div>
          <pre class="payload-preview" id="payloadPreviewBox">${Store.escapeHtml(getSamplePayload(cfg.provider))}</pre>
        </div>
      `;

      bindEvents();
    }

    function bindEvents() {
      container.querySelectorAll('[data-provider]').forEach((card) => {
        const selectProv = () => {
          const provider = card.getAttribute('data-provider');
          Store.saveIntegrations({ provider });
        };
        card.addEventListener('click', selectProv);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectProv();
          }
        });
      });

      container.querySelector('#integrationConfigForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const endpointUrl = (container.querySelector('#intEndpointUrl')?.value || '').trim();
        const authHeader = (container.querySelector('#intAuthHeader')?.value || '').trim();
        const signingSecret = (container.querySelector('#intSigningSecret')?.value || '').trim();
        const triggerMode = container.querySelector('#intTriggerMode')?.value || 'on_claim';
        const enabled = container.querySelector('#intEnabled')?.value === 'true';

        if (enabled && !endpointUrl) {
          Store.showToast('Enter a valid Webhook / API Endpoint URL before enabling auto-push.', 'error');
          return;
        }

        await Store.saveIntegrations({ endpointUrl, authHeader, signingSecret, triggerMode, enabled });
        Store.showToast('Integration settings saved & synced to Supabase.', 'success');
      });

      container.querySelector('#sendTestPayloadBtn')?.addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        const endpointUrl = (container.querySelector('#intEndpointUrl')?.value || '').trim();
        if (!endpointUrl) {
          Store.showToast('Paste your Webhook / CRM endpoint URL first to send a test payload.', 'warning');
          return;
        }
        await Store.saveIntegrations({
          endpointUrl,
          authHeader: (container.querySelector('#intAuthHeader')?.value || '').trim(),
          signingSecret: (container.querySelector('#intSigningSecret')?.value || '').trim(),
          triggerMode: container.querySelector('#intTriggerMode')?.value || 'on_claim',
          enabled: true
        });

        btn.disabled = true;
        btn.textContent = 'Dispatching Test RFP...';
        const res = await Store.dispatchToIntegration({
          id: 'TEST-RFP-' + Math.floor(1000 + Math.random() * 9000),
          trade: (Store.contractor?.activeSources && Store.contractor.activeSources[0]) || 'charge',
          company: 'Test Commercial Facility Owner',
          zip: Store.contractor?.baseZip || '77002',
          cost: 250,
          status: 'test'
        });
        await Store.saveIntegrations({
          lastTestStatus: res.status,
          lastTestTime: new Date().toLocaleTimeString()
        });
        Store.showToast(`Test RFP dispatched (${res.status}).`, res.ok ? 'success' : 'warning');
      });

      container.querySelector('#copyPayloadBtn')?.addEventListener('click', () => {
        const txt = container.querySelector('#payloadPreviewBox')?.textContent || '';
        navigator.clipboard?.writeText(txt);
        Store.showToast('Sample RFP JSON payload copied to clipboard.', 'success');
      });
    }

    Store.on('integrations:updated', render);
    Store.on('contractor:updated', render);
    render();
  }

  window.PartnerComponents = window.PartnerComponents || {};
  window.PartnerComponents.mountIntegrations = mountIntegrations;
})(window);
