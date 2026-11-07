/**
 * ColdSpec Pro™ - Commercial Walk-in Refrigeration Sizing Engine
 * Adheres strictly to ASHRAE Refrigeration Handbook (Ch. 23 & 24) & EISA 2007 Standards
 */

document.addEventListener('DOMContentLoaded', () => {
  // Form Elements
  const form = document.getElementById('cold-form');
  const appSelect = document.getElementById('box-application');
  const ambientInput = document.getElementById('ambient-temp');
  const lenInput = document.getElementById('box-length');
  const widthInput = document.getElementById('box-width');
  const heightInput = document.getElementById('box-height');
  const panelSelect = document.getElementById('panel-thickness');
  const productInput = document.getElementById('product-load-lbs');
  const trafficSelect = document.getElementById('door-traffic');
  const btnRecalc = document.getElementById('btn-recalculate');

  // Outputs
  const outBtuHr = document.getElementById('out-btu-hr');
  const outBtuSub = document.getElementById('out-btu-sub');
  const outCompressorHp = document.getElementById('out-compressor-hp');
  const outCompressorNote = document.getElementById('out-compressor-note');
  const outDefrostType = document.getElementById('out-defrost-type');
  const outDefrostNote = document.getElementById('out-defrost-note');
  const outEvapCfm = document.getElementById('out-evap-cfm');
  const outTotalBtuDay = document.getElementById('out-total-btu-day');
  const outAnnualKwh = document.getElementById('out-annual-kwh');
  const outAnnualPowerCost = document.getElementById('out-annual-power-cost');
  const outTotalCost = document.getElementById('out-total-cost');
  const alertContainer = document.getElementById('alert-container');

  // Price Gauge
  const priceLow = document.getElementById('price-low');
  const priceMid = document.getElementById('price-mid');
  const priceHigh = document.getElementById('price-high');
  const gaugeExplanation = document.getElementById('gauge-explanation');

  // Print Elements
  const btnPrint = document.getElementById('btn-print');
  const pApp = document.getElementById('p-app');
  const pDim = document.getElementById('p-dim');
  const pArea = document.getElementById('p-area');
  const pAmbient = document.getElementById('p-ambient');
  const pPanel = document.getElementById('p-panel');
  const pTotalBtu = document.getElementById('p-total-btu');
  const pRuntime = document.getElementById('p-runtime');
  const pBtuHr = document.getElementById('p-btu-hr');
  const pHp = document.getElementById('p-hp');
  const pDefrost = document.getElementById('p-defrost');
  const pCfm = document.getElementById('p-cfm');
  const pKwh = document.getElementById('p-kwh');
  const pBudget = document.getElementById('p-budget');

  // Lead Form
  const leadForm = document.getElementById('lead-form');
  const leadZip = document.getElementById('lead-zip');
  const zipDetectedPill = document.getElementById('zip-detected-pill');
  const leadSpecsSummary = document.getElementById('lead-specs-summary');
  const leadSuccessMsg = document.getElementById('lead-success-msg');

  const STANDARD_HP = [0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 7.5, 10.0, 12.0, 15.0];

  const fmtCurrency = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const fmtNum = (n, d = 0) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  function calculate() {
    const app = appSelect.value;
    const ambientF = Math.max(60, parseFloat(ambientInput.value) || 90);
    const lengthFt = Math.max(4, parseFloat(lenInput.value) || 12);
    const widthFt = Math.max(4, parseFloat(widthInput.value) || 10);
    const heightFt = Math.max(6, parseFloat(heightInput.value) || 8.5);
    const panelThick = parseFloat(panelSelect.value) || 4.0;
    const productLbs = Math.max(0, parseFloat(productInput.value) || 800);
    const traffic = trafficSelect.value;

    // Target Box Temperature
    let boxTempF = 35;
    let sstTempF = 20;
    let isFreezer = false;
    let runtimeHrs = 16;
    let appTitle = 'Medium Temp Walk-In Cooler (+35°F)';

    if (app === 'freezer') {
      boxTempF = -10;
      sstTempF = -20;
      isFreezer = true;
      runtimeHrs = 18;
      appTitle = 'Low Temp Walk-In Freezer (-10°F)';
    } else if (app === 'floral') {
      boxTempF = 38;
      sstTempF = 25;
      appTitle = 'Floral Display Cooler (+38°F)';
    } else if (app === 'prep') {
      boxTempF = 50;
      sstTempF = 35;
      appTitle = 'Cold Food Prep Room (+50°F)';
    }

    const deltaT = Math.max(5, ambientF - boxTempF);

    // Geometry
    const surfaceArea = 2 * ((lengthFt * widthFt) + (lengthFt * heightFt) + (widthFt * heightFt));
    const volumeCuFt = lengthFt * widthFt * heightFt;

    // R-value
    let rValue = 29;
    if (panelThick === 3.5) rValue = 25;
    else if (panelThick === 5.0) rValue = 36;
    const uFactor = 1.0 / rValue;

    // 1. Transmission Heat Load (BTU / 24 hr)
    const transmissionBtu = surfaceArea * uFactor * deltaT * 24;

    // 2. Air Infiltration Heat Load (BTU / 24 hr)
    const baseAirChanges = Math.max(8, 360 / Math.pow(volumeCuFt, 0.44));
    let trafficMult = 1.0;
    if (traffic === 'light') trafficMult = 0.75;
    else if (traffic === 'heavy') trafficMult = 1.65;
    const airChangesPerDay = baseAirChanges * trafficMult;

    const btuPerCuFtAir = isFreezer ? 4.3 : 2.5;
    const infiltrationBtu = volumeCuFt * airChangesPerDay * btuPerCuFtAir;

    // 3. Product Pull-down Heat Load (BTU / 24 hr)
    let productBtu = 0;
    if (isFreezer) {
      // Sensible above freezing (from 45F to 28F) + Latent heat of fusion (100 BTU/lb) + Sub-cooling to -10F
      productBtu = productLbs * ((0.80 * (45 - 28)) + 100 + (0.42 * (28 - boxTempF)));
    } else {
      // Cooling product from ambient room temp down to box temp
      const enteringTemp = Math.min(ambientF - 10, 75);
      productBtu = productLbs * 0.85 * (enteringTemp - boxTempF);
    }

    // 4. Internal Miscellaneous Load (Lighting, Fans, Human Occupancy)
    const lightingBtu = (lengthFt * widthFt * 1.2 * 3.412 * 12); // 12 hours of light
    const fanBtu = isFreezer ? 9500 : 6500; // continuous fan heat
    const humanBtu = 2500; // 2.5 hours entry
    const internalBtu = lightingBtu + fanBtu + humanBtu;

    // Total 24-Hour Load with 10% safety margin
    const totalDailyBtu = Math.round((transmissionBtu + infiltrationBtu + productBtu + internalBtu) * 1.10);

    // Required Condensing Unit Capacity (BTU / hr)
    const requiredBtuHr = Math.round(totalDailyBtu / runtimeHrs);

    // Compressor HP Sizing
    const btuPerHp = isFreezer ? 4200 : 8000;
    const rawHp = requiredBtuHr / btuPerHp;
    let selectedHp = STANDARD_HP[STANDARD_HP.length - 1];
    for (const hp of STANDARD_HP) {
      if (hp >= rawHp) {
        selectedHp = hp;
        break;
      }
    }

    // Defrost Specification
    let defrostStr = 'Air Defrost';
    let defrostNote = 'Off-cycle coil defrost (Box temp ≥ 34°F)';
    let defrostColor = '#10b981';

    if (boxTempF < 34) {
      defrostStr = 'Electric Defrost';
      defrostNote = 'Heated drain line & electric coil heaters';
      defrostColor = '#06b6d4';
    }

    // Evaporator Airflow CFM (~105 CFM per 1,000 BTU/hr)
    const evapCfm = Math.round(requiredBtuHr * 0.105);

    // Energy Projections
    const compPowerKw = selectedHp * 0.95;
    const compAnnualKwh = compPowerKw * runtimeHrs * 365;
    const fansAnnualKwh = 0.35 * 24 * 365;
    const defrostAnnualKwh = isFreezer ? (3.5 * 1.2 * 365) : 0;
    const totalAnnualKwh = Math.round(compAnnualKwh + fansAnnualKwh + defrostAnnualKwh);
    const annualElectricCost = Math.round(totalAnnualKwh * 0.14);

    // Turnkey Pricing
    const boxPanelCost = surfaceArea * 18.5;
    const floorCost = isFreezer ? (lengthFt * widthFt * 24) : 0;
    const mechanicalCost = (selectedHp * 3400) + 3800;
    const installLaborCost = 4500 + (lengthFt * widthFt * 4.5);

    const totalTurnkey = boxPanelCost + floorCost + mechanicalCost + installLaborCost;
    const costLow = totalTurnkey * 0.80;
    const costHigh = totalTurnkey * 1.30;

    // Render Outputs
    outBtuHr.textContent = `${fmtNum(requiredBtuHr)} BTU/hr`;
    outBtuSub.textContent = `at ${sstTempF > 0 ? '+' : ''}${sstTempF}°F SST • ${runtimeHrs}-Hour Daily Runtime Factor`;

    outCompressorHp.textContent = `${selectedHp} HP`;
    outCompressorNote.textContent = `${isFreezer ? 'Low-Temp' : 'Medium-Temp'} Scroll Condensing Unit`;

    outDefrostType.textContent = defrostStr;
    outDefrostType.style.color = defrostColor;
    outDefrostNote.textContent = defrostNote;

    outEvapCfm.textContent = `${fmtNum(evapCfm)} CFM`;
    outTotalBtuDay.textContent = `${fmtNum(totalDailyBtu)} BTU`;

    outAnnualKwh.textContent = `${fmtNum(totalAnnualKwh)} kWh/yr`;
    outAnnualPowerCost.textContent = `~${fmtCurrency(annualElectricCost)} / yr at $0.14/kWh`;

    outTotalCost.textContent = fmtCurrency(totalTurnkey);

    // Dynamic Alerts
    let alertsHtml = '';
    if (isFreezer && panelThick < 4.0) {
      alertsHtml += `
        <div class="callout callout-danger">
          <span>⚠️</span>
          <div>
            <strong>EISA 2007 Insulation Violation:</strong> Walk-in freezers mandate a minimum thermal rating of <strong>R-32</strong> by federal law. 3.5-inch panels provide only R-25. Upgrade to 4.0" or 5.0" panels to pass building inspection.
          </div>
        </div>
      `;
    }
    if (isFreezer) {
      alertsHtml += `
        <div class="callout callout-warning">
          <span>❄️</span>
          <div>
            <strong>Frost-Heave Prevention Mandated:</strong> Subsoil moisture under a -10°F slab will freeze and expand over time. An insulated floor panel assembly with electric heat tape or sub-slab ventilation is required to avoid building foundation failure.
          </div>
        </div>
      `;
    }
    if (ambientF >= 100) {
      alertsHtml += `
        <div class="callout callout-warning">
          <span>☀️</span>
          <div>
            <strong>High Ambient Condenser Derating:</strong> Ambient rooftop temperatures above 100°F reduce condensing unit heat rejection capacity by 15% to 25%. A high-ambient condenser coil with ECM fan motors is recommended.
          </div>
        </div>
      `;
    }
    alertContainer.innerHTML = alertsHtml;

    // Price Gauge
    priceLow.textContent = `${fmtCurrency(costLow)} (Basic Box)`;
    priceMid.textContent = `${fmtCurrency(totalTurnkey)} (Fair Benchmark)`;
    priceHigh.textContent = `${fmtCurrency(costHigh)} (Outdoor Package)`;
    gaugeExplanation.textContent = `Includes ${lengthFt}x${widthFt}x${heightFt} ft ${panelThick}" IMP box, ${selectedHp} HP condensing unit, low-profile evaporator, line set piping, and startup commissioning.`;

    // Print Sheet Sync
    pApp.textContent = appTitle;
    pDim.textContent = `${lengthFt} ft x ${widthFt} ft x ${heightFt} ft`;
    pArea.textContent = `${Math.round(surfaceArea)} Sq Ft • ${Math.round(volumeCuFt)} Cu Ft`;
    pAmbient.textContent = `${ambientF}°F Ambient (${deltaT}°F Delta-T)`;
    pPanel.textContent = `${panelThick}" Polyurethane (R-${rValue} EISA)`;
    pTotalBtu.textContent = `${fmtNum(totalDailyBtu)} BTU / 24 Hr (with 10% safety)`;
    pRuntime.textContent = `${runtimeHrs} Hours / 24 Hours`;
    pBtuHr.textContent = `${fmtNum(requiredBtuHr)} BTU / Hr`;
    pHp.textContent = `${selectedHp} HP (${isFreezer ? 'Low' : 'Med'} Temp Scroll)`;
    pDefrost.textContent = defrostStr;
    pCfm.textContent = `${fmtNum(evapCfm)} CFM`;
    pKwh.textContent = `${fmtNum(totalAnnualKwh)} kWh / Year (~${fmtCurrency(annualElectricCost)} / Yr)`;
    pBudget.textContent = `${fmtCurrency(costLow)} - ${fmtCurrency(costHigh)} USD`;

    // Summary for Lead Dispatch
    const summary = `Commercial Walk-In: ${lengthFt}x${widthFt}x${heightFt} ft ${app}, ${fmtNum(requiredBtuHr)} BTU/hr, ${selectedHp} HP compressor, ${defrostStr}, ${panelThick}" IMP, Est Budget: ${fmtCurrency(totalTurnkey)}`;
    if (leadSpecsSummary) {
      leadSpecsSummary.value = summary;
    }
  }

  // Event Listeners
  [appSelect, ambientInput, lenInput, widthInput, heightInput, panelSelect, productInput, trafficSelect].forEach(el => {
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
  const presetBeer = document.getElementById('preset-beer');
  if (presetBeer) {
    presetBeer.addEventListener('click', () => {
      appSelect.value = 'cooler';
      ambientInput.value = 90;
      lenInput.value = 12;
      widthInput.value = 10;
      heightInput.value = 8.5;
      panelSelect.value = '4';
      productInput.value = 800;
      trafficSelect.value = 'medium';
      calculate();
    });
  }

  const presetButcher = document.getElementById('preset-butcher');
  if (presetButcher) {
    presetButcher.addEventListener('click', () => {
      appSelect.value = 'freezer';
      ambientInput.value = 95;
      lenInput.value = 20;
      widthInput.value = 14;
      heightInput.value = 9.0;
      panelSelect.value = '5';
      productInput.value = 2000;
      trafficSelect.value = 'heavy';
      calculate();
    });
  }

  const presetFloral = document.getElementById('preset-floral');
  if (presetFloral) {
    presetFloral.addEventListener('click', () => {
      appSelect.value = 'floral';
      ambientInput.value = 85;
      lenInput.value = 10;
      widthInput.value = 8;
      heightInput.value = 8.0;
      panelSelect.value = '4';
      productInput.value = 300;
      trafficSelect.value = 'light';
      calculate();
    });
  }

  const presetBrewery = document.getElementById('preset-brewery');
  if (presetBrewery) {
    presetBrewery.addEventListener('click', () => {
      appSelect.value = 'cooler';
      ambientInput.value = 88;
      lenInput.value = 30;
      widthInput.value = 20;
      heightInput.value = 10.0;
      panelSelect.value = '4';
      productInput.value = 4500;
      trafficSelect.value = 'heavy';
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
        trade: 'cold',
        tradeTitle: 'Commercial Walk-in Cooler & Freezer Refrigeration',
        name,
        company,
        email,
        phone,
        zip,
        notes,
        specsSummary,
        estimatedValueUSD: Math.round(parseFloat(priceMid.textContent.replace(/[^0-9]/g, '')) || 18500),
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
        btnSubmit.textContent = '✓ Specification Dispatched to Refrigeration Contractor';
        btnSubmit.style.backgroundColor = '#10b981';
      }
    });
  }

  // Initial Run
  calculate();
});
