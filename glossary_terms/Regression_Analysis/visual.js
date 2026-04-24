
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليل الانحدار"]
    A --- B0["أسلوب إحصائي لتحديد العلاقة بين المتغيرات التابعة والمستقلة"]
    A --- B1["يُطلق عليه أيضًا "انحدار" أو "نموذج انحدار"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
