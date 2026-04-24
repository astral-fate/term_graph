
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحيُّز الأتمتة"]
    A --- B0["تفضيل صانع القرار البشري التوصيات التي ينتجها نظام صنع قرار مؤتمت على المعلومات التي تُنتَج بدون أتمتة"]
    A --- B1["حتى عندما يرتكب نظام صنع القرار المؤتمت أخطاء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
