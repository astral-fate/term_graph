
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["موازنة التحيُّز-التباين"]
    A --- B0["تعارض ينشأ عند محاولة تقليل التحيُّز والتباين"]
    A --- B1["يمنع الخوارزميات الموجَّهة من التعميم خارج مجموعة التدريب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
