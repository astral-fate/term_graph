
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم بمثال واحد))
    Start -->|خطوة 1| Step0["طريقة لتعلُّم مصنِّفات فاعلة من مثال تدريبي واحد"]
    Step0 -->|خطوة 2| Step1["ويُطلق عليها أيضًا "تصنيف بمثال واحد"."]
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
