
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سلسلة ماركوف"]
    A --- B0["نموذج عشوائي يصف تسلسل من الأحداث المحتملة التي يعتمد فيها احتمال كل حدث على الحدث السابق فقط"]
    A --- B1["ويُطلق عليه أيضًا "عملية ماركوف"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
