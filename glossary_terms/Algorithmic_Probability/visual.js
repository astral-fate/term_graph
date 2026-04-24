
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((احتمال خوارزمي))
    Start -->|خطوة 1| Step0["طريقة لتعيين احتمالية سابقة للأشياء"]
    Step0 -->|خطوة 2| Step1["ويُطلق عليها أيضًا "احتمالية سولومونوف"."]
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
