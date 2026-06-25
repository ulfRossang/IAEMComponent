function boolJa(val) { return val ? 'Ja' : 'Nej'; }
function fmtDatum(iso) {
  if (!iso) return '–';
  return iso.replace('T', ' ').substring(0, 16);
}

// ---- Mock data store ----

const KUNDER = {
  'KD-71042': { kundnr: 'KD-71042', kundnamn: 'Kund #71042', land: 'Sverige' },
  'KD-38815': { kundnr: 'KD-38815', kundnamn: 'Kund #38815', land: 'Sverige' },
  'KD-90423': { kundnr: 'KD-90423', kundnamn: 'Kund #90423', land: 'Sverige' },
};

const MEDDELANDEN = [
  { id: 'MSG-2024-0041', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Testenv 7', mottagare: 'Kund #71042', datum: '2025-01-22T09:58', kategori: 'Digital', amne: 'Kontoutdrag februari', las: true, borttaget: false, arkiverat: true, status: 'Skickat', kontor: 'SE-6292', innehall: 'Ditt kontoutdrag för februari finns tillgängligt i din e-brevlåda.', bilagor: [{ filnamn: 'kontoutdrag-feb.pdf', storlek: 15360, url: '/files/kontoutdrag-feb.pdf' }] },
  { id: 'MSG-2024-0039', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-02-10T14:20', kategori: 'Kontoutdrag', amne: 'Kontoutdrag januari', las: false, borttaget: false, arkiverat: false, status: 'Skickat', kontor: 'SE-6292', innehall: 'Ditt kontoutdrag för januari finns tillgängligt.', bilagor: [{ filnamn: 'kontoutdrag-jan.pdf', storlek: 14080, url: '/files/kontoutdrag-jan.pdf' }] },
  { id: 'MSG-2024-0038', kundnr: 'KD-38815', kundnamn: 'Kund #38815', avsandare: 'Handelsbanken', mottagare: 'Kund #38815', datum: '2025-02-10T14:20', kategori: 'Kontoutdrag', amne: 'Kontoutdrag januari', las: false, borttaget: false, arkiverat: false, status: 'Skickat', kontor: 'SE-6292', innehall: 'Ditt kontoutdrag för januari finns tillgängligt.', bilagor: [] },
  { id: 'MSG-2024-0035', kundnr: 'KD-90423', kundnamn: 'Kund #90423', avsandare: 'Handelsbanken', mottagare: 'Kund #90423', datum: '2025-03-01T08:10', kategori: 'Avtal', amne: 'Nytt kortavtal', las: true, borttaget: false, arkiverat: false, status: 'Skickat', kontor: 'SE-6292', innehall: 'Bekräftelse på ditt nya kortavtal bifogas.', bilagor: [{ filnamn: 'kortavtal.pdf', storlek: 20480, url: '/files/kortavtal.pdf' }] },
];

const UTSKICK = [
  { id: 'UTK-2025-0001', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-19T16:35', kategori: 'Avräkningsnota', amne: 'Avräkningsnota nov', las: true, borttaget: false, arkiverat: true, visasTill: '2036-03-20', innehall: 'Din fondorder är genomförd enligt bifogad avräkningsnota.', bilagor: [{ filnamn: 'Avräkningsnota nov.pdf', url: '/files/avrakningsnota-nov.pdf' }] },
  { id: 'UTK-2025-0002', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-10T15:40', kategori: 'Kontoutdrag', amne: 'Kontoutdrag okt', las: true, borttaget: false, arkiverat: false, visasTill: '2036-03-20', innehall: 'Ditt kontoutdrag för oktober 2025 finns tillgängligt.', bilagor: [{ filnamn: 'Kontoutdrag okt.pdf', url: '/files/kontoutdrag-okt.pdf' }] },
  { id: 'UTK-2025-0003', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-04T11:22', kategori: 'Avräkningsnota', amne: 'Avräkningsnota okt', las: false, borttaget: false, arkiverat: false, visasTill: '2036-03-20', innehall: 'Din fondorder är genomförd enligt bifogad avräkningsnota.', bilagor: [{ filnamn: 'Avräkningsnota okt.pdf', url: '/files/avrakningsnota-okt.pdf' }] },
  { id: 'UTK-2025-0004', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-11-03T12:44', kategori: 'Bokföringsavi', amne: 'Bokföringsavi nov', las: false, borttaget: false, arkiverat: false, visasTill: '2036-03-20', innehall: 'Bokföringsavi för november bifogad.', bilagor: [{ filnamn: 'Bokföringsavi nov.pdf', url: '/files/bokforingsavi-nov.pdf' }] },
  { id: 'UTK-2025-0005', kundnr: 'KD-71042', kundnamn: 'Kund #71042', avsandare: 'Handelsbanken', mottagare: 'Kund #71042', datum: '2025-08-18T10:56', kategori: 'Avtal', amne: 'IGDH Test doktyp 2', las: true, borttaget: false, arkiverat: true, visasTill: '2036-03-20', innehall: 'Avtalsbekräftelse bifogad.', bilagor: [{ filnamn: 'IGDH Test doktyp 2.pdf', url: '/files/igdh-test.pdf' }] },
];

const DOKUMENT = [
  { dokumentnamn: 'Avtal Allkonto', forbindelse: '', dokumentdatum: '2025-08-13', utskicksdatum: '2025-08-13', skickatsTill: 'Digitalt', visasTill: '2027-02-13', last: true, borttaget: false, arkiverat: false, kundnr: 'KD-71042' },
  { dokumentnamn: 'Kontoutdrag sep', forbindelse: 'SE-001', dokumentdatum: '2025-09-30', utskicksdatum: '2025-10-01', skickatsTill: 'Digitalt', visasTill: '2027-10-01', last: true, borttaget: false, arkiverat: true, kundnr: 'KD-71042' },
];

const KUVERT = [
  { kuvertId: 'ENV-2024-88441', kundnr: 'KD-71042', kundnamn: 'Kund #71042', datum: '2024-02-29', mall: 'Kontoutdrag', kanal: 'Digital brevlåda', status: 'Levererat' },
];

const UTSKICK_INSTALLNINGAR = [
  { kundnr: 'KD-71042', kategori: 'Kontoutdrag',    avser: 'Konto',           forbindelse: 'SE-001-001', papper: false, internet: false },
  { kundnr: 'KD-71042', kategori: 'Bokföringsavi',  avser: 'Konto',           forbindelse: 'SE-011-011', papper: true,  internet: false },
  { kundnr: 'KD-71042', kategori: 'Låneavi',        avser: 'Lån',             forbindelse: '0',          papper: false, internet: false },
  { kundnr: 'KD-71042', kategori: 'Avräkningsnota', avser: 'Värdepapper',     forbindelse: '0',          papper: true,  internet: false },
  { kundnr: 'KD-71042', kategori: 'Avtal',          avser: 'Lån Stadshypotek',forbindelse: 'SE-005-05',  papper: true,  internet: false },
];

let INFORMATIONSSAMBAND = [
  { id: 'SAM-001', systembeteckning: 'EPOX', informationsId: 'Q294902', publiceraAutomatiskt: false },
];

let PUBLICERING_JOBB = [
  { jobbId: 'EPOX-JOB-001', systembeteckning: 'EPOX', informationsId: 'Q294902', leveranstidpunkt: '2026-06-01T08:00', status: 'Väntar' },
  { jobbId: 'REVL-JOB-002', systembeteckning: 'REVL', informationsId: 'Q295100', leveranstidpunkt: '2026-06-02T08:00', status: 'Väntar' },
];

let INFORMATIONSPRODUKTER = [
  { id: '32225', namn: 'Konto, Account', land: 'Sverige', status: 'Aktiv' },
  { id: '32228', namn: 'Konto',          land: 'Sverige', status: 'Aktiv' },
  { id: '32230', namn: 'Fondkonto',      land: 'Sverige', status: 'Aktiv' },
  { id: '32241', namn: 'Bolån',          land: 'Sverige', status: 'Aktiv' },
];

let DEBITERINGSUPPGIFTER = [
  { produktid: 'DEB-001', meddelandeid: '-', systembeteckning: 'INLÅ', antsKodInternet: '217805', antsKodEjInternet: '217905', resultatstalle: '68821', status: 'Aktiv' },
  { produktid: 'DEB-002', meddelandeid: '-', systembeteckning: 'INLÅ', antsKodInternet: '217826', antsKodEjInternet: '217926', resultatstalle: '68821', status: 'Aktiv' },
  { produktid: 'DEB-003', meddelandeid: '-', systembeteckning: 'REVL', antsKodInternet: '217807', antsKodEjInternet: '217907', resultatstalle: '69314', status: 'Aktiv' },
  { produktid: 'DEB-004', meddelandeid: '-', systembeteckning: 'HBOS', antsKodInternet: '217804', antsKodEjInternet: '217904', resultatstalle: '60180', status: 'Under upplägg' },
  { produktid: 'DEB-005', meddelandeid: '-', systembeteckning: 'AKKO', antsKodInternet: '217800', antsKodEjInternet: '217900', resultatstalle: '60280', status: 'Under upplägg' },
];

let MASSUTSKICK = [
  { meddId: '250', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'TBD',                                      utskicksdatum: '2026-06-25', notifieringskategori: '', meddelande: '',                                         status: 'Under upplägg' },
  { meddId: '214', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Byte av försäkringssystem',                 utskicksdatum: '2024-09-06', notifieringskategori: '', meddelande: 'Brev om byte av försäkringssystem.',         status: 'Klarmarkerad' },
  { meddId: '213', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Förfall av dokumentation för direktnedsättning', utskicksdatum: '2024-09-02', notifieringskategori: '', meddelande: 'Information om förfall av dokumentation.', status: 'Klarmarkerad' },
  { meddId: '211', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Fel i utskick från Handelsbanken',          utskicksdatum: '2024-06-26', notifieringskategori: '', meddelande: 'Rättelse av tidigare utskick.',               status: 'Klarmarkerad' },
  { meddId: '210', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'Difference in tax purposes',               utskicksdatum: '2024-06-03', notifieringskategori: '', meddelande: 'Information regarding tax differences.',       status: 'Klarmarkerad' },
  { meddId: '209', land: 'Sverige', avsandare: 'Handelsbanken', amne: 'e-Kapitalkonto blir Sparkonto',             utskicksdatum: '2024-05-02', notifieringskategori: '', meddelande: 'Information om namnbyte av kontotyp.',         status: 'Klarmarkerad' },
];

// ---- Mock API functions (replace apiFetch) ----

function mockGetKund(kundnr) {
  return KUNDER[kundnr] ?? null;
}

function mockGetMeddelanden(kundnr) {
  return MEDDELANDEN.filter(m => m.kundnr === kundnr);
}

function mockGetMeddelande(kundnr, id) {
  return MEDDELANDEN.find(m => m.kundnr === kundnr && m.id === id) ?? null;
}

function mockGetUtskick(kundnr) {
  return UTSKICK.filter(u => u.kundnr === kundnr);
}

function mockGetUtskickById(kundnr, id) {
  return UTSKICK.find(u => u.kundnr === kundnr && u.id === id) ?? null;
}

function mockGetDokument(kundnr) {
  return DOKUMENT.filter(d => d.kundnr === kundnr);
}

function mockGetKuvert(kuvertId) {
  return KUVERT.find(k => k.kuvertId === kuvertId) ?? null;
}

function mockGetUtskickInstallningar(kundnr) {
  return UTSKICK_INSTALLNINGAR.filter(u => u.kundnr === kundnr);
}

function mockGetInformationssamband() { return [...INFORMATIONSSAMBAND]; }
function mockCreateInformationssamband(input) {
  const id = 'SAM-' + String(INFORMATIONSSAMBAND.length + 1).padStart(3, '0');
  const item = { id, ...input };
  INFORMATIONSSAMBAND.push(item);
  return item;
}
function mockUpdateInformationssamband(id, input) {
  const i = INFORMATIONSSAMBAND.findIndex(s => s.id === id);
  if (i < 0) return null;
  INFORMATIONSSAMBAND[i] = { id, ...input };
  return INFORMATIONSSAMBAND[i];
}
function mockDeleteInformationssamband(id) {
  const i = INFORMATIONSSAMBAND.findIndex(s => s.id === id);
  if (i < 0) return false;
  INFORMATIONSSAMBAND.splice(i, 1);
  return true;
}

function mockGetPubliceringJobb() { return [...PUBLICERING_JOBB]; }
function mockGodkannJobb(jobbId, godkand) {
  const j = PUBLICERING_JOBB.find(j => j.jobbId === jobbId);
  if (!j) return false;
  j.status = godkand ? 'Godkänd' : 'Nekad';
  return true;
}

function mockGetInformationsprodukter(land) {
  if (!land) return [...INFORMATIONSPRODUKTER];
  return INFORMATIONSPRODUKTER.filter(p => p.land.toLowerCase() === land.toLowerCase());
}
function mockCreateInformationsprodukt(input) {
  const id = String(Math.max(...INFORMATIONSPRODUKTER.map(p => Number(p.id))) + 1);
  const item = { id, ...input };
  INFORMATIONSPRODUKTER.push(item);
  return item;
}
function mockUpdateInformationsprodukt(id, input) {
  const i = INFORMATIONSPRODUKTER.findIndex(p => p.id === id);
  if (i < 0) return null;
  INFORMATIONSPRODUKTER[i] = { id, ...input };
  return INFORMATIONSPRODUKTER[i];
}

function mockGetDebiteringsuppgifter() { return [...DEBITERINGSUPPGIFTER]; }
function mockCreateDebiteringsuppgift(input) {
  const item = { ...input };
  DEBITERINGSUPPGIFTER.push(item);
  return item;
}
function mockUpdateDebiteringsuppgift(produktid, input) {
  const i = DEBITERINGSUPPGIFTER.findIndex(d => d.produktid === produktid);
  if (i < 0) return null;
  DEBITERINGSUPPGIFTER[i] = { produktid, ...input };
  return DEBITERINGSUPPGIFTER[i];
}
function mockDeleteDebiteringsuppgift(produktid) {
  const i = DEBITERINGSUPPGIFTER.findIndex(d => d.produktid === produktid);
  if (i < 0) return false;
  DEBITERINGSUPPGIFTER.splice(i, 1);
  return true;
}

function mockGetMassutskick() { return [...MASSUTSKICK].sort((a,b) => Number(b.meddId)-Number(a.meddId)); }
function mockCreateMassutskick(input) {
  const meddId = String(Math.max(...MASSUTSKICK.map(m => Number(m.meddId))) + 1);
  const item = { meddId, ...input, status: 'Under upplägg' };
  MASSUTSKICK.push(item);
  return item;
}
function mockUpdateMassutskick(meddId, input) {
  const i = MASSUTSKICK.findIndex(m => m.meddId === meddId);
  if (i < 0) return null;
  MASSUTSKICK[i] = { ...MASSUTSKICK[i], ...input };
  return MASSUTSKICK[i];
}
function mockDeleteMassutskick(meddId) {
  const i = MASSUTSKICK.findIndex(m => m.meddId === meddId);
  if (i < 0) return false;
  MASSUTSKICK.splice(i, 1);
  return true;
}
function mockKlarmarkeraMassutskick(meddId) {
  const m = MASSUTSKICK.find(m => m.meddId === meddId);
  if (!m) return 'NOT_FOUND';
  if (m.status === 'Klarmarkerad' || m.status === 'Skickad') return 'CONFLICT';
  m.status = 'Klarmarkerad';
  return 'OK';
}

(function() {
class HbPanel extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') ?? '';
    const inner = this.innerHTML;
    this.innerHTML = `
      <div class="bg-white border border-gray-200 rounded shadow-sm">
        <div class="px-4 pt-4 pb-1">
          <h2 class="text-[#1565c0] font-bold text-base">${title}</h2>
          <div class="mt-3 border-t border-gray-100"></div>
        </div>
        <div class="px-4 pb-4 pt-3">${inner}</div>
      </div>`;
  }
}
customElements.define('hb-panel', HbPanel);
})();

(function() {
class HbInfoPanel extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') ?? '';
    const inner = this.innerHTML;
    this.innerHTML = `
      <div class="bg-white border border-gray-200 rounded shadow-sm w-48 shrink-0">
        <div class="px-4 pt-4 pb-1">
          <h2 class="text-[#1565c0] font-bold text-base">${title}</h2>
          <div class="mt-3 border-t border-gray-100"></div>
        </div>
        <div class="px-4 pb-4 pt-3 text-xs text-gray-700 space-y-3">${inner}</div>
      </div>`;
  }
}
customElements.define('hb-info-panel', HbInfoPanel);
})();

(function() {
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
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageMeddelanden extends HTMLElement {
  constructor() {
    super();
    this.currentKundnr = '';
    this.currentMessages = [];
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Kundens meddelanden (endast privatkunder)</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <p class="text-xs text-gray-500 mb-3">* Obligatoriska uppgifter</p>
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer <span class="text-red-600">*</span></label>
                <input id="kundnr" class="${INPUT} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-hamta" class="${BTN}">Hämta meddelanden</button>
            </div>
          </div>

          <div id="results-section" class="hidden space-y-4">
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 id="msg-list-title" class="text-[#1565c0] font-bold text-base">Meddelanden</h2>
                  <button id="btn-uppdatera" class="${BTN}">Uppdatera</button>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th>Avsändare</th>
                      <th>Mottagare</th>
                      <th>Datum</th>
                      <th>Kategori</th>
                      <th>Ämne</th>
                    </tr>
                  </thead>
                  <tbody id="msg-tbody"></tbody>
                </table>
                <div id="msg-empty" class="hidden py-4 text-center text-gray-400 text-sm">Inga meddelanden hittades</div>
              </div>
            </div>

            <div id="detail-panel" class="${PANEL} hidden">
              <div class="px-4 pt-4 pb-1">
                <h2 id="detail-title" class="text-[#1565c0] font-bold text-base"></h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div id="detail-grid" class="grid grid-cols-3 gap-x-6 gap-y-1 text-sm mb-4"></div>
                <p class="text-sm text-gray-600 italic">Meddelandeinnehåll visas här efter hämtning från arkiv.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-hamta').addEventListener('click', () => {
      const kundnr = this.querySelector('#kundnr').value.trim();
      if (!kundnr) return;
      this.currentKundnr = kundnr;
      this.loadMessages(this.currentKundnr);
    });

    this.querySelector('#btn-uppdatera').addEventListener('click', () => {
      if (this.currentKundnr) this.loadMessages(this.currentKundnr);
    });

    this.querySelector('#kundnr').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-hamta').click();
    });
  }

  loadMessages(kundnr) {
    const items = mockGetMeddelanden(kundnr);
    this.currentMessages = items;
    this.querySelector('#results-section').classList.remove('hidden');
    this.querySelector('#detail-panel').classList.add('hidden');
    this.querySelector('#msg-list-title').textContent = `Meddelanden – ${kundnr}`;
    this.renderTable(this.currentMessages);
  }

  renderTable(messages) {
    const tbody = this.querySelector('#msg-tbody');
    const empty = this.querySelector('#msg-empty');
    tbody.innerHTML = '';
    if (messages.length === 0) {
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    messages.forEach(m => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td>${m.avsandare}</td>
        <td>${m.kundnamn}</td>
        <td style="white-space:nowrap">${fmtDatum(m.datum)}</td>
        <td>${m.kategori}</td>
        <td><button class="link">${m.amne}</button></td>
      `;
      tr.addEventListener('click', () => this.selectMessage(m, tr));
      tbody.appendChild(tr);
    });
  }

  selectMessage(m, tr) {
    this.querySelectorAll('#msg-tbody tr').forEach(r => r.classList.remove('selected'));
    tr.classList.add('selected');

    const panel = this.querySelector('#detail-panel');
    panel.classList.remove('hidden');
    this.querySelector('#detail-title').textContent = `${fmtDatum(m.datum)} – ${m.amne}`;

    const grid = this.querySelector('#detail-grid');
    grid.innerHTML = `
      <div class="text-gray-500">Kundnamn</div>   <div>${m.kundnamn}</div> <div></div>
      <div class="text-gray-500">Mottagare</div>  <div>${m.kundnamn}</div> <div><span class="text-gray-500">Läst av kund</span>&nbsp; ${boolJa(m.las)}</div>
      <div class="text-gray-500">Kundnr</div>     <div>${m.kundnr}</div>   <div></div>
      <div class="text-gray-500">Avsändare</div>  <div>${m.avsandare}</div> <div><span class="text-gray-500">Borttaget av kund</span>&nbsp; ${boolJa(m.borttaget)}</div>
      <div class="text-gray-500">Kundansv. kontor</div> <div>${m.kontor}</div> <div></div>
      <div></div> <div></div> <div><span class="text-gray-500">Arkiverat av kund</span>&nbsp; ${boolJa(m.arkiverat)}</div>
      <div></div> <div></div> <div><span class="text-gray-500">Status</span>&nbsp; ${m.status}</div>
    `;
  }
}

customElements.define('page-meddelanden', PageMeddelanden);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageUtskick extends HTMLElement {
  constructor() {
    super();
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Kundens utskick (endast privatkunder)</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <p class="text-xs text-gray-500 mb-3">* Obligatoriska uppgifter</p>
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer <span class="text-red-600">*</span></label>
                <input id="kundnr" class="${INPUT} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-hamta" class="${BTN}">Hämta utskick</button>
            </div>
          </div>

          <div id="results-section" class="hidden space-y-4">
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 id="list-title" class="text-[#1565c0] font-bold text-base">Utskick</h2>
                  <button id="btn-uppdatera" class="${BTN}">Uppdatera</button>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th>Avsändare</th>
                      <th>Mottagare</th>
                      <th>Datum</th>
                      <th>Kategori</th>
                      <th>Ämne</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="utskick-tbody"></tbody>
                </table>
              </div>
            </div>

            <div id="detail-panel" class="${PANEL} hidden">
              <div class="px-4 pt-4 pb-1">
                <h2 id="detail-title" class="text-[#1565c0] font-bold text-base"></h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div id="detail-grid" class="grid grid-cols-3 gap-x-6 gap-y-1 text-sm mb-4"></div>
                <div class="border-t border-gray-100 pt-3 text-sm text-gray-700 whitespace-pre-line leading-relaxed" id="detail-body"></div>
                <div class="mt-3">
                  <button class="link" id="detail-pdf"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-hamta').addEventListener('click', () => {
      const kundnr = this.querySelector('#kundnr').value.trim();
      if (!kundnr) return;
      this.currentKundnr = kundnr;
      this.querySelector('#results-section').classList.remove('hidden');
      this.querySelector('#detail-panel').classList.add('hidden');
      this.renderTable(kundnr);
    });

    this.querySelector('#btn-uppdatera').addEventListener('click', () => {
      if (this.currentKundnr) this.renderTable(this.currentKundnr);
    });

    this.querySelector('#kundnr').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-hamta').click();
    });
  }

  renderTable(kundnr) {
    const items = mockGetUtskick(kundnr);
    const tbody = this.querySelector('#utskick-tbody');
    tbody.innerHTML = '';
    items.forEach(u => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td>${u.avsandare}</td>
        <td>${u.mottagare}</td>
        <td style="white-space:nowrap">${fmtDatum(u.datum)}</td>
        <td>${u.kategori}</td>
        <td><button class="link">${u.amne}</button></td>
        <td style="color:#9ca3af">&#128196;</td>
      `;
      tr.addEventListener('click', () => {
        this.querySelectorAll('#utskick-tbody tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        const detail = mockGetUtskickById(kundnr, u.id);
        if (!detail) return;
        const panel = this.querySelector('#detail-panel');
        panel.classList.remove('hidden');
        this.querySelector('#detail-title').textContent = `${fmtDatum(detail.datum)} – ${detail.amne}`;
        this.querySelector('#detail-grid').innerHTML = `
          <div class="text-gray-500">Kundnamn</div>  <div>${detail.kundnamn}</div> <div></div>
          <div class="text-gray-500">Mottagare</div> <div>${detail.kundnamn}</div> <div><span class="text-gray-500">Läst av kund</span>&nbsp; ${boolJa(detail.las)}</div>
          <div class="text-gray-500">Kundnr</div>    <div>${detail.kundnr}</div>   <div></div>
          <div class="text-gray-500">Avsändare</div> <div>${detail.avsandare}</div> <div><span class="text-gray-500">Borttaget av kund</span>&nbsp; ${boolJa(detail.borttaget)}</div>
          <div class="text-gray-500">Visas för kund till</div> <div>${detail.visasTill || '–'}</div> <div><span class="text-gray-500">Arkiverat av kund</span>&nbsp; ${boolJa(detail.arkiverat)}</div>
          <div></div> <div></div> <div><span class="text-gray-500">Status</span>&nbsp; –</div>
        `;
        this.querySelector('#detail-body').textContent = detail.innehall || '';
        const pdfBtn = this.querySelector('#detail-pdf');
        pdfBtn.textContent = detail.bilagor && detail.bilagor[0] ? detail.bilagor[0].filnamn : '';
      });
      tbody.appendChild(tr);
    });
    this.querySelector('#list-title').textContent = `Utskick – ${kundnr} ${items[0] ? items[0].kundnamn : ''}`;
  }
}

customElements.define('page-utskick', PageUtskick);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const SELECT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0] appearance-none bg-white';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageSokDokument extends HTMLElement {
  constructor() {
    super();
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Sök dokument</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-sok-kund" class="${BTN}">Sök kund</button>
            </div>
          </div>

          <div id="panel-filter" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="filter-title" class="text-[#1565c0] font-bold text-base">Filter</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="flex items-end gap-4 flex-wrap mb-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Kategori</label>
                  <select id="filter-kategori" class="${SELECT} w-48">
                    <option value="">Välj kategori</option>
                    <option>Kontoutdrag</option>
                    <option>Avräkningsnota</option>
                    <option>Bokföringsavi</option>
                    <option>Avtal</option>
                    <option>Digital</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Avser</label>
                  <select id="filter-avser" class="${SELECT} w-48">
                    <option value="">Inga informationstyper</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Förbindelse</label>
                  <select id="filter-forbindelse" class="${SELECT} w-48">
                    <option value="">Välj förbindelse</option>
                  </select>
                </div>
              </div>
              <div class="flex items-center gap-6 mb-4">
                <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="datum" value="alla" checked /> Alla datum
                </label>
                <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="datum" value="period" /> Period
                </label>
                <div id="period-inputs" style="display:none" class="flex items-center gap-2">
                  <input type="date" id="datum-fran" class="${INPUT}" />
                  <span class="text-gray-500 text-sm">–</span>
                  <input type="date" id="datum-till" class="${INPUT}" />
                </div>
              </div>
              <button id="btn-sok-dok" class="${BTN}">Sök dokument</button>
            </div>
          </div>

          <div id="panel-results" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Sökresultat</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Dokumentnamn</th>
                    <th>Förbindelse</th>
                    <th>Dok.datum</th>
                    <th>Utskicksdatum</th>
                    <th>Skickats till</th>
                    <th>Visas till</th>
                    <th>Läst</th>
                    <th>Borttaget</th>
                    <th>Arkiverat</th>
                  </tr>
                </thead>
                <tbody id="results-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-sok-kund').addEventListener('click', () => {
      const kundnr = this.querySelector('#kundnr').value.trim();
      if (!kundnr) return;
      const kund = mockGetKund(kundnr);
      if (!kund) { alert('Kund saknas'); return; }
      this.currentKundnr = kundnr;
      this.querySelector('#filter-title').textContent = `Kundnummer ${kundnr} ${kund.kundnamn}`;
      this.querySelector('#panel-filter').classList.remove('hidden');
      this.querySelector('#panel-results').classList.add('hidden');
    });

    this.querySelector('#kundnr').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-sok-kund').click();
    });

    this.querySelectorAll('input[name="datum"]').forEach(r => {
      r.addEventListener('change', () => {
        const pi = this.querySelector('#period-inputs');
        pi.style.display = r.value === 'period' ? 'flex' : 'none';
      });
    });

    this.querySelector('#btn-sok-dok').addEventListener('click', () => {
      const kategori    = this.querySelector('#filter-kategori').value;
      const avser       = this.querySelector('#filter-avser').value;
      const forbindelse = this.querySelector('#filter-forbindelse').value;
      const datumRadio  = this.querySelector('input[name="datum"]:checked');
      let datumFran = '';
      let datumTill = '';
      if (datumRadio && datumRadio.value === 'period') {
        datumFran = this.querySelector('#datum-fran').value;
        datumTill = this.querySelector('#datum-till').value;
      }

      let results = mockGetDokument(this.currentKundnr);
      if (kategori && kategori !== 'Välj kategori' && kategori !== 'Inga kategorier') {
        results = results.filter(r => r.kategori === kategori);
      }
      if (datumFran) results = results.filter(r => r.dokumentdatum >= datumFran);
      if (datumTill) results = results.filter(r => r.dokumentdatum <= datumTill);

      const tbody = this.querySelector('#results-tbody');
      tbody.innerHTML = '';
      results.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><button class="link">&#128196; ${r.dokumentnamn}</button></td>
          <td>${r.forbindelse || ''}</td>
          <td>${r.dokumentdatum || ''}</td>
          <td>${r.utskicksdatum || ''}</td>
          <td>${r.skickatsTill || ''}</td>
          <td>${r.visasTill || ''}</td>
          <td>${boolJa(r.last)}</td>
          <td>${boolJa(r.borttaget)}</td>
          <td>${boolJa(r.arkiverat)}</td>
        `;
        tbody.appendChild(tr);
      });
      this.querySelector('#panel-results').classList.remove('hidden');
    });
  }
}

customElements.define('page-sok-dokument', PageSokDokument);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageSokKuvert extends HTMLElement {
  constructor() {
    super();
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Sök med kuvertID</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kuvert-ID</label>
                <input id="kuvert-id" class="${INPUT} w-64" placeholder="Ange kuvert-ID" />
              </div>
              <button id="btn-sok" class="${BTN}">Sök</button>
            </div>
          </div>

          <div id="result-card" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Kuvertinformation</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-lg">
                <div class="text-gray-500">Kuvert-ID</div>
                <div id="res-kuvert-id" class="font-medium"></div>

                <div class="text-gray-500">Kundnamn</div>
                <div id="res-kundnamn"></div>

                <div class="text-gray-500">Kundnummer</div>
                <div>
                  <button id="res-kundnr" class="link font-medium"></button>
                  <span id="copied-msg" style="display:none" class="ml-2 text-green-600 text-xs">&#10003; Kopierat</span>
                </div>

                <div class="text-gray-500">Datum</div>
                <div id="res-datum"></div>

                <div class="text-gray-500">Mall</div>
                <div id="res-mall"></div>

                <div class="text-gray-500">Kanal</div>
                <div id="res-kanal"></div>

                <div class="text-gray-500">Status</div>
                <div id="res-status" class="font-medium text-green-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-sok').addEventListener('click', () => {
      const kuvertId = this.querySelector('#kuvert-id').value.trim();
      if (!kuvertId) return;
      const kuvert = mockGetKuvert(kuvertId);
      if (!kuvert) { alert('Kuvert saknas'); return; }
      this.currentKundnr = kuvert.kundnr;
      this.querySelector('#result-card').classList.remove('hidden');
      this.querySelector('#res-kuvert-id').textContent = kuvert.kuvertId;
      this.querySelector('#res-kundnamn').textContent  = kuvert.kundnamn;
      this.querySelector('#res-datum').textContent     = kuvert.datum;
      this.querySelector('#res-mall').textContent      = kuvert.mall;
      this.querySelector('#res-kanal').textContent     = kuvert.kanal;
      this.querySelector('#res-status').textContent    = kuvert.status;
      this.querySelector('#res-kundnr').textContent    = kuvert.kundnr;
    });

    this.querySelector('#kuvert-id').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-sok').click();
    });

    this.querySelector('#res-kundnr').addEventListener('click', () => {
      if (navigator.clipboard) navigator.clipboard.writeText(this.currentKundnr);
      const msg = this.querySelector('#copied-msg');
      msg.style.display = 'inline';
      setTimeout(() => { msg.style.display = 'none'; }, 2000);
    });
  }
}

customElements.define('page-sok-kuvert', PageSokKuvert);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageAdminUtskick extends HTMLElement {
  constructor() {
    super();
    this.rows = [];
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Administrera utskick</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-hamta" class="${BTN}">Hämta</button>
            </div>
          </div>

          <div id="settings-panel" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="settings-title" class="text-[#1565c0] font-bold text-base">Utskicksinställningar</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Avser</th>
                    <th>Förbindelse</th>
                    <th class="text-center">Papper</th>
                    <th class="text-center">Internet</th>
                  </tr>
                </thead>
                <tbody id="settings-tbody"></tbody>
              </table>
              <div id="save-msg" class="hidden mt-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
              <div class="flex gap-3 mt-4">
                <button id="btn-spara" class="${BTN}">Spara</button>
                <button id="btn-avbryt" class="${BTN_SEC}">Avbryt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-hamta').addEventListener('click', () => {
      const kundnr = this.querySelector('#kundnr').value.trim();
      if (!kundnr) return;
      this.currentKundnr = kundnr;
      this.rows = mockGetUtskickInstallningar(kundnr);
      this.querySelector('#settings-panel').classList.remove('hidden');
      this.querySelector('#settings-title').textContent = `Utskicksinställningar – ${kundnr}`;
      this.renderSettings();
    });

    this.querySelector('#kundnr').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-hamta').click();
    });

    this.querySelector('#btn-spara').addEventListener('click', () => {
      // Mock save — just show success message
      const msg = this.querySelector('#save-msg');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 2500);
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.querySelector('#settings-panel').classList.add('hidden');
      this.querySelector('#kundnr').value = '';
    });
  }

  renderSettings() {
    const tbody = this.querySelector('#settings-tbody');
    tbody.innerHTML = '';
    this.rows.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.kategori}</td>
        <td style="color:#0066b3">${r.avser}</td>
        <td style="font-size:12px;color:#6b7280">${r.forbindelse}</td>
        <td style="text-align:center"><input type="checkbox" ${r.papper ? 'checked' : ''} data-idx="${i}" data-field="papper"></td>
        <td style="text-align:center"><input type="checkbox" ${r.internet ? 'checked' : ''} data-idx="${i}" data-field="internet"></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const idx   = parseInt(cb.dataset['idx'] ?? '0');
        const field = cb.dataset['field'];
        if (field === 'papper' || field === 'internet') {
          this.rows[idx][field] = cb.checked;
        }
      });
    });
  }
}

customElements.define('page-administrera-utskick', PageAdminUtskick);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageInstallningar extends HTMLElement {
  constructor() {
    super();
    this.samband = [];
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Publiceringsinställningar</h1>
        <div class="space-y-4">
          <!-- Existing settings table -->
          <div class="${PANEL}">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Informationssamband</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th class="w-10"></th>
                    <th>Systembeteckning</th>
                    <th>Informations-ID</th>
                    <th>Publicera automatiskt</th>
                  </tr>
                </thead>
                <tbody id="samband-tbody"></tbody>
              </table>
              <div class="flex gap-3 mt-4">
                <button id="btn-ta-bort" class="${BTN_SEC}">Ta bort markerade</button>
                <button id="btn-andra" class="${BTN_SEC}">Ändra</button>
              </div>
            </div>
          </div>

          <!-- Add new -->
          <div class="${PANEL}">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Lägg till informationssamband</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="flex items-end gap-4 flex-wrap mb-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Systembeteckning</label>
                  <input id="sys-bet" class="${INPUT} w-48" />
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Informations-ID</label>
                  <input id="sys-id" class="${INPUT} w-48" />
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-2">Publicera automatiskt</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="auto" value="Ja" /> Ja
                    </label>
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="auto" value="Nej" /> Nej
                    </label>
                  </div>
                </div>
              </div>
              <div id="save-msg" class="hidden mb-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
              <div class="flex gap-3">
                <button id="btn-spara-ny" class="${BTN}">Spara ny</button>
                <button id="btn-avbryt" class="${BTN_SEC}">Avbryt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadSamband();
  }

  init() {
    this.querySelector('#btn-spara-ny').addEventListener('click', () => {
      const sys  = this.querySelector('#sys-bet').value.trim();
      const id   = this.querySelector('#sys-id').value.trim();
      const auto = this.querySelector('input[name="auto"]:checked');
      if (!sys || !id || !auto) return;
      mockCreateInformationssamband({
        systembeteckning: sys,
        informationsId: id,
        publiceraAutomatiskt: auto.value === 'Ja',
      });
      this.loadSamband();
      const msg = this.querySelector('#save-msg');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 2500);
      this.querySelector('#sys-bet').value = '';
      this.querySelector('#sys-id').value  = '';
      this.querySelectorAll('input[name="auto"]').forEach(r => r.checked = false);
    });

    this.querySelector('#btn-andra').addEventListener('click', () => {
      const msg = this.querySelector('#save-msg');
      msg.textContent = '✓ Ändrad';
      msg.classList.remove('hidden');
      setTimeout(() => { msg.classList.add('hidden'); msg.textContent = '✓ Sparad'; }, 2500);
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.querySelector('#sys-bet').value = '';
      this.querySelector('#sys-id').value  = '';
      this.querySelectorAll('input[name="auto"]').forEach(r => r.checked = false);
    });

    this.querySelector('#btn-ta-bort').addEventListener('click', () => {
      const tbody = this.querySelector('#samband-tbody');
      const checkedIds = [];
      tbody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) checkedIds.push(cb.dataset['id'] ?? '');
      });
      for (const id of checkedIds) {
        mockDeleteInformationssamband(id);
      }
      this.loadSamband();
    });
  }

  loadSamband() {
    this.samband = mockGetInformationssamband();
    this.renderSamband();
  }

  renderSamband() {
    const tbody = this.querySelector('#samband-tbody');
    tbody.innerHTML = '';
    this.samband.forEach(s => {
      const tr = document.createElement('tr');
      tr.dataset['id'] = s.id;
      tr.innerHTML = `
        <td style="text-align:center"><input type="checkbox" data-id="${s.id}"></td>
        <td><button class="link">${s.systembeteckning}</button></td>
        <td>${s.informationsId}</td>
        <td>${s.publiceraAutomatiskt ? 'Ja' : 'Nej'}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-installningar', PageInstallningar);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageKontrollera extends HTMLElement {
  constructor() {
    super();
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Kontrollera dokument</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-sok-kund" class="${BTN}">Sök kund</button>
            </div>
          </div>

          <div id="panel-filter" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="filter-title" class="text-[#1565c0] font-bold text-base">Filter</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <button id="btn-sok-dok" class="${BTN}">Sök dokument</button>
            </div>
          </div>

          <div id="panel-results" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Dokument</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Dokumentnamn</th>
                    <th>Förbindelse</th>
                    <th>Dok.datum</th>
                    <th>Utskicksdatum</th>
                    <th>Visas till</th>
                    <th>Läst</th>
                  </tr>
                </thead>
                <tbody id="results-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-sok-kund').addEventListener('click', () => {
      const kundnr = this.querySelector('#kundnr').value.trim();
      if (!kundnr) return;
      const kund = mockGetKund(kundnr);
      if (!kund) { alert('Kund saknas'); return; }
      this.currentKundnr = kundnr;
      this.querySelector('#filter-title').textContent = `Kundnummer ${kundnr} ${kund.kundnamn}`;
      this.querySelector('#panel-filter').classList.remove('hidden');
      this.querySelector('#panel-results').classList.add('hidden');
    });

    this.querySelector('#kundnr').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-sok-kund').click();
    });

    this.querySelector('#btn-sok-dok').addEventListener('click', () => {
      const results = mockGetDokument(this.currentKundnr);
      const tbody = this.querySelector('#results-tbody');
      tbody.innerHTML = '';
      results.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><button class="link">&#128196; ${r.dokumentnamn}</button></td>
          <td>${r.forbindelse || ''}</td>
          <td>${r.dokumentdatum || ''}</td>
          <td>${r.utskicksdatum || ''}</td>
          <td>${r.visasTill || ''}</td>
          <td>${boolJa(r.last)}</td>
        `;
        tbody.appendChild(tr);
      });
      this.querySelector('#panel-results').classList.remove('hidden');
    });
  }
}

customElements.define('page-kontrollera', PageKontrollera);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0 disabled:opacity-50';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageGodkann extends HTMLElement {
  constructor() {
    super();
    this.remaining = [];
    this.selectedJob = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Godkänna för publicering</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- Jobs table -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Väntande publiceringsjobb</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div id="no-jobs" class="hidden text-gray-400 text-sm py-4 text-center">Inga väntande jobb</div>
                <table id="jobs-table" class="hb-table hidden">
                  <thead>
                    <tr>
                      <th>Systembeteckning</th>
                      <th>Informations-ID</th>
                      <th>Leveranstidpunkt</th>
                      <th>Jobb-ID</th>
                    </tr>
                  </thead>
                  <tbody id="jobs-tbody"></tbody>
                </table>
              </div>
            </div>

            <!-- Properties -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Jobbegenskaper</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-md mb-4">
                  <div class="text-gray-500">Systembeteckning</div><div id="prop-sys">–</div>
                  <div class="text-gray-500">Informations-ID</div><div id="prop-id">–</div>
                  <div class="text-gray-500">Leveranstidpunkt</div><div id="prop-lev">–</div>
                  <div class="text-gray-500">Jobb-ID</div><div id="prop-jobb">–</div>
                </div>

                <div class="mb-4">
                  <p class="text-sm text-gray-700 mb-2 font-medium">Godkänn för publicering</p>
                  <div class="flex gap-6">
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="gk" value="Ja" /> Ja, publicera
                    </label>
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="gk" value="Nej" /> Nej, ta bort
                    </label>
                  </div>
                </div>

                <div id="utfor-msg" class="hidden mb-3 text-green-700 text-sm font-medium"></div>
                <div class="flex gap-3">
                  <button id="btn-utfor" class="${BTN}" disabled>Utför</button>
                  <button id="btn-avbryt" class="${BTN_SEC}">Avbryt</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadJobs();
  }

  updateUtforBtn() {
    const gk = this.querySelector('input[name="gk"]:checked');
    this.querySelector('#btn-utfor').disabled = !(this.selectedJob && gk);
  }

  init() {
    this.querySelectorAll('input[name="gk"]').forEach(r => {
      r.addEventListener('change', () => this.updateUtforBtn());
    });

    this.querySelector('#btn-utfor').addEventListener('click', () => {
      if (!this.selectedJob) return;
      const gk = this.querySelector('input[name="gk"]:checked');
      if (!gk) return;
      const action = gk.value === 'Ja' ? 'publicerat' : 'borttaget';
      mockGodkannJobb(this.selectedJob.jobbId, gk.value === 'Ja');
      this.loadJobs();

      const msg = this.querySelector('#utfor-msg');
      msg.textContent = `✓ Jobb ${this.selectedJob.jobbId} ${action}`;
      msg.classList.remove('hidden');

      this.selectedJob = null;
      ['prop-sys', 'prop-id', 'prop-lev', 'prop-jobb'].forEach(id => {
        this.querySelector(`#${id}`).textContent = '–';
      });
      this.querySelectorAll('input[name="gk"]').forEach(r => r.checked = false);
      this.querySelector('#btn-utfor').disabled = true;

      setTimeout(() => msg.classList.add('hidden'), 3000);
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.selectedJob = null;
      ['prop-sys', 'prop-id', 'prop-lev', 'prop-jobb'].forEach(id => {
        this.querySelector(`#${id}`).textContent = '–';
      });
      this.querySelectorAll('input[name="gk"]').forEach(r => r.checked = false);
      this.querySelectorAll('#jobs-tbody tr').forEach(r => r.classList.remove('selected'));
      this.querySelector('#btn-utfor').disabled = true;
    });
  }

  loadJobs() {
    const jobs = mockGetPubliceringJobb();
    this.remaining = jobs.filter(j => j.status === 'Väntar');
    this.renderJobs();
  }

  renderJobs() {
    const tbody  = this.querySelector('#jobs-tbody');
    const noJobs = this.querySelector('#no-jobs');
    const table  = this.querySelector('#jobs-table');
    tbody.innerHTML = '';

    if (this.remaining.length === 0) {
      noJobs.classList.remove('hidden');
      table.classList.add('hidden');
      return;
    }
    noJobs.classList.add('hidden');
    table.classList.remove('hidden');

    this.remaining.forEach(j => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.dataset['id'] = j.jobbId;
      tr.innerHTML = `
        <td><button class="link">${j.systembeteckning}</button></td>
        <td>${j.informationsId}</td>
        <td>${fmtDatum(j.leveranstidpunkt)}</td>
        <td>${j.jobbId}</td>
      `;
      tr.addEventListener('click', () => {
        this.querySelectorAll('#jobs-tbody tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        this.selectedJob = j;
        this.querySelector('#prop-sys').textContent  = j.systembeteckning;
        this.querySelector('#prop-id').textContent   = j.informationsId;
        this.querySelector('#prop-lev').textContent  = fmtDatum(j.leveranstidpunkt);
        this.querySelector('#prop-jobb').textContent = j.jobbId;
        this.updateUtforBtn();
      });
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-godkann', PageGodkann);
})();

(function() {

const BTN    = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT  = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white';
const SELECT = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] appearance-none bg-white w-full';
const PANEL  = 'bg-white border border-gray-200 rounded shadow-sm';
const LABEL  = 'block text-sm text-gray-700 mb-1';
const REQ    = '<span class="text-red-600">*</span>';
const NOTIF_KAT = ['AVRNOTA','KONTODR','BOKFAVI','RANTEBS','KORTBEK','FONDBES','AVTAL'];

class PageInfoprodukter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Administrera informationsprodukter</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- Add new -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Lägg till informationsprodukt</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3 space-y-4">

                <!-- Row 1: Land, Id, Notifieringskategori -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Land ${REQ}</label>
                    <select id="f-land" class="${SELECT}">
                      <option value="">Välj land</option>
                      <option>SE</option><option>NO</option><option>DK</option>
                      <option>FI</option><option>GB</option><option>NL</option>
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL}">Id ${REQ}</label>
                    <input id="f-id" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="${LABEL}">Notifieringskategori ${REQ}</label>
                    <select id="f-notifkat" class="${SELECT}">
                      <option value="">-- Välj --</option>
                      ${NOTIF_KAT.map(k => `<option>${k}</option>`).join('')}
                    </select>
                  </div>
                </div>

                <!-- Row 2: Namn, Status, Insynsskyddat dokument -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Namn ${REQ}</label>
                    <input id="f-namn" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="${LABEL}">Status ${REQ}</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-status" value="Aktiv" checked /> Aktiv
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-status" value="Inaktiv" /> Inaktiv
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="${LABEL}">Insynsskyddat dokument ${REQ}</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-insyns" value="Ja" /> Ja
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-insyns" value="Nej" checked /> Nej
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Row 3: Systembeteckning, Avgiftsid Papper, Avgiftsid Internet -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Systembeteckning</label>
                    <input id="f-sys" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="${LABEL}">Avgiftsid för Papper ${REQ}</label>
                    <input id="f-avg-papper" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="${LABEL}">Avgiftsid för Internet ${REQ}</label>
                    <input id="f-avg-internet" class="${INPUT}" />
                  </div>
                </div>

                <!-- Row 4: Visningsstid, Lagringstid -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Visningsstid i e-arkiv för kund (månader) ${REQ}</label>
                    <input id="f-visning" class="${INPUT}" type="number" min="0" />
                  </div>
                  <div>
                    <label class="${LABEL}">Lagringstid på disk (månader) ${REQ}</label>
                    <input id="f-lagring" class="${INPUT}" type="number" min="0" />
                  </div>
                </div>

                <!-- Row 5: Beskrivning -->
                <div>
                  <label class="${LABEL}">Beskrivning</label>
                  <textarea id="f-beskrivning" class="${INPUT}" rows="3" style="resize:vertical"></textarea>
                </div>

                <!-- Row 6: Kanaler -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Defaultkanaler</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="f-def-papper" /> Papper
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="f-def-internet" /> Internet
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="${LABEL}">Tillåtna kanaler</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="f-till-papper" /> Papper
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="f-till-internet" /> Internet
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="${LABEL}">Obligatoriska kanaler</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="f-oblig-papper" /> Papper
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="f-oblig-internet" /> Internet
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Row 7: Kanalval, Debitera -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="${LABEL}">Någon av kanalerna måste vara vald ${REQ}</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-kanal-krav" value="Ja" checked /> Ja
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-kanal-krav" value="Nej" /> Nej
                      </label>
                    </div>
                  </div>
                  <div>
                    <label class="${LABEL}">Debitera icke Internetkunder för pappersutskick ${REQ}</label>
                    <div class="flex gap-4 mt-1">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-debitera" value="Ja" /> Ja
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="ip-debitera" value="Nej" checked /> Nej
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Row 8: Meddelande i utskick via Internet -->
                <div>
                  <label class="${LABEL}">Meddelande i utskick via Internet ${REQ}</label>
                  <textarea id="f-meddelande" class="${INPUT}" rows="5" style="resize:vertical"
                    placeholder="Här lägger vi in text för inkorg"></textarea>
                </div>

                <!-- Row 9: Informationstext -->
                <div>
                  <label class="${LABEL}">Informationstext</label>
                  <textarea id="f-infotext" class="${INPUT}" rows="3" style="resize:vertical"
                    placeholder="Infotext..."></textarea>
                </div>

                <div id="save-msg" class="hidden text-green-700 text-sm font-medium">&#10003; Sparad</div>
                <button id="btn-spara" class="${BTN}">Spara</button>
              </div>
            </div>

            <!-- List -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-[#1565c0] font-bold text-base">Informationsprodukter</h2>
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Filtrera land:</label>
                    <select id="filter-land" class="${SELECT}" style="width:9rem">
                      <option value="">Välj land</option>
                      <option>SE</option>
                      <option>NO</option>
                      <option>DK</option>
                      <option>FI</option>
                      <option>GB</option>
                      <option>NL</option>
                    </select>
                  </div>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Namn</th>
                      <th>Land</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="products-tbody"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadProducts('');
  }

  init() {
    this.querySelector('#filter-land').addEventListener('change', (e) => {
      this.loadProducts(e.target.value);
    });

    this.querySelector('#btn-spara').addEventListener('click', () => {
      const body = {
        land:                    this.querySelector('#f-land').value,
        namn:                    this.querySelector('#f-namn').value.trim(),
        status:                  (this.querySelector('input[name="ip-status"]:checked') ?? {}).value ?? 'Aktiv',
        notifieringskategori:    this.querySelector('#f-notifkat').value,
        insynsskyddat:           (this.querySelector('input[name="ip-insyns"]:checked') ?? {}).value ?? 'Nej',
        systembeteckning:        this.querySelector('#f-sys').value.trim(),
        avgiftsidPapper:         this.querySelector('#f-avg-papper').value.trim(),
        avgiftsidInternet:       this.querySelector('#f-avg-internet').value.trim(),
        visningsstid:            this.querySelector('#f-visning').value,
        lagringstid:             this.querySelector('#f-lagring').value,
        beskrivning:             this.querySelector('#f-beskrivning').value.trim(),
        defaultkanalPapper:      this.querySelector('#f-def-papper').checked,
        defaultkanalInternet:    this.querySelector('#f-def-internet').checked,
        tillatenKanalPapper:     this.querySelector('#f-till-papper').checked,
        tillatenKanalInternet:   this.querySelector('#f-till-internet').checked,
        obligKanalPapper:        this.querySelector('#f-oblig-papper').checked,
        obligKanalInternet:      this.querySelector('#f-oblig-internet').checked,
        kanalKrav:               (this.querySelector('input[name="ip-kanal-krav"]:checked') ?? {}).value ?? 'Ja',
        debiteraIckeInternet:    (this.querySelector('input[name="ip-debitera"]:checked') ?? {}).value ?? 'Nej',
        meddelande:              this.querySelector('#f-meddelande').value.trim(),
        informationstext:        this.querySelector('#f-infotext').value.trim(),
      };
      mockCreateInformationsprodukt(body);
      this.loadProducts(this.querySelector('#filter-land').value);
      const msg = this.querySelector('#save-msg');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 2500);
    });
  }

  loadProducts(land) {
    const list = mockGetInformationsprodukter(land && land !== 'Välj land' ? land : '');
    this.renderProducts(list);
  }

  renderProducts(list) {
    const tbody = this.querySelector('#products-tbody');
    tbody.innerHTML = '';
    list.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><button class="link">${p.id}</button></td>
        <td>${p.namn}</td>
        <td>${p.land}</td>
        <td style="color:#15803d">${p.status}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-infoprodukter', PageInfoprodukter);
})();

