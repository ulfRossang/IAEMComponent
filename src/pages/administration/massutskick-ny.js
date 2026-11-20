import { PageMassutskick } from './massutskick.js';
import { mockUploadExcelFil, mockGetUppladdadeExcelfiler } from '../../api.js';

// Kopia av "Administrera massutskick" — egen rubrik, route och extra
// dokumenthantering: ladda upp ett Excel-ark (med refnummer) från filsystemet
// och spara det i applikationens backend (här simulerad via mock-api).
class PageMassutskickNy extends PageMassutskick {
  connectedCallback() {
    super.connectedCallback();
    const h1 = this.querySelector('h1');
    if (h1) h1.textContent = 'Administrera massutskick ny';
    this.addDokumentSektion();
    this.buildExcelDialog();
  }

  addDokumentSektion() {
    const anchor = this.querySelector('#bilagor-list');
    if (!anchor) return;
    const box = document.createElement('div');
    box.className = 'border border-gray-200 rounded-lg bg-[#f7f9fc] p-4 space-y-3';
    box.innerHTML = `
      <div class="flex items-center justify-between">
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dokument</p>
        <button type="button" id="btn-ladda-upp-excel" class="bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0">Ladda in REF-nummer</button>
      </div>
      <p class="text-xs text-gray-500">Ladda upp ett Excel-ark med refnummer.</p>
      <div id="excel-filer" class="space-y-1"></div>
    `;
    anchor.insertAdjacentElement('afterend', box);
    box.querySelector('#btn-ladda-upp-excel').addEventListener('click', () => this.openExcelDialog());
    this.renderExcelFiler();
  }

  buildExcelDialog() {
    const dlg = document.createElement('div');
    dlg.id = 'excel-dialog';
    dlg.className = 'hidden fixed inset-0 z-50 flex items-center justify-center bg-black/30';
    dlg.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-[460px] space-y-4">
        <h3 class="text-[#1565c0] font-bold text-base">Ladda upp Excel-ark</h3>
        <p class="text-sm text-gray-700">Välj ett Excel-ark (.xlsx, .xls eller .csv) från din dator.</p>
        <input id="excel-input" type="file" accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
               class="block w-full text-sm text-gray-700 file:mr-3 file:rounded-full file:border-0 file:bg-[#eef2f7] file:px-4 file:py-1.5 file:text-sm file:text-[#1565c0] file:cursor-pointer hover:file:bg-[#e2eafc]" />
        <div id="excel-vald" class="hidden text-sm text-gray-600"></div>
        <div class="flex gap-3 justify-end pt-2">
          <button type="button" id="excel-cancel" class="bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50">Avbryt</button>
          <button type="button" id="excel-save" class="bg-[#1565c0] text-white rounded-full px-4 py-1.5 text-sm cursor-pointer hover:bg-[#0d52a8] border-0 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Spara</button>
        </div>
      </div>
    `;
    this.appendChild(dlg);
    const input = dlg.querySelector('#excel-input');
    const vald = dlg.querySelector('#excel-vald');
    const saveBtn = dlg.querySelector('#excel-save');
    input.addEventListener('change', () => {
      const f = input.files?.[0];
      if (f) {
        vald.textContent = `Vald fil: ${f.name} (${Math.max(1, Math.round(f.size / 1024))} kB)`;
        vald.classList.remove('hidden');
        saveBtn.disabled = false;
      } else {
        vald.classList.add('hidden');
        saveBtn.disabled = true;
      }
    });
    dlg.querySelector('#excel-cancel').addEventListener('click', () => this.closeExcelDialog());
    saveBtn.addEventListener('click', () => this.sparaExcel());
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) this.closeExcelDialog();
    });
  }

  openExcelDialog() {
    const dlg = this.querySelector('#excel-dialog');
    if (!dlg) return;
    dlg.querySelector('#excel-input').value = '';
    dlg.querySelector('#excel-vald').classList.add('hidden');
    dlg.querySelector('#excel-save').disabled = true;
    dlg.classList.remove('hidden');
  }

  closeExcelDialog() {
    this.querySelector('#excel-dialog')?.classList.add('hidden');
  }

  sparaExcel() {
    const input = this.querySelector('#excel-input');
    const f = input?.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      mockUploadExcelFil({ filnamn: f.name, storlek: f.size, typ: f.type, dataUrl: reader.result });
      this.closeExcelDialog();
      this.renderExcelFiler();
    };
    reader.readAsDataURL(f);
  }

  renderExcelFiler() {
    const wrap = this.querySelector('#excel-filer');
    if (!wrap) return;
    const filer = mockGetUppladdadeExcelfiler();
    if (filer.length === 0) {
      wrap.innerHTML = `<p class="text-xs text-gray-400">Inga uppladdade filer än.</p>`;
      return;
    }
    wrap.innerHTML = filer.map((f) => `
      <div class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700">
        <span>📊</span>
        <a href="${f.dataUrl}" download="${f.filnamn}" class="text-[#0066b3] hover:underline">${f.filnamn}</a>
        <span class="text-xs text-gray-400">${Math.max(1, Math.round(f.storlek / 1024))} kB</span>
      </div>
    `).join('');
  }
}

customElements.define('page-massutskick-ny', PageMassutskickNy);
