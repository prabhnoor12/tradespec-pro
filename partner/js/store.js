/**
 * TradeSpec Pro™ Partner Portal — Reactive State Store & Trade Catalog
 * Single source of truth for contractor profile, active lead sources,
 * territory locks, wallet balance, CRM integrations, and Supabase sync.
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'tradespec_b2b_contractor_v2';
  const SESSION_KEY = 'tradespec_b2b_session_v2';
  const INTEGRATIONS_KEY = 'tradespec_b2b_integrations_v2';

  // High-carat commercial B2B pricing & metadata for all 9 TradeSpec Pro tools
  const TRADE_CATALOG = {
    charge: {
      key: 'charge',
      slug: 'charge-spec',
      name: 'Commercial EV Fleet & Infrastructure',
      short: 'ChargeSpec Pro',
      avgJob: '$45k – $350k+',
      semiPrice: 175,
      exclPrice: 350,
      desc: 'NEC 625 commercial Level 2/DCFC load calculations, 480V panels & transformers.'
    },
    racking: {
      key: 'racking',
      slug: 'pallet-racking',
      name: 'Warehouse Pallet Racking Layouts',
      short: 'RackSpec Pro',
      avgJob: '$40k – $250k+',
      semiPrice: 165,
      exclPrice: 325,
      desc: 'RMI MH16.1 seismic racking layouts, forklift aisle specs & IFC Ch. 32 high-piled.'
    },
    permit: {
      key: 'permit',
      slug: 'permit-spec',
      name: 'Commercial Tenant Improvements (TI)',
      short: 'PermitSpec Pro',
      avgJob: '$75k – $500k+',
      semiPrice: 175,
      exclPrice: 350,
      desc: 'IBC occupant loads, ADA/TAS & Title 24 commercial office/retail buildouts.'
    },
    site: {
      key: 'site',
      slug: 'site-spec',
      name: 'Civil Stormwater & Earthwork',
      short: 'SiteSpec Pro',
      avgJob: '$35k – $200k+',
      semiPrice: 150,
      exclPrice: 295,
      desc: 'Rational Method runoff (cfs), detention vaults & commercial cut/fill grading.'
    },
    well: {
      key: 'well',
      slug: 'well-drilling',
      name: 'Commercial Water Wells & Pumps',
      short: 'WellSpec Pro',
      avgJob: '$25k – $120k',
      semiPrice: 135,
      exclPrice: 265,
      desc: 'TDH submersible pump sizing, 6"-10" commercial casing & aquifer drilling RFPs.'
    },
    cold: {
      key: 'cold',
      slug: 'cold-spec',
      name: 'Walk-In Coolers & Cold Storage',
      short: 'ColdSpec Pro',
      avgJob: '$20k – $90k',
      semiPrice: 120,
      exclPrice: 235,
      desc: 'Walk-in BTU heat loads, ASHRAE 90.1 / Title 24 condensing units & panels.'
    },
    grease: {
      key: 'grease',
      slug: 'grease-trap',
      name: 'Commercial Grease Traps & Hoods',
      short: 'FOGSpec Pro',
      avgJob: '$15k – $75k',
      semiPrice: 115,
      exclPrice: 225,
      desc: 'UPC/IPC hydromechanical GPM & gravity vault sizing + NFPA 96 hood CFM.'
    },
    crane: {
      key: 'crane',
      slug: 'crane-lift',
      name: 'Mobile Crane Picks & Rigging',
      short: 'RigCheck Pro',
      avgJob: '$3.5k – $25k / pick',
      semiPrice: 95,
      exclPrice: 185,
      desc: 'ASME B30.5 & OSHA 1926 crane tonnage, boom radius & outrigger mat cribbing.'
    },
    foam: {
      key: 'foam',
      slug: 'spray-foam',
      name: 'Commercial Spray Foam Insulation',
      short: 'FoamSpec Pro',
      avgJob: '$12k – $65k',
      semiPrice: 90,
      exclPrice: 175,
      desc: 'Closed-cell board feet, steel building condensation control & R-value specs.'
    }
  };

  const CRM_PRESETS = [
    { id: 'servicetitan', name: 'ServiceTitan', category: 'Field Service ERP', hint: 'Push commercial RFPs directly into ServiceTitan Booking / Call Intake API.' },
    { id: 'jobber', name: 'Jobber', category: 'Contractor CRM', hint: 'Auto-create new Jobber Client + Request with engineering spec notes.' },
    { id: 'procore', name: 'Procore', category: 'Construction PM', hint: 'Route commercial bid packages straight into Procore Bidding / Leads.' },
    { id: 'hubspot', name: 'HubSpot', category: 'B2B Sales CRM', hint: 'Create Deal + Contact with calculated budget & code compliance fields.' },
    { id: 'salesforce', name: 'Salesforce', category: 'Enterprise CRM', hint: 'POST JSON Lead object directly to Salesforce Web-to-Lead or Flow Webhook.' },
    { id: 'buildertrend', name: 'Buildertrend', category: 'GC / Sub Platform', hint: 'Sync pre-scoped commercial opportunities into Buildertrend Lead Pipeline.' },
    { id: 'zapier', name: 'Zapier / Make', category: 'Automation Bridge', hint: 'Connect to 6,000+ apps (Google Sheets, Pipedrive, Zoho, Airtable, Email).' },
    { id: 'slack', name: 'Slack / MS Teams', category: 'Instant Dispatch Alert', hint: 'Drop formatted RFP cards into #commercial-estimating in < 5 seconds.' },
    { id: 'webhook', name: 'Custom REST Webhook', category: 'Direct HTTP POST', hint: 'HMAC-SHA256 signed JSON POST to any custom internal ERP or dispatch server.' }
  ];

  const listeners = {};
  let state = {
    contractor: null,
    leads: [],
    supabaseLive: false,
    integrations: {
      provider: 'servicetitan',
      endpointUrl: '',
      authHeader: '',
      signingSecret: '',
      triggerMode: 'on_claim',
      enabled: false,
      lastTestStatus: null,
      lastTestTime: null
    }
  };

  function emit(event, payload) {
    (listeners[event] || []).forEach((fn) => {
      try { fn(payload); } catch (err) { console.error('[PartnerStore] Listener error:', err); }
    });
  }

  function on(event, fn) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(fn);
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fmtCurrency(val) {
    return '$' + Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function showToast(msg, type) {
    const stack = document.getElementById('toastStack');
    if (!stack) return;
    const item = document.createElement('div');
    item.className = `toast-item ${type || 'info'}`;
    item.textContent = msg;
    stack.appendChild(item);
    setTimeout(() => {
      item.remove();
    }, 4200);
  }

  function loadLocalState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && saved.companyName) {
        state.contractor = saved;
      }
      const savedInt = JSON.parse(localStorage.getItem(INTEGRATIONS_KEY) || 'null');
      if (savedInt) {
        state.integrations = Object.assign({}, state.integrations, savedInt);
      }
    } catch (e) {}
  }

  function isAuthenticated() {
    loadLocalState();
    return sessionStorage.getItem(SESSION_KEY) === 'authenticated' && !!state.contractor;
  }

  function setSession(contractor) {
    state.contractor = contractor;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contractor));
    sessionStorage.setItem(SESSION_KEY, 'authenticated');
    emit('contractor:updated', contractor);
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'auth/login.html';
  }

  async function updateContractor(patch) {
    if (!state.contractor) return;
    state.contractor = Object.assign({}, state.contractor, patch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.contractor));
    emit('contractor:updated', state.contractor);

    if (window.TradeSpecSupabase && state.contractor.id) {
      try {
        await window.TradeSpecSupabase.updateContractorSettings(state.contractor.id, patch);
      } catch (err) {
        console.warn('[PartnerStore] Supabase profile sync warning:', err);
      }
    }
  }

  async function saveIntegrations(patch) {
    state.integrations = Object.assign({}, state.integrations, patch);
    localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(state.integrations));
    await updateContractor({ webhookUrl: state.integrations.endpointUrl || '' });
    emit('integrations:updated', state.integrations);
  }

  async function refreshFromSupabase() {
    if (!window.TradeSpecSupabase) return;
    try {
      const health = await window.TradeSpecSupabase.checkHealth();
      state.supabaseLive = !!(health && health.connected);
      emit('supabase:status', state.supabaseLive);

      const leadsRes = await window.TradeSpecSupabase.getLeads();
      if (leadsRes && leadsRes.success && Array.isArray(leadsRes.leads)) {
        state.leads = leadsRes.leads;
      } else {
        state.leads = [];
      }
      emit('leads:updated', getFilteredLeads());
    } catch (err) {
      console.warn('[PartnerStore] Refresh error:', err);
      state.supabaseLive = false;
      emit('supabase:status', false);
    }
  }

  // Strictly return ONLY leads matching contractor's selected activeSources
  function getFilteredLeads() {
    if (!state.contractor) return [];
    const active = Array.isArray(state.contractor.activeSources) ? state.contractor.activeSources : [];
    if (active.length === 0) return [];
    return state.leads.filter((lead) => active.includes(String(lead.trade || '').toLowerCase()));
  }

  function getLoyaltyTier() {
    const claimed = getFilteredLeads().filter((l) => l.status === 'claimed').length;
    const locked = state.contractor && state.contractor.exclusivityMode === 'exclusive_1of1';
    if (locked || claimed >= 10) {
      return { name: 'Platinum Anchor Partner', discountPct: 10, badge: 'badge-gold', nextText: 'Priority 1st-Call Dispatch + 10% Loyalty Credit Bonus Active' };
    }
    if (claimed >= 4) {
      return { name: 'Gold Dispatch Partner', discountPct: 5, badge: 'badge-blue', nextText: `${10 - claimed} more RFPs to unlock Platinum Anchor (10% bonus)` };
    }
    return { name: 'Verified Commercial Partner', discountPct: 0, badge: 'badge-green', nextText: `Claim ${4 - claimed} more RFPs (or lock Exclusive Territory) to unlock Gold 5% credit bonus` };
  }

  async function topUpWallet(amount) {
    if (!state.contractor) return;
    const tier = getLoyaltyTier();
    const bonus = Math.round(amount * (tier.discountPct / 100));
    const newBal = Number(state.contractor.walletBalance || 0) + amount + bonus;
    await updateContractor({ walletBalance: newBal });
    showToast(
      bonus > 0
        ? `Added ${fmtCurrency(amount)} + ${fmtCurrency(bonus)} Loyalty Bonus! New balance: ${fmtCurrency(newBal)}`
        : `Added ${fmtCurrency(amount)} to Dispatch Wallet. New balance: ${fmtCurrency(newBal)}`,
      'success'
    );
  }

  async function claimLead(leadId) {
    const lead = state.leads.find((l) => String(l.id) === String(leadId));
    if (!lead || !state.contractor) return false;
    const tradeInfo = TRADE_CATALOG[lead.trade] || { exclPrice: 200, semiPrice: 125 };
    const isExcl = state.contractor.exclusivityMode === 'exclusive_1of1';
    const price = Number(lead.cost) || (isExcl ? tradeInfo.exclPrice : tradeInfo.semiPrice);

    if (Number(state.contractor.walletBalance || 0) < price) {
      showToast(`Insufficient wallet balance (${fmtCurrency(state.contractor.walletBalance)}). Add funds to claim this ${fmtCurrency(price)} RFP.`, 'warning');
      return false;
    }

    const newBal = Number(state.contractor.walletBalance) - price;
    lead.status = 'claimed';
    lead.claimedBy = state.contractor.id || state.contractor.companyName;
    lead.cost = price;

    await updateContractor({ walletBalance: newBal });
    if (window.TradeSpecSupabase) {
      await window.TradeSpecSupabase.claimLead(lead.id, state.contractor.id, price);
    }

    // Auto-push to connected CRM/Webhook if enabled
    if (state.integrations.enabled && state.integrations.endpointUrl) {
      dispatchToIntegration(lead);
    }

    emit('leads:updated', getFilteredLeads());
    showToast(`RFP Claimed! ${fmtCurrency(price)} deducted. Full contact & engineering specs unlocked.`, 'success');
    return true;
  }

  async function disputeLead(leadId, reason) {
    const lead = state.leads.find((l) => String(l.id) === String(leadId));
    if (!lead || !state.contractor) return false;
    const refund = Number(lead.cost) || 150;
    lead.status = 'disputed';
    const newBal = Number(state.contractor.walletBalance || 0) + refund;

    await updateContractor({ walletBalance: newBal });
    if (window.TradeSpecSupabase) {
      await window.TradeSpecSupabase.disputeLead(lead.id, state.contractor.id, reason, 'Zero-friction instant portal credit');
    }
    emit('leads:updated', getFilteredLeads());
    showToast(`100% Instant Credit Approved: ${fmtCurrency(refund)} refunded to your Dispatch Wallet.`, 'success');
    return true;
  }

  async function dispatchToIntegration(leadPayload) {
    const cfg = state.integrations;
    if (!cfg.endpointUrl) return { ok: false, status: 'No endpoint configured' };
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (cfg.authHeader) headers['Authorization'] = cfg.authHeader;
      if (cfg.signingSecret) headers['X-TradeSpec-Signature'] = cfg.signingSecret;
      const res = await fetch(cfg.endpointUrl, {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify({
          event: 'tradespec.rfp.dispatched',
          provider: cfg.provider,
          timestamp: new Date().toISOString(),
          contractor: state.contractor ? state.contractor.companyName : '',
          rfp: leadPayload
        })
      });
      return { ok: res.ok, status: `HTTP ${res.status}` };
    } catch (err) {
      return { ok: false, status: 'CORS / Network blocked in browser (will deliver server-side)' };
    }
  }

  loadLocalState();

  window.PartnerStore = {
    TRADE_CATALOG,
    CRM_PRESETS,
    on,
    emit,
    escapeHtml,
    fmtCurrency,
    showToast,
    isAuthenticated,
    setSession,
    logout,
    updateContractor,
    saveIntegrations,
    refreshFromSupabase,
    getFilteredLeads,
    getLoyaltyTier,
    topUpWallet,
    claimLead,
    disputeLead,
    dispatchToIntegration,
    get contractor() { return state.contractor; },
    get integrations() { return state.integrations; },
    get supabaseLive() { return state.supabaseLive; }
  };
})(window);
