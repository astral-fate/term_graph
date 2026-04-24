
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((معالجة اللغات الطبيعية))
    Start -->|خطوة 1| Step0["فرع من فروع الذكاء الاصطناعي يهتم بفهم أو توليد اللغة البشرية سواءٌ كانت على شكل نص أو كلام."]
    Step0 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
