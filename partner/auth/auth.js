/**
 * TradeSpec Pro™ — B2B Subcontractor Auth Controller
 * Handles separated Login & Multi-Step Commercial Onboarding (partner/auth/)
 */

(function (window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const Store = window.PartnerStore;
    if (!Store) return;

    // --- 1. LOGIN PAGE CONTROLLER ---
    const loginForm = document.getElementById('partnerLoginForm');
    if (loginForm) {
      const loginAlert = document.getElementById('loginAlert');
      const submitBtn = document.getElementById('loginSubmitBtn');

      function showLoginError(msg) {
        if (!loginAlert) return;
        loginAlert.className = 'auth-alert error';
        loginAlert.textContent = msg;
        loginAlert.classList.remove('hidden');
      }

      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (loginAlert) loginAlert.classList.add('hidden');

        const email = (document.getElementById('loginEmail')?.value || '').trim().toLowerCase();
        const pin = (document.getElementById('loginPin')?.value || '').trim();

        if (!email || !pin) {
          showLoginError('Enter both your registered business email and access PIN.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Verifying B2B Credentials...';
        }

        let matchedContractor = null;

        // 1. Check live Supabase contractors table
        if (window.TradeSpecSupabase) {
          try {
            const res = await window.TradeSpecSupabase.getContractorProfile(pin);
            if (res && res.success && res.contractor) {
              const dbEmail = String(res.contractor.dispatchEmail || '').trim().toLowerCase();
              if (!dbEmail || dbEmail === email) {
                matchedContractor = res.contractor;
              }
            }
          } catch (err) {
            console.warn('[Auth] Supabase login check error:', err);
          }
        }

        // 2. Check locally registered contractor profile if Supabase didn't match
        if (!matchedContractor && Store.contractor) {
          const localEmail = String(Store.contractor.dispatchEmail || '').trim().toLowerCase();
          const localPin = String(Store.contractor.pin || '').trim();
          if (localEmail === email && localPin === pin) {
            matchedContractor = Store.contractor;
          }
        }

        if (matchedContractor) {
          Store.setSession(matchedContractor);
          window.location.href = '../index.html';
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In to Partner Portal →';
        }
        showLoginError('No active commercial partner account matched that email and PIN. Please verify your credentials or register a new contractor account.');
      });
    }

    // --- 2. MULTI-STEP B2B SIGNUP CONTROLLER ---
    const signupForm = document.getElementById('partnerSignupForm');
    if (signupForm) {
      let currentStep = 1;
      const panes = [
        document.getElementById('signupStep1'),
        document.getElementById('signupStep2'),
        document.getElementById('signupStep3')
      ];
      const pills = [
        document.getElementById('stepPill1'),
        document.getElementById('stepPill2'),
        document.getElementById('stepPill3')
      ];
      const alertBox = document.getElementById('signupAlert');
      const sourceContainer = document.getElementById('signupSourcesGrid');
      const territoryCheckBtn = document.getElementById('signupCheckTerritoryBtn');
      const territoryBox = document.getElementById('signupTerritoryStatus');

      // Populate all 9 TradeSpec Pro sources dynamically
      if (sourceContainer) {
        sourceContainer.innerHTML = Object.values(Store.TRADE_CATALOG).map((t, idx) => `
          <label class="auth-source-option">
            <input type="checkbox" name="signup_sources" value="${t.key}" ${idx === 0 ? 'checked' : ''}>
            <div>
              <strong>${Store.escapeHtml(t.short)}</strong>
              <span>$${t.semiPrice} semi / $${t.exclPrice} excl</span>
            </div>
          </label>
        `).join('');
      }

      function showSignupAlert(msg, type) {
        if (!alertBox) return;
        alertBox.className = `auth-alert ${type || 'error'}`;
        alertBox.textContent = msg;
        alertBox.classList.remove('hidden');
      }

      function hideSignupAlert() {
        if (alertBox) alertBox.classList.add('hidden');
      }

      function goToStep(step) {
        hideSignupAlert();
        currentStep = step;
        panes.forEach((p, i) => {
          if (p) p.classList.toggle('active', i + 1 === step);
        });
        pills.forEach((pl, i) => {
          if (!pl) return;
          pl.classList.toggle('active', i + 1 === step);
          pl.classList.toggle('done', i + 1 < step);
        });
        if (step === 3) populateReview();
      }

      function getSelectedSources() {
        return Array.from(document.querySelectorAll('input[name="signup_sources"]:checked')).map((el) => el.value);
      }

      function populateReview() {
        const company = document.getElementById('regCompany')?.value.trim();
        const lic = document.getElementById('regLicense')?.value.trim();
        const zip = document.getElementById('regZip')?.value.trim();
        const radius = document.getElementById('regRadius')?.value || '50';
        const sources = getSelectedSources();
        const excl = document.getElementById('regExclusivity')?.value === 'exclusive_1of1'
          ? '1-of-1 Exclusive Metro Lock'
          : 'Semi-Exclusive (Max 2 Partners)';

        const el = document.getElementById('signupReviewSummary');
        if (el) {
          const tradeNames = sources.map((k) => Store.TRADE_CATALOG[k]?.short || k).join(', ');
          el.innerHTML = `
            <div class="spec-kv-grid">
              <div class="spec-kv-item"><span class="spec-kv-label">Company</span><span class="spec-kv-val">${Store.escapeHtml(company)}</span></div>
              <div class="spec-kv-item"><span class="spec-kv-label">License #</span><span class="spec-kv-val">${Store.escapeHtml(lic)}</span></div>
              <div class="spec-kv-item"><span class="spec-kv-label">Territory</span><span class="spec-kv-val">ZIP ${Store.escapeHtml(zip)} (${radius} mi)</span></div>
              <div class="spec-kv-item"><span class="spec-kv-label">Exclusivity</span><span class="spec-kv-val">${Store.escapeHtml(excl)}</span></div>
            </div>
            <p class="form-hint"><strong>Active Lead Streams (${sources.length}):</strong> ${Store.escapeHtml(tradeNames)}</p>
          `;
        }
      }

      // Live Supabase Territory Availability Check inside Signup
      if (territoryCheckBtn) {
        territoryCheckBtn.addEventListener('click', async () => {
          const zip = (document.getElementById('regZip')?.value || '').trim();
          const sources = getSelectedSources();
          if (!/^\d{5}$/.test(zip)) {
            showSignupAlert('Enter a valid 5-digit US ZIP code before checking territory availability.', 'error');
            return;
          }
          if (sources.length === 0) {
            showSignupAlert('Select at least one commercial trade stream to verify territory availability.', 'error');
            return;
          }
          hideSignupAlert();
          territoryCheckBtn.disabled = true;
          territoryCheckBtn.textContent = 'Checking DB...';

          let result = { claimedCount: 0, slotsAvailable: 2, isFullyLocked: false, isLiveDb: false };
          if (window.TradeSpecSupabase && typeof window.TradeSpecSupabase.checkTerritorySlots === 'function') {
            result = await window.TradeSpecSupabase.checkTerritorySlots(zip, sources[0]);
          }

          territoryCheckBtn.disabled = false;
          territoryCheckBtn.textContent = 'Verify ZIP';

          if (territoryBox) {
            territoryBox.classList.remove('hidden');
            const tradeName = Store.TRADE_CATALOG[sources[0]]?.short || sources[0];
            if (result.isFullyLocked) {
              territoryBox.className = 'auth-alert error';
              territoryBox.textContent = `ZIP ${zip} (${tradeName}) is at FULL 2/2 capacity. Please choose an adjacent commercial ZIP or request waitlist priority.`;
            } else if (result.claimedCount === 1) {
              territoryBox.className = 'auth-alert warning';
              territoryBox.textContent = `1 of 2 territory slots taken in ZIP ${zip} (${tradeName}). Only 1 commercial seat remains open${result.isLiveDb ? ' (Supabase Verified)' : ''}.`;
            } else {
              territoryBox.className = 'auth-alert success';
              territoryBox.textContent = `Territory OPEN! 0 of 2 slots claimed in ZIP ${zip} (${tradeName}) — eligible for 1-of-1 Exclusive Metro Lock${result.isLiveDb ? ' (Supabase Verified)' : ''}.`;
            }
          }
        });
      }

      document.getElementById('nextToStep2Btn')?.addEventListener('click', () => {
        const company = document.getElementById('regCompany')?.value.trim();
        const lic = document.getElementById('regLicense')?.value.trim();
        const contact = document.getElementById('regContact')?.value.trim();
        const phone = document.getElementById('regPhone')?.value.trim();
        const email = document.getElementById('regEmail')?.value.trim();
        const pin = document.getElementById('regPin')?.value.trim();

        if (!company || !lic || !contact || !phone || !email || !/^\d{4,8}$/.test(pin || '')) {
          showSignupAlert('Complete all company, license, contact fields, and choose a 4–8 digit numeric Access PIN.', 'error');
          return;
        }
        goToStep(2);
      });

      document.getElementById('backToStep1Btn')?.addEventListener('click', () => goToStep(1));

      document.getElementById('nextToStep3Btn')?.addEventListener('click', () => {
        const zip = (document.getElementById('regZip')?.value || '').trim();
        const sources = getSelectedSources();
        if (!/^\d{5}$/.test(zip)) {
          showSignupAlert('Enter a valid 5-digit commercial base ZIP code.', 'error');
          return;
        }
        if (sources.length === 0) {
          showSignupAlert('Select at least 1 commercial lead source to receive RFPs.', 'error');
          return;
        }
        goToStep(3);
      });

      document.getElementById('backToStep2Btn')?.addEventListener('click', () => goToStep(2));

      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideSignupAlert();

        const submitBtn = document.getElementById('completeSignupBtn');
        const sources = getSelectedSources();
        const zip = document.getElementById('regZip').value.trim();

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Provisioning Partner Account...';
        }

        // Verify territory is not full before registering
        if (window.TradeSpecSupabase && typeof window.TradeSpecSupabase.checkTerritorySlots === 'function') {
          const check = await window.TradeSpecSupabase.checkTerritorySlots(zip, sources[0]);
          if (check && check.isFullyLocked) {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Create Partner Account & Open Dashboard →';
            }
            showSignupAlert(`Territory ZIP ${zip} is currently at 2/2 full capacity for ${Store.TRADE_CATALOG[sources[0]]?.short}. Go back to Step 2 and select an adjacent ZIP.`, 'error');
            return;
          }
        }

        const contractorProfile = {
          companyName: document.getElementById('regCompany').value.trim(),
          licenseNumber: document.getElementById('regLicense').value.trim(),
          insuranceBond: document.getElementById('regInsurance').value,
          contactPerson: document.getElementById('regContact').value.trim(),
          dispatchPhone: document.getElementById('regPhone').value.trim(),
          dispatchEmail: document.getElementById('regEmail').value.trim().toLowerCase(),
          pin: document.getElementById('regPin').value.trim(),
          baseZip: zip,
          radius: parseInt(document.getElementById('regRadius').value, 10) || 50,
          activeSources: sources,
          exclusivityMode: document.getElementById('regExclusivity').value,
          minJob: parseInt(document.getElementById('regMinJob').value, 10) || 15000,
          walletBalance: 250, // First-Spec Test Drive Welcome Credit
          autoReload: true,
          webhookUrl: ''
        };

        // Persist to Supabase
        if (window.TradeSpecSupabase) {
          try {
            await window.TradeSpecSupabase.submitApplication({
              company: contractorProfile.companyName,
              trade: sources[0],
              zip: contractorProfile.baseZip,
              radius: contractorProfile.radius,
              leadSources: sources,
              contact: contractorProfile.contactPerson,
              phone: contractorProfile.dispatchPhone,
              email: contractorProfile.dispatchEmail
            });
            const regRes = await window.TradeSpecSupabase.registerContractor(contractorProfile);
            if (regRes && regRes.contractor && regRes.contractor.id) {
              contractorProfile.id = regRes.contractor.id;
            }
          } catch (err) {
            console.warn('[Signup] Supabase persistence warning:', err);
          }
        }

        Store.setSession(contractorProfile);
        window.location.href = '../index.html';
      });
    }
  });
})(window);
