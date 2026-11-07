/**
 * PermitSpec Pro™ - Commercial Tenant Improvement & Building Code Sizer
 * Based on IBC Table 1004.5, IBC 1006.2.1, IPC Table 403.1 & NFPA 96
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('permit-form');
  const spaceSqftInput = document.getElementById('space-sqft');
  const occupancySelect = document.getElementById('occupancy-type');
  const shellSelect = document.getElementById('shell-condition');
  const sprinklerSelect = document.getElementById('sprinklered');
  const hoodScopeSelect = document.getElementById('hood-scope');
  const hoodLengthInput = document.getElementById('hood-length');
  const tiAllowanceInput = document.getElementById('ti-allowance');
  const btnRecalc = document.getElementById('btn-recalculate');

  // Outputs
  const outOccupantLoad = document.getElementById('out-occupant-load');
  const outOccupantSub = document.getElementById('out-occupant-sub');
  const outEgressDoors = document.getElementById('out-egress-doors');
  const outEgressNote = document.getElementById('out-egress-note');
  const outPlumbingFixtures = document.getElementById('out-plumbing-fixtures');
  const outPlumbingNote = document.getElementById('out-plumbing-note');
  const outHoodCfm = document.getElementById('out-hood-cfm');
  const outHoodNote = document.getElementById('out-hood-note');
  const outHvacTons = document.getElementById('out-hvac-tons');
  const outTotalCost = document.getElementById('out-total-cost');
  const outCostSqft = document.getElementById('out-cost-sqft');
  const outTenantGap = document.getElementById('out-tenant-gap');
  const outAllowanceCredit = document.getElementById('out-allowance-credit');
  const alertContainer = document.getElementById('alert-container');

  // Gauge
  const priceLow = document.getElementById('price-low');
  const priceMid = document.getElementById('price-mid');
  const priceHigh = document.getElementById('price-high');
  const gaugeExplanation = document.getElementById('gauge-explanation');

  // Print Elements
  const btnPrint = document.getElementById('btn-print');
  const pSqft = document.getElementById('p-sqft');
  const pOccupancy = document.getElementById('p-occupancy');
  const pLoad = document.getElementById('p-load');
  const pSprinkler = document.getElementById('p-sprinkler');
  const pDoors = document.getElementById('p-doors');
  const pWidth = document.getElementById('p-width');
  const pPlumbing = document.getElementById('p-plumbing');
  const pHood = document.getElementById('p-hood');
  const pMakeup = document.getElementById('p-makeup');
  const pHvac = document.getElementById('p-hvac');
  const pTotalCost = document.getElementById('p-total-cost');
  const pAllowance = document.getElementById('p-allowance');
  const pGap = document.getElementById('p-gap');

  // Lead Form
  const leadForm = document.getElementById('lead-form');
  const leadZip = document.getElementById('lead-zip');
  const zipDetectedPill = document.getElementById('zip-detected-pill');
  const leadSpecsSummary = document.getElementById('lead-specs-summary');
  const leadSuccessMsg = document.getElementById('lead-success-msg');

  // IBC Table 1004.5 factors
  const OCCUPANCY_FACTORS = {
    'restaurant': { factor: 15, name: 'Assembly Dining (Group A-2)', type: 'net' },
    'bar': { factor: 7, name: 'Assembly Standing / Lounge (Group A-2)', type: 'net' },
    'fitness': { factor: 50, name: 'Exercise / Gym (Group A-3)', type: 'gross' },
    'retail': { factor: 60, name: 'Mercantile / Retail (Group M)', type: 'gross' },
    'office': { factor: 150, name: 'Business / Office (Group B)', type: 'gross' },
    'kitchen': { factor: 200, name: 'Commercial Kitchen (Group F)', type: 'gross' }
  };

  // Cost per Sq Ft matrix based on use and shell condition
  const TI_COST_MATRIX = {
    'restaurant': { 'second-gen': 160, 'warm-shell': 225, 'cold-dark': 295 },
    'bar': { 'second-gen': 150, 'warm-shell': 210, 'cold-dark': 275 },
    'fitness': { 'second-gen': 85, 'warm-shell': 125, 'cold-dark': 175 },
    'retail': { 'second-gen': 65, 'warm-shell': 95, 'cold-dark': 140 },
    'office': { 'second-gen': 75, 'warm-shell': 110, 'cold-dark': 165 },
    'kitchen': { 'second-gen': 180, 'warm-shell': 245, 'cold-dark': 325 }
  };

  const fmtCurrency = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const fmtNum = (n, d = 0) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  function calculate() {
    const sqft = Math.max(100, parseFloat(spaceSqftInput.value) || 2400);
    const occType = occupancySelect.value;
    const shell = shellSelect.value;
    const isSprinklered = sprinklerSelect.value === 'yes';
    const hoodScope = hoodScopeSelect.value;
    const hoodFt = Math.max(0, parseFloat(hoodLengthInput.value) || 0);
    const tiAllowancePerSqft = Math.max(0, parseFloat(tiAllowanceInput.value) || 0);

    const occData = OCCUPANCY_FACTORS[occType] || OCCUPANCY_FACTORS['restaurant'];
    
    // 1. IBC Occupant Load
    const occupantLoad = Math.max(1, Math.ceil(sqft / occData.factor));

    // 2. Egress & Exit Doors (IBC 1006.2.1)
    let doorsCount = 1;
    let doorsText = '1 Exit Door';
    let egressColor = '#10b981';
    let clearDoorWidth = 36;

    if (occupantLoad >= 500) {
      doorsCount = 3;
      doorsText = '3 Remote Exits';
      egressColor = '#ef4444';
      clearDoorWidth = Math.max(72, Math.ceil(occupantLoad * 0.2));
    } else if (occupantLoad >= 50) {
      doorsCount = 2;
      doorsText = '2 Remote Exits';
      egressColor = '#f59e0b';
      clearDoorWidth = Math.max(36, Math.ceil(occupantLoad * 0.2));
    }

    // 3. IPC Plumbing Fixtures
    const halfLoad = occupantLoad / 2;
    let maleToilets = 1;
    let femaleToilets = 1;

    if (occType === 'restaurant' || occType === 'bar') {
      maleToilets = Math.max(1, Math.ceil(halfLoad / 75));
      femaleToilets = Math.max(1, Math.ceil(halfLoad / 30));
    } else if (occType === 'fitness') {
      maleToilets = Math.max(1, Math.ceil(halfLoad / 40));
      femaleToilets = Math.max(1, Math.ceil(halfLoad / 30));
    } else {
      maleToilets = Math.max(1, Math.ceil(halfLoad / 50));
      femaleToilets = Math.max(1, Math.ceil(halfLoad / 50));
    }
    const lavatories = Math.max(1, Math.ceil(occupantLoad / 150));

    // 4. Kitchen Hood Exhaust & Makeup Air
    let exhaustCfm = 0;
    if (hoodScope === 'type-1-heavy') {
      exhaustCfm = hoodFt * 400;
    } else if (hoodScope === 'type-1-medium') {
      exhaustCfm = hoodFt * 300;
    } else if (hoodScope === 'type-2') {
      exhaustCfm = hoodFt * 200;
    }
    const makeupCfm = Math.round(exhaustCfm * 0.80);

    // 5. HVAC Cooling Tonnage
    const baseBuildingTons = sqft / 350;
    const bodyHeatTons = (occupantLoad * 250) / 12000;
    const kitchenHeatTons = exhaustCfm > 0 ? (hoodFt * 0.35) : 0;
    const totalHvacTons = Math.max(2, Math.round((baseBuildingTons + bodyHeatTons + kitchenHeatTons) * 10) / 10);

    // 6. TI Costs & Capital Gap
    const costPerSqft = (TI_COST_MATRIX[occType] && TI_COST_MATRIX[occType][shell]) ? TI_COST_MATRIX[occType][shell] : 160;
    const totalTurnkeyCost = sqft * costPerSqft;
    const landlordContribution = sqft * tiAllowancePerSqft;
    const tenantOutOfPocket = Math.max(0, totalTurnkeyCost - landlordContribution);

    const costLow = totalTurnkeyCost * 0.82;
    const costHigh = totalTurnkeyCost * 1.28;

    // Render Outputs
    outOccupantLoad.textContent = `${occupantLoad} Persons`;
    outOccupantSub.textContent = `${occData.name} • ${occData.factor} ${occData.type.toUpperCase()} SF/Person`;

    outEgressDoors.textContent = doorsText;
    outEgressDoors.style.color = egressColor;
    outEgressNote.textContent = occupantLoad >= 50 ? 'IBC 1006.2.1 (≥ 50 occupants triggers 2 doors)' : 'IBC 1006.2.1 compliant (Single exit permitted)';

    outPlumbingFixtures.textContent = `${maleToilets} M / ${femaleToilets} F Toilets`;
    outPlumbingNote.textContent = `Plus ${lavatories} sink(s) & min 1 ADA 60" turning stall`;

    if (exhaustCfm > 0) {
      outHoodCfm.textContent = `${fmtNum(exhaustCfm)} CFM`;
      outHoodNote.textContent = `Requires ${fmtNum(makeupCfm)} CFM tempered makeup air`;
    } else {
      outHoodCfm.textContent = 'None Required';
      outHoodNote.textContent = 'No commercial cooking cookline';
    }

    outHvacTons.textContent = `${totalHvacTons} Tons`;

    outTotalCost.textContent = fmtCurrency(totalTurnkeyCost);
    outCostSqft.textContent = `~$${costPerSqft} / Sq Ft (${shell.replace('-', ' ')})`;

    outTenantGap.textContent = fmtCurrency(tenantOutOfPocket);
    outAllowanceCredit.textContent = `After ${fmtCurrency(landlordContribution)} Landlord TI credit`;

    // Alerts
    let alertsHtml = '';
    if (occupantLoad >= 50) {
      alertsHtml += `
        <div class="callout callout-warning">
          <span>⚠️</span>
          <div>
            <strong>Mandatory Second Exit Door:</strong> With <strong>${occupantLoad} occupants</strong>, IBC 1006.2.1 prohibits operating with a single front door. You must have two separate remote exits. If this suite only has one storefront entry, expect $25k–$50k in structural masonry work.
          </div>
        </div>
      `;
    }
    if (femaleToilets >= 3) {
      alertsHtml += `
        <div class="callout callout-danger">
          <span>🚽</span>
          <div>
            <strong>Plumbing Restroom Expansion:</strong> IPC Table 403 mandates at least ${femaleToilets} female water closets and ${maleToilets} male water closets. If the space currently has only one single-user restroom, concrete slab trenching is required.
          </div>
        </div>
      `;
    }
    if (tenantOutOfPocket > 150000) {
      alertsHtml += `
        <div class="callout callout-success">
          <span>💡</span>
          <div>
            <strong>Lease Negotiation Leverage:</strong> Your out-of-pocket capital gap is <strong>${fmtCurrency(tenantOutOfPocket)}</strong> beyond the landlord's allowance. Use this code breakdown to negotiate free rent abatement (6–12 months) before executing the lease.
          </div>
        </div>
      `;
    }
    alertContainer.innerHTML = alertsHtml;

    // Price Gauge
    priceLow.textContent = `${fmtCurrency(costLow)} (Budget)`;
    priceMid.textContent = `${fmtCurrency(totalTurnkeyCost)} (Fair Market)`;
    priceHigh.textContent = `${fmtCurrency(costHigh)} (Premium Finishes)`;
    gaugeExplanation.textContent = `Turnkey budget for ${fmtNum(sqft)} SF ${occData.name} in ${shell.replace('-', ' ')} condition including MEP, permits, and fixtures.`;

    // Print Sheet Sync
    pSqft.textContent = `${fmtNum(sqft)} Sq Ft`;
    pOccupancy.textContent = `${occData.name} (${occData.factor} ${occData.type.toUpperCase()} SF/Person)`;
    pLoad.textContent = `${occupantLoad} Persons`;
    pSprinkler.textContent = isSprinklered ? 'Fully Sprinklered (NFPA 13)' : 'Non-Sprinklered Structure';
    pDoors.textContent = `${doorsText} (IBC 1006.2.1)`;
    pWidth.textContent = `${clearDoorWidth} Inches (Clear Width)`;
    pPlumbing.textContent = `${maleToilets} M / ${femaleToilets} F Toilets, ${lavatories} Sinks`;
    pHood.textContent = exhaustCfm > 0 ? `${fmtNum(exhaustCfm)} CFM (${hoodFt}-ft Canopy)` : 'None';
    pMakeup.textContent = exhaustCfm > 0 ? `${fmtNum(makeupCfm)} CFM (Tempered Air)` : 'None';
    pHvac.textContent = `${totalHvacTons} Tons (ASHRAE 62.1)`;
    pTotalCost.textContent = `${fmtCurrency(totalTurnkeyCost)} USD (~$${costPerSqft}/SF)`;
    pAllowance.textContent = `-${fmtCurrency(landlordContribution)} USD ($${tiAllowancePerSqft}/SF)`;
    pGap.textContent = `${fmtCurrency(tenantOutOfPocket)} USD Out-of-Pocket`;

    // Summary for Lead Dispatch
    const summary = `Commercial TI Feasibility: ${fmtNum(sqft)} SF ${occType}, ${occupantLoad} occupants, ${doorsText}, ${maleToilets}M/${femaleToilets}F toilets, ${totalHvacTons}T HVAC, Out-of-pocket gap: ${fmtCurrency(tenantOutOfPocket)}`;
    if (leadSpecsSummary) {
      leadSpecsSummary.value = summary;
    }
  }

  // Event Listeners
  [spaceSqftInput, occupancySelect, shellSelect, sprinklerSelect, hoodScopeSelect, hoodLengthInput, tiAllowanceInput].forEach(el => {
    if (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    }
  });

  if (btnRecalc) {
    btnRecalc.addEventListener('click', calculate);
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Presets
  const presetRestaurant = document.getElementById('preset-restaurant');
  if (presetRestaurant) {
    presetRestaurant.addEventListener('click', () => {
      spaceSqftInput.value = 2400;
      occupancySelect.value = 'restaurant';
      shellSelect.value = 'second-gen';
      sprinklerSelect.value = 'yes';
      hoodScopeSelect.value = 'type-1-heavy';
      hoodLengthInput.value = 12;
      tiAllowanceInput.value = 45;
      calculate();
    });
  }

  const presetFitness = document.getElementById('preset-fitness');
  if (presetFitness) {
    presetFitness.addEventListener('click', () => {
      spaceSqftInput.value = 4500;
      occupancySelect.value = 'fitness';
      shellSelect.value = 'warm-shell';
      sprinklerSelect.value = 'yes';
      hoodScopeSelect.value = 'none';
      hoodLengthInput.value = 0;
      tiAllowanceInput.value = 25;
      calculate();
    });
  }

  const presetOffice = document.getElementById('preset-office');
  if (presetOffice) {
    presetOffice.addEventListener('click', () => {
      spaceSqftInput.value = 5000;
      occupancySelect.value = 'office';
      shellSelect.value = 'second-gen';
      sprinklerSelect.value = 'yes';
      hoodScopeSelect.value = 'none';
      hoodLengthInput.value = 0;
      tiAllowanceInput.value = 60;
      calculate();
    });
  }

  const presetRetail = document.getElementById('preset-retail');
  if (presetRetail) {
    presetRetail.addEventListener('click', () => {
      spaceSqftInput.value = 1800;
      occupancySelect.value = 'retail';
      shellSelect.value = 'warm-shell';
      sprinklerSelect.value = 'no';
      hoodScopeSelect.value = 'none';
      hoodLengthInput.value = 0;
      tiAllowanceInput.value = 30;
      calculate();
    });
  }

  // Smart Zip
  function initSmartZip() {
    if (!leadZip || leadZip.value) return;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      let defaultZip = '77002';
      if (tz.includes('New_York')) defaultZip = '10001';
      else if (tz.includes('Chicago')) defaultZip = '60601';
      else if (tz.includes('Los_Angeles')) defaultZip = '90001';
      else if (tz.includes('Denver')) defaultZip = '80202';
      else if (tz.includes('Phoenix')) defaultZip = '85001';
      
      leadZip.value = defaultZip;
      if (zipDetectedPill) zipDetectedPill.style.display = 'inline-flex';
    } catch (e) {}
  }
  initSmartZip();

  // Lead Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value.trim();
      const company = document.getElementById('lead-company').value.trim();
      const email = document.getElementById('lead-email').value.trim();
      const phone = document.getElementById('lead-phone').value.trim();
      const zip = leadZip.value.trim();
      const notes = document.getElementById('lead-notes').value.trim();
      const specsSummary = leadSpecsSummary.value || '';

      if (!name || !email || !phone || !zip) {
        alert('Please complete all required fields (*).');
        return;
      }

      const leadRecord = {
        id: 'LEAD-' + Math.floor(100000 + Math.random() * 900000),
        trade: 'permit',
        tradeTitle: 'Commercial Tenant Improvement (IBC/IPC Code)',
        name,
        company,
        email,
        phone,
        zip,
        notes,
        specsSummary,
        estimatedValueUSD: Math.round(parseFloat(priceMid.textContent.replace(/[^0-9]/g, '')) || 384000),
        status: 'pending_dispatch',
        createdAt: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('tradespec_leads') || '[]');
        existing.unshift(leadRecord);
        localStorage.setItem('tradespec_leads', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      if (leadSuccessMsg) {
        leadSuccessMsg.style.display = 'block';
        leadSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const btnSubmit = document.getElementById('btn-submit-lead');
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = '✓ Specification Dispatched to Commercial GC';
        btnSubmit.style.backgroundColor = '#10b981';
      }
    });
  }

  // Initial Run
  calculate();
});
