
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خريطة الخصائص"]
    A --- B0["ناتج لتطبيق عملية الترشيح على البيانات المُدْخَلة باستخدام مُرشِّح"]
    A --- B1["ويُطلق عليه أيضًا "خريطة التنشيط"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
