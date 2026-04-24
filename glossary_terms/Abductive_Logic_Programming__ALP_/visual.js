
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["برمجة منطقية استنتاجية"] --> B["استقبال البيانات والملاحظات"]
B --> C["تحليل البيانات المدخلة"]
C --> D["تحديد الفرضيات الممكنة"]
D --> E["تقييم الفرضيات"]
E --> F["اختيار أفضل تفسير"]
F --> G["إنتاج الحلول"]
G --> H["التحقق من الحلول"]
H --> I["إعادة التقييم"]
I --> J["الاستنتاج النهائي"]
J --> K["اتخاذ القرار"]
K --> L["النتائج"]
L --> M["التنبؤ بالنتائج المستقبلية"]
M --> N["التحكم في العمليات"]
N --> O["التحسين المستمر"]
O --> A`;
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
${mermaidCode}
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error("Mermaid Error:", e); }
        }
    }, 50);
}
