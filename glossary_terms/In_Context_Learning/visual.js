
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم سياقي))
    Start -->|خطوة 1| Step0["أسلوب في هندسة الأوامر يتعلم فيه النموذج أداء المهام"]
    Step0 -->|خطوة 2| Step1["عن طريق تزويده ببعض الأمثلة في سياق مُدْخَلات الأمر"]
    Step1 -->|خطوة 3| Step2["يُطلق عليه أيضًا "تعلُّم قائم على الأوامر"."]
    Step2 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
