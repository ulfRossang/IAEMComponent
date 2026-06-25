import { mockGetInformationsprodukter, mockCreateInformationsprodukt } from '../../api.js';

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
                  <div class="border border-gray-300 rounded-md overflow-hidden">
                    <!-- Toolbar -->
                    <div class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
                      <select id="ip-tb-font" class="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white focus:outline-none cursor-pointer">
                        <option value="inherit">Standard</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                      </select>
                      <select id="ip-tb-size" class="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white focus:outline-none cursor-pointer w-16">
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
                      <button type="button" data-ip-block="h1" class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">H1</button>
                      <button type="button" data-ip-block="h2" class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">H2</button>
                      <button type="button" data-ip-block="h3" class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">H3</button>
                      <button type="button" data-ip-block="p"  class="${BTN_SMALL} !rounded !px-2 !py-0.5">¶</button>
                      <span class="text-gray-300 mx-0.5">|</span>
                      <button type="button" data-ip-cmd="bold"      class="${BTN_SMALL} !rounded !px-2 !py-0.5 font-bold">B</button>
                      <button type="button" data-ip-cmd="italic"    class="${BTN_SMALL} !rounded !px-2 !py-0.5 italic">I</button>
                      <button type="button" data-ip-cmd="underline" class="${BTN_SMALL} !rounded !px-2 !py-0.5 underline">U</button>
                      <span class="text-gray-300 mx-0.5">|</span>
                      <button type="button" data-ip-cmd="justifyLeft"   class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Vänster">⬅</button>
                      <button type="button" data-ip-cmd="justifyCenter" class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Centrera">↔</button>
                      <button type="button" data-ip-cmd="justifyRight"  class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Höger">➡</button>
                      <span class="text-gray-300 mx-0.5">|</span>
                      <button type="button" data-ip-cmd="insertUnorderedList" class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Punktlista">≡</button>
                      <button type="button" data-ip-cmd="insertOrderedList"   class="${BTN_SMALL} !rounded !px-2 !py-0.5" title="Numrerad lista">1.</button>
                    </div>
                    <!-- Editable area -->
                    <div id="ip-f-meddelande"
                         contenteditable="true"
                         class="min-h-[120px] px-3 py-2 text-sm text-gray-700 focus:outline-none"
                         data-placeholder="Här lägger vi in text för inkorg"></div>
                  </div>
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
    const editor = () => this.querySelector('#ip-f-meddelande');

    this.querySelectorAll('button[data-ip-cmd]').forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.execCommand(btn.dataset['ipCmd'], false);
        editor().focus();
      });
    });

    this.querySelectorAll('button[data-ip-block]').forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.execCommand('formatBlock', false, btn.dataset['ipBlock']);
        editor().focus();
      });
    });

    this.querySelector('#ip-tb-font').addEventListener('change', (e) => {
      document.execCommand('fontName', false, e.target.value);
      editor().focus();
    });

    this.querySelector('#ip-tb-size').addEventListener('change', (e) => {
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

    const updatePlaceholder = () => {
      const el = editor();
      el.classList.toggle('empty', !el.textContent?.trim());
    };
    editor().addEventListener('input', updatePlaceholder);
    updatePlaceholder();

    this.querySelector('#filter-land').addEventListener('change', (e) => {
      this.loadProducts(e.target.value);
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
