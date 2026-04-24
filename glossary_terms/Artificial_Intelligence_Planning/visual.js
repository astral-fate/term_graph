
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تخطيط الذكاء الاصطناعي"]
    A --- B0["فرع من فروع الذكاء الاصطناعي يهتم باختيار مجموعة من الأفعال المناسبة لتحقيق هدف معين"]
    A --- B1["ويُطلق عليه أيضًا "تخطيط وجدولة مؤتمتة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
