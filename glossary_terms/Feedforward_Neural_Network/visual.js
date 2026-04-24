
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة عصبية ذات تغذية أمامية"}
    Core -->|معالجة| Node0("شبكة عصبية اصطناعية تنتقل فيها المعلومات دائمًا في اتجاه واحد")
    Core -->|معالجة| Node1("من طبقة المُدْخَلات إلى طبقة المخرجات.")
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
