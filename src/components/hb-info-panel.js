class HbInfoPanel extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') ?? '';
    const inner = this.innerHTML;
    this.innerHTML = `
      <div class="bg-white border border-gray-200 rounded shadow-sm w-48 shrink-0">
        <div class="px-4 pt-4 pb-1">
          <h2 class="text-[#1565c0] font-bold text-base">${title}</h2>
          <div class="mt-3 border-t border-gray-100"></div>
        </div>
        <div class="px-4 pb-4 pt-3 text-xs text-gray-700 space-y-3">${inner}</div>
      </div>`;
  }
}
customElements.define('hb-info-panel', HbInfoPanel);
