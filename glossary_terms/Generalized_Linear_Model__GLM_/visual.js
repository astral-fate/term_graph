
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج خطي مُعمَّم"}
    Core -->|معالجة| Node0("توسيع للانحدار الخطي يُتيح لدوال توزيع المخرجات المختلفة تحديد التباين بين المشاهدات والقيم التنبؤية.")
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
