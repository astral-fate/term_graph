
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((استدلال استنباطي))
    Start -->|خطوة 1| Step0["عملية استخلاص الاستنتاجات بناءً على بيانات أو حقائق عامة مقبولة على أنها صحيحة"]
    Step0 -->|خطوة 2| Step1["ويُطلق عليها أيضًا "استنباط"."]
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
