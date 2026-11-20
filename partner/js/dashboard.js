/**
 * TradeSpec Pro™ Partner Portal — Dashboard Shell Orchestrator
 * Enforces B2B authentication gate, mounts the 5 modular components,
 * manages sidebar navigation, and subscribes to live Supabase lead streams.
 */

(function (window) {
  'use strict';

  const VIEW_TITLES = {
    monitor: 'Leads & Monthly Spend Dashboard',
    territory: 'Territory Lock & Exclusivity Control',
    sources: 'Commercial Lead Sources (Single / Multi)',
    settings: 'Company Details & Dispatch Settings',
    integrations: 'CRM, ERP & Webhook Integrations'
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const Store = window.PartnerStore;
    const Comps = window.PartnerComponents || {};

    // Strict Auth Gate: redirect unauthenticated users to dedicated B2B login
    if (!Store || !Store.isAuthenticated()) {
      window.location.replace('auth/login.html');
      return;
    }

    const sidebar = document.getElementById('portalSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const topbarTitle = document.getElementById('topbarTitle');
    const dbStatusPill = document.getElementById('dbStatusPill');
    const walletPillVal = document.getElementById('walletPillVal');
    const sidebarCompanyName = document.getElementById('sidebarCompanyName');
    const sidebarCompanyMeta = document.getElementById('sidebarCompanyMeta');
    const navLeadBadge = document.getElementById('navLeadBadge');
    const navSourceBadge = document.getElementById('navSourceBadge');

    function closeMobileSidebar() {
      sidebar?.classList.remove('open');
      backdrop?.classList.remove('open');
    }

    mobileMenuBtn?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      backdrop?.classList.toggle('open');
    });
    backdrop?.addEventListener('click', closeMobileSidebar);

    function switchView(viewKey) {
      if (!VIEW_TITLES[viewKey]) viewKey = 'monitor';
      document.querySelectorAll('.view-panel').forEach((el) => {
        el.classList.toggle('active', el.id === `view-${viewKey}`);
      });
      document.querySelectorAll('[data-view]').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-view') === viewKey);
      });
      if (topbarTitle) topbarTitle.textContent = VIEW_TITLES[viewKey];
      closeMobileSidebar();
    }

    document.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => switchView(btn.getAttribute('data-view')));
    });

    document.getElementById('walletQuickBtn')?.addEventListener('click', () => switchView('monitor'));
    document.getElementById('logoutBtn')?.addEventListener('click', () => Store.logout());

    // Modal Close Controls
    const modal = document.getElementById('portalModal');
    document.getElementById('portalModalClose')?.addEventListener('click', () => modal?.classList.add('hidden'));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    function syncHeaderAndSidebar() {
      const c = Store.contractor;
      if (!c) return;
      if (walletPillVal) walletPillVal.textContent = Store.fmtCurrency(c.walletBalance || 0);
      if (sidebarCompanyName) sidebarCompanyName.textContent = c.companyName || 'Commercial Partner';
      if (sidebarCompanyMeta) sidebarCompanyMeta.textContent = `ZIP ${c.baseZip || '—'} · ${c.licenseNumber || 'Verified'}`;
      if (navSourceBadge) navSourceBadge.textContent = `${(c.activeSources || []).length}/9`;
    }

    function syncLeadBadge(leads) {
      if (navLeadBadge) {
        const openCount = (leads || []).filter((l) => l.status !== 'claimed' && l.status !== 'disputed').length;
        navLeadBadge.textContent = String(openCount);
      }
    }

    function syncDbPill(isLive) {
      if (!dbStatusPill) return;
      dbStatusPill.classList.toggle('offline', !isLive);
      dbStatusPill.innerHTML = isLive
        ? '<span class="status-dot"></span><span>Supabase <span class="status-text-long">Live</span></span>'
        : '<span class="status-dot"></span><span>Local <span class="status-text-long">Sync</span></span>';
    }

    Store.on('contractor:updated', syncHeaderAndSidebar);
    Store.on('leads:updated', syncLeadBadge);
    Store.on('supabase:status', syncDbPill);

    // Mount all 5 modular components
    if (Comps.mountLeadsMonitor) Comps.mountLeadsMonitor(document.getElementById('view-monitor'));
    if (Comps.mountTerritoryLock) Comps.mountTerritoryLock(document.getElementById('view-territory'));
    if (Comps.mountLeadSources) Comps.mountLeadSources(document.getElementById('view-sources'));
    if (Comps.mountCompanySettings) Comps.mountCompanySettings(document.getElementById('view-settings'));
    if (Comps.mountIntegrations) Comps.mountIntegrations(document.getElementById('view-integrations'));

    syncHeaderAndSidebar();
    switchView('monitor');

    // Initial live Supabase fetch + realtime subscription
    await Store.refreshFromSupabase();
    if (window.TradeSpecSupabase && typeof window.TradeSpecSupabase.subscribeToLeads === 'function') {
      window.TradeSpecSupabase.subscribeToLeads(
        (newLead) => {
          Store.refreshFromSupabase();
          const active = Store.contractor?.activeSources || [];
          if (active.includes(String(newLead.trade || '').toLowerCase())) {
            Store.showToast(`⚡ New Commercial RFP Dispatched in ZIP ${newLead.zip || ''}!`, 'success');
          }
        },
        () => Store.refreshFromSupabase()
      );
    }

    window.PartnerDashboard = { switchView };
  });
})(window);
