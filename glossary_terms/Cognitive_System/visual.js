
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام إدراكي"}
    Core -->|معالجة| Node0("نظام يمكنه محاكاة العمليات الإدراكية البشرية")
    Core -->|معالجة| Node1("مثل: التعلُّم والاستدلال وحل المشكلات.")
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
