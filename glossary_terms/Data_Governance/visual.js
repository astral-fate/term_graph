
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوكمة البيانات"]
    A --- B0["السياسات والعمليات والهياكل التنظيمية التي تحدد حقوق اتخاذ القرار ومسؤوليات دعم إدارة البيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
