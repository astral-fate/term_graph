
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات البيانات الضخمة"]
    A --- B0["عملية فحص كمية كبيرة من البيانات المتنوعة"]
    A --- B1["لاكتشاف الأنماط والارتباطات والاتجاهات التي تُقدِّم رؤى وتدعم اتخاذ القرار."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
