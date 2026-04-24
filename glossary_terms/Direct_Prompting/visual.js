
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر مباشرة"]
    A --- B0["أسلوب لهندسة الأوامر يُعطى فيه النموذج تعليمات أو سؤالًا بسيطًا دون أي أمثلة إضافية"]
    A --- B1["ويُطلق عليه أيضًا "أوامر بدون أمثلة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
