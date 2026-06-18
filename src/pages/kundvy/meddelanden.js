import { boolJa, fmtDatum, mockGetMeddelanden } from '../../api.js';

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
