
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"قاعدة بيانات متعددة النماذج"}
    Core -->|معالجة| Node0("قاعدة بيانات مصممة لدعم نماذج بيانات متعددة (مثل: الجداول")
    Core -->|معالجة| Node1("والشبكات) ضمن نظام متكامل واحد.")
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
