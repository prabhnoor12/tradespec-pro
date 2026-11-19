/**
 * TradeSpec Pro™ — Contractor Application & Confirmation Logic
 * Handles contractor onboarding submissions, Supabase persistence, credential staging,
 * and clean navigation to the dedicated Contractor Console (console.html).
 */

(function(window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const { TRADE_META, escapeHtml } = window.TradeSpecData || {};
    const appForm = document.getElementById('partnerApplicationForm');
    const appSuccessMsg = document.getElementById('appSuccessMsg');
    const appConfirmationModal = document.getElementById('appConfirmationModal');
    const closeAppConfModalBtn = document.getElementById('closeAppConfModalBtn');
    const launchConsoleFromModalBtn = document.getElementById('launchConsoleFromModalBtn');

    if (appForm) {
      appForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selectedSources = Array.from(document.querySelectorAll('#appSourceCheckboxes input[name="lead_sources"]:checked'))
          .map(cb => cb.value);

        const chosenTrade = document.getElementById('appTrade') ? document.getElementById('appTrade').value : 'charge';
        if (selectedSources.length === 0 && chosenTrade) {
          selectedSources.push(chosenTrade);
        }

        const appData = {
          company: document.getElementById('appCompanyName') ? document.getElementById('appCompanyName').value.trim() : 'Registered Contractor',
          trade: chosenTrade,
          zip: document.getElementById('appZip') ? document.getElementById('appZip').value.trim() : '77002',
          contact: document.getElementById('appContact') ? document.getElementById('appContact').value.trim() : 'Estimator / Owner',
          phone: document.getElementById('appPhone') ? document.getElementById('appPhone').value.trim() : '(555) 000-0000',
          email: document.getElementById('appEmail') ? document.getElementById('appEmail').value.trim() : 'dispatch@contractor.com',
          radius: document.getElementById('appRadius') ? document.getElementById('appRadius').value : '60',
          leadSources: selectedSources,
          timestamp: new Date().toISOString()
        };

        // 1. Build newly registered contractor profile
        const newContractor = {
          companyName: appData.company,
          contactPerson: appData.contact,
          licenseNumber: `TX-LIC-${appData.zip}-${Math.floor(100000 + Math.random() * 900000)}`,
          insuranceBond: "$1,000,000 / $2,000,000 Commercial General Liability",
          dispatchPhone: appData.phone,
          dispatchEmail: appData.email,
          baseZip: appData.zip,
          radius: parseInt(appData.radius, 10) || 60,
          minJob: 2500,
          pin: "1234",
          activeSources: selectedSources.length > 0 ? [...selectedSources] : [chosenTrade || 'charge'],
          walletBalance: 150.00,
          autoReload: true,
          webhookUrl: "",
          webhookSecret: "",
          webhookAutoSync: true,
          transactions: [
            {
              date: new Date().toISOString().split('T')[0],
              desc: "Welcome Territory Dispatch Credit ($150)",
              amount: 150.00,
              balance: 150.00,
              type: "pos"
            }
          ]
        };

        // Save into persistent contractor storage
        localStorage.setItem('tradespec_partner_settings', JSON.stringify(newContractor));

        // 2. Persist to Supabase Backend
        let isSupabase = false;
        if (window.TradeSpecSupabase) {
          try {
            const appRes = await window.TradeSpecSupabase.submitApplication(appData);
            const regRes = await window.TradeSpecSupabase.registerContractor(newContractor);
            isSupabase = (appRes && appRes.isSupabase) || (regRes && regRes.isSupabase);
          } catch(err) {
            console.warn('[Application] Supabase registration warning:', err);
          }
        }

        // 3. Open Confirmation Modal
        if (appConfirmationModal) {
          const elComp = document.getElementById('confModalCompany');
          const elZip = document.getElementById('confModalZip');
          const elTrades = document.getElementById('confModalTrades');
          const elPin = document.getElementById('confModalPin');
          const elStatus = document.getElementById('confModalBackendStatus');

          if (elComp) elComp.textContent = appData.company;
          if (elZip) elZip.textContent = `${appData.zip} (${appData.radius} mi radius)`;
          if (elTrades) {
            elTrades.textContent = selectedSources
              .map(s => (TRADE_META && TRADE_META[s]) ? TRADE_META[s].short : s.toUpperCase())
              .join(', ');
          }
          if (elPin) elPin.textContent = '1234';
          if (elStatus) elStatus.textContent = isSupabase ? '🟢 Persisted to Supabase Live DB' : '🟡 Staged (Live)';

          appConfirmationModal.classList.remove('hidden');
        } else if (appSuccessMsg) {
          appSuccessMsg.classList.remove('hidden');
          appSuccessMsg.innerHTML = `<strong>✓ Application Received!</strong> Territory reserved for <strong>${escapeHtml(appData.company)}</strong> in ZIP ${escapeHtml(appData.zip)}. Access PIN: <code>1234</code>.`;
        }

        appForm.reset();
      });
    }

    if (closeAppConfModalBtn && appConfirmationModal) {
      closeAppConfModalBtn.addEventListener('click', () => {
        appConfirmationModal.classList.add('hidden');
      });
    }

    if (launchConsoleFromModalBtn) {
      launchConsoleFromModalBtn.addEventListener('click', () => {
        // Authenticate session and direct to the separate contractor console page
        sessionStorage.setItem('tradespec_auth', 'true');
        window.location.href = 'console.html';
      });
    }
  });
})(window);
