/**
 * TradeSpec Pro™ — Contextual Spec Capture & High-Conversion Quote Engine
 * Features:
 *  1. Dynamic Output-Mirrored CTA Bar directly inside .results-column
 *  2. Code-Trigger Urgency Callout when calculation crosses permit/code thresholds
 *  3. 1-Click "Copy Spec" plain-text summary for Slack/Teams/Email sharing
 *  4. Soft "Email / Save Stamped Spec PDF" capture with zero-trap print escape hatch
 *  5. Live ZIP coverage micro-confirmation + cross-tool ZIP memory + US phone validation
 *  6. Slim mobile-only sticky bottom CTA pill + silent B2B email-domain enrichment
 */

(function (window, document) {
  'use strict';

  const SAVED_ZIP_KEY = 'tradespec_user_zip_v1';
  // Paste your free Cloudflare Turnstile Site Key here once your custom domain is live
  const TURNSTILE_SITE_KEY = window.TRADESPEC_TURNSTILE_KEY || '';
  const FREE_DOMAINS = new Set([
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
    'icloud.com', 'aol.com', 'proton.me', 'protonmail.com', 'live.com', 'msn.com'
  ]);

  const TOOL_CONFIG = {
    'charge-spec': {
      trade: 'charge',
      title: 'Commercial EV Fleet & Infrastructure',
      primaryId: 'out-service-amps',
      secondaryId: 'out-service-sub',
      noun: 'EV Spec',
      unitHint: 'A',
      btnLabel: (val) => val ? `⚡ Get EV Quotes (${val}) →` : '⚡ Get EV Fleet Quotes →',
      basePrice: 225,
      urgentPrice: 375,
      codeCheck: (num) => num >= 200 ? 'NEC 625 / Utility Trigger: 480V Service or Transformer Review Recommended' : ''
    },
    'cold-spec': {
      trade: 'cold',
      title: 'Walk-In Cooler & Cold Storage',
      primaryId: 'out-btu-hr',
      secondaryId: 'out-compressor-hp',
      noun: 'Cooler Spec',
      unitHint: 'BTU/hr',
      btnLabel: (val) => val ? `⚡ Get Cooler Quotes (${val}) →` : '⚡ Get Cold Storage Quotes →',
      basePrice: 145,
      urgentPrice: 265,
      codeCheck: (num) => num >= 18000 ? 'ASHRAE / Title 24 Trigger: High-Capacity Condensing & Low-GWP Spec Required' : ''
    },
    'crane-lift': {
      trade: 'crane',
      title: 'Mobile Crane Pick & Rigging',
      primaryId: 'recommendedTonnage',
      secondaryId: 'grossWeightVal',
      noun: 'Crane Pick',
      unitHint: '',
      btnLabel: (val) => {
        const m = String(val || '').match(/(\d+[\-\s]*Ton)/i);
        return m ? `⚡ Get ${m[1]} Crane Quotes →` : '⚡ Get Mobile Crane Quotes →';
      },
      basePrice: 125,
      urgentPrice: 225,
      codeCheck: (num) => num >= 50 ? 'OSHA 1926 / ASME B30.5 Trigger: Outrigger Mat & Lift Plan Recommended' : ''
    },
    'grease-trap': {
      trade: 'grease',
      title: 'Commercial Grease Trap & Hood CFM',
      primaryId: 'metricTrapGPM',
      secondaryId: 'metricTurnkeyBudget',
      noun: 'Grease Trap',
      unitHint: 'GPM',
      btnLabel: (val) => val ? `⚡ Get ${val} Trap Quotes →` : '⚡ Get Grease Trap Quotes →',
      basePrice: 140,
      urgentPrice: 250,
      codeCheck: (num) => num >= 50 ? 'UPC / IPC FOG Trigger: Gravity Vault or Municipal FOG Permit Likely Required' : ''
    },
    'pallet-racking': {
      trade: 'racking',
      title: 'Warehouse Pallet Racking Layout',
      primaryId: 'totalPalletPositions',
      secondaryId: 'metricSteelBudget',
      noun: 'Rack Layout',
      unitHint: 'Pallets',
      btnLabel: (val) => {
        const num = String(val || '').replace(/pallets?/i, '').trim();
        return num ? `⚡ Get Quotes (${num} Pallets) →` : '⚡ Get Pallet Rack Quotes →';
      },
      basePrice: 200,
      urgentPrice: 350,
      codeCheck: (num) => num >= 300 ? 'IFC Ch. 32 Trigger: High-Piled Storage Fire Permit & RMI Seismic Calc Likely Required' : ''
    },
    'permit-spec': {
      trade: 'permit',
      title: 'Commercial Tenant Improvement (TI)',
      primaryId: 'out-occupant-load',
      secondaryId: 'out-egress-doors',
      noun: 'TI Spec',
      unitHint: 'Occ.',
      btnLabel: (val) => val ? `⚡ Get TI Quotes (${val}) →` : '⚡ Get Commercial TI Quotes →',
      basePrice: 225,
      urgentPrice: 375,
      codeCheck: (num) => num >= 50 ? 'IBC §1006 Trigger: 2+ Remote Exits & Accessibility / Plan Check Required' : ''
    },
    'site-spec': {
      trade: 'site',
      title: 'Civil Stormwater & Earthwork',
      primaryId: 'out-peak-cfs',
      secondaryId: 'out-pond-volume',
      noun: 'Stormwater Spec',
      unitHint: 'cfs',
      btnLabel: (val) => val ? `⚡ Get Site Quotes (${val}) →` : '⚡ Get Stormwater Quotes →',
      basePrice: 185,
      urgentPrice: 325,
      codeCheck: (num) => num >= 5 ? 'Stormwater Permit Trigger: On-Site Detention & Civil PE Grading Review Likely Required' : ''
    },
    'spray-foam': {
      trade: 'foam',
      title: 'Commercial Spray Foam Insulation',
      primaryId: 'totalBoardFeet',
      secondaryId: 'metricRValue',
      noun: 'Spray Foam',
      unitHint: 'BF',
      btnLabel: (val) => {
        const num = String(val || '').replace(/(bd\s*ft|board\s*feet|bf)/i, '').trim();
        return num ? `⚡ Get Foam Quotes (${num} BF) →` : '⚡ Get Spray Foam Quotes →';
      },
      basePrice: 115,
      urgentPrice: 195,
      codeCheck: (num) => num >= 5000 ? 'IBC §2603.4 Trigger: 15-Min Thermal / Intumescent Fire Barrier Required' : ''
    },
    'well-drilling': {
      trade: 'well',
      title: 'Commercial Water Well & Pump',
      primaryId: 'recommendedPumpHp',
      secondaryId: 'metricTurnkeyBudget',
      noun: 'Water Well',
      unitHint: 'HP',
      btnLabel: (val) => val ? `⚡ Get Well Quotes (${val}) →` : '⚡ Get Water Well Quotes →',
      basePrice: 165,
      urgentPrice: 295,
      codeCheck: (num) => num >= 5 ? 'Aquifer Permit Trigger: Licensed Driller, Sanitary Seal & District Permit Required' : ''
    }
  };

  function detectTool() {
    const path = window.location.pathname.toLowerCase();
    for (const slug of Object.keys(TOOL_CONFIG)) {
      if (path.includes('/' + slug + '/') || path.endsWith('/' + slug)) {
        return { slug, ...TOOL_CONFIG[slug] };
      }
    }
    return null;
  }

  function extractFirstNumber(text) {
    const m = String(text || '').replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : 0;
  }

  function formatPhoneUS(raw) {
    const digits = String(raw || '').replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function isValidUSPhone(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length !== 10) return false;
    if (/^(\d)\1{9}$/.test(digits)) return false;
    if (digits === '1234567890' || digits === '0123456789') return false;
    if (digits[0] === '0' || digits[0] === '1') return false;
    if (digits[3] === '0' || digits[3] === '1') return false;
    return true;
  }

  function extractCommercialDomain(email) {
    const parts = String(email || '').trim().toLowerCase().split('@');
    if (parts.length !== 2) return '';
    const domain = parts[1];
    return FREE_DOMAINS.has(domain) ? '' : domain;
  }

  function readLiveSpec(cfg) {
    const pEl = document.getElementById(cfg.primaryId);
    const sEl = document.getElementById(cfg.secondaryId);
    const primary = pEl ? pEl.textContent.trim().replace(/\s+/g, ' ') : '';
    const secondary = sEl ? sEl.textContent.trim().replace(/\s+/g, ' ') : '';
    const shortPrimary = primary.length > 32 ? primary.slice(0, 32).trim() + '…' : primary;
    const primaryNum = extractFirstNumber(primary);
    const codeAlert = typeof cfg.codeCheck === 'function' ? cfg.codeCheck(primaryNum) : '';
    return { primary, secondary, shortPrimary, codeAlert };
  }

  function initSpecCapture() {
    const cfg = detectTool();
    if (!cfg) return;

    const resultsCol = document.querySelector('.results-column');
    if (!resultsCol || document.getElementById('tspCapBar')) return;

    const savedZip = localStorage.getItem(SAVED_ZIP_KEY) || '';

    // 1. Inject Contextual Action Bar cleanly inside .results-column
    const bar = document.createElement('div');
    bar.id = 'tspCapBar';
    bar.className = 'tsp-cap-bar';
    bar.innerHTML = `
      <div class="tsp-cap-bar-top">
        <span class="tsp-cap-eyebrow">⚡ Calculated Engineering Spec Ready</span>
        <span class="tsp-cap-trust-chip">Max 2 Vetted Contractors • Zero Spam</span>
      </div>
      <div id="tspCapCodeAlert" class="tsp-cap-code-alert" hidden></div>
      <h3 class="tsp-cap-headline" id="tspCapBarHeadline">Save Your ${cfg.noun} or Get Local Commercial Pricing</h3>
      <p class="tsp-cap-sub" id="tspCapBarSub">Lock in your calculated parameters as a printable engineering submittal, or attach them directly to 1–2 licensed local bids.</p>
      <div class="tsp-cap-actions">
        <button type="button" class="tsp-cap-btn-primary" id="tspCapQuoteBtn">⚡ Get Firm Quotes for This ${cfg.noun} &rarr;</button>
        <button type="button" class="tsp-cap-btn-secondary" id="tspCapPdfBtn">📄 Save Spec PDF</button>
        <button type="button" class="tsp-cap-btn-ghost" id="tspCapCopyBtn" title="Copy formatted spec for Slack or Email">📋 Copy Spec</button>
      </div>
    `;

    if (resultsCol.children.length > 0) {
      resultsCol.insertBefore(bar, resultsCol.children[1] || null);
    } else {
      resultsCol.appendChild(bar);
    }

    // 2. Slim Mobile-Only Sticky Bottom CTA
    const mobileSticky = document.createElement('div');
    mobileSticky.id = 'tspCapMobileSticky';
    mobileSticky.className = 'tsp-cap-mobile-sticky';
    mobileSticky.hidden = true;
    mobileSticky.innerHTML = `
      <button type="button" class="tsp-cap-mobile-sticky-btn" id="tspCapMobileBtn">⚡ Get Quotes for This ${cfg.noun} &rarr;</button>
      <button type="button" class="tsp-cap-mobile-dismiss" id="tspCapMobileDismiss" aria-label="Dismiss">&times;</button>
    `;
    document.body.appendChild(mobileSticky);

    let mobileDismissed = false;
    mobileSticky.querySelector('#tspCapMobileDismiss')?.addEventListener('click', () => {
      mobileDismissed = true;
      mobileSticky.hidden = true;
    });
    window.addEventListener('scroll', () => {
      if (mobileDismissed) return;
      mobileSticky.hidden = window.scrollY < 320;
    }, { passive: true });

    // 3. Build Soft Capture Modal
    const overlay = document.createElement('div');
    overlay.id = 'tspCapOverlay';
    overlay.className = 'tsp-cap-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'tspCapModalTitle');

    overlay.innerHTML = `
      <div class="tsp-cap-modal">
        <div class="tsp-cap-modal-head">
          <div>
            <span class="tsp-cap-eyebrow" id="tspCapModalEyebrow">📄 Engineering Spec Submittal</span>
            <h3 class="tsp-cap-modal-title" id="tspCapModalTitle">Save Your Stamped Spec Sheet</h3>
          </div>
          <button type="button" class="tsp-cap-close" id="tspCapCloseBtn" aria-label="Close">&times;</button>
        </div>

        <div class="tsp-cap-spec-pill" id="tspCapSpecPill">
          Calculated Spec: <strong>Ready</strong>
        </div>

        <form id="tspCapForm" novalidate>
          <div class="tsp-cap-form-grid">
            <div class="tsp-cap-field full">
              <label class="tsp-cap-label">Project Timeline / Urgency *</label>
              <div class="tsp-cap-timeline-grid" role="radiogroup" aria-label="Project Timeline">
                <button type="button" class="tsp-cap-time-pill active" data-timeline="Immediate (< 2 wks)">
                  🔥 Immediate
                  <span>&lt; 2 Weeks</span>
                </button>
                <button type="button" class="tsp-cap-time-pill" data-timeline="30–60 Days">
                  📅 30–60 Days
                  <span>Active Planning</span>
                </button>
                <button type="button" class="tsp-cap-time-pill" data-timeline="Budgeting / Permitting">
                  📋 Budgeting
                  <span>Early Estimate</span>
                </button>
              </div>
            </div>

            <div class="tsp-cap-field">
              <label class="tsp-cap-label" for="tspCapName">Your Name / Company *</label>
              <input class="tsp-cap-input" type="text" id="tspCapName" placeholder="e.g., Alex Morgan / Apex GC" required>
            </div>

            <div class="tsp-cap-field">
              <label class="tsp-cap-label" for="tspCapZip">Project 5-Digit ZIP *</label>
              <input class="tsp-cap-input" type="text" id="tspCapZip" maxlength="5" inputmode="numeric" placeholder="e.g., 77002" value="${savedZip}" required>
              <div id="tspCapZipOk" class="tsp-cap-zip-ok" hidden></div>
            </div>

            <div class="tsp-cap-field">
              <label class="tsp-cap-label" for="tspCapPhone">Direct Phone (Validated) *</label>
              <input class="tsp-cap-input" type="tel" id="tspCapPhone" placeholder="(713) 555-0194" inputmode="tel" maxlength="14" required>
            </div>

            <div class="tsp-cap-field">
              <label class="tsp-cap-label" for="tspCapEmail">Work Email (For Spec PDF) *</label>
              <input class="tsp-cap-input" type="email" id="tspCapEmail" placeholder="name@company.com" required>
            </div>
          </div>

          <label class="tsp-cap-optin">
            <input type="checkbox" id="tspCapMatchOptIn" checked>
            <span><strong>Also match me with 1–2 licensed local contractors</strong> for firm pricing on this exact spec sheet (strictly capped at 2 contractors — zero spam).</span>
          </label>

          <!-- Invisible Anti-Bot Honeypot (Hidden off-screen for humans; traps automated spambots) -->
          <div class="tsp-cap-hp" aria-hidden="true">
            <label for="tspCapWebsite">Company Website</label>
            <input type="text" id="tspCapWebsite" name="company_website_url" tabindex="-1" autocomplete="off">
          </div>

          <!-- Optional Cloudflare Turnstile Invisible Widget Mount -->
          <div id="tspCapTurnstileBox" class="tsp-cap-turnstile" hidden></div>

          <div id="tspCapError" class="tsp-cap-error" hidden></div>

          <button type="submit" class="tsp-cap-submit" id="tspCapSubmitBtn">Save Spec PDF &amp; Request Firm Quotes &rarr;</button>
          <div class="tsp-cap-trust-foot">🔒 Your spec stays private • Max 2 licensed contractors • Avg. bid turnaround &lt; 2 hrs</div>

          <div class="tsp-cap-escape">
            <button type="button" class="tsp-cap-escape-btn" id="tspCapPrintRawBtn">Just print raw worksheet without saving &rarr;</button>
          </div>
        </form>

        <div id="tspCapSuccess" class="tsp-cap-success-box" hidden>
          <div class="tsp-cap-success-icon">✓</div>
          <h3 class="tsp-cap-modal-title" style="margin-bottom:0.4rem;">Spec Sheet Saved &amp; Ready!</h3>
          <p class="tsp-cap-sub" id="tspCapSuccessMsg" style="margin-bottom:1.1rem;">Your calculated engineering specs have been logged.</p>
          <button type="button" class="tsp-cap-btn-primary" id="tspCapPrintNowBtn" style="width:100%;">🖨️ Print / Save PDF Spec Sheet Now</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // 4. Live DOM Mirroring + Code-Trigger Callout
    let selectedTimeline = 'Immediate (< 2 wks)';

    function syncLiveOutput() {
      const spec = readLiveSpec(cfg);
      const qBtn = document.getElementById('tspCapQuoteBtn');
      const mBtn = document.getElementById('tspCapMobileBtn');
      const pill = document.getElementById('tspCapSpecPill');
      const codeAlertEl = document.getElementById('tspCapCodeAlert');

      const compactLabel = typeof cfg.btnLabel === 'function'
        ? cfg.btnLabel(spec.shortPrimary)
        : `⚡ Get ${cfg.noun} Quotes →`;

      if (qBtn) {
        qBtn.textContent = compactLabel;
      }
      if (mBtn) {
        mBtn.textContent = compactLabel;
      }
      if (codeAlertEl) {
        if (spec.codeAlert) {
          codeAlertEl.textContent = `⚠️ ${spec.codeAlert}`;
          codeAlertEl.hidden = false;
        } else {
          codeAlertEl.hidden = true;
        }
      }
      if (pill) {
        const parts = [];
        if (spec.primary) parts.push(`<strong>${spec.primary}</strong>`);
        if (spec.secondary && spec.secondary !== spec.primary) parts.push(`<span>(${spec.secondary})</span>`);
        pill.innerHTML = `${cfg.title}: ${parts.join(' ') || '<strong>Live Spec Ready</strong>'}`;
      }
    }

    syncLiveOutput();

    const observer = new MutationObserver(() => syncLiveOutput());
    const pNode = document.getElementById(cfg.primaryId);
    const sNode = document.getElementById(cfg.secondaryId);
    if (pNode) observer.observe(pNode, { childList: true, characterData: true, subtree: true });
    if (sNode) observer.observe(sNode, { childList: true, characterData: true, subtree: true });

    // 5. Copy Spec 1-Click Share Button
    const copyBtn = document.getElementById('tspCapCopyBtn');
    copyBtn?.addEventListener('click', () => {
      const spec = readLiveSpec(cfg);
      const summary = [
        `TradeSpec Pro™ — ${cfg.title}`,
        `Primary Spec: ${spec.primary || 'Calculated'}`,
        spec.secondary ? `Secondary Metric: ${spec.secondary}` : '',
        spec.codeAlert ? `Code Note: ${spec.codeAlert}` : '',
        `Calculator Link: ${window.location.href}`
      ].filter(Boolean).join('\n');

      navigator.clipboard?.writeText(summary).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = orig; }, 2200);
      });
    });

    // 6. Modal Open / Close / ZIP Coverage Micro-Confirmation
    const form = document.getElementById('tspCapForm');
    const successBox = document.getElementById('tspCapSuccess');
    const errorBox = document.getElementById('tspCapError');
    const zipInput = document.getElementById('tspCapZip');
    const zipOkEl = document.getElementById('tspCapZipOk');
    const phoneInput = document.getElementById('tspCapPhone');
    const optInCheck = document.getElementById('tspCapMatchOptIn');
    const modalTitle = document.getElementById('tspCapModalTitle');
    const submitBtn = document.getElementById('tspCapSubmitBtn');

    function updateZipFeedback() {
      const z = (zipInput?.value || '').trim();
      if (/^\d{5}$/.test(z)) {
        localStorage.setItem(SAVED_ZIP_KEY, z);
        if (zipOkEl) {
          zipOkEl.textContent = `✓ Commercial coverage active near ZIP ${z} • Est. response < 2 hrs`;
          zipOkEl.hidden = false;
        }
      } else if (zipOkEl) {
        zipOkEl.hidden = true;
      }
    }

    zipInput?.addEventListener('input', () => {
      zipInput.value = zipInput.value.replace(/\D/g, '').slice(0, 5);
      updateZipFeedback();
    });

    let modalOpenedAt = 0;
    let turnstileToken = '';
    let turnstileLoaded = false;

    function ensureTurnstile() {
      if (!TURNSTILE_SITE_KEY) return;
      const box = document.getElementById('tspCapTurnstileBox');
      if (box) box.hidden = false;
      if (turnstileLoaded) return;
      turnstileLoaded = true;

      const mountWidget = () => {
        if (window.turnstile && box) {
          window.turnstile.render(box, {
            sitekey: TURNSTILE_SITE_KEY,
            theme: 'dark',
            callback: (tok) => { turnstileToken = tok; },
            'expired-callback': () => { turnstileToken = ''; }
          });
        }
      };

      if (window.turnstile) {
        mountWidget();
      } else {
        const s = document.createElement('script');
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.defer = true;
        s.onload = mountWidget;
        document.head.appendChild(s);
      }
    }

    function openModal(mode) {
      modalOpenedAt = Date.now();
      ensureTurnstile();
      syncLiveOutput();
      updateZipFeedback();
      errorBox.hidden = true;
      form.hidden = false;
      successBox.hidden = true;

      if (mode === 'pdf') {
        modalTitle.textContent = `Email & Save Your ${cfg.noun} PDF`;
        optInCheck.checked = true;
        submitBtn.textContent = 'Unlock Stamped Spec PDF →';
      } else {
        const spec = readLiveSpec(cfg);
        modalTitle.textContent = spec.shortPrimary
          ? `Get Firm Quotes: ${spec.shortPrimary}`
          : `Get Firm Quotes for Your ${cfg.noun}`;
        optInCheck.checked = true;
        submitBtn.textContent = 'Save Spec PDF & Request Firm Quotes →';
      }

      overlay.hidden = false;
      setTimeout(() => document.getElementById('tspCapName')?.focus(), 40);
    }

    function closeModal() {
      overlay.hidden = true;
    }

    document.getElementById('tspCapQuoteBtn')?.addEventListener('click', () => openModal('quote'));
    document.getElementById('tspCapMobileBtn')?.addEventListener('click', () => openModal('quote'));
    document.getElementById('tspCapPdfBtn')?.addEventListener('click', () => openModal('pdf'));
    document.getElementById('tspCapCloseBtn')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    document.getElementById('tspCapPrintRawBtn')?.addEventListener('click', () => {
      closeModal();
      window.print();
    });

    document.getElementById('tspCapPrintNowBtn')?.addEventListener('click', () => {
      closeModal();
      window.print();
    });

    overlay.querySelectorAll('.tsp-cap-time-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        selectedTimeline = pill.getAttribute('data-timeline');
        overlay.querySelectorAll('.tsp-cap-time-pill').forEach((p) => p.classList.toggle('active', p === pill));
      });
    });

    phoneInput?.addEventListener('input', (e) => {
      e.target.value = formatPhoneUS(e.target.value);
      e.target.classList.remove('invalid');
    });

    // Submit & Persist to Supabase public.leads
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.hidden = true;

      // Layer 1 & 2 Anti-Bot Shield: Honeypot + Sub-1.5s Instant Bot Submission Trap
      const honeypotVal = (document.getElementById('tspCapWebsite')?.value || '').trim();
      const elapsedMs = Date.now() - modalOpenedAt;
      if (honeypotVal !== '' || (modalOpenedAt > 0 && elapsedMs < 1500)) {
        // Silently fake success so spambots stop without polluting Supabase public.leads
        form.hidden = true;
        successBox.hidden = false;
        const msgEl = document.getElementById('tspCapSuccessMsg');
        if (msgEl) msgEl.textContent = 'Your spec sheet is ready to print below.';
        return;
      }

      // Layer 3 Anti-Bot Shield: Cloudflare Turnstile Check (active once TURNSTILE_SITE_KEY is set)
      if (TURNSTILE_SITE_KEY && !turnstileToken) {
        errorBox.textContent = 'Please wait a moment for the automatic security verification to complete.';
        errorBox.hidden = false;
        return;
      }

      const name = (document.getElementById('tspCapName')?.value || '').trim();
      const zip = (zipInput?.value || '').trim();
      const phone = (phoneInput?.value || '').trim();
      const email = (document.getElementById('tspCapEmail')?.value || '').trim();
      const wantQuotes = !!optInCheck?.checked;

      if (!name || name.length < 2) {
        errorBox.textContent = 'Please enter your name or company name.';
        errorBox.hidden = false;
        return;
      }
      if (!/^\d{5}$/.test(zip)) {
        errorBox.textContent = 'Please enter a valid 5-digit US project ZIP code.';
        errorBox.hidden = false;
        return;
      }
      if (!isValidUSPhone(phone)) {
        phoneInput?.classList.add('invalid');
        errorBox.textContent = 'Please enter a valid 10-digit US phone number (area code + 7 digits).';
        errorBox.hidden = false;
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorBox.textContent = 'Please enter a valid work email address.';
        errorBox.hidden = false;
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving Spec & Verifying...';

      const spec = readLiveSpec(cfg);
      const isUrgent = selectedTimeline.includes('Immediate');
      const dynamicPrice = isUrgent ? cfg.urgentPrice : cfg.basePrice;
      const b2bDomain = extractCommercialDomain(email);

      const leadPayload = {
        trade: cfg.trade,
        tradeTitle: cfg.title,
        customerName: name,
        company: b2bDomain ? `${name} (${b2bDomain})` : name,
        phone,
        email,
        zip,
        location: `ZIP ${zip}`,
        priceUsd: dynamicPrice,
        specs: {
          primary_output: spec.primary || cfg.noun,
          secondary_output: spec.secondary || '',
          code_trigger: spec.codeAlert || 'Standard Commercial',
          project_timeline: selectedTimeline,
          commercial_domain: b2bDomain || 'direct',
          contractor_quote_opt_in: wantQuotes,
          source_tool: cfg.slug
        }
      };

      if (window.TradeSpecSupabase && typeof window.TradeSpecSupabase.submitLead === 'function') {
        await window.TradeSpecSupabase.submitLead(leadPayload);
      }

      submitBtn.disabled = false;
      form.hidden = true;
      successBox.hidden = false;

      const msgEl = document.getElementById('tspCapSuccessMsg');
      if (msgEl) {
        msgEl.textContent = wantQuotes
          ? `Your ${spec.shortPrimary || cfg.noun} spec (Timeline: ${selectedTimeline}) is saved. Up to 2 licensed contractors serving ZIP ${zip} have been notified with your exact parameters.`
          : `Your ${spec.shortPrimary || cfg.noun} spec sheet has been saved for ${email}. Click below to print or save as PDF.`;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpecCapture);
  } else {
    initSpecCapture();
  }
})(window, document);
