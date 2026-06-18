import { boolJa, mockGetKund, mockGetDokument } from '../../api.js';

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
