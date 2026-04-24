
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوسبة عاطفية"]
    A --- B0["مجال فرعي من الذكاء الاصطناعي يهتم بتطوير أنظمة قادرة على التعرُّف على المشاعر البشرية ومعالجتها"]
    A --- B1["ويُطلق عليه أيضًا "ذكاء اصطناعي عاطفي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
