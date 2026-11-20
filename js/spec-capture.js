/**
 * TradeSpec Pro™ — Contextual Spec Capture & High-Conversion Quote Engine
 * Features:
 *  1. Dynamic Output-Mirrored CTA Bar directly inside .results-column
 *  2. Soft "Email / Save Stamped Spec PDF" capture with optional local contractor matching
 *  3. Real US phone auto-formatting + fake-number rejection & Project Timeline urgency selector
 *  4. Direct Supabase public.leads persistence + zero-trap print escape hatch
 */

(function (window, document) {
  'use strict';

  const TOOL_CONFIG = {
    'charge-spec': {
      trade: 'charge',
      title: 'Commercial EV Fleet & Infrastructure',
      primaryId: 'out-service-amps',
      secondaryId: 'out-service-sub',
      noun: 'EV Charging Spec',
      basePrice: 225,
      urgentPrice: 375
    },
    'cold-spec': {
      trade: 'cold',
      title: 'Walk-In Cooler & Cold Storage',
      primaryId: 'out-btu-hr',
      secondaryId: 'out-compressor-hp',
      noun: 'Cold Storage Spec',
      basePrice: 145,
      urgentPrice: 265
    },
    'crane-lift': {
      trade: 'crane',
      title: 'Mobile Crane Pick & Rigging',
      primaryId: 'recommendedTonnage',
      secondaryId: 'grossWeightVal',
      noun: 'Crane Pick',
      basePrice: 125,
      urgentPrice: 225
    },
    'grease-trap': {
      trade: 'grease',
      title: 'Commercial Grease Trap & Hood CFM',
      primaryId: 'metricTrapGPM',
      secondaryId: 'metricTurnkeyBudget',
      noun: 'Grease Interceptor Spec',
      basePrice: 140,
      urgentPrice: 250
    },
    'pallet-racking': {
      trade: 'racking',
      title: 'Warehouse Pallet Racking Layout',
      primaryId: 'totalPalletPositions',
      secondaryId: 'metricSteelBudget',
      noun: 'Pallet Rack Layout',
      basePrice: 200,
      urgentPrice: 350
    },
    'permit-spec': {
      trade: 'permit',
      title: 'Commercial Tenant Improvement (TI)',
      primaryId: 'out-occupant-load',
      secondaryId: 'out-egress-doors',
      noun: 'Commercial TI Spec',
      basePrice: 225,
      urgentPrice: 375
    },
    'site-spec': {
      trade: 'site',
      title: 'Civil Stormwater & Earthwork',
      primaryId: 'out-peak-cfs',
      secondaryId: 'out-pond-volume',
      noun: 'Stormwater Spec',
      basePrice: 185,
      urgentPrice: 325
    },
    'spray-foam': {
      trade: 'foam',
      title: 'Commercial Spray Foam Insulation',
      primaryId: 'totalBoardFeet',
      secondaryId: 'metricRValue',
      noun: 'Spray Foam Spec',
      basePrice: 115,
      urgentPrice: 195
    },
    'well-drilling': {
      trade: 'well',
      title: 'Commercial Water Well & Pump',
      primaryId: 'recommendedPumpHp',
      secondaryId: 'metricTurnkeyBudget',
      noun: 'Water Well Spec',
      basePrice: 165,
      urgentPrice: 295
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

  function formatPhoneUS(raw) {
    const digits = String(raw || '').replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function isValidUSPhone(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length !== 10) return false;
    // Reject obvious fake sequences (all same digit, 1234567890, invalid area code starting with 0 or 1)
    if (/^(\d)\1{9}$/.test(digits)) return false;
    if (digits === '1234567890' || digits === '0123456789') return false;
    if (digits[0] === '0' || digits[0] === '1') return false;
    if (digits[3] === '0' || digits[3] === '1') return false;
    return true;
  }

  function readLiveSpec(cfg) {
    const pEl = document.getElementById(cfg.primaryId);
    const sEl = document.getElementById(cfg.secondaryId);
    const primary = pEl ? pEl.textContent.trim().replace(/\s+/g, ' ') : '';
    const secondary = sEl ? sEl.textContent.trim().replace(/\s+/g, ' ') : '';
    const shortPrimary = primary.length > 34 ? primary.slice(0, 34).trim() + '…' : primary;
    return { primary, secondary, shortPrimary };
  }

  function initSpecCapture() {
    const cfg = detectTool();
    if (!cfg) return;

    const resultsCol = document.querySelector('.results-column');
    if (!resultsCol || document.getElementById('tspCapBar')) return;

    // 1. Inject Contextual Action Bar cleanly inside .results-column (right after the first main result card)
    const bar = document.createElement('div');
    bar.id = 'tspCapBar';
    bar.className = 'tsp-cap-bar';
    bar.innerHTML = `
      <div class="tsp-cap-bar-top">
        <span class="tsp-cap-eyebrow">⚡ Calculated Engineering Spec Ready</span>
        <span class="tsp-cap-trust-chip">Max 2 Vetted Contractors • Zero Spam</span>
      </div>
      <h3 class="tsp-cap-headline" id="tspCapBarHeadline">Save Your ${cfg.noun} or Get Local Commercial Pricing</h3>
      <p class="tsp-cap-sub" id="tspCapBarSub">Lock in your calculated parameters as a printable engineering submittal, or attach them directly to 1–2 licensed local bids.</p>
      <div class="tsp-cap-actions">
        <button type="button" class="tsp-cap-btn-primary" id="tspCapQuoteBtn">⚡ Get Firm Quotes for This ${cfg.noun} &rarr;</button>
        <button type="button" class="tsp-cap-btn-secondary" id="tspCapPdfBtn">📄 Save / Email Spec PDF</button>
      </div>
    `;

    // Place cleanly right after the first child card of .results-column (above the fold!)
    if (resultsCol.children.length > 0) {
      resultsCol.insertBefore(bar, resultsCol.children[1] || null);
    } else {
      resultsCol.appendChild(bar);
    }

    // 2. Build Soft Capture Modal
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
              <input class="tsp-cap-input" type="text" id="tspCapZip" maxlength="5" inputmode="numeric" placeholder="e.g., 77002" required>
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

          <div id="tspCapError" class="tsp-cap-error" hidden></div>

          <button type="submit" class="tsp-cap-submit" id="tspCapSubmitBtn">Save Spec PDF &amp; Request Firm Quotes &rarr;</button>

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

    // 3. Live DOM Mirroring (updates CTA button dynamically as user calculates!)
    let selectedTimeline = 'Immediate (< 2 wks)';

    function syncLiveOutput() {
      const spec = readLiveSpec(cfg);
      const qBtn = document.getElementById('tspCapQuoteBtn');
      const pill = document.getElementById('tspCapSpecPill');

      if (qBtn && spec.shortPrimary) {
        qBtn.textContent = `⚡ Get Firm Quotes for This ${spec.shortPrimary} →`;
      }
      if (pill) {
        const parts = [];
        if (spec.primary) parts.push(`<strong>${spec.primary}</strong>`);
        if (spec.secondary && spec.secondary !== spec.primary) parts.push(`<span>(${spec.secondary})</span>`);
        pill.innerHTML = `${cfg.title}: ${parts.join(' ') || '<strong>Live Spec Ready</strong>'}`;
      }
    }

    syncLiveOutput();

    // Observe output nodes so CTA updates smoothly without touching existing app.js
    const observer = new MutationObserver(() => syncLiveOutput());
    const pNode = document.getElementById(cfg.primaryId);
    const sNode = document.getElementById(cfg.secondaryId);
    if (pNode) observer.observe(pNode, { childList: true, characterData: true, subtree: true });
    if (sNode) observer.observe(sNode, { childList: true, characterData: true, subtree: true });

    // 4. Modal Open / Close / Interaction Logic
    const form = document.getElementById('tspCapForm');
    const successBox = document.getElementById('tspCapSuccess');
    const errorBox = document.getElementById('tspCapError');
    const phoneInput = document.getElementById('tspCapPhone');
    const optInCheck = document.getElementById('tspCapMatchOptIn');
    const modalTitle = document.getElementById('tspCapModalTitle');
    const submitBtn = document.getElementById('tspCapSubmitBtn');

    function openModal(mode) {
      syncLiveOutput();
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
    document.getElementById('tspCapPdfBtn')?.addEventListener('click', () => openModal('pdf'));
    document.getElementById('tspCapCloseBtn')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    // Respectful zero-trap print escape hatch
    document.getElementById('tspCapPrintRawBtn')?.addEventListener('click', () => {
      closeModal();
      window.print();
    });

    document.getElementById('tspCapPrintNowBtn')?.addEventListener('click', () => {
      closeModal();
      window.print();
    });

    // Timeline pills
    overlay.querySelectorAll('.tsp-cap-time-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        selectedTimeline = pill.getAttribute('data-timeline');
        overlay.querySelectorAll('.tsp-cap-time-pill').forEach((p) => p.classList.toggle('active', p === pill));
      });
    });

    // Live US phone formatting
    phoneInput?.addEventListener('input', (e) => {
      e.target.value = formatPhoneUS(e.target.value);
      e.target.classList.remove('invalid');
    });

    // Submit & Persist to Supabase public.leads
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.hidden = true;

      const name = (document.getElementById('tspCapName')?.value || '').trim();
      const zip = (document.getElementById('tspCapZip')?.value || '').trim();
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

      const leadPayload = {
        trade: cfg.trade,
        tradeTitle: cfg.title,
        customerName: name,
        company: name,
        phone,
        email,
        zip,
        location: `ZIP ${zip}`,
        priceUsd: dynamicPrice,
        specs: {
          primary_output: spec.primary || cfg.noun,
          secondary_output: spec.secondary || '',
          project_timeline: selectedTimeline,
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
