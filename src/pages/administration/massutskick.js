import { fmtDatum, mockGetMassutskick, mockCreateMassutskick, mockUpdateMassutskick, mockDeleteMassutskick, mockKlarmarkeraMassutskick } from '../../api.js';

const BTN       = 'bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0';
const BTN_SEC   = 'bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50';
const BTN_SMALL = 'bg-[#1565c0] text-white rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-[#0d52a8] border-0';
const INPUT     = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white';
const SELECT    = 'border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1565c0] w-full bg-white appearance-none';
const PANEL     = 'bg-white border border-gray-200 rounded shadow-sm';
const LABEL     = 'block text-sm text-gray-700 mb-1';
const REQ       = '<span class="text-red-600">*</span>';

const LANDS = ['Sverige', 'Norge', 'Danmark', 'Finland', 'Storbritannien', 'Nederländerna'];
const ARENDEN = ['Kontoutdrag', 'Avräkningsnota', 'Bokföringsavi', 'Avtal', 'Räntebesked', 'Kortbekräftelse', 'Fondbesked'];
const NOTIF_KATEGORIER = [
  '-- Välj notifieringskategori --',
  'NOT-01 Räntebesked',
  'NOT-02 Kortbekräftelse',
  'NOT-03 Kontoutdrag',
  'NOT-04 Fondbesked',
  'NOT-05 Avtal',
];