(function() {

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const INPUT = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageDebitering extends HTMLElement {
  constructor() {
    super();
    this.rows = [];
    this.selectedRow = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Debiteringsuppgifter</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- Form -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Redigera / Lägg till</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div class="grid grid-cols-3 gap-3 mb-4 max-w-2xl">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Produkt-ID</label>
                    <input id="f-produktid" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Medd-ID</label>
                    <input id="f-meddid" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Systembeteckning</label>
                    <input id="f-sys" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">ANTS-kod internet</label>
                    <input id="f-ants-i" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">ANTS-kod ej internet</label>
                    <input id="f-ants-ej" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Resultatställe</label>
                    <input id="f-res" class="${INPUT}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Status</label>
                    <select id="f-status" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white appearance-none">
                      <option value="Aktiv">Aktiv</option>
                      <option value="Under upplägg">Under upplägg</option>
                      <option value="Inaktiv">Inaktiv</option>
                    </select>
                  </div>
                </div>
                <div id="save-msg" class="hidden mb-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
                <div class="flex gap-3">
                  <button id="btn-spara" class="${BTN}">Spara ny</button>
                  <button id="btn-andra" class="${BTN}">Ändra</button>
                  <button id="btn-klarmarkera" class="${BTN}">Klarmarkera</button>
                  <button id="btn-avbryt" class="${BTN_SEC}">Avbryt</button>
                </div>
              </div>
            </div>

            <!-- Table -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Debiteringsuppgifter</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th class="w-10"></th>
                      <th>Produkt-ID</th>
                      <th>Medd-ID</th>
                      <th>Systembeteckning</th>
                      <th>ANTS-kod internet</th>
                      <th>ANTS-kod ej internet</th>
                      <th>Resultatställe</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="deb-tbody"></tbody>
                </table>
                <div class="flex gap-3 mt-4">
                  <button id="btn-ta-bort" class="${BTN_SEC}">Ta bort markerade</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadRows();
  }

  init() {
    this.querySelector('#btn-spara').addEventListener('click', () => {
      const body = this.getFormBody();
      if (this.selectedRow) {
        mockUpdateDebiteringsuppgift(this.selectedRow.produktid, body);
      } else {
        mockCreateDebiteringsuppgift(body);
      }
      this.loadRows();
      this.showMsg('✓ Sparad');
    });

    this.querySelector('#btn-andra').addEventListener('click', () => {
      if (!this.selectedRow) return;
      const body = this.getFormBody();
      mockUpdateDebiteringsuppgift(this.selectedRow.produktid, body);
      this.loadRows();
      this.showMsg('✓ Ändrad');
    });

    this.querySelector('#btn-klarmarkera').addEventListener('click', () => {
      if (!this.selectedRow) return;
      this.querySelector('#f-status').value = 'Aktiv';
      const body = this.getFormBody();
      mockUpdateDebiteringsuppgift(this.selectedRow.produktid, body);
      this.loadRows();
      this.showMsg('✓ Klarmarkerad');
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.selectedRow = null;
      ['f-produktid', 'f-meddid', 'f-sys', 'f-ants-i', 'f-ants-ej', 'f-res'].forEach(id => {
        this.querySelector(`#${id}`).value = '';
      });
      this.querySelector('#f-status').value = 'Aktiv';
    });

    this.querySelector('#btn-ta-bort').addEventListener('click', () => {
      const toDelete = [];
      this.querySelectorAll('#deb-tbody input[type="checkbox"]').forEach((cb, i) => {
        if (cb.checked) toDelete.push(this.rows[i].produktid);
      });
      for (const produktid of toDelete) {
        mockDeleteDebiteringsuppgift(produktid);
      }
      this.loadRows();
    });
  }

  getFormBody() {
    return {
      produktid:         this.querySelector('#f-produktid').value.trim(),
      meddelandeid:      this.querySelector('#f-meddid').value.trim(),
      systembeteckning:  this.querySelector('#f-sys').value.trim(),
      antsKodInternet:   this.querySelector('#f-ants-i').value.trim(),
      antsKodEjInternet: this.querySelector('#f-ants-ej').value.trim(),
      resultatstalle:    this.querySelector('#f-res').value.trim(),
      status:            this.querySelector('#f-status').value,
    };
  }

  showMsg(text) {
    const msg = this.querySelector('#save-msg');
    msg.textContent = text;
    msg.classList.remove('hidden');
    setTimeout(() => { msg.classList.add('hidden'); msg.textContent = '✓ Sparad'; }, 2500);
  }

  loadRows() {
    this.rows = mockGetDebiteringsuppgifter();
    this.selectedRow = null;
    this.renderRows();
  }

  renderRows() {
    const tbody = this.querySelector('#deb-tbody');
    tbody.innerHTML = '';
    this.rows.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:center"><input type="checkbox" data-idx="${i}"></td>
        <td><button class="link">${r.produktid}</button></td>
        <td>${r.meddelandeid}</td>
        <td>${r.systembeteckning}</td>
        <td>${r.antsKodInternet}</td>
        <td>${r.antsKodEjInternet}</td>
        <td>${r.resultatstalle}</td>
        <td style="color:${r.status === 'Aktiv' ? '#15803d' : r.status === 'Inaktiv' ? '#6b7280' : '#d97706'}">${r.status ?? ''}</td>
      `;
      tr.querySelector('button.link').addEventListener('click', () => {
        this.selectedRow = r;
        this.querySelector('#f-produktid').value = r.produktid;
        this.querySelector('#f-meddid').value    = r.meddelandeid !== '-' ? r.meddelandeid : '';
        this.querySelector('#f-sys').value       = r.systembeteckning;
        this.querySelector('#f-ants-i').value    = r.antsKodInternet;
        this.querySelector('#f-ants-ej').value   = r.antsKodEjInternet;
        this.querySelector('#f-res').value       = r.resultatstalle;
        this.querySelector('#f-status').value    = r.status ?? 'Aktiv';
      });
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-debitering', PageDebitering);
})();

(function() {

const BTN       = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC   = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const BTN_SMALL = 'bg-[#1565c0] text-white rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT     = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white';
const SELECT    = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white appearance-none';
const PANEL     = 'bg-white border border-gray-200 rounded shadow-sm';
const LABEL     = 'block text-sm text-gray-700 mb-1';
const REQ       = '<span class="text-red-600">*</span>';

const LANDS = ['Sverige', 'Norge', 'Danmark', 'Finland', 'Storbritannien', 'Nederländerna'];
const ARENDEN = ['Kontoutdrag', 'Avräkningsnota', 'Bokföringsavi', 'Avtal', 'Räntebesked', 'Kortbekräftelse', 'Fondbesked'];
const NOTIF_KATEGORIER = [
  '-- Välj notifieringskategori --',
  'NOT-01 Räntebesked',
  'NOT-02 Kortbekräftelse',
  'NOT-03 Kontoutdrag',
  'NOT-04 Fondbesked',
  'NOT-05 Avtal',
];

class PageMassutskick extends HTMLElement {
  constructor() {
    super();
    this.utskick = [];
    this.selected = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Administrera massutskick</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">

            <!-- Meddelandeinnehåll panel -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Meddelandeinnehåll</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3 space-y-3">

                <!-- Row 1: Land + MeddelandeId -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Land ${REQ}</label>
                    <select id="f-land" class="${SELECT}">
                      <option value="">Välj land</option>
                      ${LANDS.map(l => `<option>${l}</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL}">MeddelandeId ${REQ}</label>
                    <input id="f-meddid" class="${INPUT}" placeholder="" />
                  </div>
                </div>

                <!-- Row 2: Ärende + Avsändare -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Ärende ${REQ}</label>
                    <select id="f-arende" class="${SELECT}">
                      <option value=""></option>
                      ${ARENDEN.map(a => `<option>${a}</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL}">Avsändare ${REQ}</label>
                    <input id="f-avsandare" class="${INPUT}" value="Handelsbanken" />
                  </div>
                </div>

                <!-- Row 3: Ämne -->
                <div>
                  <label class="${LABEL}">Ämne ${REQ}</label>
                  <input id="f-amne" class="${INPUT}" />
                </div>

                <!-- Row 4: Utskicksdatum -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Utskicksdatum ${REQ}</label>
                    <input id="f-datum" type="date" class="${INPUT}" />
                  </div>
                </div>

                <!-- Row 5: Notifieringskategori -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Notifieringskategori ${REQ}</label>
                    <select id="f-notif" class="${SELECT}">
                      ${NOTIF_KATEGORIER.map((k, i) => `<option value="${i === 0 ? '' : k}">${k}</option>`).join('')}
                    </select>
                  </div>
                </div>

                <!-- Row 6: Meddelande -->
                <div>
                  <label class="${LABEL}">Meddelande ${REQ}</label>
                  <div class="border border-gray-300 rounded-md overflow-hidden">
                    <!-- Toolbar -->
                    <div class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-200 bg-gray-50">

                      <!-- Font family -->
                      <select id="tb-font" class="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white focus:outline-none cursor-pointer">
                        <option value="inherit">Standard</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                      </select>

                      <!-- Font size -->
                      <select id="tb-size" class="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white focus:outline-none cursor-pointer w-16">
                        <option value="">Storlek</option>
                        <option value="10px">10</option>
                        <option value="12px">12</option>
                        <option value="14px" selected>14</option>
                        <option value="16px">16</option>
                        <option value="18px">18</option>
                        <option value="20px">20</option>
                        <option value="24px">24</option>
                        <option value="32px">32</option>
                      </select>

                      <span class="text-gray-300 mx-0.5">|</span>

                      <!-- Headings -->
                      <button type="button" data-block="h1" class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">H1</button>
                      <button type="button" data-block="h2" class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">H2</button>
                      <button type="button" data-block="h3" class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">H3</button>
                      <button type="button" data-block="p"  class="${BTN_SMALL} !rounded !px-2 !py-0.5">¶</button>

                      <span class="text-gray-300 mx-0.5">|</span>

                      <!-- Inline formatting -->
                      <button type="button" data-cmd="bold"      class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">B</button>
                      <button type="button" data-cmd="italic"    class="${BTN_SMALL} !rounded !px-2 !py-0.5 italic">I</button>
                      <button type="button" data-cmd="underline" class="${BTN_SMALL} !rounded !px-2 !py-0.5 underline">U</button>

                      <span class="text-gray-300 mx-0.5">|</span>

                      <!-- Alignment -->
                      <button type="button" data-cmd="justifyLeft"   class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Vänster">⬅</button>
                      <button type="button" data-cmd="justifyCenter" class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Centrera">↔</button>
                      <button type="button" data-cmd="justifyRight"  class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Höger">➡</button>

                      <span class="text-gray-300 mx-0.5">|</span>

                      <!-- Lists -->
                      <button type="button" data-cmd="insertUnorderedList" class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Punktlista">≡</button>
                      <button type="button" data-cmd="insertOrderedList"   class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Numrerad lista">1.</button>

                    </div>
                    <!-- Editable area -->
                    <div id="f-meddelande"
                         contenteditable="true"
                         class="min-h-[160px] px-3 py-2 text-sm text-gray-700 focus:outline-none"
                         data-placeholder="Meddelandetext... Använd DYN1–DYN5 för dynamiska variabler."></div>
                  </div>
                </div>

                <!-- Bilagor list (visas under Meddelande) -->
                <div id="bilagor-list" class="space-y-1"></div>

                <!-- Hidden file input -->
                <input type="file" id="f-bilaga-input" class="hidden" multiple />

                <!-- Status message -->
                <div id="save-msg" class="hidden text-green-700 text-sm font-medium"></div>

                <!-- Actions row -->
                <div class="flex items-center justify-between pt-1">
                  <button id="btn-bilagor" class="${BTN_SEC}">Bilagelänkar</button>
                  <div class="flex gap-3">
                    <button id="btn-ny"          class="${BTN}">Ny</button>
                    <button id="btn-spara"        class="${BTN_SEC}">Spara</button>
                    <button id="btn-ta-bort"      class="${BTN}">Ta bort</button>
                    <button id="btn-klarmarkera"  class="${BTN}">Klarmarkera</button>
                  </div>
                </div>

              </div>
            </div>

            <!-- List panel -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-[#1565c0] font-bold text-base">Massutskick</h2>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th>Utskicksdatum</th>
                      <th>Avsändare</th>
                      <th>Medd-ID</th>
                      <th>Land</th>
                      <th>Ämne</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="utskick-tbody"></tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadUtskick();
  }

  init() {
    const editor = () => this.querySelector('#f-meddelande');

    // Simple toolbar buttons (execCommand)
    this.querySelectorAll('button[data-cmd]').forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.execCommand(btn.dataset['cmd'], false);
        editor().focus();
      });
    });

    // Heading / block format buttons
    this.querySelectorAll('button[data-block]').forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.execCommand('formatBlock', false, btn.dataset['block']);
        editor().focus();
      });
    });

    // Font family
    this.querySelector('#tb-font').addEventListener('change', (e) => {
      const font = e.target.value;
      document.execCommand('fontName', false, font);
      editor().focus();
    });

    // Font size — wrap selection in a <span> with explicit font-size
    this.querySelector('#tb-size').addEventListener('change', (e) => {
      const size = e.target.value;
      if (!size) return;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = size;
        range.surroundContents(span);
        sel.removeAllRanges();
      }
      editor().focus();
    });

    // Placeholder behaviour for contenteditable
    const updatePlaceholder = () => {
      const el = editor();
      el.classList.toggle('empty', !el.textContent?.trim());
    };
    editor().addEventListener('input', updatePlaceholder);
    updatePlaceholder();

    // Ny
    this.querySelector('#btn-ny').addEventListener('click', () => {
      this.selected = null;
      this.clearForm();
      this.querySelectorAll('#utskick-tbody tr').forEach(r => r.classList.remove('selected'));
    });

    // Prevent contenteditable blur-normalization when clicking action buttons
    ['#btn-spara', '#btn-ta-bort', '#btn-klarmarkera'].forEach(id => {
      this.querySelector(id).addEventListener('mousedown', e => e.preventDefault());
    });

    // Spara
    this.querySelector('#btn-spara').addEventListener('click', () => {
      const body = this.getFormBody();
      if (this.selected) {
        mockUpdateMassutskick(this.selected.meddId, body);
        this.showMsg('✓ Sparad');
      } else {
        mockCreateMassutskick(body);
        this.showMsg('✓ Skapad');
      }
      this.loadUtskick();
    });

    // Ta bort
    this.querySelector('#btn-ta-bort').addEventListener('click', () => {
      if (!this.selected) return;
      mockDeleteMassutskick(this.selected.meddId);
      this.loadUtskick();
      this.clearForm();
      this.selected = null;
      this.showMsg('✓ Borttagen');
    });

    // Klarmarkera
    this.querySelector('#btn-klarmarkera').addEventListener('click', () => {
      if (!this.selected) return;
      const result = mockKlarmarkeraMassutskick(this.selected.meddId);
      if (result === 'CONFLICT') {
        alert('Redan klarmarkerad eller skickad.');
        return;
      }
      if (result === 'NOT_FOUND') {
        alert('Hittades inte.');
        return;
      }
      this.loadUtskick();
      this.showMsg('✓ Klarmarkerad');
    });

    // Bilagelänkar — öppnar filväljare
    this.querySelector('#btn-bilagor').addEventListener('click', () => {
      this.querySelector('#f-bilaga-input').click();
    });

    this.querySelector('#f-bilaga-input').addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files) return;
      Array.from(files).forEach(file => this.addBilaga(file));
      e.target.value = '';
    });
  }

  getFormBody() {
    const editor = this.querySelector('#f-meddelande');
    return {
      land:                  this.querySelector('#f-land').value,
      avsandare:             this.querySelector('#f-avsandare').value.trim(),
      amne:                  this.querySelector('#f-amne').value.trim(),
      utskicksdatum:         this.querySelector('#f-datum').value,
      notifieringskategori:  this.querySelector('#f-notif').value,
      meddelande:            editor.innerHTML,
    };
  }

  addBilaga(file) {
    const url = URL.createObjectURL(file);
    const list = this.querySelector('#bilagor-list');
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700';
    row.innerHTML = `
      <span class="text-gray-400">📎</span>
      <a href="${url}" target="_blank" class="flex-1 text-[#0066b3] hover:underline cursor-pointer">${file.name}</a>
      <button type="button" class="text-gray-400 hover:text-red-500 text-xs leading-none" title="Ta bort">✕</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      URL.revokeObjectURL(url);
      row.remove();
    });
    list.appendChild(row);
  }

  clearForm() {
    this.querySelector('#f-land').value      = '';
    this.querySelector('#f-meddid').value    = '';
    this.querySelector('#f-arende').value    = '';
    this.querySelector('#f-avsandare').value = 'Handelsbanken';
    this.querySelector('#f-amne').value      = '';
    this.querySelector('#f-datum').value     = '';
    this.querySelector('#f-notif').value     = '';
    const editor = this.querySelector('#f-meddelande');
    editor.innerHTML = '';
    editor.classList.add('empty');
    this.querySelector('#bilagor-list').innerHTML = '';
  }

  fillForm(u) {
    this.querySelector('#f-land').value      = u.land || '';
    this.querySelector('#f-meddid').value    = u.meddId;
    this.querySelector('#f-avsandare').value = u.avsandare;
    this.querySelector('#f-amne').value      = u.amne;
    this.querySelector('#f-datum').value     = u.utskicksdatum || '';
    this.querySelector('#f-notif').value     = u.notifieringskategori || '';
    const editor = this.querySelector('#f-meddelande');
    editor.innerHTML = u.meddelande || '';
    if (editor.textContent?.trim()) editor.classList.remove('empty');
    else editor.classList.add('empty');
  }

  showMsg(text) {
    const msg = this.querySelector('#save-msg');
    msg.textContent = text;
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
  }

  loadUtskick() {
    this.utskick = mockGetMassutskick();
    this.renderUtskick();
  }

  renderUtskick() {
    const tbody = this.querySelector('#utskick-tbody');
    tbody.innerHTML = '';
    this.utskick.forEach(u => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      const statusColor = u.status === 'Under upplägg' ? '#d97706' : '#15803d';
      tr.innerHTML = `
        <td style="white-space:nowrap">${u.utskicksdatum || ''}</td>
        <td>${u.avsandare}</td>
        <td>${u.meddId}</td>
        <td>${u.land || ''}</td>
        <td><button class="link">${u.amne}</button></td>
        <td><span style="color:${statusColor}">${u.status}</span></td>
      `;
      tr.addEventListener('click', () => {
        this.querySelectorAll('#utskick-tbody tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        this.selected = u;
        this.fillForm(u);
      });
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-massutskick', PageMassutskick);
})();

