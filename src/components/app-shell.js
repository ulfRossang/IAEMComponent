class AppShell extends HTMLElement {
  constructor() {
    super();
    this.closeTimer = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen flex flex-col bg-[#eef2f7]">
        <!-- Session bar -->
        <div class="bg-[#f5f7fa] border-b border-gray-200 px-6 py-1 flex justify-between items-center text-xs text-gray-500">
          <span>TESTENV SE-6292 &nbsp;|&nbsp; 2026-05-25 09:00</span>
          <a href="#" class="text-[#0066b3] hover:underline">Logga ut</a>
        </div>

        <!-- Header -->
        <header class="bg-gradient-to-b from-[#1565c0] to-[#0d52a8] px-6 py-3 flex items-center justify-between">
          <div>
            <p class="text-white text-xs font-light tracking-wide">Handelsbanken</p>
            <p class="text-white text-xl font-bold leading-tight">IAEM Kontakten</p>
          </div>
          <div class="flex items-center gap-3">
            <button class="border border-white text-white text-xs px-3 py-1 rounded-full hover:bg-white hover:text-[#1565c0] transition-colors">
              Hjälp ?
            </button>
            <div class="border border-white text-white text-xs px-3 py-1 rounded-full">
              SE-6292 &nbsp;|&nbsp; Maximal behörighet
            </div>
          </div>
        </header>

        <!-- Nav -->
        <nav class="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-0 text-sm relative">
          <!-- Administration -->
          <div class="relative nav-group" data-menu="administration">
            <button class="py-1 transition-colors nav-btn inline-flex items-center gap-2" data-active-prefix="/administration">
              <svg class="nav-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              Administration
            </button>
            <div class="nav-dropdown absolute top-full left-0 mt-0 bg-white border border-gray-300 shadow-md z-50 min-w-[280px] hidden" data-menu="administration">
              <a href="#/administration/infoprodukter" class="flex items-center gap-2.5 px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">
                <svg class="nav-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                Administrera informationsprodukter
              </a>
              <a href="#/administration/debitering" class="flex items-center gap-2.5 px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">
                <svg class="nav-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Debiteringsuppgifter
              </a>
              <a href="#/administration/massutskick" class="flex items-center gap-2.5 px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">
                <svg class="nav-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Massutskick
              </a>
            </div>
          </div>
        </nav>

        <!-- Content -->
        <main id="app-content" class="flex-1 px-6 py-5"></main>

        <!-- Footer -->
        <footer class="bg-[#1565c0] px-6 py-2 text-xs text-blue-200 mt-auto">
          © Svenska Handelsbanken AB (publ)
        </footer>
      </div>
    `;

    this.attachDropdowns();
    this.updateActiveNav();
    this.renderRoute();

    window.addEventListener('hashchange', () => {
      this.updateActiveNav();
      this.renderRoute();
    });
  }

  attachDropdowns() {
    const groups = this.querySelectorAll('.nav-group');
    groups.forEach(group => {
      const menuKey = group.getAttribute('data-menu');
      const dropdown = this.querySelector(`.nav-dropdown[data-menu="${menuKey}"]`);

      group.addEventListener('mouseenter', () => {
        if (this.closeTimer) clearTimeout(this.closeTimer);
        this.querySelectorAll('.nav-dropdown').forEach(d => d.classList.add('hidden'));
        dropdown.classList.remove('hidden');
      });

      group.addEventListener('mouseleave', () => {
        this.closeTimer = setTimeout(() => {
          dropdown.classList.add('hidden');
        }, 120);
      });

      dropdown.addEventListener('mouseenter', () => {
        if (this.closeTimer) clearTimeout(this.closeTimer);
      });

      dropdown.addEventListener('mouseleave', () => {
        this.closeTimer = setTimeout(() => {
          dropdown.classList.add('hidden');
        }, 120);
      });

      dropdown.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          dropdown.classList.add('hidden');
        });
      });
    });
  }

  updateActiveNav() {
    const hash = window.location.hash || '#/administration/infoprodukter';
    const path = hash.replace('#', '');

    this.querySelectorAll('.nav-btn').forEach(btn => {
      const prefix = btn.getAttribute('data-active-prefix') ?? '';
      if (path.startsWith(prefix)) {
        btn.classList.add('text-[#1565c0]', 'font-semibold');
        btn.classList.remove('text-[#0066b3]', 'hover:text-[#1565c0]');
      } else {
        btn.classList.remove('text-[#1565c0]', 'font-semibold');
        btn.classList.add('text-[#0066b3]', 'hover:text-[#1565c0]');
      }
    });

    this.querySelectorAll('.nav-dropdown a').forEach(a => {
      const href = a.getAttribute('href') ?? '';
      if (href === hash) {
        a.classList.add('text-[#1565c0]', 'font-semibold');
        a.classList.remove('text-gray-800');
      } else {
        a.classList.remove('text-[#1565c0]', 'font-semibold');
        a.classList.add('text-gray-800');
      }
    });
  }

  renderRoute() {
    const hash = window.location.hash || '#/administration/infoprodukter';
    const content = this.querySelector('#app-content');
    if (!content) return;

    const routeMap = {
      '#/administration/infoprodukter': '<page-infoprodukter></page-infoprodukter>',
      '#/administration/debitering':    '<page-debitering></page-debitering>',
      '#/administration/massutskick':   '<page-massutskick></page-massutskick>',
    };

    content.innerHTML = routeMap[hash] ?? routeMap['#/administration/infoprodukter'];
  }
}

customElements.define('app-shell', AppShell);
