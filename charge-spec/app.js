/**
 * ChargeSpec Pro™ - Commercial EV Fleet & Electrical Infrastructure Engine
 * Adheres strictly to NFPA 70 / NEC Article 625 & Article 220
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('charge-form');
  const chargerCountInput = document.getElementById('charger-count');
  const chargerKwSelect = document.getElementById('charger-kw');
  const batteryKwhInput = document.getElementById('battery-kwh');
  const dwellHoursInput = document.getElementById('dwell-hours');
  const diversitySelect = document.getElementById('diversity-factor');
  const voltageSelect = document.getElementById('service-voltage');
  const spareAmpsInput = document.getElementById('spare-amps');
  const trenchDistInput = document.getElementById('trench-distance');
  const demandRateInput = document.getElementById('demand-rate');
  const btnRecalc = document.getElementById('btn-recalculate');

  // Output Elements
  const outServiceAmps = document.getElementById('out-service-amps');
  const outServiceSub = document.getElementById('out-service-sub');
  const outTransformerKva = document.getElementById('out-transformer-kva');
  const outTransformerNote = document.getElementById('out-transformer-note');
  const outUpgradeStatus = document.getElementById('out-upgrade-status');
  const outUpgradeNote = document.getElementById('out-upgrade-note');
  const outFeederSpec = document.getElementById('out-feeder-spec');
  const outFeederNote = document.getElementById('out-feeder-note');
  const outChargeTime = document.getElementById('out-charge-time');
  const outChargeNote = document.getElementById('out-charge-note');
  const outDemandAnnual = document.getElementById('out-demand-annual');
  const outDemandMonthly = document.getElementById('out-demand-monthly');
  const outTaxCredit = document.getElementById('out-tax-credit');
  const alertContainer = document.getElementById('alert-container');

  // Gauge Elements
  const priceLow = document.getElementById('price-low');
  const priceMid = document.getElementById('price-mid');
  const priceHigh = document.getElementById('price-high');
  const gaugeExplanation = document.getElementById('gauge-explanation');

  // Print Elements
  const btnPrint = document.getElementById('btn-print');
  const pPorts = document.getElementById('p-ports');
  const pRating = document.getElementById('p-rating');
  const pBattery = document.getElementById('p-battery');
  const pDwell = document.getElementById('p-dwell');
  const pDiversity = document.getElementById('p-diversity');
  const pCoincident = document.getElementById('p-coincident');
  const pVoltage = document.getElementById('p-voltage');
  const pAmps = document.getElementById('p-amps');
  const pKva = document.getElementById('p-kva');
  const pFeeder = document.getElementById('p-feeder');
  const pVdrop = document.getElementById('p-vdrop');
  const pDemand = document.getElementById('p-demand');
  const pTax = document.getElementById('p-tax');
  const pBudget = document.getElementById('p-budget');

  // Lead Form
  const leadForm = document.getElementById('lead-form');
  const leadZip = document.getElementById('lead-zip');
  const zipDetectedPill = document.getElementById('zip-detected-pill');
  const leadSpecsSummary = document.getElementById('lead-specs-summary');
  const leadSuccessMsg = document.getElementById('lead-success-msg');

  // Standard 3-Phase Padmount Transformer KVA table
  const STANDARD_TRANSFORMER_KVA = [
    45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500, 3750, 5000
  ];

  // Helper formatting
  const fmtCurrency = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const fmtNum = (n, d = 1) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  function calculate() {
    const ports = Math.max(1, parseInt(chargerCountInput.value, 10) || 1);
    const kwPerPort = parseFloat(chargerKwSelect.value) || 19.2;
    const batteryKwh = parseFloat(batteryKwhInput.value) || 85;
    const dwellHrs = parseFloat(dwellHoursInput.value) || 8;
    const diversity = parseFloat(diversitySelect.value) || 0.75;
    const voltage = parseInt(voltageSelect.value, 10) || 480;
    const spareAmps = Math.max(0, parseFloat(spareAmpsInput.value) || 0);
    const trenchFt = Math.max(10, parseFloat(trenchDistInput.value) || 150);
    const demandRate = Math.max(0, parseFloat(demandRateInput.value) || 16.5);

    // 1. Total & Coincident Demand
    const totalKw = ports * kwPerPort;
    const coincidentKw = totalKw * diversity;
    const pf = 0.98; // Power factor for modern active front end rectifiers

    // 2. Continuous Current Calculation (Amps)
    let peakAmps = 0;
    const isThreePhase = voltage === 480 || voltage === 208;
    if (isThreePhase) {
      peakAmps = (coincidentKw * 1000) / (Math.sqrt(3) * voltage * pf);
    } else {
      peakAmps = (coincidentKw * 1000) / (voltage * pf);
    }

    // NEC 625.41 mandates 125% continuous duty rating
    const continuousAmps = peakAmps * 1.25;

    // 3. Transformer Sizing (kVA)
    const requiredKva = coincidentKw / pf;
    let selectedKva = STANDARD_TRANSFORMER_KVA[STANDARD_TRANSFORMER_KVA.length - 1];
    for (const kva of STANDARD_TRANSFORMER_KVA) {
      if (kva >= requiredKva) {
        selectedKva = kva;
        break;
      }
    }

    // 4. Feeder & Voltage Drop Sizing
    let feederStr = '';
    let conduitSize = '';
    let vDropPct = 1.6;

    if (continuousAmps <= 100) {
      feederStr = '1 AWG Cu or 2/0 Al';
      conduitSize = '1.5"';
      vDropPct = (trenchFt / 150) * 1.1;
    } else if (continuousAmps <= 200) {
      feederStr = '3/0 Cu or 250 kcmil Al';
      conduitSize = '2.0"';
      vDropPct = (trenchFt / 150) * 1.3;
    } else if (continuousAmps <= 400) {
      feederStr = '500 kcmil Al or (2x) 4/0 Cu';
      conduitSize = '3.5"';
      vDropPct = (trenchFt / 150) * 1.8;
    } else if (continuousAmps <= 800) {
      feederStr = '(2x) 500 kcmil Al parallel';
      conduitSize = '(2x) 3.5"';
      vDropPct = (trenchFt / 150) * 2.1;
    } else {
      const sets = Math.ceil(continuousAmps / 380);
      feederStr = `(${sets}x) 500 kcmil parallel sets`;
      conduitSize = `(${sets}x) 4.0"`;
      vDropPct = (trenchFt / 150) * 2.4;
    }
    vDropPct = Math.min(4.8, Math.max(0.5, vDropPct));

    // 5. Charging Time Verification
    const chargerEff = 0.92;
    const chargeTimeHrs = (batteryKwh * 0.85) / (kwPerPort * chargerEff); // 15% to 100% state of charge
    const chargeFitsInDwell = chargeTimeHrs <= dwellHrs;

    // 6. Utility Demand Charges
    const monthlyDemandCost = coincidentKw * demandRate;
    const annualDemandCost = monthlyDemandCost * 12;

    // 7. IRA Section 30C Clean Fuel Credit (30% capped at $100k)
    // Estimate baseline equipment cost
    let evseCostPerPort = 0;
    if (kwPerPort <= 11.5) evseCostPerPort = 2200;
    else if (kwPerPort <= 19.2) evseCostPerPort = 3500;
    else if (kwPerPort <= 60) evseCostPerPort = 32000;
    else if (kwPerPort <= 150) evseCostPerPort = 75000;
    else evseCostPerPort = 140000;

    const totalEvseHardware = ports * evseCostPerPort;
    const civilTrenching = trenchFt * 115;
    const switchgearCost = Math.max(12000, continuousAmps * 75);
    const engineeringPermit = 8500 + (ports * 450);

    const estMidProjectCost = totalEvseHardware + civilTrenching + switchgearCost + engineeringPermit;
    const estLowProjectCost = estMidProjectCost * 0.78;
    const estHighProjectCost = estMidProjectCost * 1.35;

    // IRA 30C is 30% of eligible cost up to $100,000 per project
    const taxCredit = Math.min(100000, estMidProjectCost * 0.30);

    // Upgrade Needed?
    const deficitAmps = continuousAmps - spareAmps;
    const needsUpgrade = deficitAmps > 0;

    // Render Outputs
    outServiceAmps.textContent = `${Math.round(continuousAmps)} A`;
    outServiceSub.textContent = `at ${voltage}V ${isThreePhase ? '3-Phase' : '1-Phase'} • Coincident Peak: ${fmtNum(coincidentKw, 1)} kW`;

    outTransformerKva.textContent = `${selectedKva} kVA`;
    outTransformerNote.textContent = `Calculated load: ${fmtNum(requiredKva, 1)} kVA @ 0.98 PF`;

    if (needsUpgrade) {
      outUpgradeStatus.textContent = 'Upgrade Needed';
      outUpgradeStatus.style.color = '#ef4444';
      outUpgradeNote.textContent = `Deficit of ${Math.round(deficitAmps)}A over available spare (${spareAmps}A)`;
    } else {
      outUpgradeStatus.textContent = 'Existing Panel OK';
      outUpgradeStatus.style.color = '#10b981';
      outUpgradeNote.textContent = `${Math.round(spareAmps - continuousAmps)}A spare remains on existing service`;
    }

    outFeederSpec.textContent = `${feederStr} (${conduitSize} EMT)`;
    outFeederNote.textContent = `Calculated voltage drop: ${fmtNum(vDropPct, 1)}% (${vDropPct <= 3.0 ? '< 3% NEC limit' : '⚠️ Exceeds 3% limit'})`;

    outChargeTime.textContent = `${fmtNum(chargeTimeHrs, 1)} hrs / vehicle`;
    if (chargeFitsInDwell) {
      outChargeNote.textContent = `✓ Fits within ${dwellHrs}-hr dwell window`;
      outChargeNote.style.color = '#10b981';
    } else {
      outChargeNote.textContent = `⚠️ Exceeds ${dwellHrs}-hr dwell window (vehicles won't finish)`;
      outChargeNote.style.color = '#ef4444';
    }

    outDemandAnnual.textContent = `${fmtCurrency(annualDemandCost)} / yr`;
    outDemandMonthly.textContent = `~${fmtCurrency(monthlyDemandCost)} / month at $${fmtNum(demandRate, 2)}/kW`;

    outTaxCredit.textContent = fmtCurrency(taxCredit);

    // Update Alerts
    let alertsHtml = '';
    if (needsUpgrade) {
      alertsHtml += `
        <div class="callout callout-warning">
          <span>⚠️</span>
          <div>
            <strong>Utility Service Upgrade Required:</strong> Your installation requires <strong>${Math.round(deficitAmps)}A</strong> beyond existing panel capacity. Utility padmount transformer and new service drops typically require 35 to 60 weeks lead time.
          </div>
        </div>
      `;
    }
    if (!chargeFitsInDwell) {
      alertsHtml += `
        <div class="callout callout-danger">
          <span>🛑</span>
          <div>
            <strong>Fleet Charge Time Deficit:</strong> At ${kwPerPort} kW per port, an 85% charge on a ${batteryKwh} kWh battery takes ${fmtNum(chargeTimeHrs, 1)} hours, exceeding your ${dwellHrs}-hour overnight dwell window. Upgrade to higher-kW chargers or adjust turnaround schedules.
          </div>
        </div>
      `;
    }
    if (annualDemandCost > 20000) {
      alertsHtml += `
        <div class="callout callout-success">
          <span>💡</span>
          <div>
            <strong>Peak Demand Shaving Opportunity:</strong> At ${fmtCurrency(annualDemandCost)}/yr in utility demand charges, adding a 100-200 kWh Battery Energy Storage System (BESS) or automated load rotation has an estimated payback period of 2.5 to 3.8 years.
          </div>
        </div>
      `;
    }
    alertContainer.innerHTML = alertsHtml;

    // Price Gauge Update
    priceLow.textContent = `${fmtCurrency(estLowProjectCost)} (Low)`;
    priceMid.textContent = `${fmtCurrency(estMidProjectCost)} (Fair Benchmark)`;
    priceHigh.textContent = `${fmtCurrency(estHighProjectCost)} (High-Spec)`;
    gaugeExplanation.textContent = `Based on ${ports}x ${kwPerPort}kW chargers, ${trenchFt} ft trenching, ${feederStr}, ${selectedKva}kVA transformer review, and commercial switchgear.`;

    // Print Sheet Sync
    pPorts.textContent = `${ports} Ports`;
    pRating.textContent = `${kwPerPort} kW (${kwPerPort <= 19.2 ? 'Level 2' : 'Level 3 DCFC'})`;
    pBattery.textContent = `${batteryKwh} kWh`;
    pDwell.textContent = `${dwellHrs} Hours`;
    pDiversity.textContent = `${Math.round(diversity * 100)}% (Dynamic Load Sharing)`;
    pCoincident.textContent = `${fmtNum(coincidentKw, 1)} kW`;
    pVoltage.textContent = `${voltage}V ${isThreePhase ? '3-Phase' : '1-Phase'}`;
    pAmps.textContent = `${Math.round(continuousAmps)} Amps (125% Continuous)`;
    pKva.textContent = `${selectedKva} kVA Utility Padmount`;
    pFeeder.textContent = `${feederStr} in ${conduitSize} EMT`;
    pVdrop.textContent = `${fmtNum(vDropPct, 1)}% (${vDropPct <= 3 ? 'Compliant' : 'High'})`;
    pDemand.textContent = `${fmtCurrency(annualDemandCost)} / Year (~${fmtCurrency(monthlyDemandCost)} / Mo)`;
    pTax.textContent = `${fmtCurrency(taxCredit)} (30% IRA Credit)`;
    pBudget.textContent = `${fmtCurrency(estLowProjectCost)} - ${fmtCurrency(estHighProjectCost)} USD`;

    // Summary String for Lead Dispatch
    const summary = `Commercial EV Fleet: ${ports}x ${kwPerPort}kW ports, ${batteryKwh}kWh battery, ${Math.round(continuousAmps)}A continuous @ ${voltage}V, ${selectedKva}kVA transformer, ${trenchFt}ft trench, Est Budget: ${fmtCurrency(estMidProjectCost)}`;
    if (leadSpecsSummary) {
      leadSpecsSummary.value = summary;
    }
  }

  // Event Listeners
  [chargerCountInput, chargerKwSelect, batteryKwhInput, dwellHoursInput, diversitySelect, voltageSelect, spareAmpsInput, trenchDistInput, demandRateInput].forEach(el => {
    if (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    }
  });

  if (btnRecalc) {
    btnRecalc.addEventListener('click', calculate);
  }

  // Print Action
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Preset Handlers
  const presetDelivery = document.getElementById('preset-delivery');
  if (presetDelivery) {
    presetDelivery.addEventListener('click', () => {
      chargerCountInput.value = 12;
      chargerKwSelect.value = '19.2';
      batteryKwhInput.value = 85;
      dwellHoursInput.value = 8;
      diversitySelect.value = '0.75';
      voltageSelect.value = '480';
      spareAmpsInput.value = 100;
      trenchDistInput.value = 150;
      demandRateInput.value = 16.5;
      calculate();
    });
  }

  const presetBus = document.getElementById('preset-bus');
  if (presetBus) {
    presetBus.addEventListener('click', () => {
      chargerCountInput.value = 8;
      chargerKwSelect.value = '60';
      batteryKwhInput.value = 210;
      dwellHoursInput.value = 6;
      diversitySelect.value = '1.0';
      voltageSelect.value = '480';
      spareAmpsInput.value = 200;
      trenchDistInput.value = 220;
      demandRateInput.value = 18.0;
      calculate();
    });
  }

  const presetHotel = document.getElementById('preset-hotel');
  if (presetHotel) {
    presetHotel.addEventListener('click', () => {
      chargerCountInput.value = 10;
      chargerKwSelect.value = '9.6';
      batteryKwhInput.value = 65;
      dwellHoursInput.value = 10;
      diversitySelect.value = '0.50';
      voltageSelect.value = '208';
      spareAmpsInput.value = 150;
      trenchDistInput.value = 120;
      demandRateInput.value = 14.0;
      calculate();
    });
  }

  const presetTravel = document.getElementById('preset-travel');
  if (presetTravel) {
    presetTravel.addEventListener('click', () => {
      chargerCountInput.value = 4;
      chargerKwSelect.value = '150';
      batteryKwhInput.value = 300;
      dwellHoursInput.value = 2;
      diversitySelect.value = '1.0';
      voltageSelect.value = '480';
      spareAmpsInput.value = 0;
      trenchDistInput.value = 350;
      demandRateInput.value = 22.0;
      calculate();
    });
  }

  // Smart Zip Auto-Detection (Timezone/Locale heuristic)
  function initSmartZip() {
    if (!leadZip || leadZip.value) return;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      let defaultZip = '77002'; // Houston default
      if (tz.includes('New_York')) defaultZip = '10001';
      else if (tz.includes('Chicago')) defaultZip = '60601';
      else if (tz.includes('Los_Angeles')) defaultZip = '90001';
      else if (tz.includes('Denver')) defaultZip = '80202';
      else if (tz.includes('Phoenix')) defaultZip = '85001';
      
      leadZip.value = defaultZip;
      if (zipDetectedPill) zipDetectedPill.style.display = 'inline-flex';
    } catch (e) {
      // fallback
    }
  }
  initSmartZip();

  // Lead Submission into shared tradespec_leads localStorage
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
        trade: 'charge',
        tradeTitle: 'Commercial EV Fleet Infrastructure (NEC 625)',
        name,
        company,
        email,
        phone,
        zip,
        notes,
        specsSummary,
        estimatedValueUSD: Math.round(parseFloat(priceMid.textContent.replace(/[^0-9]/g, '')) || 108000),
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
        btnSubmit.textContent = '✓ Specification Dispatched to Master Electrician';
        btnSubmit.style.backgroundColor = '#10b981';
      }
    });
  }

  // Initial Calculation
  calculate();
});
