import { boolJa, mockGetKund, mockGetDokument } from '../../api.js';

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
