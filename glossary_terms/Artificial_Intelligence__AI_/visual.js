
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي"]
    A --- B0["مجال من مجالات علوم الحاسب يركز على بناء أنظمة قادرة على أداء مهام تتطلب عادةً ذكاءً بشريًّا"]
    A --- B1["مثل: التعلُّم والاستدلال والتطوير الذاتي"]
    A --- B2["ويُطلق عليه أيضًا "ذكاء الآلة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
