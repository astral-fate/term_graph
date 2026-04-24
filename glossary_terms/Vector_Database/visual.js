
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قاعدة بيانات المتجَهات"]
    A --- B0["قاعدة بيانات مصممة للتخزين والفهرسة والاسترجاع للتمثيلات الرياضية الكثيرة الأبعاد لنقاط البيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