class PageMassutskick extends HTMLElement {
  constructor() {
    super();
    this.utskick = [];
    this.selected = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>Administrera massutskick</h1>
        <div class="flex gap-4 items-start">
          <div class="flex-1 space-y-4">

            <!-- Meddelandeinnehåll panel -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <h2 class="text-[#1565c0] font-bold text-base">Meddelandeinnehåll</h2>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3 space-y-3">

                <!-- Row 1: Land + MeddelandeId -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Land ${REQ}</label>
                    <select id="f-land" class="${SELECT}">
                      <option value="">Välj land</option>
                      ${LANDS.map(l => `<option>${l}</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL}">MeddelandeId ${REQ}</label>
                    <input id="f-meddid" class="${INPUT}" placeholder="" />
                  </div>
                </div>

                <!-- Row 2: Ärende + Avsändare -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Ärende ${REQ}</label>
                    <select id="f-arende" class="${SELECT}">
                      <option value=""></option>
                      ${ARENDEN.map(a => `<option>${a}</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label class="${LABEL}">Avsändare ${REQ}</label>
                    <input id="f-avsandare" class="${INPUT}" value="Handelsbanken" />
                  </div>
                </div>

                <!-- Row 3: Ämne -->
                <div>
                  <label class="${LABEL}">Ämne ${REQ}</label>
                  <input id="f-amne" class="${INPUT}" />
                </div>

                <!-- Row 4: Utskicksdatum -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Utskicksdatum ${REQ}</label>
                    <input id="f-datum" type="date" class="${INPUT}" />
                  </div>
                </div>

                <!-- Row 5: Notifieringskategori -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="${LABEL}">Notifieringskategori ${REQ}</label>
                    <select id="f-notif" class="${SELECT}">
                      ${NOTIF_KATEGORIER.map((k, i) => `<option value="${i === 0 ? '' : k}">${k}</option>`).join('')}
                    </select>
                  </div>
                </div>

                <!-- Row 6: Meddelande -->
                <div>
                  <label class="${LABEL}">Meddelande ${REQ}</label>
                  <div style="border:1px solid #1565c0;position:relative">
                    <div style="display:flex;align-items:center;gap:0;padding:3px 8px;border-bottom:1px solid #1565c0;background:#fff;user-select:none">
                      <button type="button" id="mas-r"   title="Rensa formatering"       style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 14px serif">R</button>
                      <button type="button" id="mas-ul"  title="Punktlista"               style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:13px sans-serif">&#x2A76;&#x2261;</button>
                      <button type="button" id="mas-ol"  title="Numrerad lista"           style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:13px sans-serif">&#x2261;</button>
                      <button type="button" id="mas-f"   title="Teckensnitt"              style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 14px sans-serif">F</button>
                      <button type="button" id="mas-src" title="Visa/redigera HTML"       style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:bold 12px monospace">&lt;/&gt;</button>
                      <button type="button" id="mas-dyn" title="Infoga dynamisk variabel" style="background:none;border:none;cursor:pointer;padding:2px 6px;color:#1a3a6b;font:14px sans-serif">&#x2299;</button>
                      <select id="mas-font-sel" style="display:none;margin-left:6px;font-size:12px;border:1px solid #aaa;padding:1px 3px">
                        <option value="">Standard</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                      </select>
                      <div id="mas-dyn-popup" style="display:none;position:absolute;top:28px;left:0;background:#fff;border:1px solid #1565c0;z-index:10;padding:4px 0;box-shadow:0 2px 6px rgba(0,0,0,.15)">
                        ${['DYN1','DYN2','DYN3','DYN4','DYN5'].map(d =>
                          `<button type="button" data-dyn="${d}" style="display:block;width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:4px 14px;color:#1a3a6b;font-size:12px;white-space:nowrap">${d}</button>`
                        ).join('')}
                      </div>
                    </div>
                    <div id="f-meddelande"
                         contenteditable="true"
                         style="min-height:120px;padding:6px 8px;font-size:13px;font-family:inherit;outline:none;overflow:auto"
                         data-placeholder="Meddelandetext... Använd DYN1–DYN5 för dynamiska variabler."></div>
                    <textarea id="f-meddelande-src"
                              style="display:none;width:100%;min-height:120px;padding:6px 8px;font-size:12px;font-family:monospace;border:none;outline:none;resize:none;box-sizing:border-box"></textarea>
                  </div>
                </div>

                <!-- Bilagor list (visas under Meddelande) -->
                <div id="bilagor-list" class="space-y-1"></div>

                <!-- Hidden file input -->
                <input type="file" id="f-bilaga-input" class="hidden" multiple />

                <!-- Status message -->
                <div id="save-msg" class="hidden text-green-700 text-sm font-medium"></div>

                <!-- Actions row -->
                <div class="flex items-center justify-between pt-1">
                  <button id="btn-bilagor" class="${BTN_SEC}">Bilagelänkar</button>
                  <div class="flex gap-3">
                    <button id="btn-ny"          class="${BTN}">Ny</button>
                    <button id="btn-spara"        class="${BTN_SEC}">Spara</button>
                    <button id="btn-ta-bort"      class="${BTN}">Ta bort</button>
                    <button id="btn-klarmarkera"  class="${BTN}">Klarmarkera</button>
                  </div>
                </div>

              </div>
            </div>

            <!-- List panel -->
            <div class="${PANEL}">
              <div class="px-4 pt-4 pb-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-[#1565c0] font-bold text-base">Massutskick</h2>
                </div>
                <div class="mt-3 border-t border-gray-100"></div>
              </div>
              <div class="px-4 pb-4 pt-3">
                <table class="hb-table">
                  <thead>
                    <tr>
                      <th>Utskicksdatum</th>
                      <th>Avsändare</th>
                      <th>Medd-ID</th>
                      <th>Land</th>
                      <th>Ämne</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="utskick-tbody"></tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
    this.init();
    this.loadUtskick();
  }

  init() {
    const editor  = () => this.querySelector('#f-meddelande');
    const srcArea = () => this.querySelector('#f-meddelande-src');
    let srcMode = false;

    const rteCmd = (cmd) => { document.execCommand(cmd, false); editor().focus(); };

    this.querySelector('#mas-r').addEventListener('mousedown',  e => { e.preventDefault(); rteCmd('removeFormat'); });
    this.querySelector('#mas-ul').addEventListener('mousedown', e => { e.preventDefault(); rteCmd('insertUnorderedList'); });
    this.querySelector('#mas-ol').addEventListener('mousedown', e => { e.preventDefault(); rteCmd('insertOrderedList'); });

    const fontSel = this.querySelector('#mas-font-sel');
    this.querySelector('#mas-f').addEventListener('mousedown', e => {
      e.preventDefault();
      fontSel.style.display = fontSel.style.display === 'none' ? 'inline-block' : 'none';
      if (fontSel.style.display !== 'none') fontSel.focus();
    });
    fontSel.addEventListener('change', (e) => {
      if (e.target.value) document.execCommand('fontName', false, e.target.value);
      fontSel.style.display = 'none';
      editor().focus();
    });

    this.querySelector('#mas-src').addEventListener('mousedown', e => {
      e.preventDefault();
      srcMode = !srcMode;
      if (srcMode) {
        srcArea().value = editor().innerHTML;
        editor().style.display = 'none';
        srcArea().style.display = 'block';
        srcArea().focus();
      } else {
        editor().innerHTML = srcArea().value;
        srcArea().style.display = 'none';
        editor().style.display = 'block';
        editor().focus();
      }
    });

    const dynPopup = this.querySelector('#mas-dyn-popup');
    this.querySelector('#mas-dyn').addEventListener('mousedown', e => {
      e.preventDefault();
      dynPopup.style.display = dynPopup.style.display === 'none' ? 'block' : 'none';
    });
    dynPopup.querySelectorAll('button[data-dyn]').forEach(btn => {
      btn.addEventListener('mousedown', e => {
        e.preventDefault();
        document.execCommand('insertText', false, btn.dataset['dyn']);
        dynPopup.style.display = 'none';
        editor().focus();
      });
    });
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) dynPopup.style.display = 'none';
    });

    const updatePlaceholder = () => {
      const el = editor();
      el.classList.toggle('empty', !el.textContent?.trim());
    };
    editor().addEventListener('input', updatePlaceholder);
    updatePlaceholder();

    // Ny
    this.querySelector('#btn-ny').addEventListener('click', () => {
      this.selected = null;
      this.clearForm();
      this.querySelectorAll('#utskick-tbody tr').forEach(r => r.classList.remove('selected'));
    });

