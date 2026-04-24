
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تعرُّف على الكلام"]
    A --- B0["عملية تحويل الكلام إلى نص باستخدام الخوارزميات"]
    A --- B1["ويُطلق عليها أيضًا "تعرُّف تلقائي على الكلام" أو "تحويل الكلام إلى نص"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
