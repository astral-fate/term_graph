
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج أساس"}
    Core -->|معالجة| Node0("نموذج مرجعي يُستخدم لمقارنة مدى جودة أداء نموذج آخر أكثر تعقيدًا في مشكلة معينة.")
    Node0 -.-> Output[المخرجات]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
