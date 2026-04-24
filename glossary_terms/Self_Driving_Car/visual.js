
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سيارة ذاتية القيادة"]
    A --- B0["سيارة قادرة على استشعار محيطها والتحرك بتحكم واكتفاء ذاتي"]
    A --- B1["ويُطلق عليها أيضًا "سيارة بدون سائق" أو "سيارة ذاتية التحكم"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
