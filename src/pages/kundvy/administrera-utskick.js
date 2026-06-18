import { mockGetUtskickInstallningar } from '../../api.js';

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageAdminUtskick extends HTMLElement {
  constructor() {
    super();
    this.rows = [];
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Administrera utskick</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kundnummer</label>
                <input id="kundnr" class="${INPUT} w-52" placeholder="KD-XXXXX" />
              </div>
              <button id="btn-hamta" class="${BTN}">Hämta</button>
            </div>
          </div>

          <div id="settings-panel" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 id="settings-title" class="text-[#1565c0] font-bold text-base">Utskicksinställningar</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>Avser</th>
                    <th>Förbindelse</th>
                    <th class="text-center">Papper</th>
                    <th class="text-center">Internet</th>
                  </tr>
                </thead>
                <tbody id="settings-tbody"></tbody>
              </table>
              <div id="save-msg" class="hidden mt-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
              <div class="flex gap-3 mt-4">
                <button id="btn-spara" class="${BTN}">Spara</button>
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
    this.querySelector('#btn-hamta').addEventListener('click', () => {
      const kundnr = this.querySelector('#kundnr').value.trim();
      if (!kundnr) return;
      this.currentKundnr = kundnr;
      this.rows = mockGetUtskickInstallningar(kundnr);
      this.querySelector('#settings-panel').classList.remove('hidden');
      this.querySelector('#settings-title').textContent = `Utskicksinställningar – ${kundnr}`;
      this.renderSettings();
    });

    this.querySelector('#kundnr').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-hamta').click();
    });

    this.querySelector('#btn-spara').addEventListener('click', () => {
      // Mock save — just show success message
      const msg = this.querySelector('#save-msg');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 2500);
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.querySelector('#settings-panel').classList.add('hidden');
      this.querySelector('#kundnr').value = '';
    });
  }

  renderSettings() {
    const tbody = this.querySelector('#settings-tbody');
    tbody.innerHTML = '';
    this.rows.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.kategori}</td>
        <td style="color:#0066b3">${r.avser}</td>
        <td style="font-size:12px;color:#6b7280">${r.forbindelse}</td>
        <td style="text-align:center"><input type="checkbox" ${r.papper ? 'checked' : ''} data-idx="${i}" data-field="papper"></td>
        <td style="text-align:center"><input type="checkbox" ${r.internet ? 'checked' : ''} data-idx="${i}" data-field="internet"></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const idx   = parseInt(cb.dataset['idx'] ?? '0');
        const field = cb.dataset['field'];
        if (field === 'papper' || field === 'internet') {
          this.rows[idx][field] = cb.checked;
        }
      });
    });
  }
}

customElements.define('page-administrera-utskick', PageAdminUtskick);
