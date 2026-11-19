/**
 * TradeSpec Pro™ — Supabase Client & Persistence Layer
 * Backend Data Integration for Partner Network & Subcontractor Lead Dispatch
 * 
 * Supabase Config:
 *   Project URL: https://hrutolmtfggvzyhherkr.supabase.co
 *   Publishable Key: sb_publishable_m7-HsbBZNj6d3Loos203ug_eABEliQr
 *   Direct Postgres: postgresql://postgres:sekhonsaab12@db.hrutolmtfggvzyhherkr.supabase.co:5432/postgres
 */

(function(window) {
  'use strict';

  // --- HARDCODED BACKEND CREDENTIALS ---
  const SUPABASE_CONFIG = {
    url: 'https://hrutolmtfggvzyhherkr.supabase.co',
    publishableKey: 'sb_publishable_m7-HsbBZNj6d3Loos203ug_eABEliQr',
    directConnString: 'postgresql://postgres:sekhonsaab12@db.hrutolmtfggvzyhherkr.supabase.co:5432/postgres'
  };

  let client = null;
  let isConnected = false;
  let connectionChecked = false;

  // Initialize Supabase Client
  function initClient() {
    if (client) return client;
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        });
      } catch (err) {
        console.warn('[TradeSpec Supabase] Client initialization error:', err);
      }
    } else {
      console.warn('[TradeSpec Supabase] @supabase/supabase-js library not loaded yet.');
    }
    return client;
  }

  // Check Supabase connectivity & table availability
  async function checkHealth() {
    initClient();
    if (!client) {
      isConnected = false;
      return { connected: false, message: 'Supabase JS library unavailable' };
    }

    try {
      // Test read on public.leads
      const { data, error } = await client.from('leads').select('id').limit(1);
      if (error) {
        console.info('[TradeSpec Supabase] Test query result (pending schema setup):', error.message);
        isConnected = false;
        connectionChecked = true;
        return { 
          connected: false, 
          needsSchema: true, 
          error: error.message,
          message: 'Supabase reachable, awaiting SQL schema deployment' 
        };
      }
      isConnected = true;
      connectionChecked = true;
      return { connected: true, message: 'Connected to Supabase live database' };
    } catch (err) {
      console.warn('[TradeSpec Supabase] Health check error:', err);
      isConnected = false;
      connectionChecked = true;
      return { connected: false, error: err.message, message: 'Network or DNS resolution issue' };
    }
  }

  // --- 1. PARTNER ONBOARDING APPLICATIONS ---
  async function submitApplication(appData) {
    initClient();
    const payload = {
      company_name: appData.company,
      specialty_trade: appData.trade,
      base_zip: appData.zip,
      service_radius: parseInt(appData.radius, 10) || 60,
      lead_sources: Array.isArray(appData.leadSources) ? appData.leadSources : [appData.trade],
      contact_name: appData.contact,
      phone: appData.phone,
      email: appData.email,
      status: 'pending',
      assigned_pin: '1234'
    };

    if (client) {
      try {
        const { data, error } = await client
          .from('partner_applications')
          .insert([payload])
          .select();

        if (!error && data && data.length > 0) {
          console.log('[TradeSpec Supabase] Application persisted to Supabase:', data[0]);
          return { success: true, isSupabase: true, data: data[0] };
        } else if (error) {
          console.warn('[TradeSpec Supabase] Application insert error, saving to local cache:', error.message);
        }
      } catch (err) {
        console.warn('[TradeSpec Supabase] Network failure on application insert:', err);
      }
    }

    // Local Storage Fallback
    try {
      const existing = JSON.parse(localStorage.getItem('tradespec_partner_apps') || '[]');
      existing.unshift({ ...payload, created_at: new Date().toISOString() });
      localStorage.setItem('tradespec_partner_apps', JSON.stringify(existing));
    } catch (e) {}

    return { success: true, isSupabase: false, data: payload };
  }

  // --- 2. CONTRACTOR PROFILE & AUTHENTICATION ---
  async function registerContractor(contractorData) {
    initClient();
    const payload = {
      company_name: contractorData.companyName,
      contact_person: contractorData.contactPerson,
      dispatch_phone: contractorData.dispatchPhone,
      dispatch_email: contractorData.dispatchEmail,
      primary_zip: contractorData.baseZip,
      service_radius_miles: parseInt(contractorData.radius, 10) || 60,
      active_trades: contractorData.activeSources || [],
      wallet_balance: contractorData.walletBalance || 150.00,
      pin: contractorData.pin || '1234',
      status: 'active'
    };

    if (client) {
      try {
        const { data, error } = await client
          .from('contractors')
          .insert([payload])
          .select();

        if (!error && data && data.length > 0) {
          console.log('[TradeSpec Supabase] Contractor account registered in DB:', data[0]);
          return { success: true, isSupabase: true, contractor: data[0] };
        } else if (error) {
          console.warn('[TradeSpec Supabase] Contractor registration error:', error.message);
        }
      } catch (err) {
        console.warn('[TradeSpec Supabase] Network error on contractor registration:', err);
      }
    }
    return { success: true, isSupabase: false, contractor: payload };
  }

  async function getContractorProfile(pin) {
    initClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('contractors')
          .select('*')
          .eq('pin', pin.trim())
          .eq('status', 'active')
          .limit(1);

        if (!error && data && data.length > 0) {
          const c = data[0];
          return {
            success: true,
            isSupabase: true,
            contractor: {
              id: c.id,
              companyName: c.company_name,
              contactPerson: c.contact_person,
              dispatchEmail: c.dispatch_email,
              dispatchPhone: c.dispatch_phone,
              licenseNumber: c.license_number || '',
              insuranceBond: c.insurance_bond || '$2M Liability',
              baseZip: c.primary_zip,
              radius: c.service_radius_miles,
              minJob: Number(c.min_job_value_usd),
              activeSources: c.active_trades || [],
              walletBalance: Number(c.wallet_balance),
              autoReload: c.auto_reload,
              webhookUrl: c.webhook_url || '',
              pin: c.pin
            }
          };
        }
      } catch (err) {
        console.warn('[TradeSpec Supabase] Fetch contractor profile error:', err);
      }
    }
    return { success: false, isSupabase: false };
  }

  async function updateContractorSettings(contractorId, updates) {
    initClient();
    if (client && contractorId) {
      try {
        const payload = {};
        if (updates.companyName) payload.company_name = updates.companyName;
        if (updates.licenseNumber) payload.license_number = updates.licenseNumber;
        if (updates.insuranceBond) payload.insurance_bond = updates.insuranceBond;
        if (updates.dispatchPhone) payload.dispatch_phone = updates.dispatchPhone;
        if (updates.dispatchEmail) payload.dispatch_email = updates.dispatchEmail;
        if (updates.baseZip) payload.primary_zip = updates.baseZip;
        if (updates.radius) payload.service_radius_miles = updates.radius;
        if (updates.minJob) payload.min_job_value_usd = updates.minJob;
        if (updates.activeSources) payload.active_trades = updates.activeSources;
        if (typeof updates.walletBalance === 'number') payload.wallet_balance = updates.walletBalance;
        if (typeof updates.autoReload === 'boolean') payload.auto_reload = updates.autoReload;
        if (updates.webhookUrl !== undefined) payload.webhook_url = updates.webhookUrl;
        payload.updated_at = new Date().toISOString();

        const { error } = await client
          .from('contractors')
          .update(payload)
          .eq('id', contractorId);

        if (!error) return { success: true, isSupabase: true };
      } catch (err) {
        console.warn('[TradeSpec Supabase] Update contractor settings error:', err);
      }
    }
    return { success: true, isSupabase: false };
  }

  // --- 3. LEADS FETCHING & BID ACTIONS ---
  async function getLeads() {
    initClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            timestamp: item.created_at,
            trade: item.trade,
            tradeTitle: item.trade_title,
            name: item.customer_name,
            company: item.company || 'Private Commercial RFP',
            phone: item.phone,
            email: item.email,
            zip: item.zip,
            specSummary: item.spec_summary,
            budgetEst: item.budget_est,
            leadCost: Number(item.lead_cost),
            status: item.status,
            claimedAt: item.claimed_at,
            fastBidSentAt: item.fast_bid_sent_at,
            fastBidMessage: item.fast_bid_message,
            disputeReason: item.dispute_reason
          }));
          return { success: true, isSupabase: true, leads: mapped };
        }
      } catch (err) {
        console.warn('[TradeSpec Supabase] Fetch leads error:', err);
      }
    }
    return { success: false, isSupabase: false, leads: null };
  }

  async function claimLead(leadId, contractorId, cost, newBalance) {
    initClient();
    if (client) {
      try {
        const now = new Date().toISOString();
        // Update lead status
        await client
          .from('leads')
          .update({
            status: 'claimed',
            claimed_by_contractor_id: contractorId || null,
            claimed_at: now
          })
          .eq('id', leadId);

        // Update contractor wallet
        if (contractorId && typeof newBalance === 'number') {
          await client
            .from('contractors')
            .update({ wallet_balance: newBalance, updated_at: now })
            .eq('id', contractorId);

          // Add transaction record
          await client
            .from('wallet_transactions')
            .insert([{
              contractor_id: contractorId,
              type: 'lead_purchase',
              amount: -Math.abs(cost),
              balance_after: newBalance,
              description: `Dispatched Commercial Lead ${leadId}`,
              reference_lead_id: leadId
            }]);
        }
        return { success: true, isSupabase: true };
      } catch (err) {
        console.warn('[TradeSpec Supabase] Claim lead error:', err);
      }
    }
    return { success: true, isSupabase: false };
  }

  async function disputeLead(leadId, reason, contractorId, refundAmount, newBalance) {
    initClient();
    if (client) {
      try {
        const now = new Date().toISOString();
        await client
          .from('leads')
          .update({
            status: 'disputed',
            dispute_reason: reason
          })
          .eq('id', leadId);

        if (contractorId && typeof newBalance === 'number') {
          await client
            .from('contractors')
            .update({ wallet_balance: newBalance, updated_at: now })
            .eq('id', contractorId);

          await client
            .from('wallet_transactions')
            .insert([{
              contractor_id: contractorId,
              type: 'refund',
              amount: Math.abs(refundAmount),
              balance_after: newBalance,
              description: `Instant Refund: Lead ${leadId} (${reason})`,
              reference_lead_id: leadId
            }]);
        }
        return { success: true, isSupabase: true };
      } catch (err) {
        console.warn('[TradeSpec Supabase] Dispute lead error:', err);
      }
    }
    return { success: true, isSupabase: false };
  }

  async function recordFastBid(leadId, messageText) {
    initClient();
    if (client) {
      try {
        await client
          .from('leads')
          .update({
            fast_bid_sent_at: new Date().toISOString(),
            fast_bid_message: messageText,
            status: 'contacted'
          })
          .eq('id', leadId);
        return { success: true, isSupabase: true };
      } catch (err) {
        console.warn('[TradeSpec Supabase] Fast bid update error:', err);
      }
    }
    return { success: true, isSupabase: false };
  }

  async function addWalletFunds(contractorId, amount, newBalance) {
    initClient();
    if (client && contractorId) {
      try {
        const now = new Date().toISOString();
        await client
          .from('contractors')
          .update({ wallet_balance: newBalance, updated_at: now })
          .eq('id', contractorId);

        await client
          .from('wallet_transactions')
          .insert([{
            contractor_id: contractorId,
            type: 'deposit',
            amount: Math.abs(amount),
            balance_after: newBalance,
            description: `Contractor Wallet Top-Up ($${amount.toFixed(2)})`
          }]);
        return { success: true, isSupabase: true };
      } catch (err) {
        console.warn('[TradeSpec Supabase] Wallet deposit error:', err);
      }
    }
    return { success: true, isSupabase: false };
  }

  // --- 4. REALTIME LEADS SUBSCRIPTION ---
  function subscribeToLeads(onNewLead, onUpdateLead) {
    initClient();
    if (!client) return null;

    try {
      const channel = client
        .channel('public:leads')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'leads' },
          (payload) => {
            console.log('[TradeSpec Supabase] Realtime INSERT event:', payload.new);
            if (typeof onNewLead === 'function') {
              onNewLead(payload.new);
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'leads' },
          (payload) => {
            console.log('[TradeSpec Supabase] Realtime UPDATE event:', payload.new);
            if (typeof onUpdateLead === 'function') {
              onUpdateLead(payload.new);
            }
          }
        )
        .subscribe((status) => {
          console.log('[TradeSpec Supabase] Subscription status:', status);
        });

      return channel;
    } catch (err) {
      console.warn('[TradeSpec Supabase] Realtime subscription error:', err);
      return null;
    }
  }

  // Expose API globally
  window.TradeSpecSupabase = {
    config: SUPABASE_CONFIG,
    init: initClient,
    checkHealth,
    submitApplication,
    registerContractor,
    getContractorProfile,
    updateContractorSettings,
    getLeads,
    claimLead,
    disputeLead,
    recordFastBid,
    addWalletFunds,
    subscribeToLeads,
    get isLive() { return isConnected; }
  };

})(window);
