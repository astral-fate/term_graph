
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام الملفات الموزَّع"}
    Core -->|معالجة| Node0("نظام إدارة ملفات يُتيح تخزين الملفات عبر مجموعة من الأجهزة")
    Core -->|معالجة| Node1("مع إعطاء طريقة عرض موحدة للعملاء.")
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
