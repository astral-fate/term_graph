
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج انتشاري"}
    Core -->|معالجة| Node0("نموذج توليدي يتعلم كيفية إنشاء بيانات جديدة")
    Core -->|معالجة| Node1("عن طريق عكس عملية إضافة التشويش إلى بيانات التدريب.")
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
