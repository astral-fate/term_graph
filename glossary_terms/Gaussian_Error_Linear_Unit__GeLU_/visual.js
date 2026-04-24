
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["وحدة الخطأ الخطي الجاوسي جيلو"]
    A --- B0["دالة تنشيط تطبق تحويلًا سلسًا غير خطي على المُدْخَلات"]
    A --- B1["عن طريق الاحتمال التراكمي للتوزيع الطبيعي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
