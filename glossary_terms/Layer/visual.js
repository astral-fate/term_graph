
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"طبقة"}
    Core -->|معالجة| Node0("مجموعة من الخلايا العصبية في شبكة عصبية ما")
    Core -->|معالجة| Node1("تعالج خصائص المُدْخَلات أو مخرجات تلك الخلايا العصبية.")
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
