
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج البيانات"}
    Core -->|معالجة| Node0("مجموعة من الطُّرُق المفاهيمية لوصف البيانات")
    Core -->|معالجة| Node1("والعلاقات بينها")
    Core -->|معالجة| Node2("وقيود الاتساق.")
    Node2 -.-> Output[المخرجات]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
