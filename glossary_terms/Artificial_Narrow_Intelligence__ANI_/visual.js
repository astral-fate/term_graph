
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء ضيق اصطناعي"]
    A --- B0["نوع من أنظمة الذكاء الاصطناعي قادر على تنفيذ مهام محددة فقط"]
    A --- B1["ويُطلق عليه أيضًا "ذكاء اصطناعي ضيق" أو "ذكاء اصطناعي ضعيف"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
