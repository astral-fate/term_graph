
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تنقيح البيانات"]
    A --- B0["عملية إزالة المعلومات الحساسة أو تعتيمها بشكل انتقائي من مستند أو مجموعة بيانات"]
    A --- B1["لحمايتها من الوصول غير المصرَّح به."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
