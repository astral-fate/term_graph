
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"طبقة متصلة كليًّا"}
    Core -->|معالجة| Node0("طبقة مخفية في شبكة عصبية اصطناعية تتصل كل عقدة فيها بكل عقدة في الطبقة المخفية التالية")
    Core -->|معالجة| Node1("ويُطلق عليها أيضًا "طبقة كثيفة".")
    Node1 -.-> Output[المخرجات]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
