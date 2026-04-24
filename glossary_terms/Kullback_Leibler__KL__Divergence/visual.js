
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تباعد كولباك-ليبلر"]
    A --- B0["مقياس يحدد الفرق بين توزيعين احتماليين"]
    A --- B1["يُطلق عليه أيضًا "انتروبيا نسبية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
