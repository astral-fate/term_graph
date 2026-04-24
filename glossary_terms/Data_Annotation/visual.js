
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توصيف البيانات"]
    A --- B0["عملية إضافة معلومات وصفية إلى مجموعة البيانات"]
    A --- B1["لاستخدامها كمُدْخَلات لنموذج تعلُّم الآلة"]
    A --- B2["ويُطلق عليها أيضًا "تسمية البيانات" أو "تسمية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
