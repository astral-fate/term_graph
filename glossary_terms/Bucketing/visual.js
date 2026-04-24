
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع وحدات"]
    A --- B0["عملية تحويل خاصية مستمرة إلى خاصية ثنائية متعددة تُسمَّى وحدات"]
    A --- B1["بناءً على نطاق من القيم"]
    A --- B2["ويُطلق عليها أيضًا "تجميع صناديق"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
