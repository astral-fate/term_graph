
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["معالجة متباينة"]
    A --- B0["حالة تُحلَل فيها السمات الحساسة للأشخاص في العملية الخوارزمية لاتخاذ القرار بطريقة لا تُعامل فيها المجموعات الفرعية المختلفة على حد سواء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
