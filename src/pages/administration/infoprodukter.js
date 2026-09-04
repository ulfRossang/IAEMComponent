import { mockGetInformationsprodukter, mockGetInformationsprodukt, mockCreateInformationsprodukt, mockUpdateInformationsprodukt } from '../../api.js';

const BTN    = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT  = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white';
const SELECT = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] appearance-none bg-white w-full';
const PANEL  = 'bg-white border border-gray-200 rounded shadow-sm';
const LABEL  = 'block text-sm text-gray-700 mb-1';
const REQ    = '<span class="text-red-600">*</span>';

const NOTIF_KAT = ['AVRNOTA','KONTODR','BOKFAVI','RANTEBS','KORTBEK','FONDBES','AVTAL'];
const BTN_SMALL = 'bg-[#1565c0] text-white rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-[#0d52a8] border-0';

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
                <div class="flex items-center justify-between">
                  <h2 id="form-title" class="text-[#1565c0] font-bold text-base">Lägg till informationsprodukt</h2>
                  <button id="btn-ny" class="${BTN_SMALL} hidden">+ Ny produkt</button>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3 space-y-4">

                <!-- Land -->
                <div class="flex items-center gap-3">
                  <label class="text-sm text-gray-700 w-28 shrink-0">Land ${REQ}</label>
                  <select id="f-land" class="${SELECT}" style="max-width:220px">
                    <option value="">Välj land</option>
                    <option>SE</option><option>NO</option><option>DK</option>
                    <option>FI</option><option>GB</option><option>NL</option>
                  </select>
                </div>

                <!-- Namn med språk + lägg till-lista -->
                <div class="flex items-start gap-3">
                  <label class="text-sm text-gray-700 w-28 shrink-0 pt-1.5">Namn ${REQ}</label>
                  <div class="flex-1 space-y-2">
                    <div class="flex gap-2">
                      <input id="f-namn" class="${INPUT}" placeholder="Ange namn" maxlength="20" style="max-width:200px" />
                      <select id="f-sprak" class="${SELECT}" style="max-width:100px">
                        <option value="">Välj</option>
                        <option value="sv">sv</option>
                        <option value="no">no</option>
                        <option value="dk">dk</option>
                        <option value="fi">fi</option>
                        <option value="en">en</option>
                        <option value="nl">nl</option>
                      </select>
                    </div>
                    <button type="button" id="btn-add-namn" class="${BTN_SMALL}">Lägg till</button>
                    <table id="namn-table" class="hidden text-sm border-collapse mt-1" style="width:auto">
                      <thead>
                        <tr class="text-left text-gray-500 border-b border-gray-200">
                          <th class="font-normal pb-1" style="width:160px">Namn</th>
                          <th class="font-normal pb-1 px-3" style="width:36px">Språk</th>
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
                    <input id="f-sys" class="${INPUT}" />
                  </div>
                  <div class="space-y-3">
                    <div>
                      <label class="${LABEL}">Avgiftsid för Papper ${REQ}</label>
                      <input id="f-avg-papper" class="${INPUT}" />
                    </div>
                    <div>
                      <label class="${LABEL}">Avgiftsid för Internet ${REQ}</label>
                      <input id="f-avg-internet" class="${INPUT}" />
                    </div>
                  </div>
                  <div>
                    <label class="${LABEL}">Beskrivning</label>
                    <textarea id="f-beskrivning" class="${INPUT}" rows="4" style="resize:vertical"></textarea>
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

                <!-- Row 5: DocType, DocSubtype -->
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="${LABEL}">DocType</label>
                    <input id="f-doctype" class="${INPUT}" type="text" />
                  </div>
                  <div>
                    <label class="${LABEL}">DocSubtype</label>
                    <input id="f-docsubtype" class="${INPUT}" type="text" />
                  </div>
                </div>

                <!-- Kanaler & format — samlad sektion -->
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
                      <p class="${LABEL} font-medium">Tillåtna kanaler</p>
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
                      <label class="${LABEL}">Någon kanal måste vara vald ${REQ}</label>
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

                <!-- Bankärendelänkar -->
                <div class="flex gap-2">
                  <button type="button" id="btn-add-banklink" class="${BTN_SMALL}">+ Lägg till bankärendelänk</button>
                  <button type="button" id="btn-remove-banklink" class="bg-white text-[#1565c0] border border-[#1565c0] rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-[#eef2f7]">− Ta bort bankärendelänk</button>
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
                        ${['DYN1','DYN2','DYN3','DYN4','DYN5'].map(d =>
                          `<button type="button" data-dyn="${d}" style="display:block;width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:4px 14px;color:#1a3a6b;font-size:12px;white-space:nowrap">${d}</button>`
                        ).join('')}
                      </div>
                    </div>
                    <div id="ip-f-meddelande"
                         contenteditable="true"
                         style="min-height:120px;padding:6px 8px;font-size:13px;font-family:inherit;outline:none;overflow:auto"
                         data-placeholder="Här lägger vi in text för inkorg"></div>
                    <textarea id="ip-f-meddelande-src"
                              style="display:none;width:100%;min-height:120px;padding:6px 8px;font-size:12px;font-family:monospace;border:none;outline:none;resize:none;box-sizing:border-box"></textarea>
                  </div>
                </div>

                <div class="flex justify-end items-center gap-3">
                  <div id="save-msg" class="hidden text-green-700 text-sm font-medium">&#10003; Sparad</div>
                  <div id="prod-msg" class="hidden text-green-700 text-sm font-medium">&#10003; Skickad till produktion</div>
                  <button id="btn-spara" class="${BTN}">Spara</button>
                  <button id="btn-till-prod" class="bg-white text-[#1565c0] border border-[#1565c0] rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#eef2f7]">Till prod</button>
                </div>

                <!-- Till prod — bekräftelsedialog -->
                <div id="prod-dialog" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                  <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-[400px] space-y-4">
                    <h3 class="text-[#1565c0] font-bold text-base">Skicka till produktion</h3>
                    <p class="text-sm text-gray-700">Är du säker på att du vill skicka informationsprodukten till produktion? Åtgärden kan inte ångras.</p>
                    <div class="flex gap-3 justify-end pt-2">
                      <button id="prod-cancel" class="bg-white text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50">Avbryt</button>
                      <button id="prod-confirm" class="${BTN}">Bekräfta</button>
                    </div>
                  </div>
                </div>
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
    const editor  = () => this.querySelector('#ip-f-meddelande');
    const srcArea = () => this.querySelector('#ip-f-meddelande-src');
    let srcMode = false;

    const rteCmd = (cmd) => { document.execCommand(cmd, false); editor().focus(); };

    this.querySelector('#ip-r').addEventListener('mousedown',  e => { e.preventDefault(); rteCmd('removeFormat'); });
    this.querySelector('#ip-ul').addEventListener('mousedown', e => { e.preventDefault(); rteCmd('insertUnorderedList'); });
    this.querySelector('#ip-ol').addEventListener('mousedown', e => { e.preventDefault(); rteCmd('insertOrderedList'); });

    const fontSel = this.querySelector('#ip-font-sel');
    this.querySelector('#ip-f').addEventListener('mousedown', e => {
      e.preventDefault();
      fontSel.style.display = fontSel.style.display === 'none' ? 'inline-block' : 'none';
      if (fontSel.style.display !== 'none') fontSel.focus();
    });
    fontSel.addEventListener('change', (e) => {
      if (e.target.value) document.execCommand('fontName', false, e.target.value);
      fontSel.style.display = 'none';
      editor().focus();
    });

    this.querySelector('#ip-src').addEventListener('mousedown', e => {
      e.preventDefault();
      srcMode = !srcMode;
      if (srcMode) {
        srcArea().value = editor().innerHTML;
        editor().style.display = 'none';
        srcArea().style.display = 'block';
        srcArea().focus();
      } else {
        editor().innerHTML = srcArea().value;
        srcArea().style.display = 'none';
        editor().style.display = 'block';
        editor().focus();
      }
    });

    const dynPopup = this.querySelector('#ip-dyn-popup');
    this.querySelector('#ip-dyn').addEventListener('mousedown', e => {
      e.preventDefault();
      dynPopup.style.display = dynPopup.style.display === 'none' ? 'block' : 'none';
    });
    dynPopup.querySelectorAll('button[data-dyn]').forEach(btn => {
      btn.addEventListener('mousedown', e => {
        e.preventDefault();
        document.execCommand('insertText', false, btn.dataset['dyn']);
        dynPopup.style.display = 'none';
        editor().focus();
      });
    });
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) dynPopup.style.display = 'none';
    });

    const updatePlaceholder = () => {
      const el = editor();
      el.classList.toggle('empty', !el.textContent?.trim());
    };
    editor().addEventListener('input', updatePlaceholder);
    updatePlaceholder();

    this.querySelector('#filter-land').addEventListener('change', (e) => {
      this.loadProducts(e.target.value);
    });

    this.namnLista = [];
    this.querySelector('#btn-add-namn').addEventListener('click', () => {
      const namn  = this.querySelector('#f-namn').value.trim();
      const sprak = this.querySelector('#f-sprak').value;
      if (!namn) return;
      this.namnLista.push({ namn, sprak });
      this.querySelector('#f-namn').value  = '';
      this.querySelector('#f-sprak').value = '';
      this.renderNamnLista();
    });

    this.querySelector('#btn-ny').addEventListener('click', () => this.resetForm());

    const dialog  = this.querySelector('#prod-dialog');
    this.querySelector('#btn-till-prod').addEventListener('click', () => {
      dialog.classList.remove('hidden');
    });
    this.querySelector('#prod-cancel').addEventListener('click', () => {
      dialog.classList.add('hidden');
    });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.classList.add('hidden');
    });
    this.querySelector('#prod-confirm').addEventListener('click', () => {
      dialog.classList.add('hidden');
      const msg = this.querySelector('#prod-msg');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 3000);
    });

    this.querySelector('#btn-spara').addEventListener('mousedown', e => e.preventDefault());
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
        docType:                 this.querySelector('#f-doctype').value.trim(),
        docSubtype:              this.querySelector('#f-docsubtype').value.trim(),
        visasIElektroniskaDok:   (this.querySelector('input[name="ip-visas-edok"]:checked') ?? {}).value ?? '',
        pdfFormat:               (this.querySelector('input[name="ip-pdf-format"]:checked') ?? {}).value ?? 'N',
        beskrivning:             this.querySelector('#f-beskrivning').value.trim(),
        defaultkanalPapper:      this.querySelector('#f-def-papper').checked,
        defaultkanalInternet:    this.querySelector('#f-def-internet').checked,
        tillatenKanalPapper:     this.querySelector('#f-till-papper').checked,
        tillatenKanalInternet:   this.querySelector('#f-till-internet').checked,
        obligKanalPapper:        this.querySelector('#f-oblig-papper').checked,
        obligKanalInternet:      this.querySelector('#f-oblig-internet').checked,
        kanalKrav:               (this.querySelector('input[name="ip-kanal-krav"]:checked') ?? {}).value ?? 'Ja',
        debiteraIckeInternet:    (this.querySelector('input[name="ip-debitera"]:checked') ?? {}).value ?? 'Nej',
        meddelande:              editor().innerHTML,
      };
      const editId = this.querySelector('#f-id').dataset.editId;
      if (editId) {
        mockUpdateInformationsprodukt(editId, body);
      } else {
        mockCreateInformationsprodukt(body);
      }
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
        <td><button class="link" data-id="${p.id}">${p.id}</button></td>
        <td>${p.namn}</td>
        <td>${p.land}</td>
        <td style="color:#15803d">${p.status}</td>
      `;
      tr.querySelector('button').addEventListener('click', () => this.fillForm(p.id));
      tbody.appendChild(tr);
    });
  }

  renderNamnLista() {
    const tbody = this.querySelector('#namn-tbody');
    const table = this.querySelector('#namn-table');
    tbody.innerHTML = '';
    this.namnLista.forEach((entry, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="py-0.5 text-gray-800" style="width:160px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${entry.namn}">${entry.namn.slice(0,20)}</td>
        <td class="py-0.5 px-3 text-gray-600" style="width:36px">${entry.sprak}</td>
        <td class="py-0.5" style="width:16px"><button type="button" class="text-gray-400 hover:text-red-500 text-xs leading-none" data-idx="${i}">✕</button></td>
      `;
      tr.querySelector('button').addEventListener('click', () => {
        this.namnLista.splice(i, 1);
        this.renderNamnLista();
      });
      tbody.appendChild(tr);
    });
    table.classList.toggle('hidden', this.namnLista.length === 0);
  }

  fillForm(id) {
    const p = mockGetInformationsprodukt(id);
    if (!p) return;

    const q  = sel => this.querySelector(sel);
    const setRadio = (name, val) => {
      const rb = this.querySelector(`input[name="${name}"][value="${val}"]`);
      if (rb) rb.checked = true;
    };

    q('#f-land').value        = p.land ?? '';
    q('#f-id').value          = p.id ?? '';
    q('#f-id').dataset.editId = p.id;
    q('#f-namn').value        = p.namn ?? '';
    q('#f-notifkat').value    = p.notifieringskategori ?? '';
    q('#f-sys').value         = p.systembeteckning ?? '';
    q('#f-avg-papper').value  = p.avgiftsidPapper ?? '';
    q('#f-avg-internet').value = p.avgiftsidInternet ?? '';
    q('#f-visning').value     = p.visningsstid ?? '';
    q('#f-lagring').value     = p.lagringstid ?? '';
    q('#f-doctype').value     = p.docType ?? '';
    q('#f-docsubtype').value  = p.docSubtype ?? '';
    setRadio('ip-visas-edok',  p.visasIElektroniskaDok ?? '');
    setRadio('ip-pdf-format',  p.pdfFormat ?? 'N');
    q('#f-beskrivning').value = p.beskrivning ?? '';

    setRadio('ip-status',     p.status ?? 'Aktiv');
    setRadio('ip-insyns',     p.insynsskyddat ?? 'Nej');
    setRadio('ip-kanal-krav', p.kanalKrav ?? 'Ja');
    setRadio('ip-debitera',   p.debiteraIckeInternet ?? 'Nej');

    q('#f-def-papper').checked   = !!p.defaultkanalPapper;
    q('#f-def-internet').checked = !!p.defaultkanalInternet;
    q('#f-till-papper').checked  = !!p.tillatenKanalPapper;
    q('#f-till-internet').checked = !!p.tillatenKanalInternet;
    q('#f-oblig-papper').checked  = !!p.obligKanalPapper;
    q('#f-oblig-internet').checked = !!p.obligKanalInternet;

    const editor = q('#ip-f-meddelande');
    editor.innerHTML = p.meddelande ?? '';
    editor.classList.toggle('empty', !editor.textContent?.trim());

    q('#form-title').textContent = `Informationsprodukt ${p.id} — ${p.namn}`;
    q('#btn-ny').classList.remove('hidden');
    q('#f-id').readOnly = true;

    q('#form-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  resetForm() {
    const q = sel => this.querySelector(sel);
    q('#f-land').value         = '';
    q('#f-id').value           = '';
    q('#f-id').dataset.editId  = '';
    q('#f-id').readOnly        = false;
    q('#f-namn').value         = '';
    q('#f-notifkat').value     = '';
    q('#f-sys').value          = '';
    q('#f-avg-papper').value   = '';
    q('#f-avg-internet').value = '';
    q('#f-visning').value      = '';
    q('#f-lagring').value      = '';
    q('#f-doctype').value      = '';
    q('#f-docsubtype').value   = '';
    this.querySelectorAll('input[name="ip-visas-edok"]').forEach(r => r.checked = false);
    q('#f-pdf-format-n').checked = true;
    q('#f-beskrivning').value  = '';

    this.querySelector('input[name="ip-status"][value="Aktiv"]').checked    = true;
    this.querySelector('input[name="ip-insyns"][value="Nej"]').checked      = true;
    this.querySelector('input[name="ip-kanal-krav"][value="Ja"]').checked   = true;
    this.querySelector('input[name="ip-debitera"][value="Nej"]').checked    = true;

    ['#f-def-papper','#f-def-internet','#f-till-papper','#f-till-internet',
     '#f-oblig-papper','#f-oblig-internet'].forEach(sel => { q(sel).checked = false; });

    const editor = q('#ip-f-meddelande');
    editor.innerHTML = '';
    editor.classList.add('empty');

    this.namnLista = [];
    this.renderNamnLista();

    q('#form-title').textContent = 'Lägg till informationsprodukt';
    q('#btn-ny').classList.add('hidden');
  }
}

customElements.define('page-infoprodukter', PageInfoprodukter);
