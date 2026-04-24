
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((وحدة المعالجة المركزية))
    Start -->|خطوة 1| Step0["دائرة إلكترونية تنفذ تعليمات البرنامج"]
    Step0 -->|خطوة 2| Step1["وتتحكم في أداء الحاسب."]
    Step1 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
