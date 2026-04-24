
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات تنبؤية"]
    A --- B0["نوع من تحليلات البيانات"]
    A --- B1["يستخدم البيانات التاريخية والحالية لتقديم تنبؤات مستنيرة حول الأحداث المستقبلية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
