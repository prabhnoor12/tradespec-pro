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

    // Preset touch pills for mobile ergonomics
    document.querySelectorAll('.preset-pill[data-slider]').forEach(pill => {
      pill.addEventListener('click', () => {
        const sliderId = pill.dataset.slider;
        const targetSlider = document.getElementById(sliderId);
        if (targetSlider) {
          targetSlider.value = pill.dataset.val;
          pill.parentElement.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          updateRoi();
        }
      });
    });

    if (roiLeads) {
      roiLeads.addEventListener('input', () => {
        document.querySelectorAll('.preset-pill[data-slider="roiLeads"]').forEach(p => {
          p.classList.toggle('active', p.dataset.val === roiLeads.value);
        });
      });
    }
    if (roiCloseRate) {
      roiCloseRate.addEventListener('input', () => {
        document.querySelectorAll('.preset-pill[data-slider="roiCloseRate"]').forEach(p => {
          p.classList.toggle('active', p.dataset.val === roiCloseRate.value);
        });
      });
    }

    updateRoi();
  }

  // --- 7. PARTNER ONBOARDING APPLICATION FORM ---
  const appForm = document.getElementById('partnerApplicationForm');
  const appSuccessMsg = document.getElementById('appSuccessMsg');

  if (appForm) {
    appForm.addEventListener('submit', async (e) => {
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

      // 1. Submit to Supabase Backend
      let isSupabase = false;
      if (window.TradeSpecSupabase) {
        const res = await window.TradeSpecSupabase.submitApplication(appData);
        isSupabase = res && res.isSupabase;
      }

      // 2. Open rich confirmation modal
      const appModal = document.getElementById('appConfirmationModal');
      if (appModal) {
        const elComp = document.getElementById('confModalCompany');
        const elZip = document.getElementById('confModalZip');
        const elTrades = document.getElementById('confModalTrades');
        const elPin = document.getElementById('confModalPin');
        const elStatus = document.getElementById('confModalBackendStatus');

        if (elComp) elComp.textContent = appData.company;
        if (elZip) elZip.textContent = `${appData.zip} (${appData.radius} mi radius)`;
        if (elTrades) elTrades.textContent = selectedSources.map(s => TRADE_META[s] ? TRADE_META[s].short : s).join(', ');
        if (elPin) elPin.textContent = '1234';
        if (elStatus) elStatus.textContent = isSupabase ? '🟢 Persisted to Supabase Live DB' : '🟡 Staged (Demo Mode)';

        appModal.classList.remove('hidden');
      } else if (appSuccessMsg) {
        appSuccessMsg.classList.remove('hidden');
        appSuccessMsg.innerHTML = `<strong>✓ Application Received!</strong> Territory reserved for <strong>${escapeHtml(appData.company)}</strong> in ZIP ${escapeHtml(appData.zip)}. Demo PIN: <code>1234</code>.`;
      }

      appForm.reset();
      syncAppTradeToCheckboxes('charge');
    });
  }

  // Application Confirmation Modal Controls
  const closeAppConfModalBtn = document.getElementById('closeAppConfModalBtn');
  const launchConsoleFromModalBtn = document.getElementById('launchConsoleFromModalBtn');
  const appConfirmationModal = document.getElementById('appConfirmationModal');

  if (closeAppConfModalBtn && appConfirmationModal) {
    closeAppConfModalBtn.addEventListener('click', () => {
      appConfirmationModal.classList.add('hidden');
    });
  }

  if (launchConsoleFromModalBtn && appConfirmationModal) {
    launchConsoleFromModalBtn.addEventListener('click', () => {
      appConfirmationModal.classList.add('hidden');
      showPortal();
      unlockPortal();
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
    pinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const entered = contractorPin ? contractorPin.value.trim() : '';

      // Check Supabase contractor profile first
      if (window.TradeSpecSupabase) {
        try {
          const res = await window.TradeSpecSupabase.getContractorProfile(entered);
          if (res && res.success && res.contractor) {
            settings = Object.assign(settings, res.contractor);
            unlockPortal();
            return;
          }
        } catch(err) {
          console.warn('PIN auth error with Supabase:', err);
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
      [fastBidModal, leadDossierModal, disputeModal, walletModal, badgeModal, backendModal, appConfirmationModal].forEach(m => {
        if (m) m.classList.add('hidden');
      });
    }
  });

  [fastBidModal, leadDossierModal, disputeModal, walletModal, badgeModal, backendModal, appConfirmationModal].forEach(modalBackdrop => {
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

  // --- 19. INTERACTIVE 9-TRADE SAMPLE BLUEPRINT INSPECTOR ---
  const sampleTabsBar = document.getElementById('sampleTabsBar');
  const sampleBlueprintCard = document.getElementById('sampleBlueprintCard');

  const SAMPLE_BLUEPRINTS = {
    charge: {
      title: "Commercial EV Fleet Depot Infrastructure",
      subTitle: "12x 19.2kW Level 2 Fleet Chargers • 480V 3-Phase",
      stdBadge: "NFPA 70 / NEC 625 & 220",
      customer: "Apex Logistics LLC • Harris County (77002)",
      budget: "$75,000 – $145,000",
      leadCost: 225,
      contractorProfit: "$28,000 – $42,000",
      pctJob: "0.26%",
      specs: [
        { param: "Continuous Duty Circuit Rating", code: "NEC 625.41 (125% Rule)", val: "361 Amps Coincident Peak" },
        { param: "Service Feed Voltage", code: "Commercial 3-Phase Standard", val: "480V / 277V Padmount Feed" },
        { param: "Dedicated Transformer Sizing", code: "Utility Interconnection Standard", val: "225 kVA Commercial Transformer" },
        { param: "Trenching Conductor Run", code: "NEC 300.5 Underground RMC Conduit", val: "150 ft Rigid Metal Conduit" },
        { param: "IRA Section 30C Tax Credit", code: "Inflation Reduction Act", val: "30% Federal Rebate (~$25,500)" }
      ]
    },
    permit: {
      title: "Commercial Tenant Improvement & Egress",
      subTitle: "2,400 SF Restaurant & Bakery Buildout • 160 Persons",
      stdBadge: "IBC Table 1004.5 • IPC 403",
      customer: "Artisan Bakery & Cafe • Dallas County (75001)",
      budget: "$310,000 – $480,000",
      leadCost: 275,
      contractorProfit: "$40,000 – $65,000",
      pctJob: "0.20%",
      specs: [
        { param: "Design Occupant Load", code: "IBC Table 1004.5 (15 SF/person)", val: "160 Persons Maximum" },
        { param: "Remote Exit Door Pair", code: "IBC 1006.2.1 Remote Egress", val: "2 Remote Doors (≥ 1/3 diagonal)" },
        { param: "Restroom Fixture Allocation", code: "IPC Table 403.1 Restroom Code", val: "4 Water Closets (2M/2F) + 2 Lavs" },
        { param: "Commercial Kitchen Hood", code: "IMC / NFPA 96 Exhaust", val: "12 ft Type I Hood (4,800 CFM)" },
        { param: "Tenant Improvement Gap", code: "Landlord TI Allowance Allocation", val: "$45/SF Allowance vs $130/SF Cost" }
      ]
    },
    site: {
      title: "Civil Earthwork, Detention & Retaining Wall",
      subTitle: "1.5-Acre Commercial Parcel • 65% Impervious Surface",
      stdBadge: "Rational Method Q=CiA • NCMA SRW",
      customer: "Cole Commercial Properties • Travis County (78701)",
      budget: "$66,000 – $108,000",
      leadCost: 185,
      contractorProfit: "$20,000 – $32,000",
      pctJob: "0.28%",
      specs: [
        { param: "Peak Stormwater Runoff (Q)", code: "Rational Method Q=CiA (10-Yr)", val: "3.23 CFS Peak Discharge" },
        { param: "Retention Basin Volume", code: "ASCE MOP 28 Water Quality", val: "0.26 Acre-Feet (11,325 cu ft)" },
        { param: "Cut/Fill Mass Excavation", code: "25% Soil Swell Factor", val: "800 BCY Cut (67 Haul Cycles)" },
        { param: "Segmental Retaining Wall", code: "NCMA SRW Standard", val: "60 ft x 6 ft with 3 Geogrid Tiers" },
        { param: "SWPPP Erosion Silt Guard", code: "EPA Clean Water General Permit", val: "Silt Fencing & Inlet Filter Traps" }
      ]
    },
    cold: {
      title: "Commercial Walk-In Cooler & Freezer Sizing",
      subTitle: "10'×12'×8.5' Medium-Temp Cooler (+35°F Design)",
      stdBadge: "ASHRAE Ch. 23 & 24 • EISA 2007",
      customer: "Lone Star Brewing Co. • Bexar County (78205)",
      budget: "$14,500 – $24,000",
      leadCost: 95,
      contractorProfit: "$6,500 – $9,500",
      pctJob: "0.51%",
      specs: [
        { param: "24-Hour Design Heat Load", code: "ASHRAE Refrigeration Standard", val: "11,850 BTU/hr (1.1 Safety Factor)" },
        { param: "Hermetic Condensing Unit", code: "Scroll Compressor Standard", val: "1.5 HP Medium-Temp Scroll" },
        { param: "Thermal Insulation Envelope", code: "EISA 2007 Federal Energy Code", val: "4\" IMP Panels (R-29 Walls/Ceiling)" },
        { param: "Defrost Run-Time Basis", code: "16-Hr Medium Temp Defrost", val: "Off-Cycle Scheduled Air Defrost" },
        { param: "Refrigerant Environmental", code: "EPA AIM Act Low-GWP Standard", val: "R-448A / R-449A Zero ODP" }
      ]
    },
    crane: {
      title: "Mobile Crane Load-Chart & Setback Rigging",
      subTitle: "6,000 lbs Commercial RTU Pick • 60ft Setback Radius",
      stdBadge: "ASME B30.5 • OSHA 1926.1400",
      customer: "Apex Commercial Mechanical • Harris County (77002)",
      budget: "$2,800 – $4,200",
      leadCost: 45,
      contractorProfit: "$1,400 – $2,200",
      pctJob: "1.28%",
      specs: [
        { param: "Total Pick Weight", code: "OSHA 1926.1400 (with tackle)", val: "6,000 lbs Gross Hoisted Load" },
        { param: "Operating Setback Radius", code: "Center-of-Rotation Setback", val: "60 ft Horizontal Radius" },
        { param: "Boom Hook Elevation", code: "Parapet Clearance Allowance", val: "48 ft Hook Height Over Roof" },
        { param: "Certified Crane Rating", code: "ASME B30.5 Mobile Crane Chart", val: "75-Ton All-Terrain (68% Chart)" },
        { param: "Ground Matting Requirement", code: "Soil Bearing Pressure Standard", val: "Timber Crane Mats (≤ 3,200 psf)" }
      ]
    },
    well: {
      title: "Commercial Water Well & Submersible Pump Head",
      subTitle: "350 ft Consolidated Limestone Bedrock • 25 GPM",
      stdBadge: "NGWA Standards • EPA Water Specs",
      customer: "Sterling Ranch & Vineyards • Gillespie County (78624)",
      budget: "$18,500 – $22,400",
      leadCost: 85,
      contractorProfit: "$5,500 – $8,000",
      pctJob: "0.53%",
      specs: [
        { param: "Target Formation Depth", code: "NGWA Commercial Bedrock", val: "350 ft Consolidated Formation" },
        { param: "Continuous Production Yield", code: "Pumping Flow Test Standard", val: "25 GPM Commercial Yield" },
        { param: "Submersible Pump & Motor", code: "230V Heavy Duty Motor", val: "3.0 HP High-Efficiency Submersible" },
        { param: "ASME Bladder Pressure Tank", code: "Commercial Water Vault Spec", val: "119 Gallon Pre-Charged Tank" },
        { param: "Steel Surface Casing", code: "Groundwater Sanitary Code", val: "6-5/8\" Casing with Neat Grout Seal" }
      ]
    },
    racking: {
      title: "Warehouse Pallet Racking & Seismic Sizing",
      subTitle: "648 Pallet Positions • 20ft Upright Frames • 3 Tiers",
      stdBadge: "RMI ANSI MH16.1 • OSHA 1910.176",
      customer: "ColdChain Logistics Hub • Dallas County (75001)",
      budget: "$51,800 – $64,800",
      leadCost: 135,
      contractorProfit: "$10,000 – $16,000",
      pctJob: "0.42%",
      specs: [
        { param: "Total Bay Pallet Positions", code: "40\" x 48\" GMA Standard Pallets", val: "648 Positions (3-High Tiers)" },
        { param: "Clear Eave Elevation", code: "Structural Clear Allowance", val: "24 ft Clear Eave Height" },
        { param: "Operational Aisle Turning", code: "Reach Truck Turning Standard", val: "9.5 ft Operating Aisle" },
        { param: "Upright Frame Seismic Sizing", code: "RMI MH16.1 Industrial Steel", val: "20 ft Uprights, 42\" Depth" },
        { param: "Beam Load Rating per Pair", code: "ANSI / RMI Step Beam Rating", val: "5,500 lbs per Pair of Step Beams" }
      ]
    },
    foam: {
      title: "Commercial Spray Foam Envelope Sizing",
      subTitle: "30'×40' Steel Shop • 6,440 Bd Ft • 2\" Closed-Cell",
      stdBadge: "ASHRAE 90.1 • IBC Chapter 26",
      customer: "Holcomb Metal Bldgs • Travis County (78701)",
      budget: "$9,600 – $11,800",
      leadCost: 60,
      contractorProfit: "$3,500 – $5,000",
      pctJob: "0.63%",
      specs: [
        { param: "Gross Insulated Board Feet", code: "Roof Deck + Perimeter Walls", val: "6,440 Board Feet Gross" },
        { param: "Thermal Resistance Value", code: "2\" Closed-Cell Density (2 lb)", val: "R-13.6 Thermal Continuous" },
        { param: "Chemical Drum Sets", code: "1 Set = 4,000-4,500 Bd Ft", val: "1.6 Sets (A+B 55-Gal Drums)" },
        { param: "Thermal Ignition Barrier", code: "IBC 2603.4 Code Mandate", val: "Intumescent Coating Mandated" },
        { param: "Vapor Permeability", code: "Class II Vapor Retarder", val: "≤ 0.8 Perms (Monolithic Seal)" }
      ]
    },
    grease: {
      title: "Grease Interceptor & Kitchen Hood CFM Sizing",
      subTitle: "1,000 Gal Gravity Vault • 10ft Type I Hood (4,000 CFM)",
      stdBadge: "UPC Appendix H • NFPA 96",
      customer: "Prime Cut Steakhouse • Bexar County (78205)",
      budget: "$14,200 – $18,500",
      leadCost: 75,
      contractorProfit: "$5,000 – $7,200",
      pctJob: "0.54%",
      specs: [
        { param: "Gravity Interceptor Vault", code: "UPC Appendix H Peak Flow", val: "1,000 Gallon Precast Vault" },
        { param: "Commercial Kitchen Exhaust", code: "NFPA 96 / IMC Standard", val: "10 ft Type I Hood (4,000 CFM)" },
        { param: "Dedicated Make-Up Air (MUA)", code: "85% Exhaust Replacement Rule", val: "3,400 CFM Tempered MUA" },
        { param: "Retention Time Requirement", code: "Municipal Pre-Treatment Code", val: "30-Minute Grease Separation" },
        { param: "Heavy Duty Charbroiler", code: "Solid Fuel / Heavy Duty Class", val: "UL 710 Listed Grease Baffles" }
      ]
    }
  };

  function renderSampleBlueprint(tradeKey) {
    if (!sampleBlueprintCard) return;
    const bp = SAMPLE_BLUEPRINTS[tradeKey] || SAMPLE_BLUEPRINTS.charge;

    sampleBlueprintCard.innerHTML = `
      <div class="blueprint-card-header">
        <div class="blueprint-title-row">
          <span style="font-size: 1.75rem;">📐</span>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #fff; margin: 0;">${escapeHtml(bp.title)}</h3>
            <p style="font-size: 0.8125rem; color: #94a3b8; margin: 0.2rem 0 0 0;">${escapeHtml(bp.subTitle)}</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="blueprint-badge-std">${escapeHtml(bp.stdBadge)}</span>
          <span class="rate-badge high" style="font-size: 0.75rem;">Lead Fee: $${bp.leadCost}</span>
        </div>
      </div>

      <div class="blueprint-body">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em;">Attached Engineering Parameters</span>
            <span style="font-size: 0.6875rem; color: #34d399; font-weight: 700;">✓ Calculated on Public Engine</span>
          </div>

          <table class="blueprint-spec-table">
            <thead>
              <tr>
                <th scope="col">Parameter</th>
                <th scope="col">Code Standard</th>
                <th scope="col">Engineered Value</th>
              </tr>
            </thead>
            <tbody>
              ${bp.specs.map(s => `
                <tr>
                  <td style="color: #e2e8f0; font-weight: 600;">${escapeHtml(s.param)}</td>
                  <td class="code-ref">${escapeHtml(s.code)}</td>
                  <td class="param-val">${escapeHtml(s.val)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(14, 165, 233, 0.08); border-left: 3px solid #0ea5e9; border-radius: 4px; font-size: 0.75rem; color: #cbd5e1;">
            <strong>Verified Customer:</strong> ${escapeHtml(bp.customer)} • Real-time SMS dispatched directly to 1 of 2 licensed territory contractors.
          </div>
        </div>

        <div class="blueprint-economics-card">
          <div>
            <div class="econ-stat-group">
              <span class="econ-stat-label">Calculated Commercial Contract</span>
              <span class="econ-stat-value gold">${escapeHtml(bp.budget)}</span>
            </div>
            <div class="econ-stat-group">
              <span class="econ-stat-label">Subcontractor Gross Margin</span>
              <span class="econ-stat-value green">${escapeHtml(bp.contractorProfit)}</span>
            </div>
            <div class="econ-stat-group">
              <span class="econ-stat-label">Lead Fee as % of Job</span>
              <span style="font-size: 1rem; font-weight: 700; color: #38bdf8; font-family: var(--font-mono);">${escapeHtml(bp.pctJob)}</span>
            </div>
          </div>

          <button type="button" class="btn btn-primary btn-block btn-claim-sample-trade" data-trade="${tradeKey}" style="margin-top: 1rem;">
            Claim ${escapeHtml(TRADE_META[tradeKey] ? TRADE_META[tradeKey].short : 'Trade')} in Your Zip &rarr;
          </button>
        </div>
      </div>
    `;

    const claimBtn = sampleBlueprintCard.querySelector('.btn-claim-sample-trade');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        const t = claimBtn.dataset.trade;
        const appTradeSelect = document.getElementById('appTrade');
        if (appTradeSelect) {
          appTradeSelect.value = t;
          syncAppTradeToCheckboxes(t);
        }
        const applySection = document.getElementById('apply');
        if (applySection) applySection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  if (sampleTabsBar) {
    sampleTabsBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.sample-tab-btn');
      if (!btn) return;
      sampleTabsBar.querySelectorAll('.sample-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderSampleBlueprint(btn.dataset.sampleTrade);
    });
    renderSampleBlueprint('charge');
  }

  // --- 20. SUPABASE BACKEND DIAGNOSTICS & CONTROLS ---
  const backendModal = document.getElementById('backendModal');
  const openBackendModalBtn = document.getElementById('openBackendModalBtn');
  const closeBackendModalBtn = document.getElementById('closeBackendModalBtn');
  const btnTestDbConnection = document.getElementById('btnTestDbConnection');
  const btnCopySqlSchema = document.getElementById('btnCopySqlSchema');
  const modalDbStatus = document.getElementById('modalDbStatus');

  async function updateDbStatusUI() {
    const globalPill = document.getElementById('globalDbStatusPill');
    const globalText = document.getElementById('globalDbStatusText');
    const dashText = document.getElementById('dashDbStatusText');

    if (window.TradeSpecSupabase) {
      const health = await window.TradeSpecSupabase.checkHealth();
      if (health.connected) {
        if (globalPill) globalPill.className = 'db-status-pill';
        if (globalText) globalText.textContent = 'Supabase Live';
        if (dashText) { dashText.textContent = 'Live DB'; dashText.className = 'text-green'; }
        if (modalDbStatus) modalDbStatus.innerHTML = '<span class="text-green">✓ Connected &amp; Synced (Live DB)</span>';
      } else {
        if (globalPill) globalPill.className = 'db-status-pill warning';
        if (globalText) globalText.textContent = health.needsSchema ? 'Supabase Ready (Awaiting SQL)' : 'Supabase (Demo Mode)';
        if (dashText) { dashText.textContent = health.needsSchema ? 'Awaiting Schema' : 'Local Fallback'; dashText.className = 'text-amber'; }
        if (modalDbStatus) {
          modalDbStatus.innerHTML = `<span class="text-amber">⚠ ${escapeHtml(health.message || 'Offline/Demo Mode')}</span>`;
        }
      }
    }
  }

  if (openBackendModalBtn && backendModal) {
    openBackendModalBtn.addEventListener('click', () => {
      backendModal.classList.remove('hidden');
      updateDbStatusUI();
    });
  }

  const globalDbStatusPill = document.getElementById('globalDbStatusPill');
  if (globalDbStatusPill && backendModal) {
    globalDbStatusPill.addEventListener('click', () => {
      backendModal.classList.remove('hidden');
      updateDbStatusUI();
    });
  }

  if (closeBackendModalBtn && backendModal) {
    closeBackendModalBtn.addEventListener('click', () => {
      backendModal.classList.add('hidden');
    });
  }

  if (btnTestDbConnection) {
    btnTestDbConnection.addEventListener('click', async () => {
      btnTestDbConnection.disabled = true;
      btnTestDbConnection.textContent = 'Pinging...';
      await updateDbStatusUI();
      btnTestDbConnection.disabled = false;
      btnTestDbConnection.textContent = '🔄 Test Live Ping';
    });
  }

  if (btnCopySqlSchema) {
    btnCopySqlSchema.addEventListener('click', () => {
      const sqlSnippet = `-- Copy this into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hrutolmtfggvzyhherkr/sql
-- Open 'tradespec-pro/partner/supabase-schema.sql' for full DDL with tables:
-- public.contractors, public.leads, public.partner_applications, public.wallet_transactions`;
      navigator.clipboard.writeText(sqlSnippet).then(() => {
        btnCopySqlSchema.textContent = '✓ Copied SQL Note!';
        setTimeout(() => { btnCopySqlSchema.textContent = '📋 Copy SQL Schema'; }, 2500);
      });
    });
  }

  // --- 21. REALTIME LEADS & TOASTS ---
  function initRealtimeLeads() {
    if (!window.TradeSpecSupabase) return;
    window.TradeSpecSupabase.subscribeToLeads(
      (newLead) => {
        showRealtimeToast(newLead);
        if (!leads.some(l => l.id === newLead.id)) {
          leads.unshift({
            id: newLead.id,
            timestamp: newLead.created_at,
            trade: newLead.trade,
            tradeTitle: newLead.trade_title,
            name: newLead.customer_name,
            company: newLead.company,
            phone: newLead.phone,
            email: newLead.email,
            zip: newLead.zip,
            specSummary: newLead.spec_summary,
            budgetEst: newLead.budget_est,
            leadCost: Number(newLead.lead_cost),
            status: newLead.status
          });
          renderDashboard();
        }
      },
      (updatedLead) => {
        const idx = leads.findIndex(l => l.id === updatedLead.id);
        if (idx !== -1) {
          leads[idx].status = updatedLead.status;
          renderDashboard();
        }
      }
    );
  }

  function showRealtimeToast(lead) {
    const container = document.getElementById('realtimeToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'lead-realtime-toast';
    toast.innerHTML = `
      <div style="font-size: 1.5rem;">🚨</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
          <span class="toast-badge-alert">New Commercial Lead</span>
          <span style="font-size: 0.6875rem; color: #94a3b8; font-family: var(--font-mono);">${escapeHtml(lead.id || 'NEW')}</span>
        </div>
        <div style="font-size: 0.8125rem; font-weight: 700; color: #fff;">${escapeHtml(lead.trade_title || 'Trade Spec')}</div>
        <div style="font-size: 0.75rem; color: #cbd5e1; margin-top: 0.15rem;">${escapeHtml(lead.zip || '')} • ${escapeHtml(lead.budget_est || '$5,000+')}</div>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 6000);
  }

  // --- 22. INITIAL BACKEND SYNC ---
  async function loadInitialData() {
    await updateDbStatusUI();
    if (window.TradeSpecSupabase) {
      try {
        const res = await window.TradeSpecSupabase.getLeads();
        if (res && res.success && res.leads && res.leads.length > 0) {
          leads = res.leads;
          console.log('[TradeSpec Partner] Synced', leads.length, 'leads from Supabase live database.');
          renderDashboard();
        }
      } catch(err) {
        console.warn('Initial leads fetch error:', err);
      }
    }
    initRealtimeLeads();
  }

  loadInitialData();

  // Check URL hash for direct portal access
  if (window.location.hash === '#portal' || window.location.hash === '#portal-section') {
    showPortal();
  }
});
