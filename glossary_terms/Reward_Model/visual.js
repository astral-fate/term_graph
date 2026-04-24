
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج المكافأة"}
    Core -->|معالجة| Node0("نموذج متخصص يقدم التوجيه لتحقيق النتائج المرجوة")
    Core -->|معالجة| Node1("عن طريق التغذية الراجعة في شكل مكافآت.")
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
