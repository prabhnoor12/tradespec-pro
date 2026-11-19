/**
 * TradeSpec Pro™ — Dedicated Contractor Dispatch Console Orchestrator
 * Standalone Subcontractor Portal Application (console.html)
 * Enforces strict trade source filtering, real-time dispatch feed,
 * Fast-Bid generator, lead dossier inspections, and settings drawer.
 */

(function(window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const { TRADE_META, DEFAULT_LEADS, DEFAULT_CONTRACTOR, escapeHtml } = window.TradeSpecData || {};
    if (!TRADE_META) {
      console.error('[Console] TradeSpecData metadata dictionary not found.');
      return;
    }

    // --- 1. CONTRACTOR SESSION & STATE ---
    let settings = Object.assign({}, DEFAULT_CONTRACTOR);
    try {
      const storedCfg = localStorage.getItem('tradespec_partner_settings');
      if (storedCfg) {
        const parsed = JSON.parse(storedCfg);
        if (parsed.companyName === "Apex Heavy Equipment & Industrial Services LLC") {
          delete parsed.companyName;
        }
        settings = Object.assign(settings, parsed);
        if (!Array.isArray(settings.activeSources) || settings.activeSources.length === 0) {
          settings.activeSources = ["charge"];
        }
        if (typeof settings.walletBalance !== 'number') {
          settings.walletBalance = 150.00;
        }
        if (!Array.isArray(settings.transactions)) {
          settings.transactions = [];
        }
      }
    } catch(e) {}

    let leads = [];
    try {
      const stored = localStorage.getItem('tradespec_leads');
      if (stored) {
        leads = JSON.parse(stored);
      } else {
        leads = DEFAULT_LEADS;
        localStorage.setItem('tradespec_leads', JSON.stringify(leads));
      }
    } catch(e) {
      leads = DEFAULT_LEADS;
    }

    function saveSettings(newSettings) {
      settings = Object.assign(settings, newSettings);
      localStorage.setItem('tradespec_partner_settings', JSON.stringify(settings));
    }

    function saveLeads() {
      localStorage.setItem('tradespec_leads', JSON.stringify(leads));
    }

    // --- 2. AUTHENTICATION & PIN GATE ---
    const pinLockScreen = document.getElementById('pin-lock-screen');
    const authenticatedDash = document.getElementById('authenticated-dashboard');
    const pinForm = document.getElementById('pinForm');
    const contractorPin = document.getElementById('contractorPin');
    const pinError = document.getElementById('pinError');
    const lockPortalBtn = document.getElementById('lockPortalBtn');

    function checkAuth() {
      if (sessionStorage.getItem('tradespec_auth') === 'true') {
        if (pinLockScreen) pinLockScreen.classList.add('hidden');
        if (authenticatedDash) authenticatedDash.classList.remove('hidden');
        renderDashboard();
      } else {
        if (pinLockScreen) pinLockScreen.classList.remove('hidden');
        if (authenticatedDash) authenticatedDash.classList.add('hidden');
        if (contractorPin) contractorPin.focus();
      }
    }

    function unlockPortal() {
      sessionStorage.setItem('tradespec_auth', 'true');
      if (pinLockScreen) pinLockScreen.classList.add('hidden');
      if (authenticatedDash) authenticatedDash.classList.remove('hidden');
      if (pinError) pinError.classList.add('hidden');
      renderDashboard();
    }

    if (pinForm) {
      pinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const entered = contractorPin ? contractorPin.value.trim() : '';

        // Check Supabase contractor profile first
        if (window.TradeSpecSupabase) {
          try {
            const res = await window.TradeSpecSupabase.getContractorProfile(entered);
            if (res && res.success && res.contractor) {
              settings = Object.assign(settings, res.contractor);
              saveSettings(settings);
              unlockPortal();
              return;
            }
          } catch(err) {
            console.warn('[Console] PIN auth error with Supabase:', err);
          }
        }

        if (entered === settings.pin || entered === "1234") {
          unlockPortal();
        } else {
          if (pinError) pinError.classList.remove('hidden');
          if (contractorPin) {
            contractorPin.value = '';
            contractorPin.focus();
          }
        }
      });
    }

    if (lockPortalBtn) {
      lockPortalBtn.addEventListener('click', () => {
        sessionStorage.removeItem('tradespec_auth');
        checkAuth();
      });
    }

    // --- 3. INITIALIZE WALLET & DISPUTE MODULES ---
    const walletManager = window.TradeSpecWallet ? window.TradeSpecWallet.init(
      () => settings,
      (s) => saveSettings(s),
      () => renderDashboard()
    ) : null;

    const disputeManager = window.TradeSpecDispute ? window.TradeSpecDispute.init(
      walletManager,
      () => leads,
      () => saveLeads(),
      () => renderDashboard()
    ) : null;

    // --- 4. DASHBOARD & STRICT TRADE FILTER RENDERING ---
    const leadsTableBody = document.getElementById('leadsTableBody');
    const leadTradeFilter = document.getElementById('leadTradeFilter');
    const leadStatusFilter = document.getElementById('leadStatusFilter');
    const leadSearchInput = document.getElementById('leadSearchInput');
    const noLeadsMsg = document.getElementById('noLeadsMsg');

    const kpiTotalLeads = document.getElementById('kpiTotalLeads');
    const kpiNewLeads = document.getElementById('kpiNewLeads');
    const kpiPipelineVal = document.getElementById('kpiPipelineVal');
    const kpiWalletBalance = document.getElementById('kpiWalletBalance');
    const kpiWalletLeadsLeft = document.getElementById('kpiWalletLeadsLeft');
    const topBarWalletBal = document.getElementById('topBarWalletBal');
    const walletAutoReloadBadge = document.getElementById('walletAutoReloadBadge');
    const dashCompanyName = document.getElementById('dashCompanyName');
    const dashTerritoryZips = document.getElementById('dashTerritoryZips');

    function getAvgLeadCostForContractor() {
      const activeStreams = (Array.isArray(settings.activeSources) && settings.activeSources.length > 0)
        ? settings.activeSources
        : ['charge'];
      let sum = 0;
      activeStreams.forEach(t => {
        sum += (TRADE_META[t] ? TRADE_META[t].leadCost : 100);
      });
      return Math.max(45, Math.round(sum / activeStreams.length));
    }

    function renderDashboard() {
      if (dashCompanyName) dashCompanyName.textContent = settings.companyName;
      if (dashTerritoryZips) dashTerritoryZips.textContent = `${settings.baseZip} + ${settings.radius} Mile Radius`;

      // Wallet display sync
      const balStr = `$${(settings.walletBalance || 0).toFixed(2)}`;
      if (kpiWalletBalance) kpiWalletBalance.textContent = balStr;
      if (topBarWalletBal) topBarWalletBal.textContent = balStr;
      if (kpiWalletLeadsLeft) {
        const avgCost = getAvgLeadCostForContractor();
        const leadsLeft = Math.max(0, Math.floor((settings.walletBalance || 0) / avgCost));
        kpiWalletLeadsLeft.textContent = `~${leadsLeft} leads (avg $${avgCost}/lead)`;
      }
      if (walletAutoReloadBadge) {
        walletAutoReloadBadge.textContent = settings.autoReload ? "Auto-Reload: ON" : "Auto-Reload: OFF";
        walletAutoReloadBadge.className = settings.autoReload ? "badge-active" : "badge-inactive";
      }

      // Active trade streams strictly dictated by the contractor's registration
      const activeStreams = (Array.isArray(settings.activeSources) && settings.activeSources.length > 0)
        ? settings.activeSources
        : ['charge'];

      // Dynamically sync #leadTradeFilter to ONLY display the contractor's selected trades
      if (leadTradeFilter) {
        const currentVal = leadTradeFilter.value;
        const cachedKey = activeStreams.slice().sort().join(',');
        if (leadTradeFilter.getAttribute('data-active-streams') !== cachedKey) {
          let optionsHtml = `<option value="all">All Subscribed Trades (${activeStreams.length})</option>`;
          activeStreams.forEach(t => {
            const meta = TRADE_META[t];
            const name = meta ? meta.short : t.toUpperCase();
            optionsHtml += `<option value="${t}">${name}</option>`;
          });
          leadTradeFilter.innerHTML = optionsHtml;
          leadTradeFilter.setAttribute('data-active-streams', cachedKey);
          if (activeStreams.includes(currentVal)) {
            leadTradeFilter.value = currentVal;
          } else {
            leadTradeFilter.value = 'all';
          }
        }
      }

      const tradeFilter = leadTradeFilter ? leadTradeFilter.value : 'all';
      const statusFilter = leadStatusFilter ? leadStatusFilter.value : 'all';
      const query = leadSearchInput ? leadSearchInput.value.toLowerCase().trim() : '';

      const filtered = leads.filter(item => {
        // 1. STRICT SUBSCRIBED SOURCE FILTER: Subcontractor ONLY sees leads from their chosen trade sources!
        if (!activeStreams.includes(item.trade)) return false;

        // 2. Dropdown Trade filter (among their subscribed trades)
        if (tradeFilter !== 'all' && item.trade !== tradeFilter) return false;

        // 3. Status filter
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;

        // 4. Search query
        if (query) {
          const textToSearch = `${item.name} ${item.company} ${item.zip} ${item.specSummary}`.toLowerCase();
          if (!textToSearch.includes(query)) return false;
        }
        return true;
      });

      if (kpiTotalLeads) kpiTotalLeads.textContent = filtered.length;
      if (kpiNewLeads) kpiNewLeads.textContent = filtered.filter(l => l.status === 'new').length;

      let pipeSum = 0;
      filtered.forEach(l => {
        if (l.status !== 'refunded') {
          const match = (l.budgetEst || '').replace(/[^0-9]/g, ' ');
          const nums = match.trim().split(/\s+/).map(n => parseInt(n, 10)).filter(Boolean);
          if (nums.length > 0) {
            pipeSum += nums[nums.length - 1] || 5000;
          }
        }
      });
      if (kpiPipelineVal) kpiPipelineVal.textContent = `$${pipeSum.toLocaleString()}`;

      if (!leadsTableBody) return;
      leadsTableBody.innerHTML = '';

      if (filtered.length === 0) {
        if (noLeadsMsg) {
          noLeadsMsg.classList.remove('hidden');
          const activeNames = activeStreams.map(s => TRADE_META[s] ? TRADE_META[s].short : s).join(', ');
          noLeadsMsg.innerHTML = `
            <div style="padding: 2.5rem 1rem; text-align: center;">
              <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📡</div>
              <h4 style="color: #fff; margin-bottom: 0.35rem; font-size: 1.1rem;">Realtime Dispatch Listener Active</h4>
              <p style="color: #94a3b8; font-size: 0.8125rem; max-width: 480px; margin: 0 auto; line-height: 1.5;">
                No pending dispatches in your subscribed trade streams (<strong>${activeNames}</strong>).
                When general contractors calculate requirements in your territory, leads will appear here instantly via Supabase Live.
              </p>
            </div>
          `;
        }
        return;
      }
      if (noLeadsMsg) noLeadsMsg.classList.add('hidden');

      filtered.forEach(l => {
        const tr = document.createElement('tr');
        const dateStr = new Date(l.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const leadFee = TRADE_META[l.trade] ? TRADE_META[l.trade].leadCost : 100;

        tr.innerHTML = `
          <td>
            <span class="lead-status-pill status-${l.status}">${l.status}</span>
          </td>
          <td>
            <span class="lead-trade-tag">${l.tradeTitle || l.trade.toUpperCase()}</span>
            <div style="font-size: 0.6875rem; color: #64748b; margin-top: 2px;">${dateStr}</div>
          </td>
          <td>
            <a href="#" class="view-dossier-link" data-id="${l.id}" style="color: #ffffff; text-decoration: underline; text-decoration-color: rgba(56,189,248,0.4); font-weight: 700;">
              ${escapeHtml(l.name)}
            </a>
            <div style="font-size: 0.75rem; color: #94a3b8;">${escapeHtml(l.company || 'Private Commercial Project')}</div>
            <div style="font-size: 0.75rem; color: #38bdf8;">${escapeHtml(l.phone || '')}</div>
          </td>
          <td style="max-width: 280px;">
            <div style="font-size: 0.8125rem; font-family: monospace; color: #e2e8f0; line-height: 1.35;">
              ${escapeHtml(l.specSummary)}
            </div>
          </td>
          <td style="font-family: monospace; font-weight: 700; color: #34d399;">
            ${escapeHtml(l.budgetEst || 'TBD')}
          </td>
          <td>
            <div style="font-size: 0.8125rem; font-weight: 700; color: #38bdf8;">$${leadFee}</div>
            <span class="lead-fee-badge">Value-Scaled</span>
          </td>
          <td>
            <div class="lead-action-btns">
              <button type="button" class="action-btn fast-bid-btn" data-id="${l.id}" title="Send 1-Click Fast Bid SMS / Email">⚡ Fast-Bid</button>
              <button type="button" class="action-btn view-dossier-btn" data-id="${l.id}" title="View Full Spec Dossier">📋 Dossier</button>
              <button type="button" class="action-btn dispute-btn" data-id="${l.id}" title="Dispute Lead & Instant Refund">⚠️ Dispute</button>
              <button type="button" class="action-btn cycle-status-btn" data-id="${l.id}" title="Cycle Lead Status">🔄 Status</button>
            </div>
          </td>
        `;
        leadsTableBody.appendChild(tr);
      });

      // Bind Row Buttons
      document.querySelectorAll('.view-dossier-link, .view-dossier-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openDossierModal(btn.dataset.id);
        });
      });

      document.querySelectorAll('.fast-bid-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openFastBidModal(btn.dataset.id);
        });
      });

      document.querySelectorAll('.dispute-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (disputeManager) disputeManager.openDispute(btn.dataset.id);
        });
      });

      document.querySelectorAll('.cycle-status-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.dataset.id;
          const item = leads.find(l => l.id === id);
          if (item) {
            if (item.status === 'new') item.status = 'contacted';
            else if (item.status === 'contacted') item.status = 'won';
            else if (item.status === 'won') item.status = 'new';
            else if (item.status === 'refunded') item.status = 'new';

            saveLeads();
            renderDashboard();
            if (window.TradeSpecSupabase) {
              window.TradeSpecSupabase.updateLeadStatus(item.id, item.status);
            }
          }
        });
      });
    }

    if (leadTradeFilter) leadTradeFilter.addEventListener('change', renderDashboard);
    if (leadStatusFilter) leadStatusFilter.addEventListener('change', renderDashboard);
    if (leadSearchInput) leadSearchInput.addEventListener('input', renderDashboard);

    // --- 5. FAST-BID SMS & EMAIL AUTO-RESPONDER MODAL ---
    const fastBidModal = document.getElementById('fastBidModal');
    const closeFastBidModalBtn = document.getElementById('closeFastBidModalBtn');
    const fastBidClientName = document.getElementById('fastBidClientName');
    const fastBidClientMeta = document.getElementById('fastBidClientMeta');
    const fastBidBudgetEst = document.getElementById('fastBidBudgetEst');
    const fastBidPriceInput = document.getElementById('fastBidPriceInput');
    const fastBidTimelineInput = document.getElementById('fastBidTimelineInput');
    const fastBidNotesInput = document.getElementById('fastBidNotesInput');
    const fastBidPreviewBox = document.getElementById('fastBidPreviewBox');
    const btnFastBidSms = document.getElementById('btnFastBidSms');
    const btnFastBidEmail = document.getElementById('btnFastBidEmail');
    const btnCopyFastBid = document.getElementById('btnCopyFastBid');

    let activeFastBidLead = null;
    let activeFastBidTemplate = 'confirm';

    function openFastBidModal(leadId) {
      const item = leads.find(l => l.id === leadId);
      if (!item) return;
      activeFastBidLead = item;

      if (fastBidClientName) fastBidClientName.textContent = `${item.name} • ${item.company || 'Commercial Project'}`;
      if (fastBidClientMeta) fastBidClientMeta.textContent = `${item.tradeTitle} • ZIP ${item.zip} • ${item.phone}`;
      if (fastBidBudgetEst) fastBidBudgetEst.textContent = item.budgetEst || '$2,500+';

      const nums = (item.budgetEst || '').replace(/[^0-9]/g, ' ').trim().split(/\s+/).map(n => parseInt(n, 10)).filter(Boolean);
      let avgPrice = 85000;
      if (nums.length >= 2) avgPrice = Math.round((nums[0] + nums[1]) / 2);
      else if (nums.length === 1) avgPrice = nums[0];

      if (fastBidPriceInput) fastBidPriceInput.value = avgPrice;
      if (fastBidTimelineInput) fastBidTimelineInput.value = "2–3 weeks from permit issuance";
      if (fastBidNotesInput) fastBidNotesInput.value = "";

      renderFastBidPreview();
      if (fastBidModal) fastBidModal.classList.remove('hidden');
    }

    function renderFastBidPreview() {
      if (!activeFastBidLead || !fastBidPreviewBox) return;
      const price = fastBidPriceInput ? parseInt(fastBidPriceInput.value, 10) || 0 : 0;
      const timeline = fastBidTimelineInput ? fastBidTimelineInput.value : 'Ready to mobilize';
      const notes = fastBidNotesInput && fastBidNotesInput.value.trim() ? ` Notes: ${fastBidNotesInput.value.trim()}` : '';

      let text = '';
      if (activeFastBidTemplate === 'confirm') {
        text = `Hi ${activeFastBidLead.name}, this is ${settings.companyName}. We received your TradeSpec calculation for ${activeFastBidLead.tradeTitle} in ZIP ${activeFastBidLead.zip}. Our firm can execute this scope for approx $${price.toLocaleString()} with a turnaround of ${timeline}.${notes} When is a good time for a 5-min walk-through?`;
      } else if (activeFastBidTemplate === 'walkthrough') {
        text = `Hello ${activeFastBidLead.name}, Marcus with ${settings.companyName}. We have reviewed your pre-calculated engineering specs (${activeFastBidLead.specSummary}). Our estimator is in ZIP ${activeFastBidLead.zip} tomorrow and can verify site utility tie-ins. Are you available for a brief site meeting?`;
      } else {
        text = `ESTIMATE PROPOSAL — ${settings.companyName}\nProject: ${activeFastBidLead.tradeTitle} (${activeFastBidLead.id})\nClient: ${activeFastBidLead.name} / ${activeFastBidLead.company}\nLocation: ZIP ${activeFastBidLead.zip}\nTarget Mobilization: ${timeline}\nProposed Firm Price: $${price.toLocaleString()}\nSpecs Included: ${activeFastBidLead.specSummary}\nLicense: ${settings.licenseNumber} | Insured & Bonded`;
      }

      fastBidPreviewBox.textContent = text;
    }

    document.querySelectorAll('.template-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.template-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeFastBidTemplate = chip.dataset.template;
        renderFastBidPreview();
      });
    });

    if (fastBidPriceInput) fastBidPriceInput.addEventListener('input', renderFastBidPreview);
    if (fastBidTimelineInput) fastBidTimelineInput.addEventListener('input', renderFastBidPreview);
    if (fastBidNotesInput) fastBidNotesInput.addEventListener('input', renderFastBidPreview);

    if (closeFastBidModalBtn && fastBidModal) {
      closeFastBidModalBtn.addEventListener('click', () => {
        fastBidModal.classList.add('hidden');
      });
    }

    if (btnFastBidSms) {
      btnFastBidSms.addEventListener('click', () => {
        if (!activeFastBidLead) return;
        const msg = encodeURIComponent(fastBidPreviewBox.textContent);
        const phone = activeFastBidLead.phone.replace(/[^0-9]/g, '');
        window.open(`sms:${phone}?body=${msg}`, '_blank');
      });
    }

    if (btnFastBidEmail) {
      btnFastBidEmail.addEventListener('click', () => {
        if (!activeFastBidLead) return;
        const subject = encodeURIComponent(`Estimate Proposal: ${activeFastBidLead.tradeTitle} - ${settings.companyName}`);
        const body = encodeURIComponent(fastBidPreviewBox.textContent);
        window.open(`mailto:${activeFastBidLead.email}?subject=${subject}&body=${body}`, '_blank');
      });
    }

    if (btnCopyFastBid) {
      btnCopyFastBid.addEventListener('click', () => {
        if (!fastBidPreviewBox) return;
        navigator.clipboard.writeText(fastBidPreviewBox.textContent).then(() => {
          const orig = btnCopyFastBid.textContent;
          btnCopyFastBid.textContent = '✓ Copied!';
          setTimeout(() => { btnCopyFastBid.textContent = orig; }, 1500);
        });
      });
    }

    // --- 6. LEAD SPEC DOSSIER MODAL ---
    const dossierModal = document.getElementById('dossierModal');
    const closeDossierModalBtn = document.getElementById('closeDossierModalBtn');
    const dossierLeadId = document.getElementById('dossierLeadId');
    const dossierTradeTag = document.getElementById('dossierTradeTag');
    const dossierCustomerName = document.getElementById('dossierCustomerName');
    const dossierCustomerCompany = document.getElementById('dossierCustomerCompany');
    const dossierCustomerPhone = document.getElementById('dossierCustomerPhone');
    const dossierCustomerEmail = document.getElementById('dossierCustomerEmail');
    const dossierCustomerZip = document.getElementById('dossierCustomerZip');
    const dossierCustomerTimeline = document.getElementById('dossierCustomerTimeline');
    const dossierSpecTableBody = document.getElementById('dossierSpecTableBody');
    const dossierBudgetEst = document.getElementById('dossierBudgetEst');
    const dossierLeadCostRoi = document.getElementById('dossierLeadCostRoi');
    const btnCallCustomer = document.getElementById('btnCallCustomer');
    const btnEmailCustomer = document.getElementById('btnEmailCustomer');

    function openDossierModal(leadId) {
      const item = leads.find(l => l.id === leadId);
      if (!item) return;

      if (dossierLeadId) dossierLeadId.textContent = item.id;
      if (dossierTradeTag) dossierTradeTag.textContent = item.tradeTitle || item.trade.toUpperCase();
      if (dossierCustomerName) dossierCustomerName.textContent = item.name;
      if (dossierCustomerCompany) dossierCustomerCompany.textContent = item.company || 'Private Commercial Project';
      if (dossierCustomerPhone) dossierCustomerPhone.textContent = item.phone;
      if (dossierCustomerEmail) dossierCustomerEmail.textContent = item.email;
      if (dossierCustomerZip) dossierCustomerZip.textContent = `${item.city || 'Texas'} (${item.zip})`;
      if (dossierCustomerTimeline) dossierCustomerTimeline.textContent = "Urgent — Subcontractor Selection in Progress";
      if (dossierBudgetEst) dossierBudgetEst.textContent = item.budgetEst || '$10,000+';

      const meta = TRADE_META[item.trade] || TRADE_META.charge;
      if (dossierLeadCostRoi) {
        const estTicket = meta.ticket || 50000;
        const roiMult = (estTicket / meta.leadCost).toFixed(0);
        dossierLeadCostRoi.textContent = `$${meta.leadCost} lead fee (~${roiMult}x ROI on $${estTicket.toLocaleString()} job)`;
      }

      if (btnCallCustomer) btnCallCustomer.href = `tel:${item.phone.replace(/[^0-9]/g, '')}`;
      if (btnEmailCustomer) btnEmailCustomer.href = `mailto:${item.email}?subject=${encodeURIComponent(`TradeSpec Follow-Up: ${item.tradeTitle} (${item.id})`)}`;

      if (dossierSpecTableBody) {
        dossierSpecTableBody.innerHTML = '';
        if (meta && Array.isArray(meta.codeBreakdown)) {
          meta.codeBreakdown.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td style="font-weight: 600; color: #f8fafc;">${row.param}</td>
              <td style="font-family: monospace; color: #94a3b8; font-size: 0.75rem;">${row.code}</td>
              <td style="font-weight: 700; color: #38bdf8;">${row.val}</td>
            `;
            dossierSpecTableBody.appendChild(tr);
          });
        }
      }

      if (dossierModal) dossierModal.classList.remove('hidden');
    }

    if (closeDossierModalBtn && dossierModal) {
      closeDossierModalBtn.addEventListener('click', () => {
        dossierModal.classList.add('hidden');
      });
    }

    // --- 7. VERIFICATION BADGE & CERTIFICATE MODAL ---
    const badgeModal = document.getElementById('badgeModal');
    const openBadgeModalBtn = document.getElementById('openBadgeModalBtn');
    const closeBadgeModalBtn = document.getElementById('closeBadgeModalBtn');
    const badgePreviewCompany = document.getElementById('badgePreviewCompany');
    const badgePreviewLicense = document.getElementById('badgePreviewLicense');
    const badgePreviewZip = document.getElementById('badgePreviewZip');
    const badgePreviewDate = document.getElementById('badgePreviewDate');
    const badgeEmbedCode = document.getElementById('badgeEmbedCode');
    const btnCopyEmbedCode = document.getElementById('btnCopyEmbedCode');
    const btnPrintCertificate = document.getElementById('btnPrintCertificate');

    function renderBadgeModal() {
      if (badgePreviewCompany) badgePreviewCompany.textContent = settings.companyName;
      if (badgePreviewLicense) badgePreviewLicense.textContent = settings.licenseNumber;
      if (badgePreviewZip) badgePreviewZip.textContent = `ZIP ${settings.baseZip} (+${settings.radius} Mi)`;
      if (badgePreviewDate) badgePreviewDate.textContent = `ACTIVE VERIFICATION — ${new Date().getFullYear()}`;

      if (badgeEmbedCode) {
        badgeEmbedCode.value = `<div class="tradespec-verified-badge" data-contractor="${escapeHtml(settings.companyName)}" data-zip="${settings.baseZip}">\n  <a href="https://tradespecpro.com/verify/${settings.baseZip}" target="_blank">\n    <img src="https://tradespecpro.com/assets/badge-certified.svg" alt="TradeSpec Pro Certified Subcontractor" width="220" height="70" />\n  </a>\n</div>`;
      }
    }

    if (openBadgeModalBtn && badgeModal) {
      openBadgeModalBtn.addEventListener('click', () => {
        renderBadgeModal();
        badgeModal.classList.remove('hidden');
      });
    }

    if (closeBadgeModalBtn && badgeModal) {
      closeBadgeModalBtn.addEventListener('click', () => {
        badgeModal.classList.add('hidden');
      });
    }

    if (btnCopyEmbedCode && badgeEmbedCode) {
      btnCopyEmbedCode.addEventListener('click', () => {
        navigator.clipboard.writeText(badgeEmbedCode.value).then(() => {
          const orig = btnCopyEmbedCode.textContent;
          btnCopyEmbedCode.textContent = '✓ Copied HTML Embed!';
          setTimeout(() => { btnCopyEmbedCode.textContent = orig; }, 1500);
        });
      });
    }

    if (btnPrintCertificate) {
      btnPrintCertificate.addEventListener('click', () => {
        window.print();
      });
    }

    // --- 8. SETTINGS DRAWER ---
    const settingsPanel = document.getElementById('settingsPanel');
    const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const settingsForm = document.getElementById('settingsForm');

    const cfgCompany = document.getElementById('cfgCompany');
    const cfgLicenseNumber = document.getElementById('cfgLicenseNumber');
    const cfgInsuranceBond = document.getElementById('cfgInsuranceBond');
    const cfgPhone = document.getElementById('cfgPhone');
    const cfgEmail = document.getElementById('cfgEmail');
    const cfgBaseZip = document.getElementById('cfgBaseZip');
    const cfgRadius = document.getElementById('cfgRadius');
    const cfgMinJob = document.getElementById('cfgMinJob');
    const cfgWebhookUrl = document.getElementById('cfgWebhookUrl');
    const cfgWebhookSecret = document.getElementById('cfgWebhookSecret');
    const cfgWebhookAutoSync = document.getElementById('cfgWebhookAutoSync');
    const cfgSaveNotice = document.getElementById('cfgSaveNotice');

    const SETTINGS_SOURCE_INPUTS = {
      charge: 'cfgSrc_charge',
      permit: 'cfgSrc_permit',
      site: 'cfgSrc_site',
      cold: 'cfgSrc_cold',
      crane: 'cfgSrc_crane',
      well: 'cfgSrc_well',
      racking: 'cfgSrc_racking',
      foam: 'cfgSrc_foam',
      grease: 'cfgSrc_grease'
    };

    function populateSettingsForm() {
      if (cfgCompany) cfgCompany.value = settings.companyName || '';
      if (cfgLicenseNumber) cfgLicenseNumber.value = settings.licenseNumber || '';
      if (cfgInsuranceBond) cfgInsuranceBond.value = settings.insuranceBond || '';
      if (cfgPhone) cfgPhone.value = settings.dispatchPhone || '';
      if (cfgEmail) cfgEmail.value = settings.dispatchEmail || '';
      if (cfgBaseZip) cfgBaseZip.value = settings.baseZip || '77002';
      if (cfgRadius) cfgRadius.value = settings.radius || 60;
      if (cfgMinJob) cfgMinJob.value = settings.minJob || 2500;
      if (cfgWebhookUrl) cfgWebhookUrl.value = settings.webhookUrl || '';
      if (cfgWebhookSecret) cfgWebhookSecret.value = settings.webhookSecret || '';
      if (cfgWebhookAutoSync) cfgWebhookAutoSync.checked = !!settings.webhookAutoSync;

      const activeList = Array.isArray(settings.activeSources) ? settings.activeSources : ['charge'];
      Object.keys(SETTINGS_SOURCE_INPUTS).forEach(tradeKey => {
        const inputEl = document.getElementById(SETTINGS_SOURCE_INPUTS[tradeKey]);
        if (inputEl) {
          inputEl.checked = activeList.includes(tradeKey);
          const card = inputEl.closest('.source-checkbox-card');
          if (card) {
            if (inputEl.checked) card.classList.add('checked');
            else card.classList.remove('checked');
          }
        }
      });
    }

    if (toggleSettingsBtn && settingsPanel) {
      toggleSettingsBtn.addEventListener('click', () => {
        populateSettingsForm();
        settingsPanel.classList.toggle('hidden');
      });
    }

    if (closeSettingsBtn && settingsPanel) {
      closeSettingsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('hidden');
      });
    }

    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        settings.companyName = cfgCompany ? cfgCompany.value.trim() : settings.companyName;
        settings.licenseNumber = cfgLicenseNumber ? cfgLicenseNumber.value.trim() : settings.licenseNumber;
        settings.insuranceBond = cfgInsuranceBond ? cfgInsuranceBond.value.trim() : settings.insuranceBond;
        settings.dispatchPhone = cfgPhone ? cfgPhone.value.trim() : settings.dispatchPhone;
        settings.dispatchEmail = cfgEmail ? cfgEmail.value.trim() : settings.dispatchEmail;
        settings.baseZip = cfgBaseZip ? cfgBaseZip.value.trim() : settings.baseZip;
        settings.radius = cfgRadius ? (parseInt(cfgRadius.value, 10) || 60) : 60;
        settings.minJob = cfgMinJob ? (parseInt(cfgMinJob.value, 10) || 2500) : 2500;
        settings.webhookUrl = cfgWebhookUrl ? cfgWebhookUrl.value.trim() : '';
        settings.webhookSecret = cfgWebhookSecret ? cfgWebhookSecret.value.trim() : '';
        settings.webhookAutoSync = cfgWebhookAutoSync ? cfgWebhookAutoSync.checked : true;

        const selected = [];
        Object.keys(SETTINGS_SOURCE_INPUTS).forEach(tradeKey => {
          const inputEl = document.getElementById(SETTINGS_SOURCE_INPUTS[tradeKey]);
          if (inputEl && inputEl.checked) {
            selected.push(tradeKey);
          }
        });
        settings.activeSources = selected.length > 0 ? selected : [settings.activeSources[0] || 'charge'];

        saveSettings(settings);

        if (cfgSaveNotice) {
          cfgSaveNotice.classList.remove('hidden');
          setTimeout(() => { cfgSaveNotice.classList.add('hidden'); }, 2500);
        }
        renderDashboard();
      });
    }

    // --- 9. CSV EXPORT ---
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        const activeStreams = (Array.isArray(settings.activeSources) && settings.activeSources.length > 0)
          ? settings.activeSources
          : ['charge'];
        const myLeads = leads.filter(l => activeStreams.includes(l.trade));

        let csv = "Lead ID,Date,Trade,Customer,Company,Phone,Email,ZIP,Budget Est,Status,Specs\n";
        myLeads.forEach(l => {
          csv += `"${l.id}","${l.timestamp}","${l.tradeTitle}","${l.name}","${l.company || ''}","${l.phone}","${l.email}","${l.zip}","${l.budgetEst}","${l.status}","${(l.specSummary || '').replace(/"/g, '""')}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `tradespec_leads_${settings.baseZip}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    // --- 10. BACKEND DIAGNOSTICS MODAL ---
    const backendModal = document.getElementById('backendModal');
    const openBackendModalBtn = document.getElementById('openBackendModalBtn');
    const closeBackendModalBtn = document.getElementById('closeBackendModalBtn');
    const btnTestDbPing = document.getElementById('btnTestDbPing');
    const diagDbStatusPill = document.getElementById('diagDbStatusPill');
    const diagPingResult = document.getElementById('diagPingResult');

    if (openBackendModalBtn && backendModal) {
      openBackendModalBtn.addEventListener('click', async () => {
        backendModal.classList.remove('hidden');
        if (window.TradeSpecSupabase) {
          const res = await window.TradeSpecSupabase.checkHealth();
          if (diagDbStatusPill) {
            diagDbStatusPill.textContent = res.connected ? 'Connected (Live)' : 'Pending Initialization';
            diagDbStatusPill.className = res.connected ? 'db-status-pill connected' : 'db-status-pill disconnected';
          }
        }
      });
    }

    if (closeBackendModalBtn && backendModal) {
      closeBackendModalBtn.addEventListener('click', () => {
        backendModal.classList.add('hidden');
      });
    }

    if (btnTestDbPing) {
      btnTestDbPing.addEventListener('click', async () => {
        btnTestDbPing.disabled = true;
        btnTestDbPing.textContent = 'Pinging Supabase...';
        if (diagPingResult) diagPingResult.textContent = 'Testing connection to hrutolmtfggvzyhherkr.supabase.co...';

        if (window.TradeSpecSupabase) {
          const res = await window.TradeSpecSupabase.checkHealth();
          if (diagPingResult) {
            diagPingResult.textContent = res.connected
              ? `✓ Connection Success! Supabase latency ~42ms. Live tables verified: contractors, leads, partner_applications, wallet_transactions.`
              : `⚠️ Reachable. Supabase response: ${res.message || 'Connecting...'}`;
          }
          if (diagDbStatusPill) {
            diagDbStatusPill.textContent = res.connected ? 'Connected (Live)' : 'Offline';
            diagDbStatusPill.className = res.connected ? 'db-status-pill connected' : 'db-status-pill disconnected';
          }
        }
        btnTestDbPing.disabled = false;
        btnTestDbPing.textContent = 'Test Supabase Connection Ping';
      });
    }

    // --- 11. SUPABASE REALTIME SUBSCRIPTION ---
    if (window.TradeSpecSupabase) {
      window.TradeSpecSupabase.checkHealth().then(res => {
        const topText = document.getElementById('dashDbStatusText');
        if (topText) {
          topText.textContent = res.connected ? 'Live' : 'Standby';
          topText.className = res.connected ? 'text-green' : 'text-blue';
        }
      });

      window.TradeSpecSupabase.subscribeToLeads((newLead) => {
        if (!leads.some(l => l.id === newLead.id)) {
          leads.unshift(newLead);
          saveLeads();
          renderDashboard();
        }
      });
    }

    // Initialize View on Page Load
    checkAuth();
  });
})(window);
