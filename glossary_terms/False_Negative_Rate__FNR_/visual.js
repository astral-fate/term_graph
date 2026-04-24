
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["معدل سلبي خاطئ"]
    A --- B0["نسبة الأمثلة الإيجابية الفعلية التي يُتنبأ بأنها سلبية"]
    A --- B1["ويُطلق عليها أيضًا "معدل الخطأ"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
