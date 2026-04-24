
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحسين"]
    A --- B0["عملية اختيار أفضل عنصر من جميع البدائل الممكنة"]
    A --- B1["ويُطلق عليها أيضًا "تحسين رياضي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
