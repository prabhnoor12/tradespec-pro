/**
 * TradeSpec Pro™ — Jurisdiction Quick-Check Estimator Engine
 * Powers pre-configured interactive engineering checks on programmatic code pages.
 */

(function (window) {
  'use strict';

  function fmt(num, decimals) {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || 0
    });
  }

  function initQuickEstimator() {
    const root = document.getElementById('jurisdictionQuickCalc');
    if (!root) return;

    const mode = root.getAttribute('data-calc-mode');
    const inputs = root.querySelectorAll('input, select');

    function recalc() {
      if (mode === 'crane') {
        const loadLbs = parseFloat(document.getElementById('qc_load')?.value) || 12000;
        const radiusFt = parseFloat(document.getElementById('qc_radius')?.value) || 55;
        const soilPsf = parseFloat(document.getElementById('qc_soil')?.value) || 2000;
        const riggingFactor = parseFloat(root.getAttribute('data-rigging-factor')) || 1.15;

        const grossLoad = loadLbs * riggingFactor;
        // Leverage-based approximate mobile crane class tonnage
        const momentFtLbs = grossLoad * radiusFt;
        const estTonnage = Math.max(25, Math.ceil((momentFtLbs / 11500) / 5) * 5);
        // Conservative single-corner outrigger reaction (~75% of crane weight + gross pick)
        const estCraneWeight = estTonnage * 1100;
        const cornerForce = Math.round(estCraneWeight * 0.68 + grossLoad * 0.85);
        const matAreaSqFt = Math.max(9, cornerForce / soilPsf);
        const matSideFt = Math.sqrt(matAreaSqFt);

        setVal('qc_out1', `${estTonnage}-Ton Class`);
        setVal('qc_out2', `${fmt(grossLoad)} lbs`);
        setVal('qc_out3', `${fmt(cornerForce)} lbs`);
        setVal('qc_out4', `${matSideFt.toFixed(1)} ft × ${matSideFt.toFixed(1)} ft (${matAreaSqFt.toFixed(1)} sq ft)`);
      }

      if (mode === 'grease') {
        const sinks = parseFloat(document.getElementById('qc_sinks')?.value) || 3;
        const compGal = parseFloat(document.getElementById('qc_vol')?.value) || 18;
        const seats = parseFloat(document.getElementById('qc_seats')?.value) || 85;
        const codeStyle = root.getAttribute('data-code-style') || 'UPC';

        // Hydromechanical GPM calculation (75% fill factor, 1-min drain)
        const totalGal = sinks * compGal;
        const gpm = Math.max(20, Math.ceil((totalGal * 0.75) / 5) * 5);
        const lbsRetention = gpm * 2;
        // Gravity interceptor sizing estimate
        let ggiGal = 750;
        if (codeStyle === 'UPC') {
          // DFU / seat-based California/UPC typical minimum
          const dfuEst = Math.max(8, Math.round(sinks * 3 + seats / 18));
          if (dfuEst <= 8) ggiGal = 500;
          else if (dfuEst <= 21) ggiGal = 750;
          else if (dfuEst <= 35) ggiGal = 1000;
          else if (dfuEst <= 90) ggiGal = 1250;
          else ggiGal = 1500;
        } else {
          ggiGal = Math.max(750, Math.ceil((seats * 12) / 250) * 250);
        }

        setVal('qc_out1', `${gpm} GPM`);
        setVal('qc_out2', `${fmt(lbsRetention)} lbs FOG`);
        setVal('qc_out3', `${fmt(ggiGal)} Gal Vault`);
        setVal('qc_out4', codeStyle === 'UPC' ? 'UPC Table 1014.3.6' : 'IPC §1003.3.5');
      }

      if (mode === 'ev') {
        const ports = parseFloat(document.getElementById('qc_ports')?.value) || 10;
        const kwPerPort = parseFloat(document.getElementById('qc_kw')?.value) || 19.2;
        const emsRatio = parseFloat(document.getElementById('qc_ems')?.value) || 1.0;

        // NEC 625.41: 125% continuous load factor; NEC 625.42 EMS sharing factor
        const rawKw = ports * kwPerPort * emsRatio;
        const necContinuousKw = rawKw * 1.25;
        // 480V 3-phase Amps = (kW * 1000) / (480 * 1.732)
        const amps480 = Math.ceil((necContinuousKw * 1000) / (480 * 1.732));
        const transformerKva = Math.ceil((necContinuousKw / 0.85) / 25) * 25;

        setVal('qc_out1', `${necContinuousKw.toFixed(1)} kW`);
        setVal('qc_out2', `${fmt(amps480)} A @ 480V 3Ø`);
        setVal('qc_out3', `${fmt(transformerKva)} kVA`);
        setVal('qc_out4', emsRatio < 1 ? 'NEC 625.42 EMS Active' : 'NEC 625.41 (125%)');
      }

      if (mode === 'stormwater') {
        const acres = parseFloat(document.getElementById('qc_acres')?.value) || 2.5;
        const cVal = parseFloat(document.getElementById('qc_cval')?.value) || 0.85;
        const intensity = parseFloat(document.getElementById('qc_intensity')?.value) || 7.2;

        // Rational Method: Q = C * I * A (cfs)
        const qCfs = cVal * intensity * acres;
        const gpmPeak = qCfs * 448.83;
        // Rough 1-hour detention volume estimate in cubic feet
        const detCuFt = Math.round(qCfs * 3600 * 0.45);

        setVal('qc_out1', `${qCfs.toFixed(2)} cfs`);
        setVal('qc_out2', `${fmt(Math.round(gpmPeak))} GPM`);
        setVal('qc_out3', `${fmt(detCuFt)} cu ft`);
        setVal('qc_out4', `C = ${cVal.toFixed(2)} | I = ${intensity.toFixed(1)} in/hr`);
      }

      if (mode === 'ti') {
        const sqft = parseFloat(document.getElementById('qc_sqft')?.value) || 4500;
        const occFactor = parseFloat(document.getElementById('qc_occ')?.value) || 150;
        const costPsf = parseFloat(document.getElementById('qc_cost')?.value) || 145;

        const occupantLoad = Math.ceil(sqft / occFactor);
        const exitsReq = occupantLoad >= 50 ? (occupantLoad > 500 ? 3 : 2) : 1;
        const estBudget = sqft * costPsf;
        const adaTrigger = estBudget >= 50000 ? 'Mandatory ADA / Accessibility Review' : 'Verify Local Threshold';

        setVal('qc_out1', `${fmt(occupantLoad)} Occupants`);
        setVal('qc_out2', `${exitsReq} Exits Min.`);
        setVal('qc_out3', `$${fmt(estBudget)}`);
        setVal('qc_out4', adaTrigger);
      }

      if (mode === 'cold') {
        const sqft = parseFloat(document.getElementById('qc_sqft')?.value) || 400;
        const boxTemp = parseFloat(document.getElementById('qc_boxtemp')?.value) || 35;
        const ambTemp = parseFloat(document.getElementById('qc_ambtemp')?.value) || 95;
        const latentMult = parseFloat(root.getAttribute('data-latent-mult')) || 1.15;

        const deltaT = Math.max(20, ambTemp - boxTemp);
        // Engineering rule-of-thumb hourly BTU load adjusted for box delta-T & local humidity
        const baseBtuPerSqFt = boxTemp <= 10 ? 48 : 30;
        const totalBtuHr = Math.round(sqft * baseBtuPerSqFt * (deltaT / 60) * latentMult);
        const tonsRefrig = totalBtuHr / 12000;
        const estHp = Math.max(0.75, Math.ceil((tonsRefrig * 1.35) * 4) / 4);

        setVal('qc_out1', `${fmt(totalBtuHr)} BTU/hr`);
        setVal('qc_out2', `${tonsRefrig.toFixed(2)} Tons Refrig.`);
        setVal('qc_out3', `${estHp.toFixed(2)} HP Condenser`);
        setVal('qc_out4', `ΔT = ${deltaT}°F (${boxTemp <= 10 ? 'Freezer' : 'Cooler'})`);
      }

      if (mode === 'well') {
        const depthFt = parseFloat(document.getElementById('qc_depth')?.value) || 400;
        const gpm = parseFloat(document.getElementById('qc_gpm')?.value) || 45;
        const costPerFt = parseFloat(document.getElementById('qc_costft')?.value) || 55;

        // Total Dynamic Head (TDH) approx = static/pumping depth (75% of well depth) + 115 ft (50 psi surface) + friction
        const tdhFt = Math.round(depthFt * 0.72 + 125);
        // Submersible Pump HP = (GPM * TDH) / (3960 * 0.62 efficiency)
        const rawHp = (gpm * tdhFt) / (3960 * 0.62);
        const stdHps = [1, 1.5, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 40, 50];
        const pumpHp = stdHps.find((h) => h >= rawHp) || Math.ceil(rawHp / 10) * 10;
        const casingDia = gpm > 100 ? '8" Steel / PVC' : (gpm > 40 ? '6" Sch 80 / Steel' : '4"–6" PVC');
        const estCost = Math.round(depthFt * costPerFt + pumpHp * 950 + 4500);

        setVal('qc_out1', `${fmt(tdhFt)} ft TDH`);
        setVal('qc_out2', `${pumpHp} HP Submersible`);
        setVal('qc_out3', casingDia);
        setVal('qc_out4', `$${fmt(estCost)}`);
      }

      if (mode === 'racking') {
        const sqft = parseFloat(document.getElementById('qc_sqft')?.value) || 25000;
        const clearHt = parseFloat(document.getElementById('qc_height')?.value) || 28;
        const aisleFt = parseFloat(document.getElementById('qc_aisle')?.value) || 10.5;

        // Usable storage footprint (~62% after docks/staging)
        const usableSqFt = sqft * 0.62;
        // Footprints per pallet bay (2 pallets wide = 8.5 ft × (4 ft rack + half aisle))
        const sqFtPerGroundPallet = (4.25 * (4.0 + aisleFt / 2));
        const groundPositions = Math.floor(usableSqFt / sqFtPerGroundPallet);
        // Beam levels based on 5.5 ft per pallet level with 3 ft sprinkler clearance
        const levels = Math.max(2, Math.floor((clearHt - 3) / 5.5));
        const totalPallets = groundPositions * levels;
        const highPiled = clearHt > 15 ? 'IFC Ch. 32 High-Piled (>12 ft)' : 'Standard Storage';

        setVal('qc_out1', `${fmt(totalPallets)} Pallets`);
        setVal('qc_out2', `${levels} Levels High`);
        setVal('qc_out3', `${fmt(groundPositions)} Ground Pos.`);
        setVal('qc_out4', highPiled);
      }

      if (mode === 'foam') {
        const sqft = parseFloat(document.getElementById('qc_sqft')?.value) || 6000;
        const thickIn = parseFloat(document.getElementById('qc_thick')?.value) || 3;
        const foamType = document.getElementById('qc_type')?.value || 'closed';

        const rPerIn = foamType === 'closed' ? 6.5 : 3.7;
        const yieldPerSet = foamType === 'closed' ? 4000 : 12000; // board feet per 2-drum set
        const costPerBf = foamType === 'closed' ? 1.45 : 0.65;

        const boardFeet = Math.round(sqft * thickIn * 1.10); // 10% waste/overspray
        const totalR = (thickIn * rPerIn).toFixed(1);
        const setsNeeded = (boardFeet / yieldPerSet).toFixed(1);
        const estBudget = Math.round(boardFeet * costPerBf);

        setVal('qc_out1', `${fmt(boardFeet)} Board Ft`);
        setVal('qc_out2', `R-${totalR}`);
        setVal('qc_out3', `${setsNeeded} Chemical Sets`);
        setVal('qc_out4', `$${fmt(estBudget)}`);
      }
    }

    function setVal(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    inputs.forEach((el) => {
      el.addEventListener('input', recalc);
      el.addEventListener('change', recalc);
    });

    recalc();
  }

  document.addEventListener('DOMContentLoaded', initQuickEstimator);
})(window);
