/**
 * TradeSpec Pro™ — Contractor Dispatch Wallet & Billing Model
 * Manages dispatch credits, automatic balance reloads, transaction history,
 * instant card deposits, and Supabase ledger synchronization.
 */

(function(window) {
  'use strict';

  function initWalletBilling(getSettings, saveSettings, onBalanceChanged) {
    const walletModal = document.getElementById('walletModal');
    const openWalletModalBtn = document.getElementById('openWalletModalBtn');
    const closeWalletModalBtn = document.getElementById('closeWalletModalBtn');
    const modalWalletBalance = document.getElementById('modalWalletBalance');
    const walletTxnTableBody = document.getElementById('walletTxnTableBody');
    const walletAutoReloadCheck = document.getElementById('walletAutoReloadCheck');
    const depositPresetBtns = document.querySelectorAll('.deposit-preset-btn');
    const customDepositInput = document.getElementById('customDepositInput');
    const submitDepositBtn = document.getElementById('submitDepositBtn');
    const depositSuccessAlert = document.getElementById('depositSuccessAlert');

    let selectedDepositAmount = 250;

    function renderWalletModal() {
      const settings = getSettings();
      const bal = settings.walletBalance || 0;
      if (modalWalletBalance) {
        modalWalletBalance.textContent = `$${bal.toFixed(2)}`;
      }
      if (walletAutoReloadCheck) {
        walletAutoReloadCheck.checked = !!settings.autoReload;
      }

      // Render Transaction Ledger
      if (walletTxnTableBody) {
        walletTxnTableBody.innerHTML = '';
        const txns = Array.isArray(settings.transactions) ? settings.transactions : [];
        if (txns.length === 0) {
          walletTxnTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 1rem;">No transactions recorded yet.</td></tr>`;
        } else {
          txns.slice().reverse().forEach(tx => {
            const tr = document.createElement('tr');
            const isPos = tx.type === 'pos' || tx.amount > 0;
            const amtClass = isPos ? 'text-green' : 'text-red';
            const sign = isPos ? '+' : '';
            tr.innerHTML = `
              <td>${tx.date || new Date().toISOString().split('T')[0]}</td>
              <td>${tx.desc || 'Dispatch Credit'}</td>
              <td class="${amtClass}" style="font-weight: 700; font-family: monospace;">${sign}$${Math.abs(tx.amount).toFixed(2)}</td>
              <td style="font-family: monospace;">$${(tx.balance || 0).toFixed(2)}</td>
            `;
            walletTxnTableBody.appendChild(tr);
          });
        }
      }
    }

    // Open/Close
    if (openWalletModalBtn && walletModal) {
      openWalletModalBtn.addEventListener('click', () => {
        renderWalletModal();
        walletModal.classList.remove('hidden');
      });
    }

    if (closeWalletModalBtn && walletModal) {
      closeWalletModalBtn.addEventListener('click', () => {
        walletModal.classList.add('hidden');
        if (depositSuccessAlert) depositSuccessAlert.classList.add('hidden');
      });
    }

    // Toggle Auto-Reload
    if (walletAutoReloadCheck) {
      walletAutoReloadCheck.addEventListener('change', () => {
        const settings = getSettings();
        settings.autoReload = walletAutoReloadCheck.checked;
        saveSettings(settings);
        if (typeof onBalanceChanged === 'function') onBalanceChanged(settings);
      });
    }

    // Preset Amount Selection
    depositPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        depositPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDepositAmount = parseFloat(btn.dataset.amount) || 250;
        if (customDepositInput) customDepositInput.value = '';
      });
    });

    if (customDepositInput) {
      customDepositInput.addEventListener('input', () => {
        depositPresetBtns.forEach(b => b.classList.remove('active'));
        const val = parseFloat(customDepositInput.value);
        if (!isNaN(val) && val > 0) {
          selectedDepositAmount = val;
        }
      });
    }

    // Submit Deposit
    if (submitDepositBtn) {
      submitDepositBtn.addEventListener('click', async () => {
        const amount = selectedDepositAmount;
        if (!amount || amount < 25) {
          alert('Minimum dispatch credit deposit is $25.00.');
          return;
        }

        submitDepositBtn.disabled = true;
        submitDepositBtn.textContent = 'Processing Deposit...';

        const settings = getSettings();
        const prevBal = settings.walletBalance || 0;
        const newBal = prevBal + amount;
        settings.walletBalance = newBal;

        const newTxn = {
          date: new Date().toISOString().split('T')[0],
          desc: `Credit Allocation (${amount >= 500 ? 'Volume Tier' : 'Direct Recharge'})`,
          amount: amount,
          balance: newBal,
          type: 'pos'
        };

        if (!Array.isArray(settings.transactions)) settings.transactions = [];
        settings.transactions.push(newTxn);

        saveSettings(settings);

        // Sync with Supabase Live Ledger
        if (window.TradeSpecSupabase) {
          try {
            await window.TradeSpecSupabase.logWalletTransaction({
              type: 'deposit',
              amount: amount,
              balance_after: newBal,
              description: newTxn.desc
            });
          } catch(err) {
            console.warn('[Wallet] Supabase transaction log warning:', err);
          }
        }

        renderWalletModal();
        if (typeof onBalanceChanged === 'function') onBalanceChanged(settings);

        if (depositSuccessAlert) {
          depositSuccessAlert.classList.remove('hidden');
          depositSuccessAlert.innerHTML = `✓ <strong>$${amount.toFixed(2)}</strong> successfully added. New dispatch wallet balance: <strong>$${newBal.toFixed(2)}</strong>.`;
        }

        submitDepositBtn.disabled = false;
        submitDepositBtn.textContent = 'Add Funds to Dispatch Wallet';
      });
    }

    return {
      render: renderWalletModal,
      recordLeadDebit: async (leadId, leadTitle, cost) => {
        const settings = getSettings();
        const prev = settings.walletBalance || 0;
        const next = Math.max(0, prev - cost);
        settings.walletBalance = next;

        const debitTxn = {
          date: new Date().toISOString().split('T')[0],
          desc: `Dispatched Lead ${leadId} (${leadTitle})`,
          amount: -cost,
          balance: next,
          type: 'neg'
        };

        if (!Array.isArray(settings.transactions)) settings.transactions = [];
        settings.transactions.push(debitTxn);
        saveSettings(settings);

        if (window.TradeSpecSupabase) {
          try {
            await window.TradeSpecSupabase.logWalletTransaction({
              type: 'lead_debit',
              amount: -cost,
              balance_after: next,
              description: debitTxn.desc
            });
          } catch(e) {}
        }
        if (typeof onBalanceChanged === 'function') onBalanceChanged(settings);
      },
      recordRefundCredit: async (leadId, leadTitle, refundAmt, reason) => {
        const settings = getSettings();
        const prev = settings.walletBalance || 0;
        const next = prev + refundAmt;
        settings.walletBalance = next;

        const refundTxn = {
          date: new Date().toISOString().split('T')[0],
          desc: `Instant Refund: Lead ${leadId} (${reason})`,
          amount: refundAmt,
          balance: next,
          type: 'pos'
        };

        if (!Array.isArray(settings.transactions)) settings.transactions = [];
        settings.transactions.push(refundTxn);
        saveSettings(settings);

        if (window.TradeSpecSupabase) {
          try {
            await window.TradeSpecSupabase.logWalletTransaction({
              type: 'refund',
              amount: refundAmt,
              balance_after: next,
              description: refundTxn.desc
            });
          } catch(e) {}
        }
        if (typeof onBalanceChanged === 'function') onBalanceChanged(settings);
      }
    };
  }

  window.TradeSpecWallet = {
    init: initWalletBilling
  };
})(window);
