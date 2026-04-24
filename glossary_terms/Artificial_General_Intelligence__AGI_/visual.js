
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء عام اصطناعي"]
    A --- B0["نظام حوسبي يمكنه أداء أي مهمة فكرية يمكن للإنسان أداؤها"]
    A --- B1["مثل: حل المشكلات والإبداع والقدرة على التَّكَيُّف"]
    A --- B2["ويُطلق عليه أيضًا "ذكاء اصطناعي عام""]
    A --- B3["أو "ذكاء اصطناعي قوي""]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
