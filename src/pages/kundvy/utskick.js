import { boolJa, fmtDatum, mockGetUtskick, mockGetUtskickById } from '../../api.js';

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
