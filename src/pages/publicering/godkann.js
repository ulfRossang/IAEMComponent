import { fmtDatum, mockGetPubliceringJobb, mockGodkannJobb } from '../../api.js';

const BTN = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0 disabled:opacity-50';
const BTN_SEC = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const PANEL = 'bg-white border border-gray-200 rounded shadow-sm';

class PageGodkann extends HTMLElement {
  constructor() {
    super();
    this.remaining = [];
    this.selectedJob = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Godkänna för publicering</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">
            <!-- Jobs table -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Väntande publiceringsjobb</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div id="no-jobs" class="hidden text-gray-400 text-sm py-4 text-center">Inga väntande jobb</div>
                <table id="jobs-table" class="hb-table hidden">
                  <thead>
                    <tr>
                      <th>Systembeteckning</th>
                      <th>Informations-ID</th>
                      <th>Leveranstidpunkt</th>
                      <th>Jobb-ID</th>
                    </tr>
                  </thead>
                  <tbody id="jobs-tbody"></tbody>
                </table>
              </div>
            </div>

            <!-- Properties -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Jobbegenskaper</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-md mb-4">
                  <div class="text-gray-500">Systembeteckning</div><div id="prop-sys">–</div>
                  <div class="text-gray-500">Informations-ID</div><div id="prop-id">–</div>
                  <div class="text-gray-500">Leveranstidpunkt</div><div id="prop-lev">–</div>
                  <div class="text-gray-500">Jobb-ID</div><div id="prop-jobb">–</div>
                </div>

                <div class="mb-4">
                  <p class="text-sm text-gray-700 mb-2 font-medium">Godkänn för publicering</p>
                  <div class="flex gap-6">
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="gk" value="Ja" /> Ja, publicera
                    </label>
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="gk" value="Nej" /> Nej, ta bort
                    </label>
                  </div>
                </div>

                <div id="utfor-msg" class="hidden mb-3 text-green-700 text-sm font-medium"></div>
                <div class="flex gap-3">
                  <button id="btn-utfor" class="${BTN}" disabled>Utför</button>
                  <button id="btn-avbryt" class="${BTN_SEC}">Avbryt</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadJobs();
  }

  updateUtforBtn() {
    const gk = this.querySelector('input[name="gk"]:checked');
    this.querySelector('#btn-utfor').disabled = !(this.selectedJob && gk);
  }

  init() {
    this.querySelectorAll('input[name="gk"]').forEach(r => {
      r.addEventListener('change', () => this.updateUtforBtn());
    });

    this.querySelector('#btn-utfor').addEventListener('click', () => {
      if (!this.selectedJob) return;
      const gk = this.querySelector('input[name="gk"]:checked');
      if (!gk) return;
      const action = gk.value === 'Ja' ? 'publicerat' : 'borttaget';
      mockGodkannJobb(this.selectedJob.jobbId, gk.value === 'Ja');
      this.loadJobs();

      const msg = this.querySelector('#utfor-msg');
      msg.textContent = `✓ Jobb ${this.selectedJob.jobbId} ${action}`;
      msg.classList.remove('hidden');

      this.selectedJob = null;
      ['prop-sys', 'prop-id', 'prop-lev', 'prop-jobb'].forEach(id => {
        this.querySelector(`#${id}`).textContent = '–';
      });
      this.querySelectorAll('input[name="gk"]').forEach(r => r.checked = false);
      this.querySelector('#btn-utfor').disabled = true;

      setTimeout(() => msg.classList.add('hidden'), 3000);
    });

    this.querySelector('#btn-avbryt').addEventListener('click', () => {
      this.selectedJob = null;
      ['prop-sys', 'prop-id', 'prop-lev', 'prop-jobb'].forEach(id => {
        this.querySelector(`#${id}`).textContent = '–';
      });
      this.querySelectorAll('input[name="gk"]').forEach(r => r.checked = false);
      this.querySelectorAll('#jobs-tbody tr').forEach(r => r.classList.remove('selected'));
      this.querySelector('#btn-utfor').disabled = true;
    });
  }

  loadJobs() {
    const jobs = mockGetPubliceringJobb();
    this.remaining = jobs.filter(j => j.status === 'Väntar');
    this.renderJobs();
  }

  renderJobs() {
    const tbody  = this.querySelector('#jobs-tbody');
    const noJobs = this.querySelector('#no-jobs');
    const table  = this.querySelector('#jobs-table');
    tbody.innerHTML = '';

    if (this.remaining.length === 0) {
      noJobs.classList.remove('hidden');
      table.classList.add('hidden');
      return;
    }
    noJobs.classList.add('hidden');
    table.classList.remove('hidden');

    this.remaining.forEach(j => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.dataset['id'] = j.jobbId;
      tr.innerHTML = `
        <td><button class="link">${j.systembeteckning}</button></td>
        <td>${j.informationsId}</td>
        <td>${fmtDatum(j.leveranstidpunkt)}</td>
        <td>${j.jobbId}</td>
      `;
      tr.addEventListener('click', () => {
        this.querySelectorAll('#jobs-tbody tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        this.selectedJob = j;
        this.querySelector('#prop-sys').textContent  = j.systembeteckning;
        this.querySelector('#prop-id').textContent   = j.informationsId;
        this.querySelector('#prop-lev').textContent  = fmtDatum(j.leveranstidpunkt);
        this.querySelector('#prop-jobb').textContent = j.jobbId;
        this.updateUtforBtn();
      });
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-godkann', PageGodkann);