    // Prevent contenteditable blur-normalization when clicking action buttons
    ['#btn-spara', '#btn-ta-bort', '#btn-klarmarkera'].forEach(id => {
      this.querySelector(id).addEventListener('mousedown', e => e.preventDefault());
    });

    // Spara
    this.querySelector('#btn-spara').addEventListener('click', () => {
      const body = this.getFormBody();
      if (this.selected) {
        mockUpdateMassutskick(this.selected.meddId, body);
        this.showMsg('✓ Sparad');
      } else {
        mockCreateMassutskick(body);
        this.showMsg('✓ Skapad');
      }
      this.loadUtskick();
    });

    // Ta bort
    this.querySelector('#btn-ta-bort').addEventListener('click', () => {
      if (!this.selected) return;
      mockDeleteMassutskick(this.selected.meddId);
      this.loadUtskick();
      this.clearForm();
      this.selected = null;
      this.showMsg('✓ Borttagen');
    });

    // Klarmarkera
    this.querySelector('#btn-klarmarkera').addEventListener('click', () => {
      if (!this.selected) return;
      const result = mockKlarmarkeraMassutskick(this.selected.meddId);
      if (result === 'CONFLICT') {
        alert('Redan klarmarkerad eller skickad.');
        return;
      }
      if (result === 'NOT_FOUND') {
        alert('Hittades inte.');
        return;
      }
      this.loadUtskick();
      this.showMsg('✓ Klarmarkerad');
    });

    // Bilagelänkar — öppnar filväljare
    this.querySelector('#btn-bilagor').addEventListener('click', () => {
      this.querySelector('#f-bilaga-input').click();
    });

    this.querySelector('#f-bilaga-input').addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files) return;
      Array.from(files).forEach(file => this.addBilaga(file));
      e.target.value = '';
    });
  }

  getFormBody() {
    const editor = this.querySelector('#f-meddelande');
    return {
      land:                  this.querySelector('#f-land').value,
      avsandare:             this.querySelector('#f-avsandare').value.trim(),
      amne:                  this.querySelector('#f-amne').value.trim(),
      utskicksdatum:         this.querySelector('#f-datum').value,
      notifieringskategori:  this.querySelector('#f-notif').value,
      meddelande:            editor.innerHTML,
    };
  }

  addBilaga(file) {
    const url = URL.createObjectURL(file);
    const list = this.querySelector('#bilagor-list');
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700';
    row.innerHTML = `
      <span class="text-gray-400">📎</span>
      <a href="${url}" target="_blank" class="flex-1 text-[#0066b3] hover:underline cursor-pointer">${file.name}</a>
      <button type="button" class="text-gray-400 hover:text-red-500 text-xs leading-none" title="Ta bort">✕</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      URL.revokeObjectURL(url);
      row.remove();
    });
    list.appendChild(row);
  }

  clearForm() {
    this.querySelector('#f-land').value      = '';
    this.querySelector('#f-meddid').value    = '';
    this.querySelector('#f-arende').value    = '';
    this.querySelector('#f-avsandare').value = 'Handelsbanken';
    this.querySelector('#f-amne').value      = '';
    this.querySelector('#f-datum').value     = '';
    this.querySelector('#f-notif').value     = '';
    const editor = this.querySelector('#f-meddelande');
    editor.innerHTML = '';
    editor.classList.add('empty');
    this.querySelector('#bilagor-list').innerHTML = '';
  }

  fillForm(u) {
    this.querySelector('#f-land').value      = u.land || '';
    this.querySelector('#f-meddid').value    = u.meddId;
    this.querySelector('#f-avsandare').value = u.avsandare;
    this.querySelector('#f-amne').value      = u.amne;
    this.querySelector('#f-datum').value     = u.utskicksdatum || '';
    this.querySelector('#f-notif').value     = u.notifieringskategori || '';
    const editor = this.querySelector('#f-meddelande');
    editor.innerHTML = u.meddelande || '';
    if (editor.textContent?.trim()) editor.classList.remove('empty');
    else editor.classList.add('empty');
  }

  showMsg(text) {
    const msg = this.querySelector('#save-msg');
    msg.textContent = text;
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
  }

  loadUtskick() {
    this.utskick = mockGetMassutskick();
    this.renderUtskick();
  }

  renderUtskick() {
    const tbody = this.querySelector('#utskick-tbody');
    tbody.innerHTML = '';
    this.utskick.forEach(u => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      const statusColor = u.status === 'Under upplägg' ? '#d97706' : '#15803d';
      tr.innerHTML = `
        <td style="white-space:nowrap">${u.utskicksdatum || ''}</td>
        <td>${u.avsandare}</td>
        <td>${u.meddId}</td>
        <td>${u.land || ''}</td>
        <td><button class="link">${u.amne}</button></td>
        <td><span style="color:${statusColor}">${u.status}</span></td>
      `;
      tr.addEventListener('click', () => {
        this.querySelectorAll('#utskick-tbody tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        this.selected = u;
        this.fillForm(u);
      });
      tbody.appendChild(tr);
    });
  }
}

customElements.define('page-massutskick', PageMassutskick);
