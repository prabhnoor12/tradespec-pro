/**
 * TradeSpec Pro™ — Zero-Friction Lead Dispute & Instant Refund Component
 * 100% money-back guarantee for invalid leads, wrong phone, out-of-radius, or scope mismatch.
 * Zero paperwork: 1-click automatic approval and instant dispatch credit restitution.
 */

(function(window) {
  'use strict';

  function initLeadDispute(walletManager, getLeads, saveLeads, onLeadRefunded) {
    const { TRADE_META } = window.TradeSpecData || {};
    const disputeModal = document.getElementById('disputeModal');
    const closeDisputeModalBtn = document.getElementById('closeDisputeModalBtn');
    const disputeLeadId = document.getElementById('disputeLeadId');
    const disputeLeadCustomer = document.getElementById('disputeLeadCustomer');
    const disputeLeadTrade = document.getElementById('disputeLeadTrade');
    const disputeLeadFee = document.getElementById('disputeLeadFee');
    const disputeReasonRadios = document.querySelectorAll('input[name="dispute_reason"]');
    const disputeNotes = document.getElementById('disputeNotes');
    const submitDisputeBtn = document.getElementById('submitDisputeBtn');
    const disputeSuccessMsg = document.getElementById('disputeSuccessMsg');

    let activeDisputeLead = null;

    function openDispute(leadId) {
      const leads = getLeads();
      const lead = leads.find(l => l.id === leadId);
      if (!lead) return;

      activeDisputeLead = lead;
      const meta = (TRADE_META && TRADE_META[lead.trade]) ? TRADE_META[lead.trade] : null;
      const fee = meta ? meta.leadCost : 100;

      if (disputeLeadId) disputeLeadId.textContent = lead.id;
      if (disputeLeadCustomer) disputeLeadCustomer.textContent = `${lead.name} • ${lead.company || 'Commercial Project'}`;
      if (disputeLeadTrade) disputeLeadTrade.textContent = lead.tradeTitle || lead.trade.toUpperCase();
      if (disputeLeadFee) disputeLeadFee.textContent = `$${fee.toFixed(2)}`;
      if (disputeNotes) disputeNotes.value = '';
      if (disputeSuccessMsg) disputeSuccessMsg.classList.add('hidden');

      // Reset radio buttons
      if (disputeReasonRadios.length > 0) {
        disputeReasonRadios[0].checked = true;
      }

      if (disputeModal) disputeModal.classList.remove('hidden');
    }

    if (closeDisputeModalBtn && disputeModal) {
      closeDisputeModalBtn.addEventListener('click', () => {
        disputeModal.classList.add('hidden');
      });
    }

    if (submitDisputeBtn) {
      submitDisputeBtn.addEventListener('click', async () => {
        if (!activeDisputeLead) return;

        submitDisputeBtn.disabled = true;
        submitDisputeBtn.textContent = 'Processing Instant Credit...';

        const selectedRadio = document.querySelector('input[name="dispute_reason"]:checked');
        const reason = selectedRadio ? selectedRadio.value : 'Invalid Contact Information';

        const meta = (TRADE_META && TRADE_META[activeDisputeLead.trade]) ? TRADE_META[activeDisputeLead.trade] : null;
        const refundAmt = meta ? meta.leadCost : 100;

        // 1. Mark lead as refunded in state
        activeDisputeLead.status = 'refunded';
        activeDisputeLead.disputeReason = reason;
        activeDisputeLead.disputeDate = new Date().toISOString();
        saveLeads();

        // 2. Restitute funds instantly into dispatch wallet
        if (walletManager && typeof walletManager.recordRefundCredit === 'function') {
          await walletManager.recordRefundCredit(
            activeDisputeLead.id,
            activeDisputeLead.tradeTitle || activeDisputeLead.trade,
            refundAmt,
            reason
          );
        }

        // 3. Sync lead status with Supabase Live Backend
        if (window.TradeSpecSupabase) {
          try {
            await window.TradeSpecSupabase.updateLeadStatus(activeDisputeLead.id, 'refunded', {
              dispute_reason: reason,
              refunded_at: new Date().toISOString()
            });
          } catch(err) {
            console.warn('[Dispute] Supabase update warning:', err);
          }
        }

        if (disputeSuccessMsg) {
          disputeSuccessMsg.classList.remove('hidden');
          disputeSuccessMsg.innerHTML = `✓ <strong>100% Refund Approved Instantly!</strong> Credit of <strong>$${refundAmt.toFixed(2)}</strong> has been restored to your dispatch wallet.`;
        }

        if (typeof onLeadRefunded === 'function') {
          onLeadRefunded(activeDisputeLead);
        }

        setTimeout(() => {
          if (disputeModal) disputeModal.classList.add('hidden');
          submitDisputeBtn.disabled = false;
          submitDisputeBtn.textContent = 'Claim Instant 100% Credit Refund';
        }, 1800);
      });
    }

    return {
      openDispute
    };
  }

  window.TradeSpecDispute = {
    init: initLeadDispute
  };
})(window);
