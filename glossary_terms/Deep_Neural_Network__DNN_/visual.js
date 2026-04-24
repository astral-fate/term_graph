
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة عصبية عميقة"}
    Core -->|معالجة| Node0("نوع من الشبكات العصبية الاصطناعية يشتمل على عدة طبقات بين طبقتي المُدْخَلات والمخرجات")
    Core -->|معالجة| Node1("ويُطلق عليه أيضًا "نموذج عميق".")
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
