
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مقياس كوهين كابا"]
    A --- B0["مقياس إحصائي لتقييم درجة الاتفاق بين اثنين من المقيِّمين"]
    A --- B1["أو لتقييم أداء نموذج التصنيف."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
