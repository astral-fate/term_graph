
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تدرُّج"]
    A --- B0["مُتَّجه للمشتقات الجزئية في دالة النموذج"]
    A --- B1["يقيس التغير في الأوزان بالنظر إلى التغير في الخطأ."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
