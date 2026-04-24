
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استنتاج غير مباشر"]
    A --- B0["عملية توليد التنبؤات على حُزمة من المشاهدات"]
    A --- B1["ويُطلق عليها أيضًا "استنتاج حُزَمي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
