(() => {
  // src/components/app-shell.js
  var AppShell = class extends HTMLElement {
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
              Hj\xE4lp ?
            </button>
            <div class="border border-white text-white text-xs px-3 py-1 rounded-full">
              SE-6292 &nbsp;|&nbsp; Maximal beh\xF6righet
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
              <a href="#/kundvy/sok-dokument"         class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">S\xF6k dokument</a>
              <a href="#/kundvy/sok-kuvert"           class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">S\xF6k med kuvertID</a>
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
              <a href="#/publicering/installningar" class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Publiceringsinst\xE4llningar</a>
              <a href="#/publicering/kontrollera"   class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Kontrollera dokument</a>
              <a href="#/publicering/godkann"       class="block px-4 py-1.5 text-sm hover:bg-[#eef2f7] transition-colors text-gray-800">Godk\xE4nna f\xF6r publicering</a>
            </div>
          </div>
        </nav>

        <!-- Content -->
        <main id="app-content" class="flex-1 px-6 py-5"></main>

        <!-- Footer -->
        <footer class="bg-[#1565c0] px-6 py-2 text-xs text-blue-200 mt-auto">
          \xA9 Svenska Handelsbanken AB (publ)
        </footer>
      </div>
    `;
      this.attachDropdowns();
      this.updateActiveNav();
      this.renderRoute();
      window.addEventListener("hashchange", () => {
        this.updateActiveNav();
        this.renderRoute();
      });
    }
    attachDropdowns() {
      const groups = this.querySelectorAll(".nav-group");
      groups.forEach((group) => {
        const menuKey = group.getAttribute("data-menu");
        const dropdown = this.querySelector(`.nav-dropdown[data-menu="${menuKey}"]`);
        group.addEventListener("mouseenter", () => {
          if (this.closeTimer) clearTimeout(this.closeTimer);
          this.querySelectorAll(".nav-dropdown").forEach((d) => d.classList.add("hidden"));
          dropdown.classList.remove("hidden");
        });
        group.addEventListener("mouseleave", () => {
          this.closeTimer = setTimeout(() => {
            dropdown.classList.add("hidden");
          }, 120);
        });
        dropdown.addEventListener("mouseenter", () => {
          if (this.closeTimer) clearTimeout(this.closeTimer);
        });
        dropdown.addEventListener("mouseleave", () => {
          this.closeTimer = setTimeout(() => {
            dropdown.classList.add("hidden");
          }, 120);
        });
        dropdown.querySelectorAll("a").forEach((a) => {
          a.addEventListener("click", () => {
            dropdown.classList.add("hidden");
          });
        });
      });
    }
    updateActiveNav() {
      const hash = window.location.hash || "#/kundvy/meddelanden";
      const path = hash.replace("#", "");
      this.querySelectorAll(".nav-btn").forEach((btn) => {
        const prefix = btn.getAttribute("data-active-prefix") ?? "";
        if (path.startsWith(prefix)) {
          btn.classList.add("text-[#1565c0]", "font-semibold");
          btn.classList.remove("text-[#0066b3]", "hover:text-[#1565c0]");
        } else {
          btn.classList.remove("text-[#1565c0]", "font-semibold");
          btn.classList.add("text-[#0066b3]", "hover:text-[#1565c0]");
        }
      });
      this.querySelectorAll(".nav-dropdown a").forEach((a) => {
        const href = a.getAttribute("href") ?? "";
        if (href === hash) {
          a.classList.add("text-[#1565c0]", "font-semibold");
          a.classList.remove("text-gray-800");
        } else {
          a.classList.remove("text-[#1565c0]", "font-semibold");
          a.classList.add("text-gray-800");
        }
      });
    }
    renderRoute() {
      const hash = window.location.hash || "#/kundvy/meddelanden";
      const content = this.querySelector("#app-content");
      if (!content) return;
      const routeMap = {
        "#/kundvy/meddelanden": "<page-meddelanden></page-meddelanden>",
        "#/kundvy/utskick": "<page-utskick></page-utskick>",
        "#/kundvy/sok-dokument": "<page-sok-dokument></page-sok-dokument>",
        "#/kundvy/sok-kuvert": "<page-sok-kuvert></page-sok-kuvert>",
        "#/kundvy/administrera-utskick": "<page-administrera-utskick></page-administrera-utskick>",
        "#/publicering/installningar": "<page-installningar></page-installningar>",
        "#/publicering/kontrollera": "<page-kontrollera></page-kontrollera>",
        "#/publicering/godkann": "<page-godkann></page-godkann>",
        "#/administration/infoprodukter": "<page-infoprodukter></page-infoprodukter>",
        "#/administration/debitering": "<page-debitering></page-debitering>",
        "#/administration/massutskick": "<page-massutskick></page-massutskick>"
      };
      content.innerHTML = routeMap[hash] ?? routeMap["#/kundvy/meddelanden"];
    }
  };
  customElements.define("app-shell", AppShell);

  // src/components/hb-panel.js
  var HbPanel = class extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute("title") ?? "";
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
  };
  customElements.define("hb-panel", HbPanel);

  // src/components/hb-info-panel.js
  var HbInfoPanel = class extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute("title") ?? "";
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
  };
  customElements.define("hb-info-panel", HbInfoPanel);

  // src/api.js
  function boolJa(val) {
    return val ? "Ja" : "Nej";
  }
  function fmtDatum(iso) {
    if (!iso) return "\u2013";
    return iso.replace("T", " ").substring(0, 16);
  }
  var KUNDER = {
    "KD-71042": { kundnr: "KD-71042", kundnamn: "Kund #71042", land: "Sverige" },
    "KD-38815": { kundnr: "KD-38815", kundnamn: "Kund #38815", land: "Sverige" },
    "KD-90423": { kundnr: "KD-90423", kundnamn: "Kund #90423", land: "Sverige" }
  };
  var MEDDELANDEN = [
    { id: "MSG-2024-0041", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Testenv 7", mottagare: "Kund #71042", datum: "2025-01-22T09:58", kategori: "Digital", amne: "Kontoutdrag februari", las: true, borttaget: false, arkiverat: true, status: "Skickat", kontor: "SE-6292", innehall: "Ditt kontoutdrag f\xF6r februari finns tillg\xE4ngligt i din e-brevl\xE5da.", bilagor: [{ filnamn: "kontoutdrag-feb.pdf", storlek: 15360, url: "/files/kontoutdrag-feb.pdf" }] },
    { id: "MSG-2024-0039", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Handelsbanken", mottagare: "Kund #71042", datum: "2025-02-10T14:20", kategori: "Kontoutdrag", amne: "Kontoutdrag januari", las: false, borttaget: false, arkiverat: false, status: "Skickat", kontor: "SE-6292", innehall: "Ditt kontoutdrag f\xF6r januari finns tillg\xE4ngligt.", bilagor: [{ filnamn: "kontoutdrag-jan.pdf", storlek: 14080, url: "/files/kontoutdrag-jan.pdf" }] },
    { id: "MSG-2024-0038", kundnr: "KD-38815", kundnamn: "Kund #38815", avsandare: "Handelsbanken", mottagare: "Kund #38815", datum: "2025-02-10T14:20", kategori: "Kontoutdrag", amne: "Kontoutdrag januari", las: false, borttaget: false, arkiverat: false, status: "Skickat", kontor: "SE-6292", innehall: "Ditt kontoutdrag f\xF6r januari finns tillg\xE4ngligt.", bilagor: [] },
    { id: "MSG-2024-0035", kundnr: "KD-90423", kundnamn: "Kund #90423", avsandare: "Handelsbanken", mottagare: "Kund #90423", datum: "2025-03-01T08:10", kategori: "Avtal", amne: "Nytt kortavtal", las: true, borttaget: false, arkiverat: false, status: "Skickat", kontor: "SE-6292", innehall: "Bekr\xE4ftelse p\xE5 ditt nya kortavtal bifogas.", bilagor: [{ filnamn: "kortavtal.pdf", storlek: 20480, url: "/files/kortavtal.pdf" }] }
  ];
  var UTSKICK = [
    { id: "UTK-2025-0001", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Handelsbanken", mottagare: "Kund #71042", datum: "2025-11-19T16:35", kategori: "Avr\xE4kningsnota", amne: "Avr\xE4kningsnota nov", las: true, borttaget: false, arkiverat: true, visasTill: "2036-03-20", innehall: "Din fondorder \xE4r genomf\xF6rd enligt bifogad avr\xE4kningsnota.", bilagor: [{ filnamn: "Avr\xE4kningsnota nov.pdf", url: "/files/avrakningsnota-nov.pdf" }] },
    { id: "UTK-2025-0002", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Handelsbanken", mottagare: "Kund #71042", datum: "2025-11-10T15:40", kategori: "Kontoutdrag", amne: "Kontoutdrag okt", las: true, borttaget: false, arkiverat: false, visasTill: "2036-03-20", innehall: "Ditt kontoutdrag f\xF6r oktober 2025 finns tillg\xE4ngligt.", bilagor: [{ filnamn: "Kontoutdrag okt.pdf", url: "/files/kontoutdrag-okt.pdf" }] },
    { id: "UTK-2025-0003", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Handelsbanken", mottagare: "Kund #71042", datum: "2025-11-04T11:22", kategori: "Avr\xE4kningsnota", amne: "Avr\xE4kningsnota okt", las: false, borttaget: false, arkiverat: false, visasTill: "2036-03-20", innehall: "Din fondorder \xE4r genomf\xF6rd enligt bifogad avr\xE4kningsnota.", bilagor: [{ filnamn: "Avr\xE4kningsnota okt.pdf", url: "/files/avrakningsnota-okt.pdf" }] },
    { id: "UTK-2025-0004", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Handelsbanken", mottagare: "Kund #71042", datum: "2025-11-03T12:44", kategori: "Bokf\xF6ringsavi", amne: "Bokf\xF6ringsavi nov", las: false, borttaget: false, arkiverat: false, visasTill: "2036-03-20", innehall: "Bokf\xF6ringsavi f\xF6r november bifogad.", bilagor: [{ filnamn: "Bokf\xF6ringsavi nov.pdf", url: "/files/bokforingsavi-nov.pdf" }] },
    { id: "UTK-2025-0005", kundnr: "KD-71042", kundnamn: "Kund #71042", avsandare: "Handelsbanken", mottagare: "Kund #71042", datum: "2025-08-18T10:56", kategori: "Avtal", amne: "IGDH Test doktyp 2", las: true, borttaget: false, arkiverat: true, visasTill: "2036-03-20", innehall: "Avtalsbekr\xE4ftelse bifogad.", bilagor: [{ filnamn: "IGDH Test doktyp 2.pdf", url: "/files/igdh-test.pdf" }] }
  ];
  var DOKUMENT = [
    { dokumentnamn: "Avtal Allkonto", forbindelse: "", dokumentdatum: "2025-08-13", utskicksdatum: "2025-08-13", skickatsTill: "Digitalt", visasTill: "2027-02-13", last: true, borttaget: false, arkiverat: false, kundnr: "KD-71042" },
    { dokumentnamn: "Kontoutdrag sep", forbindelse: "SE-001", dokumentdatum: "2025-09-30", utskicksdatum: "2025-10-01", skickatsTill: "Digitalt", visasTill: "2027-10-01", last: true, borttaget: false, arkiverat: true, kundnr: "KD-71042" }
  ];
  var KUVERT = [
    { kuvertId: "ENV-2024-88441", kundnr: "KD-71042", kundnamn: "Kund #71042", datum: "2024-02-29", mall: "Kontoutdrag", kanal: "Digital brevl\xE5da", status: "Levererat" }
  ];
  var UTSKICK_INSTALLNINGAR = [
    { kundnr: "KD-71042", kategori: "Kontoutdrag", avser: "Konto", forbindelse: "SE-001-001", papper: false, internet: false },
    { kundnr: "KD-71042", kategori: "Bokf\xF6ringsavi", avser: "Konto", forbindelse: "SE-011-011", papper: true, internet: false },
    { kundnr: "KD-71042", kategori: "L\xE5neavi", avser: "L\xE5n", forbindelse: "0", papper: false, internet: false },
    { kundnr: "KD-71042", kategori: "Avr\xE4kningsnota", avser: "V\xE4rdepapper", forbindelse: "0", papper: true, internet: false },
    { kundnr: "KD-71042", kategori: "Avtal", avser: "L\xE5n Stadshypotek", forbindelse: "SE-005-05", papper: true, internet: false }
  ];
  var INFORMATIONSSAMBAND = [
    { id: "SAM-001", systembeteckning: "EPOX", informationsId: "Q294902", publiceraAutomatiskt: false }
  ];
  var PUBLICERING_JOBB = [
    { jobbId: "EPOX-JOB-001", systembeteckning: "EPOX", informationsId: "Q294902", leveranstidpunkt: "2026-06-01T08:00", status: "V\xE4ntar" },
    { jobbId: "REVL-JOB-002", systembeteckning: "REVL", informationsId: "Q295100", leveranstidpunkt: "2026-06-02T08:00", status: "V\xE4ntar" }
  ];
  var INFORMATIONSPRODUKTER = [
    { id: "32225", namn: "Konto, Account", land: "Sverige", status: "Aktiv" },
    { id: "32228", namn: "Konto", land: "Sverige", status: "Aktiv" },
    { id: "32230", namn: "Fondkonto", land: "Sverige", status: "Aktiv" },
    { id: "32241", namn: "Bol\xE5n", land: "Sverige", status: "Aktiv" }
  ];
  var DEBITERINGSUPPGIFTER = [
    { produktid: "DEB-001", meddelandeid: "-", systembeteckning: "INL\xC5", antsKodInternet: "217805", antsKodEjInternet: "217905", resultatstalle: "68821", status: "Aktiv" },
    { produktid: "DEB-002", meddelandeid: "-", systembeteckning: "INL\xC5", antsKodInternet: "217826", antsKodEjInternet: "217926", resultatstalle: "68821", status: "Aktiv" },
    { produktid: "DEB-003", meddelandeid: "-", systembeteckning: "REVL", antsKodInternet: "217807", antsKodEjInternet: "217907", resultatstalle: "69314", status: "Aktiv" },
    { produktid: "DEB-004", meddelandeid: "-", systembeteckning: "HBOS", antsKodInternet: "217804", antsKodEjInternet: "217904", resultatstalle: "60180", status: "Under uppl\xE4gg" },
    { produktid: "DEB-005", meddelandeid: "-", systembeteckning: "AKKO", antsKodInternet: "217800", antsKodEjInternet: "217900", resultatstalle: "60280", status: "Under uppl\xE4gg" }
  ];
  var MASSUTSKICK = [
    { meddId: "250", land: "Sverige", avsandare: "Handelsbanken", amne: "TBD", utskicksdatum: "2026-06-25", notifieringskategori: "", meddelande: "", status: "Under uppl\xE4gg" },
    { meddId: "214", land: "Sverige", avsandare: "Handelsbanken", amne: "Byte av f\xF6rs\xE4kringssystem", utskicksdatum: "2024-09-06", notifieringskategori: "", meddelande: "Brev om byte av f\xF6rs\xE4kringssystem.", status: "Klarmarkerad" },
    { meddId: "213", land: "Sverige", avsandare: "Handelsbanken", amne: "F\xF6rfall av dokumentation f\xF6r direktneds\xE4ttning", utskicksdatum: "2024-09-02", notifieringskategori: "", meddelande: "Information om f\xF6rfall av dokumentation.", status: "Klarmarkerad" },
    { meddId: "211", land: "Sverige", avsandare: "Handelsbanken", amne: "Fel i utskick fr\xE5n Handelsbanken", utskicksdatum: "2024-06-26", notifieringskategori: "", meddelande: "R\xE4ttelse av tidigare utskick.", status: "Klarmarkerad" },
    { meddId: "210", land: "Sverige", avsandare: "Handelsbanken", amne: "Difference in tax purposes", utskicksdatum: "2024-06-03", notifieringskategori: "", meddelande: "Information regarding tax differences.", status: "Klarmarkerad" },
    { meddId: "209", land: "Sverige", avsandare: "Handelsbanken", amne: "e-Kapitalkonto blir Sparkonto", utskicksdatum: "2024-05-02", notifieringskategori: "", meddelande: "Information om namnbyte av kontotyp.", status: "Klarmarkerad" }
  ];
  function mockGetKund(kundnr) {
    return KUNDER[kundnr] ?? null;
  }
  function mockGetMeddelanden(kundnr) {
    return MEDDELANDEN.filter((m) => m.kundnr === kundnr);
  }
  function mockGetUtskick(kundnr) {
    return UTSKICK.filter((u) => u.kundnr === kundnr);
  }
  function mockGetUtskickById(kundnr, id) {
    return UTSKICK.find((u) => u.kundnr === kundnr && u.id === id) ?? null;
  }
  function mockGetDokument(kundnr) {
    return DOKUMENT.filter((d) => d.kundnr === kundnr);
  }
  function mockGetKuvert(kuvertId) {
    return KUVERT.find((k) => k.kuvertId === kuvertId) ?? null;
  }
  function mockGetUtskickInstallningar(kundnr) {
    return UTSKICK_INSTALLNINGAR.filter((u) => u.kundnr === kundnr);
  }
  function mockGetInformationssamband() {
    return [...INFORMATIONSSAMBAND];
  }
  function mockCreateInformationssamband(input) {
    const id = "SAM-" + String(INFORMATIONSSAMBAND.length + 1).padStart(3, "0");
    const item = { id, ...input };
    INFORMATIONSSAMBAND.push(item);
    return item;
  }
  function mockDeleteInformationssamband(id) {
    const i = INFORMATIONSSAMBAND.findIndex((s) => s.id === id);
    if (i < 0) return false;
    INFORMATIONSSAMBAND.splice(i, 1);
    return true;
  }
  function mockGetPubliceringJobb() {
    return [...PUBLICERING_JOBB];
  }
  function mockGodkannJobb(jobbId, godkand) {
    const j = PUBLICERING_JOBB.find((j2) => j2.jobbId === jobbId);
    if (!j) return false;
    j.status = godkand ? "Godk\xE4nd" : "Nekad";
    return true;
  }
  function mockGetInformationsprodukter(land) {
    if (!land) return [...INFORMATIONSPRODUKTER];
    return INFORMATIONSPRODUKTER.filter((p) => p.land.toLowerCase() === land.toLowerCase());
  }
  function mockGetInformationsprodukt(id) {
    return INFORMATIONSPRODUKTER.find((p) => p.id === id) ?? null;
  }
  function mockCreateInformationsprodukt(input) {
    const id = String(Math.max(...INFORMATIONSPRODUKTER.map((p) => Number(p.id))) + 1);
    const item = { id, ...input };
    INFORMATIONSPRODUKTER.push(item);
    return item;
  }
  function mockUpdateInformationsprodukt(id, input) {
    const i = INFORMATIONSPRODUKTER.findIndex((p) => p.id === id);
    if (i < 0) return null;
    INFORMATIONSPRODUKTER[i] = { id, ...input };
    return INFORMATIONSPRODUKTER[i];
  }
  function mockGetDebiteringsuppgifter() {
    return [...DEBITERINGSUPPGIFTER];
  }
  function mockCreateDebiteringsuppgift(input) {
    const item = { ...input };
    DEBITERINGSUPPGIFTER.push(item);
    return item;
  }
  function mockUpdateDebiteringsuppgift(produktid, input) {
    const i = DEBITERINGSUPPGIFTER.findIndex((d) => d.produktid === produktid);
    if (i < 0) return null;
    DEBITERINGSUPPGIFTER[i] = { produktid, ...input };
    return DEBITERINGSUPPGIFTER[i];
  }
  function mockDeleteDebiteringsuppgift(produktid) {
    const i = DEBITERINGSUPPGIFTER.findIndex((d) => d.produktid === produktid);
    if (i < 0) return false;
    DEBITERINGSUPPGIFTER.splice(i, 1);
    return true;
  }
  function mockGetMassutskick() {
    return [...MASSUTSKICK].sort((a, b) => Number(b.meddId) - Number(a.meddId));
  }
  function mockCreateMassutskick(input) {
    const meddId = String(Math.max(...MASSUTSKICK.map((m) => Number(m.meddId))) + 1);
    const item = { meddId, ...input, status: "Under uppl\xE4gg" };
    MASSUTSKICK.push(item);
    return item;
  }
  function mockUpdateMassutskick(meddId, input) {
    const i = MASSUTSKICK.findIndex((m) => m.meddId === meddId);
    if (i < 0) return null;
    MASSUTSKICK[i] = { ...MASSUTSKICK[i], ...input };
    return MASSUTSKICK[i];
  }
  function mockDeleteMassutskick(meddId) {
    const i = MASSUTSKICK.findIndex((m) => m.meddId === meddId);
    if (i < 0) return false;
    MASSUTSKICK.splice(i, 1);
    return true;
  }
  function mockKlarmarkeraMassutskick(meddId) {
    const m = MASSUTSKICK.find((m2) => m2.meddId === meddId);
    if (!m) return "NOT_FOUND";
    if (m.status === "Klarmarkerad" || m.status === "Skickad") return "CONFLICT";
    m.status = "Klarmarkerad";
    return "OK";
  }

  // src/pages/kundvy/meddelanden.js
  var BTN = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var INPUT = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var PANEL = "bg-white border border-gray-200 rounded shadow-sm";
  var PageMeddelanden = class extends HTMLElement {
    constructor() {
      super();
      this.currentKundnr = "";
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
              <button id="btn-hamta" class="${BTN}">H\xE4mta meddelanden</button>
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
                      <th>Avs\xE4ndare</th>
                      <th>Mottagare</th>
                      <th>Datum</th>
                      <th>Kategori</th>
                      <th>\xC4mne</th>
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
                <p class="text-sm text-gray-600 italic">Meddelandeinneh\xE5ll visas h\xE4r efter h\xE4mtning fr\xE5n arkiv.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      this.init();
    }
    init() {
      this.querySelector("#btn-hamta").addEventListener("click", () => {
        const kundnr = this.querySelector("#kundnr").value.trim();
        if (!kundnr) return;
        this.currentKundnr = kundnr;
        this.loadMessages(this.currentKundnr);
      });
      this.querySelector("#btn-uppdatera").addEventListener("click", () => {
        if (this.currentKundnr) this.loadMessages(this.currentKundnr);
      });
      this.querySelector("#kundnr").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.querySelector("#btn-hamta").click();
      });
    }
    loadMessages(kundnr) {
      const items = mockGetMeddelanden(kundnr);
      this.currentMessages = items;
      this.querySelector("#results-section").classList.remove("hidden");
      this.querySelector("#detail-panel").classList.add("hidden");
      this.querySelector("#msg-list-title").textContent = `Meddelanden \u2013 ${kundnr}`;
      this.renderTable(this.currentMessages);
    }
    renderTable(messages) {
      const tbody = this.querySelector("#msg-tbody");
      const empty = this.querySelector("#msg-empty");
      tbody.innerHTML = "";
      if (messages.length === 0) {
        empty.classList.remove("hidden");
        return;
      }
      empty.classList.add("hidden");
      messages.forEach((m) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.innerHTML = `
        <td>${m.avsandare}</td>
        <td>${m.kundnamn}</td>
        <td style="white-space:nowrap">${fmtDatum(m.datum)}</td>
        <td>${m.kategori}</td>
        <td><button class="link">${m.amne}</button></td>
      `;
        tr.addEventListener("click", () => this.selectMessage(m, tr));
        tbody.appendChild(tr);
      });
    }
    selectMessage(m, tr) {
      this.querySelectorAll("#msg-tbody tr").forEach((r) => r.classList.remove("selected"));
      tr.classList.add("selected");
      const panel = this.querySelector("#detail-panel");
      panel.classList.remove("hidden");
      this.querySelector("#detail-title").textContent = `${fmtDatum(m.datum)} \u2013 ${m.amne}`;
      const grid = this.querySelector("#detail-grid");
      grid.innerHTML = `
      <div class="text-gray-500">Kundnamn</div>   <div>${m.kundnamn}</div> <div></div>
      <div class="text-gray-500">Mottagare</div>  <div>${m.kundnamn}</div> <div><span class="text-gray-500">L\xE4st av kund</span>&nbsp; ${boolJa(m.las)}</div>
      <div class="text-gray-500">Kundnr</div>     <div>${m.kundnr}</div>   <div></div>
      <div class="text-gray-500">Avs\xE4ndare</div>  <div>${m.avsandare}</div> <div><span class="text-gray-500">Borttaget av kund</span>&nbsp; ${boolJa(m.borttaget)}</div>
      <div class="text-gray-500">Kundansv. kontor</div> <div>${m.kontor}</div> <div></div>
      <div></div> <div></div> <div><span class="text-gray-500">Arkiverat av kund</span>&nbsp; ${boolJa(m.arkiverat)}</div>
      <div></div> <div></div> <div><span class="text-gray-500">Status</span>&nbsp; ${m.status}</div>
    `;
    }
  };
  customElements.define("page-meddelanden", PageMeddelanden);

  // src/pages/kundvy/utskick.js
  var BTN2 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var INPUT2 = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var PANEL2 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageUtskick = class extends HTMLElement {
    constructor() {
      super();
      this.currentKundnr = "";
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>Kundens utskick (endast privatkunder)</h1>
        <div class="space-y-4">
          <div class="${PANEL2} p-4">
            <p class="text-xs text-gray-500 mb-3">* Obligatoriska uppgifter</p>
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer <span class="text-red-600">*</span></label>
                <input id="kundnr" class="${INPUT2} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-hamta" class="${BTN2}">H\xE4mta utskick</button>
            </div>
          </div>

          <div id="results-section" class="hidden space-y-4">
            <div class="${PANEL2}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 id="list-title" class="text-[#1565c0] font-bold text-base">Utskick</h2>
                  <button id="btn-uppdatera" class="${BTN2}">Uppdatera</button>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th>Avs\xE4ndare</th>
                      <th>Mottagare</th>
                      <th>Datum</th>
                      <th>Kategori</th>
                      <th>\xC4mne</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="utskick-tbody"></tbody>
                </table>
              </div>
            </div>

            <div id="detail-panel" class="${PANEL2} hidden">
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
      this.querySelector("#btn-hamta").addEventListener("click", () => {
        const kundnr = this.querySelector("#kundnr").value.trim();
        if (!kundnr) return;
        this.currentKundnr = kundnr;
        this.querySelector("#results-section").classList.remove("hidden");
        this.querySelector("#detail-panel").classList.add("hidden");
        this.renderTable(kundnr);
      });
      this.querySelector("#btn-uppdatera").addEventListener("click", () => {
        if (this.currentKundnr) this.renderTable(this.currentKundnr);
      });
      this.querySelector("#kundnr").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.querySelector("#btn-hamta").click();
      });
    }
    renderTable(kundnr) {
      const items = mockGetUtskick(kundnr);
      const tbody = this.querySelector("#utskick-tbody");
      tbody.innerHTML = "";
      items.forEach((u) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.innerHTML = `
        <td>${u.avsandare}</td>
        <td>${u.mottagare}</td>
        <td style="white-space:nowrap">${fmtDatum(u.datum)}</td>
        <td>${u.kategori}</td>
        <td><button class="link">${u.amne}</button></td>
        <td style="color:#9ca3af">&#128196;</td>
      `;
        tr.addEventListener("click", () => {
          this.querySelectorAll("#utskick-tbody tr").forEach((r) => r.classList.remove("selected"));
          tr.classList.add("selected");
          const detail = mockGetUtskickById(kundnr, u.id);
          if (!detail) return;
          const panel = this.querySelector("#detail-panel");
          panel.classList.remove("hidden");
          this.querySelector("#detail-title").textContent = `${fmtDatum(detail.datum)} \u2013 ${detail.amne}`;
          this.querySelector("#detail-grid").innerHTML = `
          <div class="text-gray-500">Kundnamn</div>  <div>${detail.kundnamn}</div> <div></div>
          <div class="text-gray-500">Mottagare</div> <div>${detail.kundnamn}</div> <div><span class="text-gray-500">L\xE4st av kund</span>&nbsp; ${boolJa(detail.las)}</div>
          <div class="text-gray-500">Kundnr</div>    <div>${detail.kundnr}</div>   <div></div>
          <div class="text-gray-500">Avs\xE4ndare</div> <div>${detail.avsandare}</div> <div><span class="text-gray-500">Borttaget av kund</span>&nbsp; ${boolJa(detail.borttaget)}</div>
          <div class="text-gray-500">Visas f\xF6r kund till</div> <div>${detail.visasTill || "\u2013"}</div> <div><span class="text-gray-500">Arkiverat av kund</span>&nbsp; ${boolJa(detail.arkiverat)}</div>
          <div></div> <div></div> <div><span class="text-gray-500">Status</span>&nbsp; \u2013</div>
        `;
          this.querySelector("#detail-body").textContent = detail.innehall || "";
          const pdfBtn = this.querySelector("#detail-pdf");
          pdfBtn.textContent = detail.bilagor && detail.bilagor[0] ? detail.bilagor[0].filnamn : "";
        });
        tbody.appendChild(tr);
      });
      this.querySelector("#list-title").textContent = `Utskick \u2013 ${kundnr} ${items[0] ? items[0].kundnamn : ""}`;
    }
  };
  customElements.define("page-utskick", PageUtskick);

  // src/pages/kundvy/sok-dokument.js
  var BTN3 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var INPUT3 = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var SELECT = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0] appearance-none bg-white";
  var PANEL3 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageSokDokument = class extends HTMLElement {
    constructor() {
      super();
      this.currentKundnr = "";
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>S\xF6k dokument</h1>
        <div class="space-y-4">
          <div class="${PANEL3} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT3} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-sok-kund" class="${BTN3}">S\xF6k kund</button>
            </div>
          </div>

          <div id="panel-filter" class="${PANEL3} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="filter-title" class="text-[#1565c0] font-bold text-base">Filter</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="flex items-end gap-4 flex-wrap mb-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Kategori</label>
                  <select id="filter-kategori" class="${SELECT} w-48">
                    <option value="">V\xE4lj kategori</option>
                    <option>Kontoutdrag</option>
                    <option>Avr\xE4kningsnota</option>
                    <option>Bokf\xF6ringsavi</option>
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
                  <label class="block text-sm text-gray-700 mb-1">F\xF6rbindelse</label>
                  <select id="filter-forbindelse" class="${SELECT} w-48">
                    <option value="">V\xE4lj f\xF6rbindelse</option>
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
                  <input type="date" id="datum-fran" class="${INPUT3}" />
                  <span class="text-gray-500 text-sm">\u2013</span>
                  <input type="date" id="datum-till" class="${INPUT3}" />
                </div>
              </div>
              <button id="btn-sok-dok" class="${BTN3}">S\xF6k dokument</button>
            </div>
          </div>

          <div id="panel-results" class="${PANEL3} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">S\xF6kresultat</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Dokumentnamn</th>
                    <th>F\xF6rbindelse</th>
                    <th>Dok.datum</th>
                    <th>Utskicksdatum</th>
                    <th>Skickats till</th>
                    <th>Visas till</th>
                    <th>L\xE4st</th>
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
      this.querySelector("#btn-sok-kund").addEventListener("click", () => {
        const kundnr = this.querySelector("#kundnr").value.trim();
        if (!kundnr) return;
        const kund = mockGetKund(kundnr);
        if (!kund) {
          alert("Kund saknas");
          return;
        }
        this.currentKundnr = kundnr;
        this.querySelector("#filter-title").textContent = `Kundnummer ${kundnr} ${kund.kundnamn}`;
        this.querySelector("#panel-filter").classList.remove("hidden");
        this.querySelector("#panel-results").classList.add("hidden");
      });
      this.querySelector("#kundnr").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.querySelector("#btn-sok-kund").click();
      });
      this.querySelectorAll('input[name="datum"]').forEach((r) => {
        r.addEventListener("change", () => {
          const pi = this.querySelector("#period-inputs");
          pi.style.display = r.value === "period" ? "flex" : "none";
        });
      });
      this.querySelector("#btn-sok-dok").addEventListener("click", () => {
        const kategori = this.querySelector("#filter-kategori").value;
        const avser = this.querySelector("#filter-avser").value;
        const forbindelse = this.querySelector("#filter-forbindelse").value;
        const datumRadio = this.querySelector('input[name="datum"]:checked');
        let datumFran = "";
        let datumTill = "";
        if (datumRadio && datumRadio.value === "period") {
          datumFran = this.querySelector("#datum-fran").value;
          datumTill = this.querySelector("#datum-till").value;
        }
        let results = mockGetDokument(this.currentKundnr);
        if (kategori && kategori !== "V\xE4lj kategori" && kategori !== "Inga kategorier") {
          results = results.filter((r) => r.kategori === kategori);
        }
        if (datumFran) results = results.filter((r) => r.dokumentdatum >= datumFran);
        if (datumTill) results = results.filter((r) => r.dokumentdatum <= datumTill);
        const tbody = this.querySelector("#results-tbody");
        tbody.innerHTML = "";
        results.forEach((r) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td><button class="link">&#128196; ${r.dokumentnamn}</button></td>
          <td>${r.forbindelse || ""}</td>
          <td>${r.dokumentdatum || ""}</td>
          <td>${r.utskicksdatum || ""}</td>
          <td>${r.skickatsTill || ""}</td>
          <td>${r.visasTill || ""}</td>
          <td>${boolJa(r.last)}</td>
          <td>${boolJa(r.borttaget)}</td>
          <td>${boolJa(r.arkiverat)}</td>
        `;
          tbody.appendChild(tr);
        });
        this.querySelector("#panel-results").classList.remove("hidden");
      });
    }
  };
  customElements.define("page-sok-dokument", PageSokDokument);

  // src/pages/kundvy/sok-kuvert.js
  var BTN4 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var INPUT4 = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var PANEL4 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageSokKuvert = class extends HTMLElement {
    constructor() {
      super();
      this.currentKundnr = "";
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>S\xF6k med kuvertID</h1>
        <div class="space-y-4">
          <div class="${PANEL4} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kuvert-ID</label>
                <input id="kuvert-id" class="${INPUT4} w-64" placeholder="Ange kuvert-ID" />
              </div>
              <button id="btn-sok" class="${BTN4}">S\xF6k</button>
            </div>
          </div>

          <div id="result-card" class="${PANEL4} hidden">
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
      this.querySelector("#btn-sok").addEventListener("click", () => {
        const kuvertId = this.querySelector("#kuvert-id").value.trim();
        if (!kuvertId) return;
        const kuvert = mockGetKuvert(kuvertId);
        if (!kuvert) {
          alert("Kuvert saknas");
          return;
        }
        this.currentKundnr = kuvert.kundnr;
        this.querySelector("#result-card").classList.remove("hidden");
        this.querySelector("#res-kuvert-id").textContent = kuvert.kuvertId;
        this.querySelector("#res-kundnamn").textContent = kuvert.kundnamn;
        this.querySelector("#res-datum").textContent = kuvert.datum;
        this.querySelector("#res-mall").textContent = kuvert.mall;
        this.querySelector("#res-kanal").textContent = kuvert.kanal;
        this.querySelector("#res-status").textContent = kuvert.status;
        this.querySelector("#res-kundnr").textContent = kuvert.kundnr;
      });
      this.querySelector("#kuvert-id").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.querySelector("#btn-sok").click();
      });
      this.querySelector("#res-kundnr").addEventListener("click", () => {
        if (navigator.clipboard) navigator.clipboard.writeText(this.currentKundnr);
        const msg = this.querySelector("#copied-msg");
        msg.style.display = "inline";
        setTimeout(() => {
          msg.style.display = "none";
        }, 2e3);
      });
    }
  };
  customElements.define("page-sok-kuvert", PageSokKuvert);

  // src/pages/kundvy/administrera-utskick.js
  var BTN5 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var BTN_SEC = "bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50";
  var INPUT5 = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var PANEL5 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageAdminUtskick = class extends HTMLElement {
    constructor() {
      super();
      this.rows = [];
      this.currentKundnr = "";
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>Administrera utskick</h1>
        <div class="space-y-4">
          <div class="${PANEL5} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT5} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-hamta" class="${BTN5}">H\xE4mta</button>
            </div>
          </div>

          <div id="settings-panel" class="${PANEL5} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="settings-title" class="text-[#1565c0] font-bold text-base">Utskicksinst\xE4llningar</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Avser</th>
                    <th>F\xF6rbindelse</th>
                    <th class="text-center">Papper</th>
                    <th class="text-center">Internet</th>
                  </tr>
                </thead>
                <tbody id="settings-tbody"></tbody>
              </table>
              <div id="save-msg" class="hidden mt-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
              <div class="flex gap-3 mt-4">
                <button id="btn-spara" class="${BTN5}">Spara</button>
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
      this.querySelector("#btn-hamta").addEventListener("click", () => {
        const kundnr = this.querySelector("#kundnr").value.trim();
        if (!kundnr) return;
        this.currentKundnr = kundnr;
        this.rows = mockGetUtskickInstallningar(kundnr);
        this.querySelector("#settings-panel").classList.remove("hidden");
        this.querySelector("#settings-title").textContent = `Utskicksinst\xE4llningar \u2013 ${kundnr}`;
        this.renderSettings();
      });
      this.querySelector("#kundnr").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.querySelector("#btn-hamta").click();
      });
      this.querySelector("#btn-spara").addEventListener("click", () => {
        const msg = this.querySelector("#save-msg");
        msg.classList.remove("hidden");
        setTimeout(() => msg.classList.add("hidden"), 2500);
      });
      this.querySelector("#btn-avbryt").addEventListener("click", () => {
        this.querySelector("#settings-panel").classList.add("hidden");
        this.querySelector("#kundnr").value = "";
      });
    }
    renderSettings() {
      const tbody = this.querySelector("#settings-tbody");
      tbody.innerHTML = "";
      this.rows.forEach((r, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${r.kategori}</td>
        <td style="color:#0066b3">${r.avser}</td>
        <td style="font-size:12px;color:#6b7280">${r.forbindelse}</td>
        <td style="text-align:center"><input type="checkbox" ${r.papper ? "checked" : ""} data-idx="${i}" data-field="papper"></td>
        <td style="text-align:center"><input type="checkbox" ${r.internet ? "checked" : ""} data-idx="${i}" data-field="internet"></td>
      `;
        tbody.appendChild(tr);
      });
      tbody.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", () => {
          const idx = parseInt(cb.dataset["idx"] ?? "0");
          const field = cb.dataset["field"];
          if (field === "papper" || field === "internet") {
            this.rows[idx][field] = cb.checked;
          }
        });
      });
    }
  };
  customElements.define("page-administrera-utskick", PageAdminUtskick);

  // src/pages/publicering/installningar.js
  var BTN6 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var BTN_SEC2 = "bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50";
  var INPUT6 = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var PANEL6 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageInstallningar = class extends HTMLElement {
    constructor() {
      super();
      this.samband = [];
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>Publiceringsinst\xE4llningar</h1>
        <div class="space-y-4">
          <!-- Existing settings table -->
          <div class="${PANEL6}">
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
                <button id="btn-ta-bort" class="${BTN_SEC2}">Ta bort markerade</button>
                <button id="btn-andra" class="${BTN_SEC2}">\xC4ndra</button>
              </div>
            </div>
          </div>

          <!-- Add new -->
          <div class="${PANEL6}">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">L\xE4gg till informationssamband</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="flex items-end gap-4 flex-wrap mb-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Systembeteckning</label>
                  <input id="sys-bet" class="${INPUT6} w-48" />
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Informations-ID</label>
                  <input id="sys-id" class="${INPUT6} w-48" />
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
                <button id="btn-spara-ny" class="${BTN6}">Spara ny</button>
                <button id="btn-avbryt" class="${BTN_SEC2}">Avbryt</button>
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
      this.querySelector("#btn-spara-ny").addEventListener("click", () => {
        const sys = this.querySelector("#sys-bet").value.trim();
        const id = this.querySelector("#sys-id").value.trim();
        const auto = this.querySelector('input[name="auto"]:checked');
        if (!sys || !id || !auto) return;
        mockCreateInformationssamband({
          systembeteckning: sys,
          informationsId: id,
          publiceraAutomatiskt: auto.value === "Ja"
        });
        this.loadSamband();
        const msg = this.querySelector("#save-msg");
        msg.classList.remove("hidden");
        setTimeout(() => msg.classList.add("hidden"), 2500);
        this.querySelector("#sys-bet").value = "";
        this.querySelector("#sys-id").value = "";
        this.querySelectorAll('input[name="auto"]').forEach((r) => r.checked = false);
      });
      this.querySelector("#btn-andra").addEventListener("click", () => {
        const msg = this.querySelector("#save-msg");
        msg.textContent = "\u2713 \xC4ndrad";
        msg.classList.remove("hidden");
        setTimeout(() => {
          msg.classList.add("hidden");
          msg.textContent = "\u2713 Sparad";
        }, 2500);
      });
      this.querySelector("#btn-avbryt").addEventListener("click", () => {
        this.querySelector("#sys-bet").value = "";
        this.querySelector("#sys-id").value = "";
        this.querySelectorAll('input[name="auto"]').forEach((r) => r.checked = false);
      });
      this.querySelector("#btn-ta-bort").addEventListener("click", () => {
        const tbody = this.querySelector("#samband-tbody");
        const checkedIds = [];
        tbody.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
          if (cb.checked) checkedIds.push(cb.dataset["id"] ?? "");
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
      const tbody = this.querySelector("#samband-tbody");
      tbody.innerHTML = "";
      this.samband.forEach((s) => {
        const tr = document.createElement("tr");
        tr.dataset["id"] = s.id;
        tr.innerHTML = `
        <td style="text-align:center"><input type="checkbox" data-id="${s.id}"></td>
        <td><button class="link">${s.systembeteckning}</button></td>
        <td>${s.informationsId}</td>
        <td>${s.publiceraAutomatiskt ? "Ja" : "Nej"}</td>
      `;
        tbody.appendChild(tr);
      });
    }
  };
  customElements.define("page-installningar", PageInstallningar);

  // src/pages/publicering/kontrollera.js
  var BTN7 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var INPUT7 = "border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]";
  var PANEL7 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageKontrollera = class extends HTMLElement {
    constructor() {
      super();
      this.currentKundnr = "";
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>Kontrollera dokument</h1>
        <div class="space-y-4">
          <div class="${PANEL7} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT7} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-sok-kund" class="${BTN7}">S\xF6k kund</button>
            </div>
          </div>

          <div id="panel-filter" class="${PANEL7} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="filter-title" class="text-[#1565c0] font-bold text-base">Filter</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <button id="btn-sok-dok" class="${BTN7}">S\xF6k dokument</button>
            </div>
          </div>

          <div id="panel-results" class="${PANEL7} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Dokument</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Dokumentnamn</th>
                    <th>F\xF6rbindelse</th>
                    <th>Dok.datum</th>
                    <th>Utskicksdatum</th>
                    <th>Visas till</th>
                    <th>L\xE4st</th>
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
      this.querySelector("#btn-sok-kund").addEventListener("click", () => {
        const kundnr = this.querySelector("#kundnr").value.trim();
        if (!kundnr) return;
        const kund = mockGetKund(kundnr);
        if (!kund) {
          alert("Kund saknas");
          return;
        }
        this.currentKundnr = kundnr;
        this.querySelector("#filter-title").textContent = `Kundnummer ${kundnr} ${kund.kundnamn}`;
        this.querySelector("#panel-filter").classList.remove("hidden");
        this.querySelector("#panel-results").classList.add("hidden");
      });
      this.querySelector("#kundnr").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.querySelector("#btn-sok-kund").click();
      });
      this.querySelector("#btn-sok-dok").addEventListener("click", () => {
        const results = mockGetDokument(this.currentKundnr);
        const tbody = this.querySelector("#results-tbody");
        tbody.innerHTML = "";
        results.forEach((r) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td><button class="link">&#128196; ${r.dokumentnamn}</button></td>
          <td>${r.forbindelse || ""}</td>
          <td>${r.dokumentdatum || ""}</td>
          <td>${r.utskicksdatum || ""}</td>
          <td>${r.visasTill || ""}</td>
          <td>${boolJa(r.last)}</td>
        `;
          tbody.appendChild(tr);
        });
        this.querySelector("#panel-results").classList.remove("hidden");
      });
    }
  };
  customElements.define("page-kontrollera", PageKontrollera);

  // src/pages/publicering/godkann.js
  var BTN8 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0 disabled:opacity-50";
  var BTN_SEC3 = "bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50";
  var PANEL8 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageGodkann = class extends HTMLElement {
    constructor() {
      super();
      this.remaining = [];
      this.selectedJob = null;
    }
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>Godk\xE4nna f\xF6r publicering</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- Jobs table -->
            <div class="${PANEL8}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">V\xE4ntande publiceringsjobb</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div id="no-jobs" class="hidden text-gray-400 text-sm py-4 text-center">Inga v\xE4ntande jobb</div>
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
            <div class="${PANEL8}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Jobbegenskaper</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-md mb-4">
                  <div class="text-gray-500">Systembeteckning</div><div id="prop-sys">\u2013</div>
                  <div class="text-gray-500">Informations-ID</div><div id="prop-id">\u2013</div>
                  <div class="text-gray-500">Leveranstidpunkt</div><div id="prop-lev">\u2013</div>
                  <div class="text-gray-500">Jobb-ID</div><div id="prop-jobb">\u2013</div>
                </div>

                <div class="mb-4">
                  <p class="text-sm text-gray-700 mb-2 font-medium">Godk\xE4nn f\xF6r publicering</p>
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
                  <button id="btn-utfor" class="${BTN8}" disabled>Utf\xF6r</button>
                  <button id="btn-avbryt" class="${BTN_SEC3}">Avbryt</button>
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
      this.querySelector("#btn-utfor").disabled = !(this.selectedJob && gk);
    }
    init() {
      this.querySelectorAll('input[name="gk"]').forEach((r) => {
        r.addEventListener("change", () => this.updateUtforBtn());
      });
      this.querySelector("#btn-utfor").addEventListener("click", () => {
        if (!this.selectedJob) return;
        const gk = this.querySelector('input[name="gk"]:checked');
        if (!gk) return;
        const action = gk.value === "Ja" ? "publicerat" : "borttaget";
        mockGodkannJobb(this.selectedJob.jobbId, gk.value === "Ja");
        this.loadJobs();
        const msg = this.querySelector("#utfor-msg");
        msg.textContent = `\u2713 Jobb ${this.selectedJob.jobbId} ${action}`;
        msg.classList.remove("hidden");
        this.selectedJob = null;
        ["prop-sys", "prop-id", "prop-lev", "prop-jobb"].forEach((id) => {
          this.querySelector(`#${id}`).textContent = "\u2013";
        });
        this.querySelectorAll('input[name="gk"]').forEach((r) => r.checked = false);
        this.querySelector("#btn-utfor").disabled = true;
        setTimeout(() => msg.classList.add("hidden"), 3e3);
      });
      this.querySelector("#btn-avbryt").addEventListener("click", () => {
        this.selectedJob = null;
        ["prop-sys", "prop-id", "prop-lev", "prop-jobb"].forEach((id) => {
          this.querySelector(`#${id}`).textContent = "\u2013";
        });
        this.querySelectorAll('input[name="gk"]').forEach((r) => r.checked = false);
        this.querySelectorAll("#jobs-tbody tr").forEach((r) => r.classList.remove("selected"));
        this.querySelector("#btn-utfor").disabled = true;
      });
    }
    loadJobs() {
      const jobs = mockGetPubliceringJobb();
      this.remaining = jobs.filter((j) => j.status === "V\xE4ntar");
      this.renderJobs();
    }
    renderJobs() {
      const tbody = this.querySelector("#jobs-tbody");
      const noJobs = this.querySelector("#no-jobs");
      const table = this.querySelector("#jobs-table");
      tbody.innerHTML = "";
      if (this.remaining.length === 0) {
        noJobs.classList.remove("hidden");
        table.classList.add("hidden");
        return;
      }
      noJobs.classList.add("hidden");
      table.classList.remove("hidden");
      this.remaining.forEach((j) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.dataset["id"] = j.jobbId;
        tr.innerHTML = `
        <td><button class="link">${j.systembeteckning}</button></td>
        <td>${j.informationsId}</td>
        <td>${fmtDatum(j.leveranstidpunkt)}</td>
        <td>${j.jobbId}</td>
      `;
        tr.addEventListener("click", () => {
          this.querySelectorAll("#jobs-tbody tr").forEach((r) => r.classList.remove("selected"));
          tr.classList.add("selected");
          this.selectedJob = j;
          this.querySelector("#prop-sys").textContent = j.systembeteckning;
          this.querySelector("#prop-id").textContent = j.informationsId;
          this.querySelector("#prop-lev").textContent = fmtDatum(j.leveranstidpunkt);
          this.querySelector("#prop-jobb").textContent = j.jobbId;
          this.updateUtforBtn();
        });
        tbody.appendChild(tr);
      });
    }
  };
  customElements.define("page-godkann", PageGodkann);

  // src/pages/administration/infoprodukter.js
  var BTN9 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var INPUT8 = "border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white";
  var SELECT2 = "border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] appearance-none bg-white w-full";
  var PANEL9 = "bg-white border border-gray-200 rounded shadow-sm";
  var LABEL = "block text-sm text-gray-700 mb-1";
  var REQ = '<span class="text-red-600">*</span>';
  var NOTIF_KAT = ["AVRNOTA", "KONTODR", "BOKFAVI", "RANTEBS", "KORTBEK", "FONDBES", "AVTAL"];
  var BTN_SMALL = "bg-[#1565c0] text-white rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-[#0d52a8] border-0";
  var PageInfoprodukter = class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div>
        <h1>Administrera informationsprodukter</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- Add new -->
            <div class="${PANEL9}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 id="form-title" class="text-[#1565c0] font-bold text-base">L\xE4gg till informationsprodukt</h2>
                  <button id="btn-ny" class="${BTN_SMALL} hidden">+ Ny produkt</button>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3 space-y-4">

                <!-- Land -->
                <div class="flex items-center gap-3">
                  <label class="text-sm text-gray-700 w-28 shrink-0">Land ${REQ}</label>
                  <select id="f-land" class="${SELECT2}" style="max-width:220px">
                    <option value="">V\xE4lj land</option>
                    <option>SE</option><option>NO</option><option>DK</option>
                    <option>FI</option><option>GB</option><option>NL</option>
                  </select>
                </div>

                <!-- Namn med spr\xE5k + l\xE4gg till-lista -->
                <div class="flex items-start gap-3">
                  <label class="text-sm text-gray-700 w-28 shrink-0 pt-1.5">Namn ${REQ}</label>
                  <div class="flex-1 space-y-2">
                    <div class="flex gap-2">
                      <input id="f-namn" class="${INPUT8}" placeholder="Ange namn" maxlength="20" style="max-width:200px" />
                      <select id="f-sprak" class="${SELECT2}" style="max-width:100px">
                        <option value="">V\xE4lj</option>
                        <option value="sv">sv</option>
                        <option value="no">no</option>
                        <option value="dk">dk</option>
                        <option value="fi">fi</option>
                        <option value="en">en</option>
                        <option value="nl">nl</option>
                      </select>
                    </div>
                    <button type="button" id="btn-add-namn" class="${BTN_SMALL}">L\xE4gg till</button>
                    <table id="namn-table" class="hidden text-sm border-collapse mt-1" style="width:auto">
                      <thead>
                        <tr class="text-left text-gray-500 border-b border-gray-200">
                          <th class="font-normal pb-1" style="width:160px">Namn</th>
                          <th class="font-normal pb-1 px-3" style="width:36px">Spr\xE5k</th>
                          <th style="width:16px"></th>
                        </tr>
                      </thead>
                      <tbody id="namn-tbody"></tbody>
                    </table>
                  </div>
                </div>

                <!-- Id, Notifieringskategori -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Id ${REQ}</label>
                    <input id="f-id" class="${INPUT8}" />
                  </div>
                  <div>
                    <label class="${LABEL}">Notifieringskategori ${REQ}</label>
                    <select id="f-notifkat" class="${SELECT2}">
                      <option value="">-- V\xE4lj --</option>
                      ${NOTIF_KAT.map((k) => `<option>${k}</option>`).join("")}
                    </select>
                  </div>
                </div>

                <!-- Status, Insynsskyddat dokument -->
                <div class="grid grid-cols-3 gap-4">
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

                <!-- Row 3: Systembeteckning | Avgiftsid Papper+Internet | Beskrivning -->
                <div class="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label class="${LABEL}">Systembeteckning</label>
                    <input id="f-sys" class="${INPUT8}" />
                  </div>
                  <div class="space-y-3">
                    <div>
                      <label class="${LABEL}">Avgiftsid f\xF6r Papper ${REQ}</label>
                      <input id="f-avg-papper" class="${INPUT8}" />
                    </div>
                    <div>
                      <label class="${LABEL}">Avgiftsid f\xF6r Internet ${REQ}</label>
                      <input id="f-avg-internet" class="${INPUT8}" />
                    </div>
                  </div>
                  <div>
                    <label class="${LABEL}">Beskrivning</label>
                    <textarea id="f-beskrivning" class="${INPUT8}" rows="4" style="resize:vertical"></textarea>
                  </div>
                </div>

                <!-- Row 4: Visningsstid, Lagringstid -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">Visningsstid i e-arkiv f\xF6r kund (m\xE5nader) ${REQ}</label>
                    <input id="f-visning" class="${INPUT8}" type="number" min="0" />
                  </div>
                  <div>
                    <label class="${LABEL}">Lagringstid p\xE5 disk (m\xE5nader) ${REQ}</label>
                    <input id="f-lagring" class="${INPUT8}" type="number" min="0" />
                  </div>
                </div>

                <!-- Row 5: DocType, DocSubtype -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">DocType</label>
                    <input id="f-doctype" class="${INPUT8}" type="text" />
                  </div>
                  <div>
                    <label class="${LABEL}">DocSubtype</label>
                    <input id="f-docsubtype" class="${INPUT8}" type="text" />
                  </div>
                </div>

                <!-- Kanaler & format \u2014 samlad sektion -->
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide -mb-1">Kanaler och format</p>

                  <!-- Kanal-kryssrutor -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="bg-white border border-gray-200 rounded-md px-3 py-2">
                      <p class="${LABEL} font-medium">Defaultkanaler</p>
                      <div class="flex gap-4 mt-1">
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" id="f-def-papper" /> Papper
                        </label>
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" id="f-def-internet" /> Internet
                        </label>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-md px-3 py-2">
                      <p class="${LABEL} font-medium">Till\xE5tna kanaler</p>
                      <div class="flex gap-4 mt-1">
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" id="f-till-papper" /> Papper
                        </label>
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" id="f-till-internet" /> Internet
                        </label>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-md px-3 py-2">
                      <p class="${LABEL} font-medium">Obligatoriska kanaler</p>
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

                  <!-- Kanalval, Debitera, Visas i edok, PDF-format -->
                  <div class="grid grid-cols-4 gap-4">
                    <div>
                      <label class="${LABEL}">N\xE5gon kanal m\xE5ste vara vald ${REQ}</label>
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
                      <label class="${LABEL}">Debitera icke Internetkunder ${REQ}</label>
                      <div class="flex gap-4 mt-1">
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="ip-debitera" value="Ja" /> Ja
                        </label>
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="ip-debitera" value="Nej" checked /> Nej
                        </label>
                      </div>
                    </div>
                    <div>
                      <label class="${LABEL}">Visas i elektroniska dokument?</label>
                      <div class="flex gap-4 mt-1">
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="ip-visas-edok" id="f-visas-edok-ja" value="Ja" /> Ja
                        </label>
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="ip-visas-edok" id="f-visas-edok-nej" value="Nej" /> Nej
                        </label>
                      </div>
                    </div>
                    <div>
                      <label class="${LABEL}">PDF-format</label>
                      <div class="flex gap-4 mt-1">
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="ip-pdf-format" id="f-pdf-format-j" value="Y" /> Ja
                        </label>
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="ip-pdf-format" id="f-pdf-format-n" value="N" checked /> Nej
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bank\xE4rendel\xE4nkar -->
                <div class="flex gap-2">
                  <button type="button" id="btn-add-banklink" class="${BTN_SMALL}">+ L\xE4gg till bank\xE4rendel\xE4nk</button>
                  <button type="button" id="btn-remove-banklink" class="bg-white text-[#1565c0] border border-[#1565c0] rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-[#eef2f7]">\u2212 Ta bort bank\xE4rendel\xE4nk</button>
                </div>

                <!-- Row 8: Meddelande i utskick via Internet -->
                <div>
                  <label class="${LABEL}">Meddelande i utskick via Internet ${REQ}</label>
                  <div style="border:1px solid #1565c0;position:relative">
                    <div style="display:flex;align-items:center;gap:0;padding:3px 8px;border-bottom:1px solid #1565c0;background:#fff;user-select:none">
                      <button type="button" id="ip-r"   title="Rensa formatering"       style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 14px serif">R</button>
                      <button type="button" id="ip-ul"  title="Punktlista"               style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:13px sans-serif">&#x2A76;&#x2261;</button>
                      <button type="button" id="ip-ol"  title="Numrerad lista"           style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:13px sans-serif">&#x2261;</button>
                      <button type="button" id="ip-f"   title="Teckensnitt"              style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 14px sans-serif">F</button>
                      <button type="button" id="ip-src" title="Visa/redigera HTML"       style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 12px monospace">&lt;/&gt;</button>
                      <button type="button" id="ip-dyn" title="Infoga dynamisk variabel" style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:14px sans-serif">&#x2299;</button>
                      <select id="ip-font-sel" style="display:none;margin-left:6px;font-size:12px;border:1px solid #aaa;padding:1px 3px">
                        <option value="">Standard</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                      </select>
                      <div id="ip-dyn-popup" style="display:none;position:absolute;top:28px;left:0;background:#fff;border:1px solid #1565c0;z-index:10;padding:4px 0;box-shadow:0 2px 6px rgba(0,0,0,.15)">
                        ${["DYN1", "DYN2", "DYN3", "DYN4", "DYN5"].map(
        (d) => `<button type="button" data-dyn="${d}" style="display:block;width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:4px 14px;color:#1a3a6b;font-size:12px;white-space:nowrap">${d}</button>`
      ).join("")}
                      </div>
                    </div>
                    <div id="ip-f-meddelande"
                         contenteditable="true"
                         style="min-height:120px;padding:6px 8px;font-size:13px;font-family:inherit;outline:none;overflow:auto"
                         data-placeholder="H\xE4r l\xE4gger vi in text f\xF6r inkorg"></div>
                    <textarea id="ip-f-meddelande-src"
                              style="display:none;width:100%;min-height:120px;padding:6px 8px;font-size:12px;font-family:monospace;border:none;outline:none;resize:none;box-sizing:border-box"></textarea>
                  </div>
                </div>

                <div class="flex justify-end items-center gap-3">
                  <div id="save-msg" class="hidden text-green-700 text-sm font-medium">&#10003; Sparad</div>
                  <div id="prod-msg" class="hidden text-green-700 text-sm font-medium">&#10003; Skickad till produktion</div>
                  <button id="btn-spara" class="${BTN9}">Spara</button>
                  <button id="btn-till-prod" class="bg-white text-[#1565c0] border border-[#1565c0] rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#eef2f7]">Till prod</button>
                </div>

                <!-- Till prod \u2014 bekr\xE4ftelsedialog -->
                <div id="prod-dialog" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                  <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-[400px] space-y-4">
                    <h3 class="text-[#1565c0] font-bold text-base">Skicka till produktion</h3>
                    <p class="text-sm text-gray-700">\xC4r du s\xE4ker p\xE5 att du vill skicka informationsprodukten till produktion? \xC5tg\xE4rden kan inte \xE5ngras.</p>
                    <div class="flex gap-3 justify-end pt-2">
                      <button id="prod-cancel" class="bg-white text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50">Avbryt</button>
                      <button id="prod-confirm" class="${BTN9}">Bekr\xE4fta</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- List -->
            <div class="${PANEL9}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-[#1565c0] font-bold text-base">Informationsprodukter</h2>
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Filtrera land:</label>
                    <select id="filter-land" class="${SELECT2}" style="width:9rem">
                      <option value="">V\xE4lj land</option>
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
      this.loadProducts("");
    }
    init() {
      const editor = () => this.querySelector("#ip-f-meddelande");
      const srcArea = () => this.querySelector("#ip-f-meddelande-src");
      let srcMode = false;
      const rteCmd = (cmd) => {
        document.execCommand(cmd, false);
        editor().focus();
      };
      this.querySelector("#ip-r").addEventListener("mousedown", (e) => {
        e.preventDefault();
        rteCmd("removeFormat");
      });
      this.querySelector("#ip-ul").addEventListener("mousedown", (e) => {
        e.preventDefault();
        rteCmd("insertUnorderedList");
      });
      this.querySelector("#ip-ol").addEventListener("mousedown", (e) => {
        e.preventDefault();
        rteCmd("insertOrderedList");
      });
      const fontSel = this.querySelector("#ip-font-sel");
      this.querySelector("#ip-f").addEventListener("mousedown", (e) => {
        e.preventDefault();
        fontSel.style.display = fontSel.style.display === "none" ? "inline-block" : "none";
        if (fontSel.style.display !== "none") fontSel.focus();
      });
      fontSel.addEventListener("change", (e) => {
        if (e.target.value) document.execCommand("fontName", false, e.target.value);
        fontSel.style.display = "none";
        editor().focus();
      });
      this.querySelector("#ip-src").addEventListener("mousedown", (e) => {
        e.preventDefault();
        srcMode = !srcMode;
        if (srcMode) {
          srcArea().value = editor().innerHTML;
          editor().style.display = "none";
          srcArea().style.display = "block";
          srcArea().focus();
        } else {
          editor().innerHTML = srcArea().value;
          srcArea().style.display = "none";
          editor().style.display = "block";
          editor().focus();
        }
      });
      const dynPopup = this.querySelector("#ip-dyn-popup");
      this.querySelector("#ip-dyn").addEventListener("mousedown", (e) => {
        e.preventDefault();
        dynPopup.style.display = dynPopup.style.display === "none" ? "block" : "none";
      });
      dynPopup.querySelectorAll("button[data-dyn]").forEach((btn) => {
        btn.addEventListener("mousedown", (e) => {
          e.preventDefault();
          document.execCommand("insertText", false, btn.dataset["dyn"]);
          dynPopup.style.display = "none";
          editor().focus();
        });
      });
      document.addEventListener("click", (e) => {
        if (!this.contains(e.target)) dynPopup.style.display = "none";
      });
      const updatePlaceholder = () => {
        const el = editor();
        el.classList.toggle("empty", !el.textContent?.trim());
      };
      editor().addEventListener("input", updatePlaceholder);
      updatePlaceholder();
      this.querySelector("#filter-land").addEventListener("change", (e) => {
        this.loadProducts(e.target.value);
      });
      this.namnLista = [];
      this.querySelector("#btn-add-namn").addEventListener("click", () => {
        const namn = this.querySelector("#f-namn").value.trim();
        const sprak = this.querySelector("#f-sprak").value;
        if (!namn) return;
        this.namnLista.push({ namn, sprak });
        this.querySelector("#f-namn").value = "";
        this.querySelector("#f-sprak").value = "";
        this.renderNamnLista();
      });
      this.querySelector("#btn-ny").addEventListener("click", () => this.resetForm());
      const dialog = this.querySelector("#prod-dialog");
      this.querySelector("#btn-till-prod").addEventListener("click", () => {
        dialog.classList.remove("hidden");
      });
      this.querySelector("#prod-cancel").addEventListener("click", () => {
        dialog.classList.add("hidden");
      });
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.classList.add("hidden");
      });
      this.querySelector("#prod-confirm").addEventListener("click", () => {
        dialog.classList.add("hidden");
        const msg = this.querySelector("#prod-msg");
        msg.classList.remove("hidden");
        setTimeout(() => msg.classList.add("hidden"), 3e3);
      });
      this.querySelector("#btn-spara").addEventListener("mousedown", (e) => e.preventDefault());
      this.querySelector("#btn-spara").addEventListener("click", () => {
        const body = {
          land: this.querySelector("#f-land").value,
          namn: this.querySelector("#f-namn").value.trim(),
          status: (this.querySelector('input[name="ip-status"]:checked') ?? {}).value ?? "Aktiv",
          notifieringskategori: this.querySelector("#f-notifkat").value,
          insynsskyddat: (this.querySelector('input[name="ip-insyns"]:checked') ?? {}).value ?? "Nej",
          systembeteckning: this.querySelector("#f-sys").value.trim(),
          avgiftsidPapper: this.querySelector("#f-avg-papper").value.trim(),
          avgiftsidInternet: this.querySelector("#f-avg-internet").value.trim(),
          visningsstid: this.querySelector("#f-visning").value,
          lagringstid: this.querySelector("#f-lagring").value,
          docType: this.querySelector("#f-doctype").value.trim(),
          docSubtype: this.querySelector("#f-docsubtype").value.trim(),
          visasIElektroniskaDok: (this.querySelector('input[name="ip-visas-edok"]:checked') ?? {}).value ?? "",
          pdfFormat: (this.querySelector('input[name="ip-pdf-format"]:checked') ?? {}).value ?? "N",
          beskrivning: this.querySelector("#f-beskrivning").value.trim(),
          defaultkanalPapper: this.querySelector("#f-def-papper").checked,
          defaultkanalInternet: this.querySelector("#f-def-internet").checked,
          tillatenKanalPapper: this.querySelector("#f-till-papper").checked,
          tillatenKanalInternet: this.querySelector("#f-till-internet").checked,
          obligKanalPapper: this.querySelector("#f-oblig-papper").checked,
          obligKanalInternet: this.querySelector("#f-oblig-internet").checked,
          kanalKrav: (this.querySelector('input[name="ip-kanal-krav"]:checked') ?? {}).value ?? "Ja",
          debiteraIckeInternet: (this.querySelector('input[name="ip-debitera"]:checked') ?? {}).value ?? "Nej",
          meddelande: editor().innerHTML
        };
        const editId = this.querySelector("#f-id").dataset.editId;
        if (editId) {
          mockUpdateInformationsprodukt(editId, body);
        } else {
          mockCreateInformationsprodukt(body);
        }
        this.loadProducts(this.querySelector("#filter-land").value);
        const msg = this.querySelector("#save-msg");
        msg.classList.remove("hidden");
        setTimeout(() => msg.classList.add("hidden"), 2500);
      });
    }
    loadProducts(land) {
      const list = mockGetInformationsprodukter(land && land !== "V\xE4lj land" ? land : "");
      this.renderProducts(list);
    }
    renderProducts(list) {
      const tbody = this.querySelector("#products-tbody");
      tbody.innerHTML = "";
      list.forEach((p) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td><button class="link" data-id="${p.id}">${p.id}</button></td>
        <td>${p.namn}</td>
        <td>${p.land}</td>
        <td style="color:#15803d">${p.status}</td>
      `;
        tr.querySelector("button").addEventListener("click", () => this.fillForm(p.id));
        tbody.appendChild(tr);
      });
    }
    renderNamnLista() {
      const tbody = this.querySelector("#namn-tbody");
      const table = this.querySelector("#namn-table");
      tbody.innerHTML = "";
      this.namnLista.forEach((entry, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="py-0.5 text-gray-800" style="width:160px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${entry.namn}">${entry.namn.slice(0, 20)}</td>
        <td class="py-0.5 px-3 text-gray-600" style="width:36px">${entry.sprak}</td>
        <td class="py-0.5" style="width:16px"><button type="button" class="text-gray-400 hover:text-red-500 text-xs leading-none" data-idx="${i}">\u2715</button></td>
      `;
        tr.querySelector("button").addEventListener("click", () => {
          this.namnLista.splice(i, 1);
          this.renderNamnLista();
        });
        tbody.appendChild(tr);
      });
      table.classList.toggle("hidden", this.namnLista.length === 0);
    }
    fillForm(id) {
      const p = mockGetInformationsprodukt(id);
      if (!p) return;
      const q = (sel) => this.querySelector(sel);
      const setRadio = (name, val) => {
        const rb = this.querySelector(`input[name="${name}"][value="${val}"]`);
        if (rb) rb.checked = true;
      };
      q("#f-land").value = p.land ?? "";
      q("#f-id").value = p.id ?? "";
      q("#f-id").dataset.editId = p.id;
      q("#f-namn").value = p.namn ?? "";
      q("#f-notifkat").value = p.notifieringskategori ?? "";
      q("#f-sys").value = p.systembeteckning ?? "";
      q("#f-avg-papper").value = p.avgiftsidPapper ?? "";
      q("#f-avg-internet").value = p.avgiftsidInternet ?? "";
      q("#f-visning").value = p.visningsstid ?? "";
      q("#f-lagring").value = p.lagringstid ?? "";
      q("#f-doctype").value = p.docType ?? "";
      q("#f-docsubtype").value = p.docSubtype ?? "";
      setRadio("ip-visas-edok", p.visasIElektroniskaDok ?? "");
      setRadio("ip-pdf-format", p.pdfFormat ?? "N");
      q("#f-beskrivning").value = p.beskrivning ?? "";
      setRadio("ip-status", p.status ?? "Aktiv");
      setRadio("ip-insyns", p.insynsskyddat ?? "Nej");
      setRadio("ip-kanal-krav", p.kanalKrav ?? "Ja");
      setRadio("ip-debitera", p.debiteraIckeInternet ?? "Nej");
      q("#f-def-papper").checked = !!p.defaultkanalPapper;
      q("#f-def-internet").checked = !!p.defaultkanalInternet;
      q("#f-till-papper").checked = !!p.tillatenKanalPapper;
      q("#f-till-internet").checked = !!p.tillatenKanalInternet;
      q("#f-oblig-papper").checked = !!p.obligKanalPapper;
      q("#f-oblig-internet").checked = !!p.obligKanalInternet;
      const editor = q("#ip-f-meddelande");
      editor.innerHTML = p.meddelande ?? "";
      editor.classList.toggle("empty", !editor.textContent?.trim());
      q("#form-title").textContent = `Informationsprodukt ${p.id} \u2014 ${p.namn}`;
      q("#btn-ny").classList.remove("hidden");
      q("#f-id").readOnly = true;
      q("#form-title").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    resetForm() {
      const q = (sel) => this.querySelector(sel);
      q("#f-land").value = "";
      q("#f-id").value = "";
      q("#f-id").dataset.editId = "";
      q("#f-id").readOnly = false;
      q("#f-namn").value = "";
      q("#f-notifkat").value = "";
      q("#f-sys").value = "";
      q("#f-avg-papper").value = "";
      q("#f-avg-internet").value = "";
      q("#f-visning").value = "";
      q("#f-lagring").value = "";
      q("#f-doctype").value = "";
      q("#f-docsubtype").value = "";
      this.querySelectorAll('input[name="ip-visas-edok"]').forEach((r) => r.checked = false);
      q("#f-pdf-format-n").checked = true;
      q("#f-beskrivning").value = "";
      this.querySelector('input[name="ip-status"][value="Aktiv"]').checked = true;
      this.querySelector('input[name="ip-insyns"][value="Nej"]').checked = true;
      this.querySelector('input[name="ip-kanal-krav"][value="Ja"]').checked = true;
      this.querySelector('input[name="ip-debitera"][value="Nej"]').checked = true;
      [
        "#f-def-papper",
        "#f-def-internet",
        "#f-till-papper",
        "#f-till-internet",
        "#f-oblig-papper",
        "#f-oblig-internet"
      ].forEach((sel) => {
        q(sel).checked = false;
      });
      const editor = q("#ip-f-meddelande");
      editor.innerHTML = "";
      editor.classList.add("empty");
      this.namnLista = [];
      this.renderNamnLista();
      q("#form-title").textContent = "L\xE4gg till informationsprodukt";
      q("#btn-ny").classList.add("hidden");
    }
  };
  customElements.define("page-infoprodukter", PageInfoprodukter);

  // src/pages/administration/debitering.js
  var BTN10 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var BTN_SEC4 = "bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50";
  var INPUT9 = "border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full";
  var PANEL10 = "bg-white border border-gray-200 rounded shadow-sm";
  var PageDebitering = class extends HTMLElement {
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
            <div class="${PANEL10}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Redigera / L\xE4gg till</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div class="grid grid-cols-3 gap-3 mb-4 max-w-2xl">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Produkt-ID</label>
                    <input id="f-produktid" class="${INPUT9}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Medd-ID</label>
                    <input id="f-meddid" class="${INPUT9}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Systembeteckning</label>
                    <input id="f-sys" class="${INPUT9}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">ANTS-kod internet</label>
                    <input id="f-ants-i" class="${INPUT9}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">ANTS-kod ej internet</label>
                    <input id="f-ants-ej" class="${INPUT9}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Resultatst\xE4lle</label>
                    <input id="f-res" class="${INPUT9}" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Status</label>
                    <select id="f-status" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white appearance-none">
                      <option value="Aktiv">Aktiv</option>
                      <option value="Under uppl\xE4gg">Under uppl\xE4gg</option>
                      <option value="Inaktiv">Inaktiv</option>
                    </select>
                  </div>
                </div>
                <div id="save-msg" class="hidden mb-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
                <div class="flex gap-3">
                  <button id="btn-spara" class="${BTN10}">Spara ny</button>
                  <button id="btn-andra" class="${BTN10}">\xC4ndra</button>
                  <button id="btn-klarmarkera" class="${BTN10}">Klarmarkera</button>
                  <button id="btn-avbryt" class="${BTN_SEC4}">Avbryt</button>
                </div>
              </div>
            </div>

            <!-- Table -->
            <div class="${PANEL10}">
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
                      <th>Resultatst\xE4lle</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="deb-tbody"></tbody>
                </table>
                <div class="flex gap-3 mt-4">
                  <button id="btn-ta-bort" class="${BTN_SEC4}">Ta bort markerade</button>
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
      this.querySelector("#btn-spara").addEventListener("click", () => {
        const body = this.getFormBody();
        if (this.selectedRow) {
          mockUpdateDebiteringsuppgift(this.selectedRow.produktid, body);
        } else {
          mockCreateDebiteringsuppgift(body);
        }
        this.loadRows();
        this.showMsg("\u2713 Sparad");
      });
      this.querySelector("#btn-andra").addEventListener("click", () => {
        if (!this.selectedRow) return;
        const body = this.getFormBody();
        mockUpdateDebiteringsuppgift(this.selectedRow.produktid, body);
        this.loadRows();
        this.showMsg("\u2713 \xC4ndrad");
      });
      this.querySelector("#btn-klarmarkera").addEventListener("click", () => {
        if (!this.selectedRow) return;
        this.querySelector("#f-status").value = "Aktiv";
        const body = this.getFormBody();
        mockUpdateDebiteringsuppgift(this.selectedRow.produktid, body);
        this.loadRows();
        this.showMsg("\u2713 Klarmarkerad");
      });
      this.querySelector("#btn-avbryt").addEventListener("click", () => {
        this.selectedRow = null;
        ["f-produktid", "f-meddid", "f-sys", "f-ants-i", "f-ants-ej", "f-res"].forEach((id) => {
          this.querySelector(`#${id}`).value = "";
        });
        this.querySelector("#f-status").value = "Aktiv";
      });
      this.querySelector("#btn-ta-bort").addEventListener("click", () => {
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
        produktid: this.querySelector("#f-produktid").value.trim(),
        meddelandeid: this.querySelector("#f-meddid").value.trim(),
        systembeteckning: this.querySelector("#f-sys").value.trim(),
        antsKodInternet: this.querySelector("#f-ants-i").value.trim(),
        antsKodEjInternet: this.querySelector("#f-ants-ej").value.trim(),
        resultatstalle: this.querySelector("#f-res").value.trim(),
        status: this.querySelector("#f-status").value
      };
    }
    showMsg(text) {
      const msg = this.querySelector("#save-msg");
      msg.textContent = text;
      msg.classList.remove("hidden");
      setTimeout(() => {
        msg.classList.add("hidden");
        msg.textContent = "\u2713 Sparad";
      }, 2500);
    }
    loadRows() {
      this.rows = mockGetDebiteringsuppgifter();
      this.selectedRow = null;
      this.renderRows();
    }
    renderRows() {
      const tbody = this.querySelector("#deb-tbody");
      tbody.innerHTML = "";
      this.rows.forEach((r, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td style="text-align:center"><input type="checkbox" data-idx="${i}"></td>
        <td><button class="link">${r.produktid}</button></td>
        <td>${r.meddelandeid}</td>
        <td>${r.systembeteckning}</td>
        <td>${r.antsKodInternet}</td>
        <td>${r.antsKodEjInternet}</td>
        <td>${r.resultatstalle}</td>
        <td style="color:${r.status === "Aktiv" ? "#15803d" : r.status === "Inaktiv" ? "#6b7280" : "#d97706"}">${r.status ?? ""}</td>
      `;
        tr.querySelector("button.link").addEventListener("click", () => {
          this.selectedRow = r;
          this.querySelector("#f-produktid").value = r.produktid;
          this.querySelector("#f-meddid").value = r.meddelandeid !== "-" ? r.meddelandeid : "";
          this.querySelector("#f-sys").value = r.systembeteckning;
          this.querySelector("#f-ants-i").value = r.antsKodInternet;
          this.querySelector("#f-ants-ej").value = r.antsKodEjInternet;
          this.querySelector("#f-res").value = r.resultatstalle;
          this.querySelector("#f-status").value = r.status ?? "Aktiv";
        });
        tbody.appendChild(tr);
      });
    }
  };
  customElements.define("page-debitering", PageDebitering);

  // src/pages/administration/massutskick.js
  var BTN11 = "bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0";
  var BTN_SEC5 = "bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50";
  var INPUT10 = "border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white";
  var SELECT3 = "border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white appearance-none";
  var PANEL11 = "bg-white border border-gray-200 rounded shadow-sm";
  var LABEL2 = "block text-sm text-gray-700 mb-1";
  var REQ2 = '<span class="text-red-600">*</span>';
  var LANDS = ["Sverige", "Norge", "Danmark", "Finland", "Storbritannien", "Nederl\xE4nderna"];
  var ARENDEN = ["Kontoutdrag", "Avr\xE4kningsnota", "Bokf\xF6ringsavi", "Avtal", "R\xE4ntebesked", "Kortbekr\xE4ftelse", "Fondbesked"];
  var NOTIF_KATEGORIER = [
    "-- V\xE4lj notifieringskategori --",
    "NOT-01 R\xE4ntebesked",
    "NOT-02 Kortbekr\xE4ftelse",
    "NOT-03 Kontoutdrag",
    "NOT-04 Fondbesked",
    "NOT-05 Avtal"
  ];
  var PageMassutskick = class extends HTMLElement {
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

            <!-- Meddelandeinneh\xE5ll panel -->
            <div class="${PANEL11}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Meddelandeinneh\xE5ll</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3 space-y-3">

                <!-- Row 1: Land + MeddelandeId -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL2}">Land ${REQ2}</label>
                    <select id="f-land" class="${SELECT3}">
                      <option value="">V\xE4lj land</option>
                      ${LANDS.map((l) => `<option>${l}</option>`).join("")}
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL2}">MeddelandeId ${REQ2}</label>
                    <input id="f-meddid" class="${INPUT10}" placeholder="" />
                  </div>
                </div>

                <!-- Row 2: \xC4rende + Avs\xE4ndare -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL2}">\xC4rende ${REQ2}</label>
                    <select id="f-arende" class="${SELECT3}">
                      <option value=""></option>
                      ${ARENDEN.map((a) => `<option>${a}</option>`).join("")}
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL2}">Avs\xE4ndare ${REQ2}</label>
                    <input id="f-avsandare" class="${INPUT10}" value="Handelsbanken" />
                  </div>
                </div>

                <!-- Row 3: \xC4mne -->
                <div>
                  <label class="${LABEL2}">\xC4mne ${REQ2}</label>
                  <input id="f-amne" class="${INPUT10}" />
                </div>

                <!-- Row 4: Utskicksdatum -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL2}">Utskicksdatum ${REQ2}</label>
                    <input id="f-datum" type="date" class="${INPUT10}" />
                  </div>
                </div>

                <!-- Row 5: Notifieringskategori -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL2}">Notifieringskategori ${REQ2}</label>
                    <select id="f-notif" class="${SELECT3}">
                      ${NOTIF_KATEGORIER.map((k, i) => `<option value="${i === 0 ? "" : k}">${k}</option>`).join("")}
                    </select>
                  </div>
                </div>

                <!-- Row 6: Meddelande -->
                <div>
                  <label class="${LABEL2}">Meddelande ${REQ2}</label>
                  <div style="border:1px solid #1565c0;position:relative">
                    <div style="display:flex;align-items:center;gap:0;padding:3px 8px;border-bottom:1px solid #1565c0;background:#fff;user-select:none">
                      <button type="button" id="mas-r"   title="Rensa formatering"       style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 14px serif">R</button>
                      <button type="button" id="mas-ul"  title="Punktlista"               style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:13px sans-serif">&#x2A76;&#x2261;</button>
                      <button type="button" id="mas-ol"  title="Numrerad lista"           style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:13px sans-serif">&#x2261;</button>
                      <button type="button" id="mas-f"   title="Teckensnitt"              style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 14px sans-serif">F</button>
                      <button type="button" id="mas-src" title="Visa/redigera HTML"       style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 12px monospace">&lt;/&gt;</button>
                      <button type="button" id="mas-dyn" title="Infoga dynamisk variabel" style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:14px sans-serif">&#x2299;</button>
                      <select id="mas-font-sel" style="display:none;margin-left:6px;font-size:12px;border:1px solid #aaa;padding:1px 3px">
                        <option value="">Standard</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                      </select>
                      <div id="mas-dyn-popup" style="display:none;position:absolute;top:28px;left:0;background:#fff;border:1px solid #1565c0;z-index:10;padding:4px 0;box-shadow:0 2px 6px rgba(0,0,0,.15)">
                        ${["DYN1", "DYN2", "DYN3", "DYN4", "DYN5"].map(
        (d) => `<button type="button" data-dyn="${d}" style="display:block;width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:4px 14px;color:#1a3a6b;font-size:12px;white-space:nowrap">${d}</button>`
      ).join("")}
                      </div>
                    </div>
                    <div id="f-meddelande"
                         contenteditable="true"
                         style="min-height:120px;padding:6px 8px;font-size:13px;font-family:inherit;outline:none;overflow:auto"
                         data-placeholder="Meddelandetext... Anv\xE4nd DYN1\u2013DYN5 f\xF6r dynamiska variabler."></div>
                    <textarea id="f-meddelande-src"
                              style="display:none;width:100%;min-height:120px;padding:6px 8px;font-size:12px;font-family:monospace;border:none;outline:none;resize:none;box-sizing:border-box"></textarea>
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
                  <button id="btn-bilagor" class="${BTN_SEC5}">Bilagel\xE4nkar</button>
                  <div class="flex gap-3">
                    <button id="btn-ny"          class="${BTN11}">Ny</button>
                    <button id="btn-spara"        class="${BTN_SEC5}">Spara</button>
                    <button id="btn-ta-bort"      class="${BTN11}">Ta bort</button>
                    <button id="btn-klarmarkera"  class="${BTN11}">Klarmarkera</button>
                  </div>
                </div>

              </div>
            </div>

            <!-- List panel -->
            <div class="${PANEL11}">
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
                      <th>Avs\xE4ndare</th>
                      <th>Medd-ID</th>
                      <th>Land</th>
                      <th>\xC4mne</th>
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
      const editor = () => this.querySelector("#f-meddelande");
      const srcArea = () => this.querySelector("#f-meddelande-src");
      let srcMode = false;
      const rteCmd = (cmd) => {
        document.execCommand(cmd, false);
        editor().focus();
      };
      this.querySelector("#mas-r").addEventListener("mousedown", (e) => {
        e.preventDefault();
        rteCmd("removeFormat");
      });
      this.querySelector("#mas-ul").addEventListener("mousedown", (e) => {
        e.preventDefault();
        rteCmd("insertUnorderedList");
      });
      this.querySelector("#mas-ol").addEventListener("mousedown", (e) => {
        e.preventDefault();
        rteCmd("insertOrderedList");
      });
      const fontSel = this.querySelector("#mas-font-sel");
      this.querySelector("#mas-f").addEventListener("mousedown", (e) => {
        e.preventDefault();
        fontSel.style.display = fontSel.style.display === "none" ? "inline-block" : "none";
        if (fontSel.style.display !== "none") fontSel.focus();
      });
      fontSel.addEventListener("change", (e) => {
        if (e.target.value) document.execCommand("fontName", false, e.target.value);
        fontSel.style.display = "none";
        editor().focus();
      });
      this.querySelector("#mas-src").addEventListener("mousedown", (e) => {
        e.preventDefault();
        srcMode = !srcMode;
        if (srcMode) {
          srcArea().value = editor().innerHTML;
          editor().style.display = "none";
          srcArea().style.display = "block";
          srcArea().focus();
        } else {
          editor().innerHTML = srcArea().value;
          srcArea().style.display = "none";
          editor().style.display = "block";
          editor().focus();
        }
      });
      const dynPopup = this.querySelector("#mas-dyn-popup");
      this.querySelector("#mas-dyn").addEventListener("mousedown", (e) => {
        e.preventDefault();
        dynPopup.style.display = dynPopup.style.display === "none" ? "block" : "none";
      });
      dynPopup.querySelectorAll("button[data-dyn]").forEach((btn) => {
        btn.addEventListener("mousedown", (e) => {
          e.preventDefault();
          document.execCommand("insertText", false, btn.dataset["dyn"]);
          dynPopup.style.display = "none";
          editor().focus();
        });
      });
      document.addEventListener("click", (e) => {
        if (!this.contains(e.target)) dynPopup.style.display = "none";
      });
      const updatePlaceholder = () => {
        const el = editor();
        el.classList.toggle("empty", !el.textContent?.trim());
      };
      editor().addEventListener("input", updatePlaceholder);
      updatePlaceholder();
      this.querySelector("#btn-ny").addEventListener("click", () => {
        this.selected = null;
        this.clearForm();
        this.querySelectorAll("#utskick-tbody tr").forEach((r) => r.classList.remove("selected"));
      });
      ["#btn-spara", "#btn-ta-bort", "#btn-klarmarkera"].forEach((id) => {
        this.querySelector(id).addEventListener("mousedown", (e) => e.preventDefault());
      });
      this.querySelector("#btn-spara").addEventListener("click", () => {
        const body = this.getFormBody();
        if (this.selected) {
          mockUpdateMassutskick(this.selected.meddId, body);
          this.showMsg("\u2713 Sparad");
        } else {
          mockCreateMassutskick(body);
          this.showMsg("\u2713 Skapad");
        }
        this.loadUtskick();
      });
      this.querySelector("#btn-ta-bort").addEventListener("click", () => {
        if (!this.selected) return;
        mockDeleteMassutskick(this.selected.meddId);
        this.loadUtskick();
        this.clearForm();
        this.selected = null;
        this.showMsg("\u2713 Borttagen");
      });
      this.querySelector("#btn-klarmarkera").addEventListener("click", () => {
        if (!this.selected) return;
        const result = mockKlarmarkeraMassutskick(this.selected.meddId);
        if (result === "CONFLICT") {
          alert("Redan klarmarkerad eller skickad.");
          return;
        }
        if (result === "NOT_FOUND") {
          alert("Hittades inte.");
          return;
        }
        this.loadUtskick();
        this.showMsg("\u2713 Klarmarkerad");
      });
      this.querySelector("#btn-bilagor").addEventListener("click", () => {
        this.querySelector("#f-bilaga-input").click();
      });
      this.querySelector("#f-bilaga-input").addEventListener("change", (e) => {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach((file) => this.addBilaga(file));
        e.target.value = "";
      });
    }
    getFormBody() {
      const editor = this.querySelector("#f-meddelande");
      return {
        land: this.querySelector("#f-land").value,
        avsandare: this.querySelector("#f-avsandare").value.trim(),
        amne: this.querySelector("#f-amne").value.trim(),
        utskicksdatum: this.querySelector("#f-datum").value,
        notifieringskategori: this.querySelector("#f-notif").value,
        meddelande: editor.innerHTML
      };
    }
    addBilaga(file) {
      const url = URL.createObjectURL(file);
      const list = this.querySelector("#bilagor-list");
      const row = document.createElement("div");
      row.className = "flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700";
      row.innerHTML = `
      <span class="text-gray-400">\u{1F4CE}</span>
      <a href="${url}" target="_blank" class="flex-1 text-[#0066b3] hover:underline cursor-pointer">${file.name}</a>
      <button type="button" class="text-gray-400 hover:text-red-500 text-xs leading-none" title="Ta bort">\u2715</button>
    `;
      row.querySelector("button").addEventListener("click", () => {
        URL.revokeObjectURL(url);
        row.remove();
      });
      list.appendChild(row);
    }
    clearForm() {
      this.querySelector("#f-land").value = "";
      this.querySelector("#f-meddid").value = "";
      this.querySelector("#f-arende").value = "";
      this.querySelector("#f-avsandare").value = "Handelsbanken";
      this.querySelector("#f-amne").value = "";
      this.querySelector("#f-datum").value = "";
      this.querySelector("#f-notif").value = "";
      const editor = this.querySelector("#f-meddelande");
      editor.innerHTML = "";
      editor.classList.add("empty");
      this.querySelector("#bilagor-list").innerHTML = "";
    }
    fillForm(u) {
      this.querySelector("#f-land").value = u.land || "";
      this.querySelector("#f-meddid").value = u.meddId;
      this.querySelector("#f-avsandare").value = u.avsandare;
      this.querySelector("#f-amne").value = u.amne;
      this.querySelector("#f-datum").value = u.utskicksdatum || "";
      this.querySelector("#f-notif").value = u.notifieringskategori || "";
      const editor = this.querySelector("#f-meddelande");
      editor.innerHTML = u.meddelande || "";
      if (editor.textContent?.trim()) editor.classList.remove("empty");
      else editor.classList.add("empty");
    }
    showMsg(text) {
      const msg = this.querySelector("#save-msg");
      msg.textContent = text;
      msg.classList.remove("hidden");
      setTimeout(() => msg.classList.add("hidden"), 2500);
    }
    loadUtskick() {
      this.utskick = mockGetMassutskick();
      this.renderUtskick();
    }
    renderUtskick() {
      const tbody = this.querySelector("#utskick-tbody");
      tbody.innerHTML = "";
      this.utskick.forEach((u) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        const statusColor = u.status === "Under uppl\xE4gg" ? "#d97706" : "#15803d";
        tr.innerHTML = `
        <td style="white-space:nowrap">${u.utskicksdatum || ""}</td>
        <td>${u.avsandare}</td>
        <td>${u.meddId}</td>
        <td>${u.land || ""}</td>
        <td><button class="link">${u.amne}</button></td>
        <td><span style="color:${statusColor}">${u.status}</span></td>
      `;
        tr.addEventListener("click", () => {
          this.querySelectorAll("#utskick-tbody tr").forEach((r) => r.classList.remove("selected"));
          tr.classList.add("selected");
          this.selected = u;
          this.fillForm(u);
        });
        tbody.appendChild(tr);
      });
    }
  };
  customElements.define("page-massutskick", PageMassutskick);
})();
