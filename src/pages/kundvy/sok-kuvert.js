import { mockGetKuvert } from '../../api.js';

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT = 'border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#1565c0]';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageSokKuvert extends HTMLElement {
  constructor() {
    super();
    this.currentKundnr = '';
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Sök med kuvertID</h1>
        <div class="space-y-4">
          <div class="${PANEL} p-4">
            <div class="flex items-end gap-4 flex-wrap">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Kuvert-ID</label>
                <input id="kuvert-id" class="${INPUT} w-64" placeholder="Ange kuvert-ID" />
              </div>
              <button id="btn-sok" class="${BTN}">Sök</button>
            </div>
          </div>

          <div id="result-card" class="${PANEL} hidden">
            <div class="px-4 pt-4 pb-1">
              <h2 class="text-[#1565c0] font-bold text-base">Kuvertinformation</h2>
              <div class="mt-3 border-t border-gray-100"></div>
            </div>
            <div class="px-4 pb-4 pt-3">
              <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-lg">
                <div class="text-gray-500">Kuvert-ID</div>
                <div id="res-kuvert-id" class="font-medium"></div>

                <div class="text-gray-500">Kundnamn</div>
                <div id="res-kundnamn"></div>

                <div class="text-gray-500">Kundnummer</div>
                <div>
                  <button id="res-kundnr" class="link font-medium"></button>
                  <span id="copied-msg" style="display:none" class="ml-2 text-green-600 text-xs">&#10003; Kopierat</span>
                </div>

                <div class="text-gray-500">Datum</div>
                <div id="res-datum"></div>

                <div class="text-gray-500">Mall</div>
                <div id="res-mall"></div>

                <div class="text-gray-500">Kanal</div>
                <div id="res-kanal"></div>

                <div class="text-gray-500">Status</div>
                <div id="res-status" class="font-medium text-green-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
  }

  init() {
    this.querySelector('#btn-sok').addEventListener('click', () => {
      const kuvertId = this.querySelector('#kuvert-id').value.trim();
      if (!kuvertId) return;
      const kuvert = mockGetKuvert(kuvertId);
      if (!kuvert) { alert('Kuvert saknas'); return; }
      this.currentKundnr = kuvert.kundnr;
      this.querySelector('#result-card').classList.remove('hidden');
      this.querySelector('#res-kuvert-id').textContent = kuvert.kuvertId;
      this.querySelector('#res-kundnamn').textContent  = kuvert.kundnamn;
      this.querySelector('#res-datum').textContent     = kuvert.datum;
      this.querySelector('#res-mall').textContent      = kuvert.mall;
      this.querySelector('#res-kanal').textContent     = kuvert.kanal;
      this.querySelector('#res-status').textContent    = kuvert.status;
      this.querySelector('#res-kundnr').textContent    = kuvert.kundnr;
    });

    this.querySelector('#kuvert-id').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.querySelector('#btn-sok').click();
    });

    this.querySelector('#res-kundnr').addEventListener('click', () => {
      if (navigator.clipboard) navigator.clipboard.writeText(this.currentKundnr);
      const msg = this.querySelector('#copied-msg');
      msg.style.display = 'inline';
      setTimeout(() => { msg.style.display = 'none'; }, 2000);
    });
  }
}

customElements.define('page-sok-kuvert', PageSokKuvert);
