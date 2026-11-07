/**
 * TradeSpec Pro™ Partner Network & Subcontractor Console
 * Client-Side Business Engine & Lead Dispatch System
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DEFAULT MOCK LEADS SEED (Pre-loaded if localStorage is empty) ---
  const DEFAULT_LEADS = [
    {
      id: "EV-2026-7812",
      timestamp: "2026-11-07T11:15:00Z",
      trade: "charge",
      tradeTitle: "Commercial EV Fleet",
      name: "Marcus Vance",
      company: "Apex Logistics LLC",
      phone: "(713) 555-8902",
      email: "mvance@apexlogistics.com",
      zip: "77002",
      specSummary: "12x 19.2kW Level 2 Ports, 85kWh Vans, 361A @ 480V, 225kVA Padmount, 150ft Trench",
      budgetEst: "$75,000 – $145,000",
      status: "new"
    },
    {
      id: "TI-2026-6190",
      timestamp: "2026-11-07T10:40:00Z",
      trade: "permit",
      tradeTitle: "Tenant Improvement",
      name: "Elena Rostova",
      company: "Artisan Bakery & Cafe",
      phone: "(469) 555-7391",
      email: "elena@artisanbakery.com",
      zip: "75001",
      specSummary: "2,400 SF Restaurant, 160 Persons, 2 Remote Exits, 12ft Type I Hood (4,800 CFM), $45/SF TI Credit",
      budgetEst: "$310,000 – $480,000",
      status: "new"
    },
    {
      id: "SITE-2026-4431",
      timestamp: "2026-11-07T09:20:00Z",
      trade: "site",
      tradeTitle: "Civil Earthwork",
      name: "Derrick Cole",
      company: "Cole Commercial Properties",
      phone: "(512) 555-4321",
      email: "dcole@coleproperties.com",
      zip: "78701",
      specSummary: "1.5 Acres, 65% Impervious, 3.23 CFS Runoff, 0.26 Ac-Ft Pond, 800 BCY Cut, 60ft x 6ft Geogrid Wall",
      budgetEst: "$66,000 – $108,000",
      status: "new"
    },
    {
      id: "COLD-2026-5892",
      timestamp: "2026-11-07T08:50:00Z",
      trade: "cold",
      tradeTitle: "Commercial Refrigeration",
      name: "Carlos Mendez",
      company: "Lone Star Brewing Co.",
      phone: "(210) 555-6789",
      email: "carlos@lonestarbrew.com",
      zip: "78205",
      specSummary: "10x12x8.5 ft Cooler (+35°F), 11,850 BTU/hr, 1.5 HP Scroll Condenser, 4\" IMP (R-29)",
      budgetEst: "$14,500 – $24,000",
      status: "new"
    },
    {
      id: "LIFT-2026-8491",
      timestamp: "2026-11-06T15:24:00Z",
      trade: "crane",
      tradeTitle: "Crane & Rigging",
      name: "Marcus Vance",
      company: "Apex Commercial Mechanical",
      phone: "(713) 555-0192",
      email: "mvance@apexmech.com",
      zip: "77002",
      specSummary: "75-Ton Crane, 6,000 lbs RTU at 60ft setback (48ft height)",
      budgetEst: "$2,800 – $4,200",
      status: "new"
    },
    {
      id: "WELL-2026-3104",
      timestamp: "2026-11-06T14:10:00Z",
      trade: "well",
      tradeTitle: "Water Well & Pump",
      name: "David Sterling",
      company: "Sterling Ranch & Vineyards",
      phone: "(830) 555-4821",
      email: "david@sterlingvineyards.com",
      zip: "78624",
      specSummary: "350 ft Bedrock Well, 25 GPM, 3.0 HP Submersible Pump, 119 Gal Tank",
      budgetEst: "$18,500 – $22,400",
      status: "new"
    },
    {
      id: "RACK-2026-9281",
      timestamp: "2026-11-06T11:45:00Z",
      trade: "racking",
      tradeTitle: "Pallet Racking",
      name: "Elena Rostova",
      company: "ColdChain Logistics Hub",
      phone: "(469) 555-7391",
      email: "elena@coldchain3pl.com",
      zip: "75001",
      specSummary: "10k SF Facility, 648 Pallet Positions, Reach Truck (9.5ft aisles), 20ft Uprights",
      budgetEst: "$51,800 – $64,800",
      status: "contacted"
    },
    {
      id: "FOAM-2026-4412",
      timestamp: "2026-11-05T18:30:00Z",
      trade: "foam",
      tradeTitle: "Spray Foam",
      name: "Travis Holcomb",
      company: "Holcomb Custom Steel Bldgs",
      phone: "(512) 555-8320",
      email: "travis@holcombmetal.com",
      zip: "78701",
      specSummary: "30'×40' Shop, 6,440 Bd Ft (2\" Closed-Cell R-13.6, Roof + Walls)",
      budgetEst: "$9,600 – $11,800",
      status: "won"
    },
    {
      id: "FOG-2026-1940",
      timestamp: "2026-11-05T16:15:00Z",
      trade: "grease",
      tradeTitle: "Grease Trap & Hood",
      name: "Chef Anthony Bell",
      company: "Prime Cut Steakhouse",
      phone: "(210) 555-9014",
      email: "anthony@primecutbistro.com",
      zip: "78205",
      specSummary: "1,000 Gal Gravity Vault, 10ft Type I Hood (4,000 CFM), Heavy Duty Charbroiler",
      budgetEst: "$14,200 – $18,500",
      status: "new"
    }
  ];

  // --- 2. STATE MANAGEMENT ---
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

  // Contractor Settings Model
  const ALL_TRADE_KEYS = ["charge", "permit", "site", "cold", "crane", "well", "racking", "foam", "grease"];

  let settings = {
    companyName: "Apex Heavy Equipment & Industrial Services LLC",
    dispatchPhone: "(555) 849-2041",
    dispatchEmail: "dispatch@apexindustrial.com",
    baseZip: "77002",
    radius: 60,
    minJob: 2500,
    pin: "1234",
    activeSources: [...ALL_TRADE_KEYS]
  };

  try {
    const storedCfg = localStorage.getItem('tradespec_partner_settings');
    if (storedCfg) {
      settings = Object.assign(settings, JSON.parse(storedCfg));
      if (!Array.isArray(settings.activeSources) || settings.activeSources.length === 0) {
        settings.activeSources = [...ALL_TRADE_KEYS];
      }
    }
  } catch(e) {}

  // --- 3. TRADE METADATA & HELPER DICTIONARY ---
  const TRADE_META = {
    charge: { title: "Commercial EV Fleet Infrastructure", short: "EV Charging", ticket: 85000, leadCost: 135 },
    permit: { title: "Commercial Tenant Improvement", short: "Tenant TI", ticket: 140000, leadCost: 140 },
    site: { title: "Civil Earthwork & Stormwater", short: "Civil Site", ticket: 65000, leadCost: 125 },
    cold: { title: "Commercial Walk-In Refrigeration", short: "Walk-In Cold", ticket: 18500, leadCost: 115 },
    crane: { title: "Mobile Crane & Heavy Rigging", short: "Crane Rigging", ticket: 3500, leadCost: 110 },
    well: { title: "Water Well Drilling & Pumps", short: "Water Well", ticket: 16000, leadCost: 125 },
    racking: { title: "Warehouse Pallet Racking", short: "Pallet Racking", ticket: 32000, leadCost: 150 },
    foam: { title: "Commercial Spray Foam Insulation", short: "Spray Foam", ticket: 9500, leadCost: 95 },
    grease: { title: "Commercial Kitchen MEP & Hoods", short: "Grease & Hood", ticket: 14000, leadCost: 110 }
  };

  // --- 4. TERRITORY AVAILABILITY CHECKER ENGINE ---
  const territoryCheckerForm = document.getElementById('territoryCheckerForm');
  const checkZip = document.getElementById('checkZip');
  const checkTrade = document.getElementById('checkTrade');
  const checkerResult = document.getElementById('checkerResult');
  const checkerStatusDot = document.getElementById('checkerStatusDot');
  const checkerMetroName = document.getElementById('checkerMetroName');
  const checkerTradeName = document.getElementById('checkerTradeName');
  const checkerSlotBadge = document.getElementById('checkerSlotBadge');
  const btnClaimSlot = document.getElementById('btnClaimSlot');

  function resolveMetroArea(zip) {
    if (!zip || zip.length < 2) return "Regional Commercial Service Territory";
    const prefix2 = zip.substring(0, 2);
    const prefix3 = zip.substring(0, 3);
    if (prefix3 === '770' || prefix2 === '77') return `Harris County / Houston Metro (${zip})`;
    if (prefix2 === '75' || prefix2 === '76') return `Dallas-Fort Worth Metroplex (${zip})`;
    if (prefix3 === '787' || prefix2 === '78') return `Austin / Central Texas Corridor (${zip})`;
    if (prefix2 === '79') return `West Texas / Permian Industrial District (${zip})`;
    if (prefix2 >= '90' && prefix2 <= '93') return `Southern California Regional Metro (${zip})`;
    if (prefix2 === '94' || prefix2 === '95') return `SF Bay Area / NorCal Commercial District (${zip})`;
    if (prefix2 === '30' || prefix2 === '31') return `Atlanta Metropolitan Area (${zip})`;
    if (prefix2 === '33' || prefix2 === '34') return `South & Central Florida Commercial Territory (${zip})`;
    if (prefix2 === '60') return `Chicagoland Regional Hub (${zip})`;
    if (prefix2 === '85') return `Phoenix / Maricopa County (${zip})`;
    if (prefix2 === '98') return `Seattle / Puget Sound Corridor (${zip})`;
    if (prefix2 === '80') return `Denver Front Range Commercial Zone (${zip})`;
    return `Regional County Commercial Territory (${zip})`;
  }

  function runTerritoryCheck() {
    const rawZip = checkZip ? checkZip.value.trim() : '77002';
    const zip = rawZip || '77002';
    const trade = checkTrade ? checkTrade.value : 'charge';
    const metro = resolveMetroArea(zip);
    const meta = TRADE_META[trade] || TRADE_META.charge;

    // Scarcity logic: only zips ending in 99 show waitlist; all others show 1 exclusive slot open
    const isFull = zip.endsWith('99');

    if (checkerMetroName) checkerMetroName.textContent = metro;
    if (checkerTradeName) checkerTradeName.textContent = meta.title;

    if (isFull) {
      if (checkerStatusDot) checkerStatusDot.className = 'status-dot full';
      if (checkerSlotBadge) {
        checkerSlotBadge.className = 'checker-slot-badge full';
        checkerSlotBadge.textContent = 'Waitlist Only (2 of 2 Claimed)';
      }
      if (btnClaimSlot) {
        btnClaimSlot.textContent = 'Join Territory Waitlist ↓';
        btnClaimSlot.style.borderColor = '#ef4444';
        btnClaimSlot.style.color = '#fca5a5';
      }
    } else {
      if (checkerStatusDot) checkerStatusDot.className = 'status-dot available';
      if (checkerSlotBadge) {
        checkerSlotBadge.className = 'checker-slot-badge open';
        checkerSlotBadge.textContent = '1 Exclusive Slot Available (1 of 2 Claimed)';
      }
      if (btnClaimSlot) {
        btnClaimSlot.textContent = 'Claim This Territory Slot ↓';
        btnClaimSlot.style.borderColor = '#10b981';
        btnClaimSlot.style.color = '#a7f3d0';
      }
    }

    if (checkerResult) checkerResult.classList.remove('hidden');
  }

  if (territoryCheckerForm) {
    territoryCheckerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runTerritoryCheck();
    });
  }

  if (checkZip) checkZip.addEventListener('input', runTerritoryCheck);
  if (checkTrade) checkTrade.addEventListener('change', runTerritoryCheck);

  // Wire "Claim This Territory Slot" button: auto-fill onboarding fields & smooth scroll
  if (btnClaimSlot) {
    btnClaimSlot.addEventListener('click', (e) => {
      e.preventDefault();
      const zip = checkZip ? checkZip.value.trim() : '77002';
      const trade = checkTrade ? checkTrade.value : 'charge';

      const appZip = document.getElementById('appZip');
      const appTrade = document.getElementById('appTrade');
      if (appZip && zip) appZip.value = zip;
      if (appTrade && trade) {
        appTrade.value = trade;
        syncAppTradeToCheckboxes(trade);
      }

      const applySec = document.getElementById('apply');
      if (applySec) {
        applySec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 5. MULTI-SOURCE CHECKBOX INTERACTION ---
  function setupCheckboxGridListeners(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.addEventListener('change', (e) => {
      if (e.target && e.target.type === 'checkbox') {
        const card = e.target.closest('.source-checkbox-card');
        if (card) {
          if (e.target.checked) card.classList.add('checked');
          else card.classList.remove('checked');
        }
      }
    });
  }

  setupCheckboxGridListeners('appSourceCheckboxes');
  setupCheckboxGridListeners('settingsSourcesGrid');

  function syncAppTradeToCheckboxes(primaryTrade) {
    const checkboxes = document.querySelectorAll('#appSourceCheckboxes input[name="lead_sources"]');
    checkboxes.forEach(cb => {
      if (cb.value === primaryTrade) {
        cb.checked = true;
        const card = cb.closest('.source-checkbox-card');
        if (card) card.classList.add('checked');
      }
    });
  }

  const appTradeSelect = document.getElementById('appTrade');
  if (appTradeSelect) {
    appTradeSelect.addEventListener('change', () => {
      if (appTradeSelect.value) {
        syncAppTradeToCheckboxes(appTradeSelect.value);
      }
    });
  }

  // Initialize territory check on load
  runTerritoryCheck();

  // --- 6. ROI CALCULATOR ENGINE ---
  const roiTrade = document.getElementById('roiTrade');
  const roiLeads = document.getElementById('roiLeads');
  const roiCloseRate = document.getElementById('roiCloseRate');
  const roiLeadsVal = document.getElementById('roiLeadsVal');
  const roiCloseRateVal = document.getElementById('roiCloseRateVal');
  const roiProjectedRevenue = document.getElementById('roiProjectedRevenue');
  const roiWonJobsText = document.getElementById('roiWonJobsText');
  const roiLeadCost = document.getElementById('roiLeadCost');
  const roiNetMargin = document.getElementById('roiNetMargin');
  const roiFactor = document.getElementById('roiFactor');

  function updateRoi() {
    if (!roiTrade) return;
    const t = TRADE_META[roiTrade.value] || TRADE_META.crane;
    const count = parseInt(roiLeads.value, 10);
    const closePct = parseInt(roiCloseRate.value, 10) / 100;

    if (roiLeadsVal) roiLeadsVal.textContent = count;
    if (roiCloseRateVal) roiCloseRateVal.textContent = Math.round(closePct * 100);

    const wonJobs = Math.max(1, Math.round(count * closePct));
    const grossRev = wonJobs * t.ticket;
    const totalCost = count * t.leadCost;
    const net = grossRev - totalCost;
    const roi = (grossRev / totalCost).toFixed(1);

    if (roiProjectedRevenue) roiProjectedRevenue.textContent = `$${grossRev.toLocaleString()}`;
    if (roiWonJobsText) roiWonJobsText.textContent = `${wonJobs} Closed Commercial Contracts`;
    if (roiLeadCost) roiLeadCost.textContent = `$${totalCost.toLocaleString()}`;
    if (roiNetMargin) roiNetMargin.textContent = `$${net.toLocaleString()}`;
    if (roiFactor) roiFactor.textContent = `${roi}x ROI`;
  }

  if (roiTrade) {
    roiTrade.addEventListener('change', updateRoi);
    if (roiLeads) roiLeads.addEventListener('input', updateRoi);
    if (roiCloseRate) roiCloseRate.addEventListener('input', updateRoi);
    updateRoi();
  }

  // --- 7. PARTNER ONBOARDING APPLICATION FORM ---
  const appForm = document.getElementById('partnerApplicationForm');
  const appSuccessMsg = document.getElementById('appSuccessMsg');

  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect chosen lead streams
      const selectedSources = Array.from(document.querySelectorAll('#appSourceCheckboxes input[name="lead_sources"]:checked'))
        .map(cb => cb.value);

      const chosenTrade = document.getElementById('appTrade').value;
      if (selectedSources.length === 0 && chosenTrade) {
        selectedSources.push(chosenTrade);
      }

      const appData = {
        company: document.getElementById('appCompanyName').value,
        trade: chosenTrade,
        zip: document.getElementById('appZip').value,
        contact: document.getElementById('appContact').value,
        phone: document.getElementById('appPhone').value,
        email: document.getElementById('appEmail').value,
        radius: document.getElementById('appRadius').value,
        leadSources: selectedSources,
        timestamp: new Date().toISOString()
      };

      try {
        const apps = JSON.parse(localStorage.getItem('tradespec_partner_apps') || '[]');
        apps.unshift(appData);
        localStorage.setItem('tradespec_partner_apps', JSON.stringify(apps));
      } catch(err) {}

      if (appSuccessMsg) {
        appSuccessMsg.classList.remove('hidden');
        appSuccessMsg.innerHTML = `<strong>✓ Application Received!</strong> Territory reserved for <strong>${escapeHtml(appData.company)}</strong> in ZIP ${escapeHtml(appData.zip)} across ${selectedSources.length} selected trade streams. A dispatch verification code will be sent to ${escapeHtml(appData.phone)} within 24 hours.`;
      }
      appForm.reset();

      // Re-highlight primary selection card
      syncAppTradeToCheckboxes('charge');

      setTimeout(() => {
        if (appSuccessMsg) appSuccessMsg.classList.add('hidden');
      }, 7000);
    });
  }

  // --- 8. PRIVATE DASHBOARD AUTH & VIEW TOGGLING ---
  const portalSection = document.getElementById('portal-section');
  const pinLockScreen = document.getElementById('pin-lock-screen');
  const authenticatedDash = document.getElementById('authenticated-dashboard');
  const pinForm = document.getElementById('pinForm');
  const contractorPin = document.getElementById('contractorPin');
  const pinError = document.getElementById('pinError');
  const openPortalBtn = document.getElementById('open-portal-btn');
  const demoDashboardBtn = document.getElementById('demo-dashboard-btn');
  const quickDemoUnlock = document.getElementById('quick-demo-unlock');
  const lockPortalBtn = document.getElementById('lockPortalBtn');
  const navPortalBtn = document.getElementById('nav-portal-btn');
  const footerPortalLink = document.getElementById('footer-portal-link');

  function showPortal() {
    if (!portalSection) return;
    portalSection.classList.remove('hidden');
    portalSection.scrollIntoView({ behavior: 'smooth' });

    // Check if session is already authenticated
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

  if (openPortalBtn) openPortalBtn.addEventListener('click', showPortal);
  if (navPortalBtn) navPortalBtn.addEventListener('click', (e) => { e.preventDefault(); showPortal(); });
  if (footerPortalLink) footerPortalLink.addEventListener('click', (e) => { e.preventDefault(); showPortal(); });
  if (demoDashboardBtn) demoDashboardBtn.addEventListener('click', () => { showPortal(); unlockPortal(); });
  if (quickDemoUnlock) quickDemoUnlock.addEventListener('click', unlockPortal);

  if (pinForm) {
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = contractorPin ? contractorPin.value.trim() : '';
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
      if (pinLockScreen) pinLockScreen.classList.remove('hidden');
      if (authenticatedDash) authenticatedDash.classList.add('hidden');
      if (contractorPin) contractorPin.value = '';
    });
  }

  // --- 9. LEADS TABLE RENDERING & FILTERING ---
  const leadsTableBody = document.getElementById('leadsTableBody');
  const leadTradeFilter = document.getElementById('leadTradeFilter');
  const leadStatusFilter = document.getElementById('leadStatusFilter');
  const leadSearchInput = document.getElementById('leadSearchInput');
  const noLeadsMsg = document.getElementById('noLeadsMsg');

  // KPI elements
  const kpiTotalLeads = document.getElementById('kpiTotalLeads');
  const kpiNewLeads = document.getElementById('kpiNewLeads');
  const kpiPipelineVal = document.getElementById('kpiPipelineVal');
  const dashCompanyName = document.getElementById('dashCompanyName');
  const dashTerritoryZips = document.getElementById('dashTerritoryZips');

  function renderDashboard() {
    if (dashCompanyName) dashCompanyName.textContent = settings.companyName;
    if (dashTerritoryZips) dashTerritoryZips.textContent = `${settings.baseZip} + ${settings.radius} Mile Radius`;

    const tradeFilter = leadTradeFilter ? leadTradeFilter.value : 'all';
    const statusFilter = leadStatusFilter ? leadStatusFilter.value : 'all';
    const query = leadSearchInput ? leadSearchInput.value.toLowerCase().trim() : '';
    const activeStreams = Array.isArray(settings.activeSources) ? settings.activeSources : ALL_TRADE_KEYS;

    const filtered = leads.filter(item => {
      // 1. Filter out sources turned off in settings drawer
      const matchActiveStream = activeStreams.includes(item.trade);
      // 2. Filter dropdown
      const matchTrade = (tradeFilter === 'all' || item.trade === tradeFilter);
      // 3. Status dropdown
      const matchStatus = (statusFilter === 'all' || item.status === statusFilter);
      // 4. Keyword search
      const textToSearch = `${item.name} ${item.company} ${item.zip} ${item.specSummary}`.toLowerCase();
      const matchQuery = !query || textToSearch.includes(query);

      return matchActiveStream && matchTrade && matchStatus && matchQuery;
    });

    // Update KPIs based on active leads
    if (kpiTotalLeads) kpiTotalLeads.textContent = filtered.length;
    if (kpiNewLeads) kpiNewLeads.textContent = filtered.filter(l => l.status === 'new').length;
    
    // Estimate pipeline: calculate approx sum
    let pipeSum = 0;
    filtered.forEach(l => {
      const match = (l.budgetEst || '').replace(/[^0-9]/g, ' ');
      const nums = match.trim().split(/\s+/).map(n => parseInt(n, 10)).filter(Boolean);
      if (nums.length > 0) {
        pipeSum += nums[nums.length - 1] || 5000;
      }
    });
    if (kpiPipelineVal) kpiPipelineVal.textContent = `$${pipeSum.toLocaleString()}`;

    // Render Table Rows
    if (!leadsTableBody) return;
    leadsTableBody.innerHTML = '';

    if (filtered.length === 0) {
      if (noLeadsMsg) {
        noLeadsMsg.classList.remove('hidden');
        noLeadsMsg.innerHTML = activeStreams.length < ALL_TRADE_KEYS.length 
          ? `No leads found matching criteria. (Note: Some trade streams are currently paused in your Settings Drawer).`
          : `No incoming leads matching current filter criteria.`;
      }
      return;
    }
    if (noLeadsMsg) noLeadsMsg.classList.add('hidden');

    filtered.forEach(l => {
      const tr = document.createElement('tr');
      const dateStr = new Date(l.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

      tr.innerHTML = `
        <td>
          <span class="lead-status-pill status-${l.status}">${l.status}</span>
        </td>
        <td>
          <span class="lead-trade-tag">${l.tradeTitle || l.trade.toUpperCase()}</span>
          <div style="font-size: 0.6875rem; color: #64748b; margin-top: 2px;">${dateStr}</div>
        </td>
        <td>
          <strong>${escapeHtml(l.name)}</strong>
          <div style="font-size: 0.75rem; color: #94a3b8;">${escapeHtml(l.company || 'Private Commercial Project')}</div>
          <div style="font-size: 0.75rem; color: #38bdf8;">${escapeHtml(l.phone || '')}</div>
        </td>
        <td>
          <strong>${escapeHtml(l.zip)}</strong>
          <div style="font-size: 0.6875rem; color: #64748b;">In Service Radius</div>
        </td>
        <td>
          <div class="lead-spec-summary">${escapeHtml(l.specSummary)}</div>
        </td>
        <td>
          <div class="lead-budget">${escapeHtml(l.budgetEst || '$2,500+')}</div>
        </td>
        <td style="text-align: right;">
          <div class="table-actions">
            <a href="tel:${escapeHtml(l.phone)}" class="action-btn call-btn" title="Call customer directly">📞 Call</a>
            <button type="button" class="action-btn copy-btn" data-id="${l.id}" title="Copy specs to clipboard">📋</button>
            <button type="button" class="action-btn toggle-status-btn" data-id="${l.id}" title="Cycle status: New -> Contacted -> Won">Status</button>
          </div>
        </td>
      `;

      leadsTableBody.appendChild(tr);
    });

    // Attach row action listeners
    attachRowActions();
  }

  function attachRowActions() {
    // Copy Specs
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = leads.find(l => l.id === id);
        if (item) {
          const txt = `TradeSpec Pro Lead (${item.tradeTitle}):\nCustomer: ${item.name} (${item.phone})\nCompany: ${item.company}\nLocation: Zip ${item.zip}\nSpecs: ${item.specSummary}\nBudget: ${item.budgetEst}`;
          navigator.clipboard.writeText(txt).then(() => {
            const original = btn.textContent;
            btn.textContent = '✓ Copied';
            setTimeout(() => { btn.textContent = original; }, 1500);
          });
        }
      });
    });

    // Toggle Status
    document.querySelectorAll('.toggle-status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = leads.find(l => l.id === id);
        if (item) {
          if (item.status === 'new') item.status = 'contacted';
          else if (item.status === 'contacted') item.status = 'won';
          else item.status = 'new';

          localStorage.setItem('tradespec_leads', JSON.stringify(leads));
          renderDashboard();
        }
      });
    });
  }

  if (leadTradeFilter) leadTradeFilter.addEventListener('change', renderDashboard);
  if (leadStatusFilter) leadStatusFilter.addEventListener('change', renderDashboard);
  if (leadSearchInput) leadSearchInput.addEventListener('input', renderDashboard);

  // --- 10. CSV EXPORT ---
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const headers = ["Lead ID", "Date", "Trade", "Customer Name", "Company", "Phone", "Email", "Zip Code", "Specs Summary", "Budget Range", "Status"];
      const rows = leads.map(l => [
        l.id,
        new Date(l.timestamp).toLocaleDateString(),
        l.tradeTitle || l.trade,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.company || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        l.zip,
        `"${(l.specSummary || '').replace(/"/g, '""')}"`,
        `"${(l.budgetEst || '').replace(/"/g, '""')}"`,
        l.status
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `tradespec_contractor_leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // --- 11. SETTINGS DRAWER & CONFIGURATION FORM ---
  const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsForm = document.getElementById('settingsForm');
  const downloadSettingsJsonBtn = document.getElementById('downloadSettingsJsonBtn');
  const cfgSaveNotice = document.getElementById('cfgSaveNotice');

  const cfgCompany = document.getElementById('cfgCompany');
  const cfgPhone = document.getElementById('cfgPhone');
  const cfgEmail = document.getElementById('cfgEmail');
  const cfgBaseZip = document.getElementById('cfgBaseZip');
  const cfgRadius = document.getElementById('cfgRadius');
  const cfgMinJob = document.getElementById('cfgMinJob');

  const SETTINGS_SOURCE_INPUTS = {
    charge: 'cfgSourceCharge',
    permit: 'cfgSourcePermit',
    site: 'cfgSourceSite',
    cold: 'cfgSourceCold',
    crane: 'cfgSourceCrane',
    well: 'cfgSourceWell',
    racking: 'cfgSourceRacking',
    foam: 'cfgSourceFoam',
    grease: 'cfgSourceGrease'
  };

  function populateSettingsForm() {
    if (cfgCompany) cfgCompany.value = settings.companyName;
    if (cfgPhone) cfgPhone.value = settings.dispatchPhone;
    if (cfgEmail) cfgEmail.value = settings.dispatchEmail;
    if (cfgBaseZip) cfgBaseZip.value = settings.baseZip;
    if (cfgRadius) cfgRadius.value = settings.radius;
    if (cfgMinJob) cfgMinJob.value = settings.minJob;

    const activeList = Array.isArray(settings.activeSources) ? settings.activeSources : ALL_TRADE_KEYS;
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
      settings.companyName = cfgCompany ? cfgCompany.value : settings.companyName;
      settings.dispatchPhone = cfgPhone ? cfgPhone.value : settings.dispatchPhone;
      settings.dispatchEmail = cfgEmail ? cfgEmail.value : settings.dispatchEmail;
      settings.baseZip = cfgBaseZip ? cfgBaseZip.value : settings.baseZip;
      settings.radius = cfgRadius ? (parseInt(cfgRadius.value, 10) || 60) : 60;
      settings.minJob = cfgMinJob ? (parseInt(cfgMinJob.value, 10) || 2500) : 2500;

      // Collect active lead streams from settings checkboxes
      const selected = [];
      Object.keys(SETTINGS_SOURCE_INPUTS).forEach(tradeKey => {
        const inputEl = document.getElementById(SETTINGS_SOURCE_INPUTS[tradeKey]);
        if (inputEl && inputEl.checked) {
          selected.push(tradeKey);
        }
      });
      settings.activeSources = selected.length > 0 ? selected : [...ALL_TRADE_KEYS];

      localStorage.setItem('tradespec_partner_settings', JSON.stringify(settings));

      if (cfgSaveNotice) {
        cfgSaveNotice.classList.remove('hidden');
        setTimeout(() => { cfgSaveNotice.classList.add('hidden'); }, 2500);
      }
      renderDashboard();
    });
  }

  if (downloadSettingsJsonBtn) {
    downloadSettingsJsonBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
      const dl = document.createElement('a');
      dl.setAttribute("href", dataStr);
      dl.setAttribute("download", "tradespec_partner_settings.json");
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Check URL hash for direct portal access
  if (window.location.hash === '#portal' || window.location.hash === '#portal-section') {
    showPortal();
  }
});
