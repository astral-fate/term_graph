
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تأثير متباين"]
    A --- B0["حالة تُفيد فيها العملية الخوارزمية لاتخاذ القرار"]
    A --- B1["أو تضر مجموعات فرعية معينة أكثر من غيرها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
