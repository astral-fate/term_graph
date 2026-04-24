
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تَعرُّف على الصور"]
    A --- B0["عملية تحديد الأشياء أو الأنماط أو المفاهيم الموجودة في الصورة"]
    A --- B1["ويُطلق عليها أيضًا "تصنيف الصور" أو "تعرُّف مرئي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
