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
          <!-- Kundvy -->
          <div class="relative nav-group" data-menu="kundvy">
            <button class="py-1 transition-colors nav-btn" data-active-prefix="/kundvy">
              Kundvy
            </button>
            <div class="nav-dropdown absolute top-full left-0 mt-0 bg-white border border-gray-300 shadow-md z-50 min-w-[240px] hidden" data-menu="kundvy">
              <a href="#/kundvy/meddelanden"          class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Visa meddelanden</a>
              <a href="#/kundvy/utskick"              class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Visa utskick</a>
              <a href="#/kundvy/sok-dokument"         class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Sök dokument</a>
              <a href="#/kundvy/sok-kuvert"           class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Sök med kuvertID</a>
              <a href="#/kundvy/administrera-utskick" class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Administrera utskick</a>
            </div>
          </div>

          <span class="text-gray-300 mx-3">|</span>

          <!-- Administration -->
          <div class="relative nav-group" data-menu="administration">
            <button class="py-1 transition-colors nav-btn" data-active-prefix="/administration">
              Administration
            </button>
            <div class="nav-dropdown absolute top-full left-0 mt-0 bg-white border border-gray-300 shadow-md z-50 min-w-[280px] hidden" data-menu="administration">
              <a href="#/administration/infoprodukter" class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Administrera informationsprodukter</a>
              <a href="#/administration/debitering"    class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Debiteringsuppgifter</a>
              <a href="#/administration/massutskick"   class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Massutskick</a>
            </div>
          </div>

          <span class="text-gray-300 mx-3">|</span>

          <!-- Publicering -->
          <div class="relative nav-group" data-menu="publicering">
            <button class="py-1 transition-colors nav-btn" data-active-prefix="/publicering">
              Publicering
            </button>
            <div class="nav-dropdown absolute top-full left-0 mt-0 bg-white border border-gray-300 shadow-md z-50 min-w-[240px] hidden" data-menu="publicering">
              <a href="#/publicering/installningar" class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Publiceringsinställningar</a>
              <a href="#/publicering/kontrollera"   class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Kontrollera dokument</a>
              <a href="#/publicering/godkann"       class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Godkänna för publicering</a>
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
    const hash = window.location.hash || '#/kundvy/meddelanden';
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
    const hash = window.location.hash || '#/kundvy/meddelanden';
    const content = this.querySelector('#app-content');
    if (!content) return;

    const routeMap = {
      '#/kundvy/meddelanden':           '<page-meddelanden></page-meddelanden>',
      '#/kundvy/utskick':               '<page-utskick></page-utskick>',
      '#/kundvy/sok-dokument':          '<page-sok-dokument></page-sok-dokument>',
      '#/kundvy/sok-kuvert':            '<page-sok-kuvert></page-sok-kuvert>',
      '#/kundvy/administrera-utskick':  '<page-administrera-utskick></page-administrera-utskick>',
      '#/publicering/installningar':    '<page-installningar></page-installningar>',
      '#/publicering/kontrollera':      '<page-kontrollera></page-kontrollera>',
      '#/publicering/godkann':          '<page-godkann></page-godkann>',
      '#/administration/infoprodukter': '<page-infoprodukter></page-infoprodukter>',
      '#/administration/debitering':    '<page-debitering></page-debitering>',
      '#/administration/massutskick':   '<page-massutskick></page-massutskick>',
    };

    content.innerHTML = routeMap[hash] ?? routeMap['#/kundvy/meddelanden'];
  }
}

customElements.define('app-shell', AppShell);
