/**
 * SiteSpec Pro™ - Civil Earthwork, Stormwater & Site Development Engine
 * Adheres to The Rational Method (Q = CiA / ASCE MOP 28) & NCMA Retaining Wall Standards
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('site-form');
  const acresInput = document.getElementById('site-acres');
  const imperviousInput = document.getElementById('impervious-pct');
  const soilSelect = document.getElementById('soil-type');
  const rainInput = document.getElementById('rain-intensity');
  const earthworkInput = document.getElementById('earthwork-bcy');
  const wallLenInput = document.getElementById('wall-length');
  const wallHtInput = document.getElementById('wall-height');
  const wallSurchargeSelect = document.getElementById('wall-surcharge');
  const btnRecalc = document.getElementById('btn-recalculate');

  // Outputs
  const outPeakCfs = document.getElementById('out-peak-cfs');
  const outPeakSub = document.getElementById('out-peak-sub');
  const outPondVolume = document.getElementById('out-pond-volume');
  const outPondGallons = document.getElementById('out-pond-gallons');
  const outHaulLcy = document.getElementById('out-haul-lcy');
  const outHaulTrucks = document.getElementById('out-haul-trucks');
  const outWallFace = document.getElementById('out-wall-face');
  const outWallBlocks = document.getElementById('out-wall-blocks');
  const outGeogridTiers = document.getElementById('out-geogrid-tiers');
  const outGeogridEmbed = document.getElementById('out-geogrid-embed');
  const outGravelTons = document.getElementById('out-gravel-tons');
  const outTotalCivil = document.getElementById('out-total-civil');
  const alertContainer = document.getElementById('alert-container');

  // Gauge
  const priceLow = document.getElementById('price-low');
  const priceMid = document.getElementById('price-mid');
  const priceHigh = document.getElementById('price-high');
  const gaugeExplanation = document.getElementById('gauge-explanation');

  // Print Elements
  const btnPrint = document.getElementById('btn-print');
  const pAcres = document.getElementById('p-acres');
  const pImpervious = document.getElementById('p-impervious');
  const pCoeff = document.getElementById('p-coeff');
  const pRain = document.getElementById('p-rain');
  const pCfs = document.getElementById('p-cfs');
  const pPond = document.getElementById('p-pond');
  const pBcy = document.getElementById('p-bcy');
  const pLcy = document.getElementById('p-lcy');
  const pTrucks = document.getElementById('p-trucks');
  const pWallDim = document.getElementById('p-wall-dim');
  const pWallArea = document.getElementById('p-wall-area');
  const pBlocks = document.getElementById('p-blocks');
  const pGeogrid = document.getElementById('p-geogrid');
  const pStone = document.getElementById('p-stone');
  const pBudget = document.getElementById('p-budget');

  // Lead Form
  const leadForm = document.getElementById('lead-form');
  const leadZip = document.getElementById('lead-zip');
  const zipDetectedPill = document.getElementById('zip-detected-pill');
  const leadSpecsSummary = document.getElementById('lead-specs-summary');
  const leadSuccessMsg = document.getElementById('lead-success-msg');

  const fmtCurrency = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const fmtNum = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  function calculate() {
    const acres = Math.max(0.1, parseFloat(acresInput.value) || 1.5);
    const impPct = Math.min(100, Math.max(0, parseFloat(imperviousInput.value) || 65));
    const soil = soilSelect.value;
    const rain = Math.max(0.5, parseFloat(rainInput.value) || 3.2);
    const bcy = Math.max(0, parseFloat(earthworkInput.value) || 0);
    const wallLen = Math.max(0, parseFloat(wallLenInput.value) || 0);
    const wallHt = Math.max(0, parseFloat(wallHtInput.value) || 0);
    const surcharge = wallSurchargeSelect.value;

    // 1. Rational Method Runoff (Q = C * I * A)
    let cPervious = 0.25;
    if (soil === 'sand') cPervious = 0.15;
    else if (soil === 'clay') cPervious = 0.40;
    
    const cImpervious = 0.90;
    const compC = ((impPct / 100) * cImpervious) + (((100 - impPct) / 100) * cPervious);
    const peakCfs = compC * rain * acres;

    // 2. Stormwater Detention Basin Sizing
    // Empirical retention sizing for 25-yr storm (approx 0.08 acre-ft per peak CFS)
    const pondAcreFt = Math.max(0.05, Math.round(peakCfs * 0.082 * 100) / 100);
    const pondGallons = Math.round(pondAcreFt * 325851);

    // 3. Earthwork Haul Cycles (25% swell from BCY to LCY)
    const lcy = Math.round(bcy * 1.25);
    const truckLoads = Math.ceil(lcy / 16);

    // 4. Retaining Wall Sizing (NCMA)
    const wallArea = wallLen * wallHt;
    const blocksCount = Math.ceil(wallArea * 1.05);

    let geogridTiers = 0;
    let geogridEmbed = 0;
    const needsGeogrid = wallHt > 4.0 || surcharge === 'traffic' || surcharge === 'slope';

    if (wallLen > 0 && wallHt > 0 && needsGeogrid) {
      geogridTiers = Math.max(1, Math.floor(wallHt / 2.0));
      const mult = surcharge === 'traffic' ? 0.75 : 0.70;
      geogridEmbed = Math.max(4.0, Math.round(wallHt * mult * 10) / 10);
    }

    const gravelVolumeCy = (wallLen * wallHt * 1.0) / 27;
    const gravelTons = Math.round(gravelVolumeCy * 1.4);

    // 5. Turnkey Civil Cost Model
    const earthworkCost = bcy * 24;
    const pondCost = Math.max(18000, pondAcreFt * 125000);
    const wallCostPerSf = surcharge === 'traffic' ? 68 : (surcharge === 'slope' ? 60 : 52);
    const wallCost = wallArea * wallCostPerSf;
    const swpppCost = Math.max(4500, acres * 3200);

    const totalCivilCost = earthworkCost + pondCost + wallCost + swpppCost;
    const costLow = totalCivilCost * 0.80;
    const costHigh = totalCivilCost * 1.30;

    // Render Outputs
    outPeakCfs.textContent = `${fmtNum(peakCfs, 2)} CFS`;
    outPeakSub.textContent = `Composite C = ${fmtNum(compC, 2)} • ${fmtNum(acres, 2)} Acres • ${fmtNum(rain, 1)} in/hr Rain`;

    outPondVolume.textContent = `${fmtNum(pondAcreFt, 2)} Acre-Ft`;
    outPondGallons.textContent = `~${pondGallons.toLocaleString()} Gallons storage capacity`;

    outHaulLcy.textContent = `${lcy.toLocaleString()} Loose CY`;
    outHaulTrucks.textContent = `${truckLoads.toLocaleString()} Tri-Axle dump truck loads (25% swell)`;

    outWallFace.textContent = `${Math.round(wallArea)} Sq Ft`;
    outWallBlocks.textContent = `~${blocksCount.toLocaleString()} Modular concrete blocks (with waste)`;

    if (geogridTiers > 0) {
      outGeogridTiers.textContent = `${geogridTiers} Tiers Required`;
      outGeogridTiers.style.color = '#f97316';
      outGeogridEmbed.textContent = `${geogridEmbed} ft embedment length (${surcharge === 'traffic' ? '0.75' : '0.70'} x H)`;
    } else {
      outGeogridTiers.textContent = 'None (Gravity Stack)';
      outGeogridTiers.style.color = '#10b981';
      outGeogridEmbed.textContent = 'Height ≤ 4 ft with level backfill';
    }

    outGravelTons.textContent = `${gravelTons} Tons`;
    outTotalCivil.textContent = fmtCurrency(totalCivilCost);

    // Alerts
    let alertsHtml = '';
    if (geogridTiers > 0) {
      alertsHtml += `
        <div class="callout callout-warning">
          <span>⚠️</span>
          <div>
            <strong>NCMA Geogrid Reinforcement Mandated:</strong> At an exposed height of <strong>${wallHt} feet</strong>, internal overturning moment requires structural geogrid. Install ${geogridTiers} layers of high-tenacity polyester geogrid extending ${geogridEmbed} feet into the slope.
          </div>
        </div>
      `;
    }
    if (impPct >= 60) {
      alertsHtml += `
        <div class="callout callout-danger">
          <span>🌊</span>
          <div>
            <strong>High Impervious Runoff Surge:</strong> At ${impPct}% impervious coverage, peak runoff reaches <strong>${fmtNum(peakCfs, 2)} CFS</strong>. City stormwater reviewers will require an engineered outlet control structure (concrete riser with weir notch) to restrict post-development discharge.
          </div>
        </div>
      `;
    }
    if (truckLoads > 50) {
      alertsHtml += `
        <div class="callout callout-success">
          <span>💡</span>
          <div>
            <strong>Haul Logistics &amp; Street Permitting:</strong> Moving ${truckLoads} heavy dump truck loads through municipal streets requires a Street Bond and a designated truck tracking pad (AASHTO #1 stone) to prevent mud tracking fines.
          </div>
        </div>
      `;
    }
    alertContainer.innerHTML = alertsHtml;

    // Price Gauge
    priceLow.textContent = `${fmtCurrency(costLow)} (Low)`;
    priceMid.textContent = `${fmtCurrency(totalCivilCost)} (Fair Benchmark)`;
    priceHigh.textContent = `${fmtCurrency(costHigh)} (High Complexity)`;
    gaugeExplanation.textContent = `Turnkey civil budget for ${acres} acres, ${bcy} BCY cut, ${pondAcreFt} acre-ft pond, ${Math.round(wallArea)} SF retaining wall, and SWPPP erosion compliance.`;

    // Print Sheet Sync
    pAcres.textContent = `${fmtNum(acres, 2)} Acres`;
    pImpervious.textContent = `${impPct}% (Asphalt / Concrete / Roof)`;
    pCoeff.textContent = fmtNum(compC, 2);
    pRain.textContent = `${fmtNum(rain, 2)} In / Hr`;
    pCfs.textContent = `${fmtNum(peakCfs, 2)} CFS`;
    pPond.textContent = `${fmtNum(pondAcreFt, 2)} Acre-Feet (~${pondGallons.toLocaleString()} Gal)`;
    pBcy.textContent = `${bcy.toLocaleString()} Bank Cubic Yards`;
    pLcy.textContent = `${lcy.toLocaleString()} Loose Cubic Yards`;
    pTrucks.textContent = `${truckLoads.toLocaleString()} Truck Loads`;
    pWallDim.textContent = `${wallLen} Ft Length • ${wallHt} Ft Height`;
    pWallArea.textContent = `${Math.round(wallArea)} Sq Ft`;
    pBlocks.textContent = `${blocksCount.toLocaleString()} Blocks`;
    pGeogrid.textContent = geogridTiers > 0 ? `${geogridTiers} Tiers • ${geogridEmbed} Ft Embedment` : 'None (Gravity Stack)';
    pStone.textContent = `${gravelTons} Tons (#57 clean stone)`;
    pBudget.textContent = `${fmtCurrency(costLow)} - ${fmtCurrency(costHigh)} USD`;

    // Summary for Lead Dispatch
    const summary = `Civil Site Development: ${acres} Acres, ${impPct}% impervious, ${fmtNum(peakCfs, 2)} CFS peak flow, ${pondAcreFt} acre-ft pond, ${bcy} BCY cut (${truckLoads} trucks), ${Math.round(wallArea)} SF retaining wall, Est Budget: ${fmtCurrency(totalCivilCost)}`;
    if (leadSpecsSummary) {
      leadSpecsSummary.value = summary;
    }
  }

  // Event Listeners
  [acresInput, imperviousInput, soilSelect, rainInput, earthworkInput, wallLenInput, wallHtInput, wallSurchargeSelect].forEach(el => {
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
  const presetComm = document.getElementById('preset-commercial');
  if (presetComm) {
    presetComm.addEventListener('click', () => {
      acresInput.value = 1.5;
      imperviousInput.value = 65;
      soilSelect.value = 'loam';
      rainInput.value = 3.2;
      earthworkInput.value = 800;
      wallLenInput.value = 60;
      wallHtInput.value = 6.0;
      wallSurchargeSelect.value = 'traffic';
      calculate();
    });
  }

  const presetSub = document.getElementById('preset-subdivision');
  if (presetSub) {
    presetSub.addEventListener('click', () => {
      acresInput.value = 3.5;
      imperviousInput.value = 35;
      soilSelect.value = 'clay';
      rainInput.value = 3.0;
      earthworkInput.value = 2400;
      wallLenInput.value = 100;
      wallHtInput.value = 4.0;
      wallSurchargeSelect.value = 'level';
      calculate();
    });
  }

  const presetRet = document.getElementById('preset-retaining');
  if (presetRet) {
    presetRet.addEventListener('click', () => {
      acresInput.value = 1.0;
      imperviousInput.value = 50;
      soilSelect.value = 'loam';
      rainInput.value = 2.8;
      earthworkInput.value = 600;
      wallLenInput.value = 120;
      wallHtInput.value = 8.0;
      wallSurchargeSelect.value = 'traffic';
      calculate();
    });
  }

  const presetInd = document.getElementById('preset-industrial');
  if (presetInd) {
    presetInd.addEventListener('click', () => {
      acresInput.value = 5.0;
      imperviousInput.value = 85;
      soilSelect.value = 'clay';
      rainInput.value = 4.0;
      earthworkInput.value = 3500;
      wallLenInput.value = 80;
      wallHtInput.value = 5.0;
      wallSurchargeSelect.value = 'traffic';
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
        trade: 'site',
        tradeTitle: 'Civil Earthwork & Stormwater Drainage',
        name,
        company,
        email,
        phone,
        zip,
        notes,
        specsSummary,
        estimatedValueUSD: Math.round(parseFloat(priceMid.textContent.replace(/[^0-9]/g, '')) || 82500),
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
        btnSubmit.textContent = '✓ Specification Dispatched to Civil Contractor';
        btnSubmit.style.backgroundColor = '#10b981';
      }
    });
  }

  // Initial Run
  calculate();
});
