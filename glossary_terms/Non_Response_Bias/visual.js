
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحيُّز عدم الاستجابة"]
    A --- B0["نوع من تحيُّز الاختيار توجد فيه فجوات مشارَكة في البيانات المجموعة"]
    A --- B1["ويُطلق عليه أيضًا "تحيُّز المشاركة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
