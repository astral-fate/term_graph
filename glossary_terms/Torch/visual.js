
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تورتش"]
    A --- B0["إطار للحوسبة العلمية مفتوح المصدر"]
    A --- B1["مع دعم واسع لخوارزميات تعلُّم الآلة"]
    A --- B2["مكتوب بلغات البرمجة سي"]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
