
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تهشير الخصائص"]
    A --- B0["أسلوب لتحويل البيانات الفئوية الكثيرة الأبعاد إلى متجه عددي ثابت الحجم"]
    A --- B1["ويُطلق عليه أيضًا "حيلة التهشير"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
