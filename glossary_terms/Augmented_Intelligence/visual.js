
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء مُعزَّز"]
    A --- B0["نمط تصميمي يُكمِّل الذكاء البشري"]
    A --- B1["ويساعد البشر ليكونوا أذكى وأسرع في أداء المهام"]
    A --- B2["ويُطلق عليه أيضًا "تعزيز الذكاء"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
