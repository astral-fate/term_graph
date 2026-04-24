
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["منصة تحليلات"]
    A --- B0["حل تقني موحد يتيح إجراء الدورة الكاملة لعمليات التحليلات"]
    A --- B1["ويشمل: إعداد البيانات ومعالجتها وتخزينها وإدارتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
