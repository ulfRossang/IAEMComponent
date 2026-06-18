import { mockGetInformationsprodukter, mockCreateInformationsprodukt } from '../../api.js';

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const SELECT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0] appearance-none bg-white';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageInfoprodukter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Administrera informationsprodukter</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- List -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-[#1565c0] font-bold text-base">Informationsprodukter</h2>
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Filtrera land:</label>
                    <select id="filter-land" class="${SELECT} w-36">
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

            <!-- Add new -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Lägg till informationsprodukt</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div class="flex items-end gap-4 flex-wrap mb-4">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Land</label>
                    <select id="f-land" class="${SELECT} w-32">
                      <option value="">Välj land</option>
                      <option>SE</option>
                      <option>NO</option>
                      <option>DK</option>
                      <option>FI</option>
                      <option>GB</option>
                      <option>NL</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Namn</label>
                    <input id="f-namn" class="${INPUT} w-64" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-700 mb-2">Status</label>
                    <div class="flex gap-4">
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="Aktiv" checked /> Aktiv
                      </label>
                      <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="Inaktiv" /> Inaktiv
                      </label>
                    </div>
                  </div>
                </div>
                <div id="save-msg" class="hidden mb-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
                <button id="btn-spara" class="${BTN}">Spara</button>
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
      const land   = this.querySelector('#f-land').value;
      const namn   = this.querySelector('#f-namn').value.trim();
      const status = this.querySelector('input[name="status"]:checked');
      const body = {
        land,
        namn,
        status: status ? status.value : 'Aktiv',
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
