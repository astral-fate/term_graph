
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نسيان كارثي"]
    A --- B0["ظاهرة يفقد فيها النموذج المعلومات التي تعلَّمها سابقًا"]
    A --- B1["وذلك عند تعلُّم مهام جديدة"]
    A --- B2["ويُطلق عليه أيضًا "تداخل كارثي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
