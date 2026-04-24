
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج"}
    Core -->|معالجة| Node0("تمثيل لما تعلمته خوارزمية تعلُّم الآلة من بيانات التدريب")
    Core -->|معالجة| Node1("ويُطلق عليه أيضًا "نموذج تعلُّم الآلة".")
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
