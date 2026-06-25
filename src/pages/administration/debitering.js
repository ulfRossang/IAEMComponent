import { mockGetDebiteringsuppgifter, mockCreateDebiteringsuppgift, mockUpdateDebiteringsuppgift, mockDeleteDebiteringsuppgift } from '../../api.js';

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
