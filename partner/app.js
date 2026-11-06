/**
 * TradeSpec Pro™ Partner Network & Subcontractor Console
 * Client-Side Business Engine & Lead Dispatch System
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DEFAULT MOCK LEADS SEED (Pre-loaded if localStorage is empty) ---
  const DEFAULT_LEADS = [
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

  // Load Settings
  let settings = {
    companyName: "Apex Heavy Equipment & Industrial Services LLC",
    dispatchPhone: "(555) 849-2041",
    dispatchEmail: "dispatch@apexindustrial.com",
    baseZip: "77002",
    radius: 60,
    minJob: 2500,
    pin: "1234"
  };

  try {
    const storedCfg = localStorage.getItem('tradespec_partner_settings');
    if (storedCfg) {
      settings = Object.assign(settings, JSON.parse(storedCfg));
    }
  } catch(e) {}

  // --- 3. ROI CALCULATOR ENGINE ---
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

  const TRADE_DEFAULTS = {
    crane: { ticket: 3500, leadCost: 110 },
    well: { ticket: 16000, leadCost: 125 },
    racking: { ticket: 32000, leadCost: 150 },
    foam: { ticket: 9500, leadCost: 95 },
    grease: { ticket: 14000, leadCost: 110 }
  };

  function updateRoi() {
    if (!roiTrade) return;
    const t = TRADE_DEFAULTS[roiTrade.value] || TRADE_DEFAULTS.crane;
    const count = parseInt(roiLeads.value, 10);
    const closePct = parseInt(roiCloseRate.value, 10) / 100;

    roiLeadsVal.textContent = count;
    roiCloseRateVal.textContent = Math.round(closePct * 100);

    const wonJobs = Math.max(1, Math.round(count * closePct));
    const grossRev = wonJobs * t.ticket;
    const totalCost = count * t.leadCost;
    const net = grossRev - totalCost;
    const roi = (grossRev / totalCost).toFixed(1);

    roiProjectedRevenue.textContent = `$${grossRev.toLocaleString()}`;
    roiWonJobsText.textContent = `${wonJobs} Closed Commercial Contracts`;
    roiLeadCost.textContent = `$${totalCost.toLocaleString()}`;
    roiNetMargin.textContent = `$${net.toLocaleString()}`;
    roiFactor.textContent = `${roi}x ROI`;
  }

  if (roiTrade) {
    roiTrade.addEventListener('change', updateRoi);
    roiLeads.addEventListener('input', updateRoi);
    roiCloseRate.addEventListener('input', updateRoi);
    updateRoi();
  }

  // --- 4. PARTNER ONBOARDING APPLICATION FORM ---
  const appForm = document.getElementById('partnerApplicationForm');
  const appSuccessMsg = document.getElementById('appSuccessMsg');

  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const appData = {
        company: document.getElementById('appCompanyName').value,
        trade: document.getElementById('appTrade').value,
        zip: document.getElementById('appZip').value,
        contact: document.getElementById('appContact').value,
        phone: document.getElementById('appPhone').value,
        email: document.getElementById('appEmail').value,
        radius: document.getElementById('appRadius').value,
        timestamp: new Date().toISOString()
      };

      try {
        const apps = JSON.parse(localStorage.getItem('tradespec_partner_apps') || '[]');
        apps.unshift(appData);
        localStorage.setItem('tradespec_partner_apps', JSON.stringify(apps));
      } catch(err) {}

      appSuccessMsg.classList.remove('hidden');
      appForm.reset();
      setTimeout(() => {
        appSuccessMsg.classList.add('hidden');
      }, 6000);
    });
  }

  // --- 5. PRIVATE DASHBOARD AUTH & VIEW TOGGLING ---
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
    portalSection.classList.remove('hidden');
    portalSection.scrollIntoView({ behavior: 'smooth' });

    // Check if session is already authenticated
    if (sessionStorage.getItem('tradespec_auth') === 'true') {
      pinLockScreen.classList.add('hidden');
      authenticatedDash.classList.remove('hidden');
      renderDashboard();
    } else {
      pinLockScreen.classList.remove('hidden');
      authenticatedDash.classList.add('hidden');
      if (contractorPin) contractorPin.focus();
    }
  }

  function unlockPortal() {
    sessionStorage.setItem('tradespec_auth', 'true');
    pinLockScreen.classList.add('hidden');
    authenticatedDash.classList.remove('hidden');
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
      const entered = contractorPin.value.trim();
      if (entered === settings.pin || entered === "1234") {
        unlockPortal();
      } else {
        pinError.classList.remove('hidden');
        contractorPin.value = '';
        contractorPin.focus();
      }
    });
  }

  if (lockPortalBtn) {
    lockPortalBtn.addEventListener('click', () => {
      sessionStorage.removeItem('tradespec_auth');
      pinLockScreen.classList.remove('hidden');
      authenticatedDash.classList.add('hidden');
      if (contractorPin) contractorPin.value = '';
    });
  }

  // --- 6. LEADS TABLE RENDERING & FILTERING ---
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

    const filtered = leads.filter(item => {
      const matchTrade = (tradeFilter === 'all' || item.trade === tradeFilter);
      const matchStatus = (statusFilter === 'all' || item.status === statusFilter);
      const textToSearch = `${item.name} ${item.company} ${item.zip} ${item.specSummary}`.toLowerCase();
      const matchQuery = !query || textToSearch.includes(query);
      return matchTrade && matchStatus && matchQuery;
    });

    // Update KPIs
    if (kpiTotalLeads) kpiTotalLeads.textContent = leads.length;
    if (kpiNewLeads) kpiNewLeads.textContent = leads.filter(l => l.status === 'new').length;
    
    // Estimate pipeline: calculate approx sum
    let pipeSum = 0;
    leads.forEach(l => {
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
      if (noLeadsMsg) noLeadsMsg.classList.remove('hidden');
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
      btn.addEventListener('click', (e) => {
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

  // --- 7. CSV EXPORT ---
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

  // --- 8. SETTINGS DRAWER & CONFIGURATION FORM ---
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

  function populateSettingsForm() {
    if (cfgCompany) cfgCompany.value = settings.companyName;
    if (cfgPhone) cfgPhone.value = settings.dispatchPhone;
    if (cfgEmail) cfgEmail.value = settings.dispatchEmail;
    if (cfgBaseZip) cfgBaseZip.value = settings.baseZip;
    if (cfgRadius) cfgRadius.value = settings.radius;
    if (cfgMinJob) cfgMinJob.value = settings.minJob;
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
      settings.companyName = cfgCompany.value;
      settings.dispatchPhone = cfgPhone.value;
      settings.dispatchEmail = cfgEmail.value;
      settings.baseZip = cfgBaseZip.value;
      settings.radius = parseInt(cfgRadius.value, 10) || 60;
      settings.minJob = parseInt(cfgMinJob.value, 10) || 2500;

      localStorage.setItem('tradespec_partner_settings', JSON.stringify(settings));

      cfgSaveNotice.classList.remove('hidden');
      setTimeout(() => { cfgSaveNotice.classList.add('hidden'); }, 2000);
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
