
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["دراسة استئصالية - Ablation Study"] --> B["تحديد مكونات النموذج"]
B --> C["تحديد المكون المراد اختباره"]
C --> D["إزالة أو تعطيل المكون"]
D --> E["اختبار الأداء قبل الإزالة"]
E --> F["اختبار الأداء بعد الإزاء"]
F --> G["حساب الفرق في الأداء"]
G --> H["تحليل النتائج"]
H --> I["هل هناك مكونات أخرى؟"]
I -->|نعم| J["العودة لاختبار المكون التالي"]
I -->|لا| K["تجميع النتائج"]
J --> C
K --> L["تقرير الدراسة الاستئصالية"]
M["النموذج الكامل"] --> N["تحديد المكونات"]
N --> O["اختبار الأداء الأصلي"]
O --> P["أداء 100%"]
P --> Q["إزالة مكون"]
Q --> R["اختبار الأداء الجديد"]
R --> S["مقارنة النتائج"]
S --> T["تحليل التأثير"]
T --> U["تسجيل النتائج"]
U --> V["استعادة المكون"]
V --> W["الانتقال للمكون التالي"]
W --> X["نهاية الدراسة"]`;
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
