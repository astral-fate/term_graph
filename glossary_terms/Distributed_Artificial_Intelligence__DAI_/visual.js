
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي موزَّع"]
    A --- B0["مجال فرعي من الذكاء الاصطناعي يركز على حل المشكلات باستخدام عمليات منسقة ومتزامنة"]
    A --- B1["ويُطلق عليه أيضًا "ذكاء اصطناعي لا مركزي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
