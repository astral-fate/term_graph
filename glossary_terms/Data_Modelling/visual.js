
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نمذجة البيانات"}
    Core -->|معالجة| Node0("عملية إنشاء تمثيل مفاهيمي للبيانات وعلاقاتها")
    Core -->|معالجة| Node1("لأجل تخزينها في قاعدة البيانات.")
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
