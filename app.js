/**
 * TradeSpec Pro™ — Commercial Contractor & Equipment Sizing Suite
 * Suite Interactive Hub Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const searchInput = document.getElementById('tool-search');
  const filterPills = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.tool-card');
  const networkForm = document.getElementById('network-signup-form');
  const networkDialog = document.getElementById('network-dialog');
  const openDialogBtn = document.getElementById('open-network-modal-btn');
  const closeDialogBtn = document.getElementById('close-dialog-btn');
  const dialogDoneBtn = document.getElementById('dialog-done-btn');
  const dialogConfirmation = document.getElementById('dialog-confirmation');

  let activeCategory = 'all';
  let searchQuery = '';

  // 2. Filter & Search Logic
  function applyFilters() {
    let visibleCount = 0;
    const q = searchQuery.trim().toLowerCase();

    cards.forEach(card => {
      const category = card.dataset.category || '';
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const textContent = card.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = !q || keywords.includes(q) || textContent.includes(q);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'grid';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle empty state if needed
    let emptyMsg = document.getElementById('no-tools-found');
    if (visibleCount === 0) {
      if (!emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'no-tools-found';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.padding = '3rem 1rem';
        emptyMsg.style.color = 'var(--text-muted)';
        emptyMsg.innerHTML = '<p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">No sizing tools found matching your search</p><p style="font-size: 0.875rem;">Try searching by standard (e.g. ASME, OSHA, UPC) or equipment type (crane, well, rack, foam, grease).</p>';
        document.getElementById('tools-grid').appendChild(emptyMsg);
      }
      emptyMsg.style.display = 'block';
    } else if (emptyMsg) {
      emptyMsg.style.display = 'none';
    }
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Filter button handlers
  filterPills.forEach(btn => {
    btn.addEventListener('click', () => {
      filterPills.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // 3. Contractor Network Form
  if (networkForm) {
    networkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = networkForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Verifying Territory...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = '✓ Application Submitted!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Open confirmation modal
        if (networkDialog) {
          networkDialog.showModal();
          dialogConfirmation.style.display = 'flex';
        }

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          networkForm.reset();
        }, 3000);
      }, 700);
    });
  }

  // 4. Modal Dialog Handlers
  if (openDialogBtn && networkDialog) {
    openDialogBtn.addEventListener('click', () => {
      dialogConfirmation.style.display = 'none';
      networkDialog.showModal();
    });
  }

  if (closeDialogBtn && networkDialog) {
    closeDialogBtn.addEventListener('click', () => {
      networkDialog.close();
    });
  }

  if (dialogDoneBtn && networkDialog) {
    dialogDoneBtn.addEventListener('click', () => {
      networkDialog.close();
    });
  }

  // Coordinate-boundary click fallback for closing backdrop
  if (networkDialog) {
    networkDialog.addEventListener('click', (event) => {
      const rect = networkDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        networkDialog.close();
      }
    });
  }
});


  // Pro Shortcut: Press Ctrl + Shift + P or ~ key to open Partner Lead Console directly
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p') || e.key === '~') {
      window.location.href = './partner/#portal';
    }
  });

  // Check URL hash for direct partner redirect
  if (window.location.hash === '#partner' || window.location.hash === '#portal') {
    window.location.href = './partner/#portal';
  }
