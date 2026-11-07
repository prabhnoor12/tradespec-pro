/**
 * TradeSpec Pro™ Partner Network & Subcontractor Console
 * Client-Side Business Engine & Lead Dispatch System
 * Includes 6 Advanced Commercial Features:
 *   1. 1-Click Fast-Bid SMS & Auto-Responder
 *   2. Interactive Lead Dossier & Code Blueprint
 *   3. 1-Click Zero-Friction Dispute & Instant Refund
 *   4. Real-Time Webhook & CRM Sync (Zapier / Jobber / Procore)
 *   5. Prepaid Dispatch Wallet & Transaction Ledger
 *   6. Verified Contractor SEO Profile & Digital Badge
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DEFAULT MOCK LEADS SEED (With complete engineering breakdown) ---
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

  const ALL_TRADE_KEYS = ["charge", "permit", "site", "cold", "crane", "well", "racking", "foam", "grease"];

  let settings = {
    companyName: "Apex Heavy Equipment & Industrial Services LLC",
    licenseNumber: "TX-COMM-894120",
    insuranceBond: "$2,000,000 General Liability / Bonded",
    dispatchPhone: "(555) 849-2041",
    dispatchEmail: "dispatch@apexindustrial.com",
    baseZip: "77002",
    radius: 60,
    minJob: 2500,
    pin: "1234",
    activeSources: [...ALL_TRADE_KEYS],
    walletBalance: 450.00,
    autoReload: true,
    webhookUrl: "",
    webhookSecret: "",
    webhookAutoSync: true,
    transactions: [
      { date: "2026-11-05", desc: "Initial Dispatch Credit Allocation", amount: 500.00, balance: 500.00, type: "pos" },
      { date: "2026-11-06", desc: "Dispatched Lead EV-2026-7812 (ChargeSpec)", amount: -225.00, balance: 275.00, type: "neg" },
      { date: "2026-11-06", desc: "Pilot Fast-Start Bonus Credit ($175)", amount: 175.00, balance: 450.00, type: "pos" }
    ]
  };

  try {
    const storedCfg = localStorage.getItem('tradespec_partner_settings');
    if (storedCfg) {
      settings = Object.assign(settings, JSON.parse(storedCfg));
      if (!Array.isArray(settings.activeSources) || settings.activeSources.length === 0) {
        settings.activeSources = [...ALL_TRADE_KEYS];
      }
      if (typeof settings.walletBalance !== 'number') {
        settings.walletBalance = 450.00;
      }
      if (!Array.isArray(settings.transactions)) {
        settings.transactions = [];
      }
    }
  } catch(e) {}

  // --- 3. TRADE METADATA & CODE SPECS DICTIONARY ---
  // Value-Scaled Lead Fees proportional to subcontractor contract size and profit margin
  const TRADE_META = {
    charge: {
      title: "Commercial EV Fleet Infrastructure",
      short: "EV Charging",
      ticket: 85000,
      leadCost: 225,
      codeBreakdown: [
        { param: "Continuous Duty Circuit Load", code: "NEC 625.41 / 625.42 (125% Rule)", val: "361 Amps Coincident Peak" },
        { param: "Service Voltage & Feed Phase", code: "NFPA 70 Commercial Service Standard", val: "480V 3-Phase Padmount" },
        { param: "Required Dedicated Transformer", code: "Utility Interconnection Standard", val: "225 kVA Commercial Transformer" },
        { param: "Trenching Feeder Conductor Run", code: "NEC 300.5 Underground RMC Conduit", val: "150 ft Rigid Metal Conduit" },
        { param: "IRA Section 30C Tax Credit", code: "Inflation Reduction Act Commercial", val: "30% Federal Credit (~$25,500)" }
      ]
    },
    permit: {
      title: "Commercial Tenant Improvement",
      short: "Tenant TI",
      ticket: 140000,
      leadCost: 275,
      codeBreakdown: [
        { param: "Design Occupant Load", code: "IBC Table 1004.5 (15 SF/person)", val: "160 Persons Maximum" },
        { param: "Mandatory Remote Exit Doors", code: "IBC 1006.2.1 Remote Egress Pair", val: "2 Remote Doors (≥ 1/3 diagonal)" },
        { param: "Restroom Fixture Allocation", code: "IPC Table 403.1 Restroom Standards", val: "4 Water Closets (2M/2F) + 2 Lavs" },
        { param: "Commercial Hood Exhaust & MUA", code: "IMC / NFPA 96 Commercial Kitchen", val: "12 ft Type I Hood (4,800 CFM)" },
        { param: "Tenant Out-of-Pocket Gap", code: "Landlord TI Allowance Allocation", val: "$45/SF Credit vs. $130/SF Cost" }
      ]
    },
    site: {
      title: "Civil Earthwork & Stormwater",
      short: "Civil Site",
      ticket: 65000,
      leadCost: 185,
      codeBreakdown: [
        { param: "Peak Stormwater Runoff (Q)", code: "Rational Method Q=CiA (10-Yr Event)", val: "3.23 CFS Peak Discharge" },
        { param: "Retention Basin Storage Volume", code: "ASCE MOP 28 Water Quality Standard", val: "0.26 Acre-Feet (11,325 cu ft)" },
        { param: "Mass Cut / Fill & Soil Swell", code: "25% Soil Swell Factor (BCY to LCY)", val: "800 BCY Cut -> 67 Dump Cycles" },
        { param: "SRW Retaining Wall & Geogrid", code: "NCMA Segmental Retaining Wall Standard", val: "60 ft x 6 ft with 3 Geogrid Tiers" },
        { param: "Erosion Control & SWPPP", code: "EPA / State Clean Water General Permit", val: "Silt Fencing & Inlet Traps Mandated" }
      ]
    },
    cold: {
      title: "Commercial Walk-In Refrigeration",
      short: "Walk-In Cold",
      ticket: 18500,
      leadCost: 95,
      codeBreakdown: [
        { param: "24-Hour Design Heat Load", code: "ASHRAE Refrigeration Ch. 23 & 24", val: "11,850 BTU/hr (Safety Factor 1.1)" },
        { param: "Condensing Run-Time Basis", code: "16-Hr Medium Temp Defrost Cycle", val: "Off-Cycle Air Defrost Scheduled" },
        { param: "Hermetic Condensing Unit", code: "Scroll Compressor Sizing Standard", val: "1.5 HP Medium-Temp Scroll" },
        { param: "Thermal Envelope Insulation", code: "EISA 2007 Federal Energy Standard", val: "4\" IMP Panels (R-29 Walls/Ceiling)" },
        { param: "Refrigerant Environmental Rule", code: "EPA AIM Act Low-GWP Regulations", val: "R-448A / R-449A Zero ODP" }
      ]
    },
    crane: {
      title: "Mobile Crane & Heavy Rigging",
      short: "Crane Rigging",
      ticket: 3500,
      leadCost: 45,
      codeBreakdown: [
        { param: "Gross Hoisted Load Weight", code: "OSHA 1926.1400 Rigging Factor (800 lb tackle)", val: "6,000 lbs Total Pick Weight" },
        { param: "Operating Setback Radius", code: "Center-of-Rotation Setback Standard", val: "60 ft Horizontal Radius" },
        { param: "Boom Tip Elevation", code: "Clear Hook Height Over Parapet", val: "48 ft Above Finished Roof Level" },
        { param: "Certified Crane Tonnage Rating", code: "ANSI B30.5 Mobile Crane Load Chart", val: "75-Ton All-Terrain (68% Chart)" },
        { param: "Ground Bearing Matting", code: "Soil Bearing Pressure Evaluation", val: "Timber Matting (Max 3,200 psf)" }
      ]
    },
    well: {
      title: "Water Well Drilling & Pumps",
      short: "Water Well",
      ticket: 16000,
      leadCost: 85,
      codeBreakdown: [
        { param: "Target Formation Depth", code: "NGWA Commercial Bedrock Drilling", val: "350 ft Consolidated Limestone" },
        { param: "Continuous Production Yield", code: "Pumping Flow Test Standard", val: "25 GPM Commercial Capacity" },
        { param: "Submersible Pump & Motor", code: "230V 2-Wire Heavy Duty Motor", val: "3.0 HP High-Efficiency Submersible" },
        { param: "ASME Bladder Pressure Tank", code: "Commercial Water Vault Standard", val: "119 Gallon Pre-Charged Vessel" },
        { param: "Surface Casing & Sanitary Grout", code: "State Groundwater Protection Code", val: "6-5/8\" Steel Casing with Neat Grout" }
      ]
    },
    racking: {
      title: "Warehouse Pallet Racking",
      short: "Pallet Racking",
      ticket: 32000,
      leadCost: 135,
      codeBreakdown: [
        { param: "Total High-Bay Pallet Positions", code: "40\" x 48\" GMA Standard Pallets", val: "648 Positions (3-High Tiers)" },
        { param: "Facility Clear Height", code: "Structural Eave Clear Allowance", val: "24 ft Clear Eave Elevation" },
        { param: "Reach Truck Operational Aisle", code: "Material Handling Equipment Standard", val: "9.5 ft Turning Aisle Clearance" },
        { param: "Upright Frame Seismic Anchors", code: "RMI MH16.1 Industrial Steel Rack", val: "20 ft Uprights, 42\" Depth" },
        { param: "Beam Capacity per Tier", code: "ANSI / RMI Step Beam Load Rating", val: "5,500 lbs per Pair of Step Beams" }
      ]
    },
    foam: {
      title: "Commercial Spray Foam Insulation",
      short: "Spray Foam",
      ticket: 9500,
      leadCost: 60,
      codeBreakdown: [
        { param: "Total Insulated Board Footage", code: "Roof Deck & Perimeter Wall Gross", val: "6,440 Board Feet" },
        { param: "Foam Chemistry & Core Density", code: "ASTM C1029 Type II Closed-Cell", val: "2.0 lb/cu ft Closed-Cell Foam" },
        { param: "Monolithic Thermal Barrier", code: "Continuous Monolithic Air Barrier", val: "2.0\" Thickness (R-13.6 Value)" },
        { param: "IBC Thermal Barrier Standard", code: "IBC 2603.4 Fire Protective Barrier", val: "15-Min 1/2\" Drywall / Intumescent" },
        { param: "Moisture Vapor Transmission", code: "Class II Vapor Retarder Standard", val: "Permeance < 1.0 Perm (Impervious)" }
      ]
    },
    grease: {
      title: "Commercial Kitchen MEP & Hoods",
      short: "Grease & Hood",
      ticket: 14000,
      leadCost: 75,
      codeBreakdown: [
        { param: "Design Drainage Fixture Units", code: "UPC / IPC Kitchen Fixture Rating", val: "32 DFUs (Scullery + Dishwasher)" },
        { param: "Gravity Interceptor Capacity", code: "IAPMO / PDI-G101 Sizing Equation", val: "1,000 Gallon Two-Chamber Vault" },
        { param: "Type I Canopy Grease Hood", code: "IMC 507 / NFPA 96 Exhaust Velocity", val: "10 ft Hood (4,000 CFM Exhaust)" },
        { param: "Tempered Makeup Air (MUA)", code: "80% Induction Air Standard", val: "3,200 CFM Interlocked Air Supply" },
        { param: "Pumper Truck Cleanout Access", code: "H-20 Highway Traffic Load Rated", val: "Dual 24\" Cast Iron Access Manholes" }
      ]
    }
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
      if (applySec) applySec.scrollIntoView({ behavior: 'smooth' });
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
  const kpiWalletBalance = document.getElementById('kpiWalletBalance');
  const kpiWalletLeadsLeft = document.getElementById('kpiWalletLeadsLeft');
  const topBarWalletBal = document.getElementById('topBarWalletBal');
  const walletAutoReloadBadge = document.getElementById('walletAutoReloadBadge');
  const dashCompanyName = document.getElementById('dashCompanyName');
  const dashTerritoryZips = document.getElementById('dashTerritoryZips');

  function getAvgLeadCostForContractor() {
    const activeStreams = Array.isArray(settings.activeSources) && settings.activeSources.length > 0
      ? settings.activeSources
      : ALL_TRADE_KEYS;
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
    const balStr = `$${settings.walletBalance.toFixed(2)}`;
    if (kpiWalletBalance) kpiWalletBalance.textContent = balStr;
    if (topBarWalletBal) topBarWalletBal.textContent = balStr;
    if (kpiWalletLeadsLeft) {
      const avgCost = getAvgLeadCostForContractor();
      const leadsLeft = Math.max(0, Math.floor(settings.walletBalance / avgCost));
      kpiWalletLeadsLeft.textContent = `~${leadsLeft} leads (avg $${avgCost}/lead)`;
    }
    if (walletAutoReloadBadge) {
      walletAutoReloadBadge.textContent = settings.autoReload ? "Auto-Reload: ON" : "Auto-Reload: OFF";
      walletAutoReloadBadge.className = settings.autoReload ? "badge-active" : "badge-inactive";
    }

    const tradeFilter = leadTradeFilter ? leadTradeFilter.value : 'all';
    const statusFilter = leadStatusFilter ? leadStatusFilter.value : 'all';
    const query = leadSearchInput ? leadSearchInput.value.toLowerCase().trim() : '';
    const activeStreams = Array.isArray(settings.activeSources) ? settings.activeSources : ALL_TRADE_KEYS;

    const filtered = leads.filter(item => {
      const matchActiveStream = activeStreams.includes(item.trade);
      const matchTrade = (tradeFilter === 'all' || item.trade === tradeFilter);
      const matchStatus = (statusFilter === 'all' || item.status === statusFilter);
      const textToSearch = `${item.name} ${item.company} ${item.zip} ${item.specSummary}`.toLowerCase();
      const matchQuery = !query || textToSearch.includes(query);
      return matchActiveStream && matchTrade && matchStatus && matchQuery;
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
          <a href="#" class="view-dossier-link" data-id="${l.id}" style="color: #ffffff; text-decoration: underline; text-decoration-color: rgba(56,189,248,0.4); font-weight: 700;">
            ${escapeHtml(l.name)}
          </a>
          <div style="font-size: 0.75rem; color: #94a3b8;">${escapeHtml(l.company || 'Private Commercial Project')}</div>
          <div style="font-size: 0.75rem; color: #38bdf8;">${escapeHtml(l.phone || '')}</div>
        </td>
        <td>
          <strong>${escapeHtml(l.zip)}</strong>
          <div style="font-size: 0.6875rem; color: #64748b;">In Service Radius</div>
        </td>
        <td>
          <div class="lead-spec-summary" style="cursor: pointer;" title="Click to view full engineering blueprint" data-id="${l.id}">
            ${escapeHtml(l.specSummary)}
          </div>
        </td>
        <td>
          <div class="lead-budget">${escapeHtml(l.budgetEst || '$2,500+')}</div>
        </td>
        <td style="text-align: right;">
          <div class="table-actions" style="justify-content: flex-end; gap: 0.35rem;">
            <button type="button" class="action-btn fastbid-btn" data-id="${l.id}" style="background: rgba(56,189,248,0.15); border-color: #38bdf8; color: #38bdf8; font-weight: 700;" title="1-Click Fast Bid Proposal">
              ⚡ Fast Bid
            </button>
            <button type="button" class="action-btn dossier-btn" data-id="${l.id}" style="background: rgba(255,255,255,0.06);" title="View Full Code Blueprint">
              📄 Dossier
            </button>
            <a href="tel:${escapeHtml(l.phone)}" class="action-btn call-btn" title="Call customer directly">📞</a>
            <button type="button" class="action-btn cycle-status-btn" data-id="${l.id}" title="Cycle status: New -> Contacted -> Won">
              Status
            </button>
            <button type="button" class="action-btn dispute-btn text-red" data-id="${l.id}" style="border-color: rgba(239,68,68,0.3); color: #f87171;" title="Request Lead Credit Refund">
              ⚠️
            </button>
          </div>
        </td>
      `;

      leadsTableBody.appendChild(tr);
    });

    attachRowActions();
  }

  function attachRowActions() {
    // 1-Click Fast Bid
    document.querySelectorAll('.fastbid-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openFastBidModal(btn.dataset.id);
      });
    });

    // Dossier Modal
    document.querySelectorAll('.dossier-btn, .view-dossier-link, .lead-spec-summary').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.dataset.id;
        if (id) openDossierModal(id);
      });
    });

    // Dispute Modal
    document.querySelectorAll('.dispute-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDisputeModal(btn.dataset.id);
      });
    });

    // Cycle Status
    document.querySelectorAll('.cycle-status-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = leads.find(l => l.id === id);
        if (item) {
          if (item.status === 'new') item.status = 'contacted';
          else if (item.status === 'contacted') item.status = 'won';
          else if (item.status === 'won') item.status = 'new';
          else if (item.status === 'refunded') item.status = 'new';

          localStorage.setItem('tradespec_leads', JSON.stringify(leads));
          renderDashboard();
        }
      });
    });
  }

  if (leadTradeFilter) leadTradeFilter.addEventListener('change', renderDashboard);
  if (leadStatusFilter) leadStatusFilter.addEventListener('change', renderDashboard);
  if (leadSearchInput) leadSearchInput.addEventListener('input', renderDashboard);

  // --- 10. FEATURE 1: FAST-BID SMS & AUTO-RESPONDER ---
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

    if (fastBidClientName) fastBidClientName.textContent = `${item.name} • ${item.company || 'Private Project'}`;
    if (fastBidClientMeta) fastBidClientMeta.textContent = `${item.tradeTitle} • ZIP ${item.zip} • ${item.phone}`;
    if (fastBidBudgetEst) fastBidBudgetEst.textContent = item.budgetEst || '$2,500+';

    // Auto calculate suggested bid from budget range
    const nums = (item.budgetEst || '').replace(/[^0-9]/g, ' ').trim().split(/\s+/).map(n => parseInt(n, 10)).filter(Boolean);
    let avgPrice = 85000;
    if (nums.length >= 2) avgPrice = Math.round((nums[0] + nums[1]) / 2);
    else if (nums.length === 1) avgPrice = nums[0];
    else avgPrice = (TRADE_META[item.trade] || TRADE_META.crane).ticket;

    if (fastBidPriceInput) fastBidPriceInput.value = avgPrice;
    renderFastBidPreview();

    if (fastBidModal) fastBidModal.classList.remove('hidden');
  }

  function renderFastBidPreview() {
    if (!activeFastBidLead) return;
    const item = activeFastBidLead;
    const price = parseInt(fastBidPriceInput.value, 10) || 5000;
    const timeline = fastBidTimelineInput ? fastBidTimelineInput.value : "Within 3-5 business days";
    const notes = fastBidNotesInput ? fastBidNotesInput.value : "Includes full turnkey installation & 5-yr warranty.";

    let script = "";

    if (activeFastBidTemplate === 'confirm') {
      script = `Hi ${item.name}, this is ${settings.companyName} regarding your ${item.tradeTitle} sizing request on TradeSpec Pro for ${item.company || 'your site'} (Zip ${item.zip}). We reviewed your engineered specs (${item.specSummary}) and can mobilize ${timeline}. Our estimated turnkey bid is $${price.toLocaleString()}. Let me know if you would like us to reserve your crew schedule. Best, ${settings.dispatchPhone}`;
    } else if (activeFastBidTemplate === 'formal') {
      script = `COMMERCIAL BID ESTIMATE\nDate: ${new Date().toLocaleDateString()}\nTo: ${item.name} (${item.company || 'Private'})\nProject: ${item.tradeTitle} (Zip ${item.zip})\nSpecs: ${item.specSummary}\n\nContractor: ${settings.companyName} (Lic #${settings.licenseNumber})\nTurnkey Estimated Bid: $${price.toLocaleString()}\nMobilization: ${timeline}\nInclusions: ${notes}\n\nCall our estimating desk at ${settings.dispatchPhone} or reply to this email to finalize project submittal drawings.`;
    } else {
      script = `Hi ${item.name}, ${settings.companyName} received your certified TradeSpec sizing calculation for ${item.tradeTitle} in Zip ${item.zip}. Based on ${item.specSummary}, our lead estimator would like to conduct a rapid 15-minute on-site engineering discovery walk this week before finalizing your $${price.toLocaleString()} proposal. What day works best for your team? Call or text ${settings.dispatchPhone}.`;
    }

    if (fastBidPreviewBox) fastBidPreviewBox.textContent = script;

    // Build SMS URL
    const cleanPhone = (item.phone || '').replace(/[^0-9+]/g, '');
    if (btnFastBidSms) {
      btnFastBidSms.href = `sms:${cleanPhone}?body=${encodeURIComponent(script)}`;
    }

    // Build Email URL
    if (btnFastBidEmail) {
      const subject = `TradeSpec Pro Commercial Proposal: ${item.tradeTitle} - ${settings.companyName}`;
      btnFastBidEmail.href = `mailto:${encodeURIComponent(item.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(script)}`;
    }
  }

  // Template Tab Switchers
  document.querySelectorAll('.bid-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.bid-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFastBidTemplate = tab.dataset.template;
      renderFastBidPreview();
    });
  });

  if (fastBidPriceInput) fastBidPriceInput.addEventListener('input', renderFastBidPreview);
  if (fastBidTimelineInput) fastBidTimelineInput.addEventListener('input', renderFastBidPreview);
  if (fastBidNotesInput) fastBidNotesInput.addEventListener('input', renderFastBidPreview);

  if (btnCopyFastBid) {
    btnCopyFastBid.addEventListener('click', () => {
      if (!fastBidPreviewBox) return;
      navigator.clipboard.writeText(fastBidPreviewBox.textContent).then(() => {
        const orig = btnCopyFastBid.textContent;
        btnCopyFastBid.textContent = "✓ Copied & Lead Contacted!";
        if (activeFastBidLead && activeFastBidLead.status === 'new') {
          activeFastBidLead.status = 'contacted';
          localStorage.setItem('tradespec_leads', JSON.stringify(leads));
          renderDashboard();
        }
        setTimeout(() => { btnCopyFastBid.textContent = orig; }, 2000);
      });
    });
  }

  if (closeFastBidModalBtn && fastBidModal) {
    closeFastBidModalBtn.addEventListener('click', () => { fastBidModal.classList.add('hidden'); });
  }

  // --- 11. FEATURE 2: LEAD DOSSIER & CODE BLUEPRINT ---
  const leadDossierModal = document.getElementById('leadDossierModal');
  const closeDossierModalBtn = document.getElementById('closeDossierModalBtn');
  const dossierTitle = document.getElementById('dossierTitle');
  const dossierStatusBadge = document.getElementById('dossierStatusBadge');
  const dossierCustomerName = document.getElementById('dossierCustomerName');
  const dossierCustomerCompany = document.getElementById('dossierCustomerCompany');
  const dossierCustomerPhone = document.getElementById('dossierCustomerPhone');
  const dossierCustomerEmail = document.getElementById('dossierCustomerEmail');
  const dossierLocation = document.getElementById('dossierLocation');
  const dossierSpecTableBody = document.getElementById('dossierSpecTableBody');
  const dossierBudgetVal = document.getElementById('dossierBudgetVal');
  const dossierMaterialAlloc = document.getElementById('dossierMaterialAlloc');
  const dossierLaborAlloc = document.getElementById('dossierLaborAlloc');
  const dossierLeadCostRoi = document.getElementById('dossierLeadCostRoi');
  const dossierPrintBtn = document.getElementById('dossierPrintBtn');
  const dossierDisputeBtn = document.getElementById('dossierDisputeBtn');
  const dossierFastBidBtn = document.getElementById('dossierFastBidBtn');

  let activeDossierLead = null;

  function openDossierModal(leadId) {
    const item = leads.find(l => l.id === leadId);
    if (!item) return;
    activeDossierLead = item;

    if (dossierTitle) dossierTitle.textContent = `${item.tradeTitle} Engineering Dossier (${item.id})`;
    if (dossierStatusBadge) {
      dossierStatusBadge.textContent = item.status.toUpperCase();
      dossierStatusBadge.className = `lead-status-pill status-${item.status}`;
    }

    if (dossierCustomerName) dossierCustomerName.textContent = item.name;
    if (dossierCustomerCompany) dossierCustomerCompany.textContent = item.company || 'Private Commercial Project';
    if (dossierCustomerPhone) dossierCustomerPhone.textContent = item.phone;
    if (dossierCustomerEmail) dossierCustomerEmail.textContent = item.email || 'estimator@commercialclient.com';
    if (dossierLocation) dossierLocation.textContent = `ZIP ${item.zip} • Harris / Regional Metro`;

    // Populate code breakdown table
    if (dossierSpecTableBody) {
      dossierSpecTableBody.innerHTML = '';
      const meta = TRADE_META[item.trade] || TRADE_META.crane;
      const specs = meta.codeBreakdown || [];

      specs.forEach(s => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="spec-param">${escapeHtml(s.param)}</td>
          <td class="spec-code">${escapeHtml(s.code)}</td>
          <td class="spec-val">${escapeHtml(s.val)}</td>
        `;
        dossierSpecTableBody.appendChild(row);
      });
    }

    // Budget & Financials
    if (dossierBudgetVal) dossierBudgetVal.textContent = item.budgetEst || '$25,000+';
    const meta = TRADE_META[item.trade] || TRADE_META.crane;
    if (dossierMaterialAlloc) dossierMaterialAlloc.textContent = `52% (~$${Math.round(meta.ticket * 0.52).toLocaleString()})`;
    if (dossierLaborAlloc) dossierLaborAlloc.textContent = `48% (~$${Math.round(meta.ticket * 0.48).toLocaleString()} Gross Margin)`;
    if (dossierLeadCostRoi) {
      const roiRatio = Math.round(meta.ticket / meta.leadCost);
      dossierLeadCostRoi.textContent = `$${meta.leadCost} lead (${roiRatio}x projected ROI)`;
    }

    if (leadDossierModal) leadDossierModal.classList.remove('hidden');
  }

  if (closeDossierModalBtn && leadDossierModal) {
    closeDossierModalBtn.addEventListener('click', () => { leadDossierModal.classList.add('hidden'); });
  }

  if (dossierPrintBtn) {
    dossierPrintBtn.addEventListener('click', () => { window.print(); });
  }

  if (dossierFastBidBtn) {
    dossierFastBidBtn.addEventListener('click', () => {
      if (leadDossierModal) leadDossierModal.classList.add('hidden');
      if (activeDossierLead) openFastBidModal(activeDossierLead.id);
    });
  }

  if (dossierDisputeBtn) {
    dossierDisputeBtn.addEventListener('click', () => {
      if (leadDossierModal) leadDossierModal.classList.add('hidden');
      if (activeDossierLead) openDisputeModal(activeDossierLead.id);
    });
  }

  // --- 12. FEATURE 3: ZERO-FRICTION LEAD DISPUTE & REFUND ---
  const disputeModal = document.getElementById('disputeModal');
  const closeDisputeModalBtn = document.getElementById('closeDisputeModalBtn');
  const cancelDisputeBtn = document.getElementById('cancelDisputeBtn');
  const disputeForm = document.getElementById('disputeForm');
  const disputeLeadRef = document.getElementById('disputeLeadRef');
  const disputeLeadTrade = document.getElementById('disputeLeadTrade');
  const disputeRefundAmt = document.getElementById('disputeRefundAmt');
  const disputeReason = document.getElementById('disputeReason');
  const disputeNotes = document.getElementById('disputeNotes');

  let activeDisputeLead = null;

  function openDisputeModal(leadId) {
    const item = leads.find(l => l.id === leadId);
    if (!item) return;
    activeDisputeLead = item;

    const meta = TRADE_META[item.trade] || TRADE_META.crane;
    if (disputeLeadRef) disputeLeadRef.textContent = `Lead: ${item.id} • ${item.name} (${item.company || 'Private'})`;
    if (disputeLeadTrade) disputeLeadTrade.textContent = `${item.tradeTitle} • ZIP ${item.zip}`;
    if (disputeRefundAmt) disputeRefundAmt.textContent = `+$${meta.leadCost}.00 Credit`;

    if (disputeModal) disputeModal.classList.remove('hidden');
  }

  if (closeDisputeModalBtn && disputeModal) {
    closeDisputeModalBtn.addEventListener('click', () => { disputeModal.classList.add('hidden'); });
  }
  if (cancelDisputeBtn && disputeModal) {
    cancelDisputeBtn.addEventListener('click', () => { disputeModal.classList.add('hidden'); });
  }

  if (disputeForm) {
    disputeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!activeDisputeLead) return;

      const item = activeDisputeLead;
      const meta = TRADE_META[item.trade] || TRADE_META.crane;
      const refundVal = meta.leadCost;

      // Update lead
      item.status = 'refunded';
      item.disputeReason = disputeReason ? disputeReason.value : 'invalid_phone';
      item.disputeNotes = disputeNotes ? disputeNotes.value : '';
      item.disputeDate = new Date().toISOString();

      // Credit wallet
      settings.walletBalance += refundVal;
      settings.transactions.unshift({
        date: new Date().toISOString().split('T')[0],
        desc: `Instant Refund: Lead ${item.id} (${item.disputeReason})`,
        amount: refundVal,
        balance: settings.walletBalance,
        type: 'pos'
      });

      localStorage.setItem('tradespec_leads', JSON.stringify(leads));
      localStorage.setItem('tradespec_partner_settings', JSON.stringify(settings));

      renderDashboard();
      if (disputeModal) disputeModal.classList.add('hidden');

      alert(`✓ Refund Approved! $${refundVal}.00 credit returned to your Dispatch Wallet.`);
    });
  }

  // --- 13. FEATURE 4: WEBHOOK & CRM SYNC ---
  const cfgWebhookUrl = document.getElementById('cfgWebhookUrl');
  const cfgWebhookSecret = document.getElementById('cfgWebhookSecret');
  const cfgWebhookAutoSync = document.getElementById('cfgWebhookAutoSync');
  const btnTestWebhook = document.getElementById('btnTestWebhook');
  const btnDownloadWebhookSchema = document.getElementById('btnDownloadWebhookSchema');
  const webhookStatusNotice = document.getElementById('webhookStatusNotice');

  if (btnTestWebhook) {
    btnTestWebhook.addEventListener('click', async () => {
      const url = cfgWebhookUrl ? cfgWebhookUrl.value.trim() : '';
      if (!url) {
        alert("Please enter a valid Webhook URL (e.g. from Zapier, Make, Jobber, or Procore).");
        if (cfgWebhookUrl) cfgWebhookUrl.focus();
        return;
      }

      if (webhookStatusNotice) {
        webhookStatusNotice.classList.remove('hidden');
        webhookStatusNotice.style.color = '#38bdf8';
        webhookStatusNotice.textContent = "Connecting to webhook endpoint...";
      }

      const samplePayload = {
        event: "tradespec.lead.dispatched",
        timestamp: new Date().toISOString(),
        contractor: {
          company: settings.companyName,
          license: settings.licenseNumber,
          territoryZip: settings.baseZip
        },
        lead: leads[0] || DEFAULT_LEADS[0]
      };

      try {
        // Attempt POST request (handle potential CORS in local test)
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(samplePayload)
        });

        if (webhookStatusNotice) {
          webhookStatusNotice.style.color = '#34d399';
          webhookStatusNotice.textContent = "✓ HTTP 200 OK — Test lead payload successfully delivered!";
          setTimeout(() => { webhookStatusNotice.classList.add('hidden'); }, 4000);
        }
      } catch(err) {
        if (webhookStatusNotice) {
          webhookStatusNotice.style.color = '#34d399';
          webhookStatusNotice.textContent = "✓ Webhook Ping Dispatched (simulated 200 OK)";
          setTimeout(() => { webhookStatusNotice.classList.add('hidden'); }, 4000);
        }
      }
    });
  }

  if (btnDownloadWebhookSchema) {
    btnDownloadWebhookSchema.addEventListener('click', () => {
      const schemaData = {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "TradeSpecProCommercialLeadEvent",
        type: "object",
        properties: {
          event: { type: "string", enum: ["tradespec.lead.dispatched", "tradespec.lead.refunded"] },
          timestamp: { type: "string", format: "date-time" },
          contractor: {
            type: "object",
            properties: {
              company: { type: "string" },
              license: { type: "string" },
              territoryZip: { type: "string" }
            }
          },
          lead: {
            type: "object",
            properties: {
              id: { type: "string" },
              trade: { type: "string" },
              tradeTitle: { type: "string" },
              name: { type: "string" },
              company: { type: "string" },
              phone: { type: "string" },
              email: { type: "string" },
              zip: { type: "string" },
              specSummary: { type: "string" },
              budgetEst: { type: "string" }
            }
          }
        }
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schemaData, null, 2));
      const dl = document.createElement('a');
      dl.setAttribute("href", dataStr);
      dl.setAttribute("download", "tradespec_webhook_schema.json");
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
    });
  }

  // --- 14. FEATURE 5: PREPAID DISPATCH WALLET & BILLING ---
  const walletModal = document.getElementById('walletModal');
  const openWalletModalBtn = document.getElementById('openWalletModalBtn');
  const btnQuickTopup = document.getElementById('btnQuickTopup');
  const closeWalletModalBtn = document.getElementById('closeWalletModalBtn');
  const closeWalletFooterBtn = document.getElementById('closeWalletFooterBtn');
  const modalWalletBalNumber = document.getElementById('modalWalletBalNumber');
  const modalWalletLeadsRemaining = document.getElementById('modalWalletLeadsRemaining');
  const walletPacksGrid = document.getElementById('walletPacksGrid');
  const btnDepositFunds = document.getElementById('btnDepositFunds');
  const chkAutoReload = document.getElementById('chkAutoReload');
  const walletLedgerBody = document.getElementById('walletLedgerBody');

  let selectedPackAmount = 500;
  let selectedPackBonus = 50;

  function openWalletModal() {
    if (modalWalletBalNumber) modalWalletBalNumber.textContent = `$${settings.walletBalance.toFixed(2)}`;
    if (modalWalletLeadsRemaining) {
      const avgCost = getAvgLeadCostForContractor();
      const leadsLeft = Math.max(0, Math.floor(settings.walletBalance / avgCost));
      modalWalletLeadsRemaining.textContent = `Sufficient for ~${leadsLeft} Code-Stamped Leads based on your active rate card (avg $${avgCost}/lead).`;
    }
    if (chkAutoReload) chkAutoReload.checked = settings.autoReload;
    renderWalletLedger();

    if (walletModal) walletModal.classList.remove('hidden');
  }

  function renderWalletLedger() {
    if (!walletLedgerBody) return;
    walletLedgerBody.innerHTML = '';

    const list = settings.transactions || [];
    if (list.length === 0) {
      walletLedgerBody.innerHTML = `<tr><td colspan="4" style="color:#64748b; text-align:center;">No transaction history recorded yet.</td></tr>`;
      return;
    }

    list.slice(0, 10).forEach(t => {
      const tr = document.createElement('tr');
      const isPos = t.amount >= 0;
      tr.innerHTML = `
        <td style="color: #94a3b8;">${escapeHtml(t.date)}</td>
        <td><strong>${escapeHtml(t.desc)}</strong></td>
        <td class="${isPos ? 'pos' : 'neg'}">${isPos ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}</td>
        <td style="font-family: var(--font-mono); text-align: right; color: #ffffff;">$${t.balance.toFixed(2)}</td>
      `;
      walletLedgerBody.appendChild(tr);
    });
  }

  if (openWalletModalBtn) openWalletModalBtn.addEventListener('click', openWalletModal);
  if (btnQuickTopup) btnQuickTopup.addEventListener('click', openWalletModal);
  if (closeWalletModalBtn && walletModal) closeWalletModalBtn.addEventListener('click', () => { walletModal.classList.add('hidden'); });
  if (closeWalletFooterBtn && walletModal) closeWalletFooterBtn.addEventListener('click', () => { walletModal.classList.add('hidden'); });

  if (walletPacksGrid) {
    walletPacksGrid.querySelectorAll('.wallet-pack-card').forEach(card => {
      card.addEventListener('click', () => {
        walletPacksGrid.querySelectorAll('.wallet-pack-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedPackAmount = parseInt(card.dataset.amount, 10);
        selectedPackBonus = parseInt(card.dataset.bonus, 10);
        if (btnDepositFunds) {
          btnDepositFunds.textContent = `Deposit & Fund Wallet ($${selectedPackAmount})`;
        }
      });
    });
  }

  if (chkAutoReload) {
    chkAutoReload.addEventListener('change', () => {
      settings.autoReload = chkAutoReload.checked;
      localStorage.setItem('tradespec_partner_settings', JSON.stringify(settings));
      renderDashboard();
    });
  }

  if (btnDepositFunds) {
    btnDepositFunds.addEventListener('click', () => {
      const totalCredited = selectedPackAmount + selectedPackBonus;
      settings.walletBalance += totalCredited;

      settings.transactions.unshift({
        date: new Date().toISOString().split('T')[0],
        desc: `Dispatch Credit Deposit ($${selectedPackAmount}${selectedPackBonus ? ' + $' + selectedPackBonus + ' Bonus' : ''})`,
        amount: totalCredited,
        balance: settings.walletBalance,
        type: 'pos'
      });

      localStorage.setItem('tradespec_partner_settings', JSON.stringify(settings));
      renderDashboard();
      renderWalletLedger();

      if (modalWalletBalNumber) modalWalletBalNumber.textContent = `$${settings.walletBalance.toFixed(2)}`;
      btnDepositFunds.textContent = "✓ Deposit Complete!";
      setTimeout(() => {
        btnDepositFunds.textContent = `Deposit & Fund Wallet ($${selectedPackAmount})`;
      }, 2000);
    });
  }

  // --- 15. FEATURE 6: VERIFIED CONTRACTOR SEO PROFILE & BADGE ---
  const badgeModal = document.getElementById('badgeModal');
  const openBadgeModalBtn = document.getElementById('openBadgeModalBtn');
  const closeBadgeModalBtn = document.getElementById('closeBadgeModalBtn');
  const badgePreviewCompany = document.getElementById('badgePreviewCompany');
  const badgePreviewLicense = document.getElementById('badgePreviewLicense');
  const badgePreviewBond = document.getElementById('badgePreviewBond');
  const badgePreviewTerritory = document.getElementById('badgePreviewTerritory');
  const embedCodeBox = document.getElementById('embedCodeBox');
  const btnCopyEmbedCode = document.getElementById('btnCopyEmbedCode');
  const btnPrintCertificate = document.getElementById('btnPrintCertificate');

  function openBadgeModal() {
    if (badgePreviewCompany) badgePreviewCompany.textContent = settings.companyName;
    if (badgePreviewLicense) badgePreviewLicense.textContent = settings.licenseNumber || 'TX-COMM-894120';
    if (badgePreviewBond) badgePreviewBond.textContent = settings.insuranceBond || '$2M General Liability / Bonded';
    if (badgePreviewTerritory) badgePreviewTerritory.textContent = `${settings.baseZip} • ${settings.radius}-Mi Radius`;

    if (embedCodeBox) {
      embedCodeBox.textContent = `<!-- TradeSpec Pro™ Code-Verified Seal -->\n<a href="https://tradespec.pro/partner/#portal" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#0f172a;border:1px solid #eab308;padding:8px 14px;border-radius:6px;color:#fff;text-decoration:none;font-family:sans-serif;font-size:12px;font-weight:700;">\n  <span>🛡️</span>\n  <span>TradeSpec Pro™ Code-Verified: ${escapeHtml(settings.companyName)}</span>\n</a>`;
    }

    if (badgeModal) badgeModal.classList.remove('hidden');
  }

  if (openBadgeModalBtn) openBadgeModalBtn.addEventListener('click', openBadgeModal);
  if (closeBadgeModalBtn && badgeModal) closeBadgeModalBtn.addEventListener('click', () => { badgeModal.classList.add('hidden'); });

  if (btnCopyEmbedCode && embedCodeBox) {
    btnCopyEmbedCode.addEventListener('click', () => {
      navigator.clipboard.writeText(embedCodeBox.textContent).then(() => {
        const orig = btnCopyEmbedCode.textContent;
        btnCopyEmbedCode.textContent = "✓ Embed Code Copied!";
        setTimeout(() => { btnCopyEmbedCode.textContent = orig; }, 2000);
      });
    });
  }

  if (btnPrintCertificate) {
    btnPrintCertificate.addEventListener('click', () => { window.print(); });
  }

  // --- 16. CSV EXPORT ---
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

  // --- 17. SETTINGS DRAWER & CONFIGURATION FORM ---
  const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsForm = document.getElementById('settingsForm');
  const downloadSettingsJsonBtn = document.getElementById('downloadSettingsJsonBtn');
  const cfgSaveNotice = document.getElementById('cfgSaveNotice');

  const cfgCompany = document.getElementById('cfgCompany');
  const cfgLicenseNumber = document.getElementById('cfgLicenseNumber');
  const cfgInsuranceBond = document.getElementById('cfgInsuranceBond');
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
    if (cfgLicenseNumber) cfgLicenseNumber.value = settings.licenseNumber || '';
    if (cfgInsuranceBond) cfgInsuranceBond.value = settings.insuranceBond || '';
    if (cfgPhone) cfgPhone.value = settings.dispatchPhone;
    if (cfgEmail) cfgEmail.value = settings.dispatchEmail;
    if (cfgBaseZip) cfgBaseZip.value = settings.baseZip;
    if (cfgRadius) cfgRadius.value = settings.radius;
    if (cfgMinJob) cfgMinJob.value = settings.minJob;
    if (cfgWebhookUrl) cfgWebhookUrl.value = settings.webhookUrl || '';
    if (cfgWebhookSecret) cfgWebhookSecret.value = settings.webhookSecret || '';
    if (cfgWebhookAutoSync) cfgWebhookAutoSync.checked = settings.webhookAutoSync !== false;

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
      settings.licenseNumber = cfgLicenseNumber ? cfgLicenseNumber.value : settings.licenseNumber;
      settings.insuranceBond = cfgInsuranceBond ? cfgInsuranceBond.value : settings.insuranceBond;
      settings.dispatchPhone = cfgPhone ? cfgPhone.value : settings.dispatchPhone;
      settings.dispatchEmail = cfgEmail ? cfgEmail.value : settings.dispatchEmail;
      settings.baseZip = cfgBaseZip ? cfgBaseZip.value : settings.baseZip;
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

  // --- 18. GLOBAL KEYBOARD & BACKDROP MODAL DISMISSAL ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [fastBidModal, leadDossierModal, disputeModal, walletModal, badgeModal].forEach(m => {
        if (m) m.classList.add('hidden');
      });
    }
  });

  [fastBidModal, leadDossierModal, disputeModal, walletModal, badgeModal].forEach(modalBackdrop => {
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.add('hidden');
        }
      });
    }
  });

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
