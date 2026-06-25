import { mockGetInformationsprodukter, mockCreateInformationsprodukt } from '../../api.js';

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
