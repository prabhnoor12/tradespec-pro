/**
 * TradeSpec Pro™ — Subcontractor Partner Landing Page Logic
 * Manages Territory Checker, Subcontractor ROI Calculator, and Onboarding Form Interactions
 */

(function(window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const { TRADE_META } = window.TradeSpecData || {};
    if (!TRADE_META) {
      console.warn('[Landing Page] TradeSpecData not loaded.');
      return;
    }

    // --- 1. LIVE TERRITORY AVAILABILITY CHECKER ---
    const checkTerritoryBtn = document.getElementById('checkTerritoryBtn');
    const territoryZipInput = document.getElementById('territoryZip');
    const territoryTradeSelect = document.getElementById('territoryTrade');
    const territoryResultBox = document.getElementById('territoryResultBox');
    const territoryStatusBadge = document.getElementById('territoryStatusBadge');
    const territoryResultMessage = document.getElementById('territoryResultMessage');
    const territoryContractorCount = document.getElementById('territoryContractorCount');
    const territoryCapacityBar = document.getElementById('territoryCapacityBar');

    function checkTerritoryAvailability() {
      if (!territoryZipInput || !territoryResultBox) return;
      const zip = territoryZipInput.value.trim();
      if (!/^\d{5}$/.test(zip)) {
        alert('Please enter a valid 5-digit United States ZIP code.');
        territoryZipInput.focus();
        return;
      }

      const tradeKey = territoryTradeSelect ? territoryTradeSelect.value : 'charge';
      const tradeInfo = TRADE_META[tradeKey] || TRADE_META.charge;

      territoryResultBox.classList.remove('hidden');

      // Deterministic territory occupancy calculation based on zip digits
      const zipSum = zip.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
      const isOneTaken = zipSum % 3 !== 0;

      if (isOneTaken) {
        if (territoryStatusBadge) {
          territoryStatusBadge.textContent = '1 OF 2 SLOTS CLAIMED — 1 TERRITORY SLOT OPEN';
          territoryStatusBadge.className = 'territory-status-badge badge-warning';
        }
        if (territoryResultMessage) {
          territoryResultMessage.innerHTML = `ZIP <strong>${zip}</strong> has <strong>1 certified contractor</strong> registered in <strong>${tradeInfo.short}</strong>. Exactly <strong>1 exclusive territory license remains</strong> before this ZIP is locked for 12 months.`;
        }
        if (territoryContractorCount) territoryContractorCount.textContent = '1 / 2 Contractors Active';
        if (territoryCapacityBar) territoryCapacityBar.style.width = '50%';
      } else {
        if (territoryStatusBadge) {
          territoryStatusBadge.textContent = 'TERRITORY UNCLAIMED — 2 OF 2 SLOTS OPEN';
          territoryStatusBadge.className = 'territory-status-badge badge-success';
        }
        if (territoryResultMessage) {
          territoryResultMessage.innerHTML = `Good news! ZIP <strong>${zip}</strong> currently has <strong>0 certified contractors</strong> enrolled for <strong>${tradeInfo.short}</strong>. You will hold first-call rights on all commercial specs dispatched in this service radius.`;
        }
        if (territoryContractorCount) territoryContractorCount.textContent = '0 / 2 Contractors Active';
        if (territoryCapacityBar) territoryCapacityBar.style.width = '0%';
      }

      // Pre-fill application form below with verified zip & trade
      const appZip = document.getElementById('appZip');
      const appTrade = document.getElementById('appTrade');
      if (appZip) appZip.value = zip;
      if (appTrade) {
        appTrade.value = tradeKey;
        syncAppTradeToCheckboxes(tradeKey);
      }
    }

    if (checkTerritoryBtn) checkTerritoryBtn.addEventListener('click', checkTerritoryAvailability);
    if (territoryZipInput) {
      territoryZipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          checkTerritoryAvailability();
        }
      });
    }

    // --- 2. SUBCONTRACTOR REVENUE & ROI CALCULATOR ---
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
      if (!roiTrade || !roiLeads || !roiCloseRate) return;
      const t = TRADE_META[roiTrade.value] || TRADE_META.charge;
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

    // --- 3. APPLICATION TRADE & CHECKBOX SYNCHRONIZATION ---
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
      appTradeSelect.addEventListener('change', (e) => {
        syncAppTradeToCheckboxes(e.target.value);
      });
    }

    document.querySelectorAll('#appSourceCheckboxes .source-checkbox-card').forEach(card => {
      const cb = card.querySelector('input[type="checkbox"]');
      if (cb) {
        cb.addEventListener('change', () => {
          if (cb.checked) card.classList.add('checked');
          else card.classList.remove('checked');
        });
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#portal-section') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
})(window);
