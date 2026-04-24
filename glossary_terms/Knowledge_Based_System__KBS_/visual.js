
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام قائم على قاعدة معرفة"}
    Core -->|معالجة| Node0("نظام حاسب يستخدم قاعدة معرفة لتخزين معرفة الخبراء البشريين")
    Core -->|معالجة| Node1("إضافة إلى مُحَرِّك استنتاج لحل المشكلات.")
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
