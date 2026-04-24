
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((نظرية التعلُّم الحوسبي))
    Start -->|خطوة 1| Step0["مجال في الذكاء الاصطناعي يركز على جميع جوانب التصميم لخوارزميات تعلُّم الآلة وتحليلها"]
    Step0 -->|خطوة 2| Step1["لتحديد المشكلات التي يمكن تعلُّمها"]
    Step1 -->|خطوة 3| Step2["ويُطلق عليه أيضًا "نظرية التعلُّم"."]
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
