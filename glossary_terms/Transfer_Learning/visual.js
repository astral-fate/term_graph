
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم منقول))
    Start -->|خطوة 1| Step0["أسلوب في تعلُّم الآلة تتعلَّم فيه الخوارزمية أداء مهمة محددة"]
    Step0 -->|خطوة 2| Step1["ثم تستخدم تلك المعرفة في أداء مهام أخرى."]
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
