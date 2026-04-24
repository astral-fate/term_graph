
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسوية قاعدة البيانات"]
    A --- B0["عملية تصميم البيانات في قاعدة بيانات عن طريق إنشاء علاقات بين الجداول"]
    A --- B1["لإزالة التكرار والتبعية غير المتسقة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
