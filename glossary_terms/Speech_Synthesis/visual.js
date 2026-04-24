
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توليد الكلام"]
    A --- B0["عملية توليد الكلام البشري بطريقة اصطناعية"]
    A --- B1["ويُطلق عليها أيضًا "تحويل النص إلى كلام"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
