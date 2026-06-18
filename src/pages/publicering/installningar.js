import { mockGetInformationssamband, mockCreateInformationssamband, mockDeleteInformationssamband } from '../../api.js';

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageInstallningar extends HTMLElement {
  constructor() {
    super();
    this.samband = [];
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Publiceringsinställningar</h1>
        <div class="space-y-4">
          <!-- Existing settings table -->
          <div class="${PANEL}">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Informationssamband</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <table class="hb-table">
                <thead>
                  <tr>
                    <th class="w-10"></th>
                    <th>Systembeteckning</th>
                    <th>Informations-ID</th>
                    <th>Publicera automatiskt</th>
                  </tr>
                </thead>
                <tbody id="samband-tbody"></tbody>
              </table>
              <div class="flex gap-3 mt-4">
                <button id="btn-ta-bort" class="${BTN_SEC}">Ta bort markerade</button>
                <button id="btn-andra" class="${BTN_SEC}">Ändra</button>
              </div>
            </div>
          </div>

          <!-- Add new -->
          <div class="${PANEL}">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Lägg till informationssamband</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="flex items-end gap-4 flex-wrap mb-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Systembeteckning</label>
                  <input id="sys-bet" class="${INPUT} w-48" />
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Informations-ID</label>
                  <input id="sys-id" class="${INPUT} w-48" />
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-2">Publicera automatiskt</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="auto" value="Ja" /> Ja
                    </label>
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="auto" value="Nej" /> Nej
                    </label>
                  </div>
                </div>
              </div>
              <div id="save-msg" class="hidden mb-3 text-green-700 text-sm font-medium">&#10003; Sparad</div>
              <div class="flex gap-3">
                <button id="btn-spara-ny" class="${BTN}">Spara ny</button>
                <button id="btn-avbryt" class="${BTN_SEC}">Avbryt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadSamband();
  }

  init() {
    this.querySelector('#btn-spara-ny').addEventListener('click', () => {
      const sys  = this.querySelector('#sys-bet').value.trim();
      const id   = this.querySelector('#sys-id').value.trim();
      const auto = this.querySelector('input[name="auto"]:checked');
      if (!sys || !id || !auto) return;
      mockCreateInformationssamband({
        systembeteckning: sys,
        informationsId: id,
        publiceraAutomatiskt: auto.value === 'Ja',
      });
      this.loadSamband();
      const msg = this.querySelector('#save-msg');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 2500);
      this.querySelector('#sys-bet').value = '';
      this.querySelector('#sys-id').value  = '';
      this.querySelectorAll('input[name="auto"]').forEach(r => r.checked = false);
    });

    this.querySelector('#btn-andra').addEventListener('click', () => {
      const msg = this.querySelector('#save-msg');
      msg.textContent = '✓ Ändrad';
      msg.classList.remove('hidden');
      setTimeout(() => { msg.classList.add('hidden'); msg.textContent = '✓ Sparad'; }, 2500);
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.querySelector('#sys-bet').value = '';
      this.querySelector('#sys-id').value  = '';
      this.querySelectorAll('input[name="auto"]').forEach(r => r.checked = false);
    });

    this.querySelector('#btn-ta-bort').addEventListener('click', () => {
      const tbody = this.querySelector('#samband-tbody');
      const checkedIds = [];
      tbody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) checkedIds.push(cb.dataset['id'] ?? '');
      });
      for (const id of checkedIds) {
        mockDeleteInformationssamband(id);
      }
      this.loadSamband();
    });
  }

  loadSamband() {
    this.samband = mockGetInformationssamband();
    this.renderSamband();
  }

  renderSamband() {
    const tbody = this.querySelector('#samband-tbody');
    tbody.innerHTML = '';
    this.samband.forEach(s => {
      const tr = document.createElement('tr');
      tr.dataset['id'] = s.id;
      tr.innerHTML = `
        <td style="text-align:center"><input type="checkbox" data-id="${s.id}"></td>
        <td><button class="link">${s.systembeteckning}</button></td>
        <td>${s.informationsId}</td>
        <td>${s.publiceraAutomatiskt ? 'Ja' : 'Nej'}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-installningar', PageInstallningar);
