
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي توليدي"]
    A --- B0["نوع من الذكاء الاصطناعي يمكنه إنشاء محتوى جديد"]
    A --- B1["مثل: النصوص والصور والأصوات والفيديوهات والأكواد البرمجية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
