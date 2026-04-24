
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تصميم توليدي للمنتجات"]
    A --- B0["البرمجيات التي تُولِّد مسودات بجميع الخصائص والمتطلبات المحددة لإنشاء تصميمات للمنتجات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
