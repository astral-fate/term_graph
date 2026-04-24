
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((معدل التعلُّم))
    Start -->|خطوة 1| Step0["مُعامِل ضبط يُستخدم في خوارزميات التحسين لتحديد حجم الخطوة في كل تكرار"]
    Step0 -->|خطوة 2| Step1["ويُطلق عليه أيضًا "حجم الخطوة"."]
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
