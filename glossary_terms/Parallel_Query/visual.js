
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استعلام متواز"]
    A --- B0["طريقة لتقسيم جملة الاستعلام إلى عمليات متعددة تُنفَّذ بطريقة متوازية لزيادة سرعة الاستعلام."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
