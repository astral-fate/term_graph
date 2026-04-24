
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحيُّز الذكاء الاصطناعي"]
    A --- B0["تفضيل أو انحياز نظام الذكاء الاصطناعي لمجموعات ما على حساب مجموعات أخرى"]
    A --- B1["ويُطلق عليه أيضًا "تحيُّز خوارزمي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
