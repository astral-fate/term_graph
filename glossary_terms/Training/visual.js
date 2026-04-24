
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تدريب"]
    A --- B0["عملية تحديد أو تحسين المُعامِلات التي تشكل نموذجًا يعتمد على خوارزمية تعلُّم الآلة باستخدام بيانات التدريب"]
    A --- B1["ويُطلق عليها أيضًا "تدريب النموذج"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
