
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((أتمتة العمليات الروبوتية))
    Start -->|خطوة 1| Step0["نوع من أتمتة العمليات تحاكي فيه البرمجيات أو الروبوتات كيفية إنجاز البشر لمهمة ما."]
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
