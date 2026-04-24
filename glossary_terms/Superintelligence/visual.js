
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء خارق"]
    A --- B0["ذكاء اصطناعي افتراضي يمكنه تجاوز القدرات البشرية"]
    A --- B1["ويُطلق عليه أيضًا "ذكاء اصطناعي خارق"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
