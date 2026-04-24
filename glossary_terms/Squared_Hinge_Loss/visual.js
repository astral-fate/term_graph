
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مربع الخسارة المفصلية"]
    A --- B0["مربع مُخرَج دالة الخسارة المفصلية الذي يتعامل مع القيم الشاذة بطريقة أكثر صرامة من دالة الخسارة المفصلية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
