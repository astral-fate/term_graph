
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات مُعَزَّزة"]
    A --- B0["استخدام تقنيات الذكاء الاصطناعي لأتمتة عمليات تحليلات البيانات"]
    A --- B1["مثل: إعداد البيانات واكتشاف الرؤى."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
