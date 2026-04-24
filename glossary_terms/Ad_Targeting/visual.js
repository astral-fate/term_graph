
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["بدء عملية توجيه الإعلانات"] --> B["جمع بيانات المستخدمين"]
B --> C["تحليل السلوك والاهتمامات"]
C --> D["تقسيم المستخدمين إلى مجموعات مستهدفة"]
D --> E["تحديد الخصائص الديموغرافية"]
E --> F["تحليل البيانات السلوكية"]
F --> G["اختيار الفئة المستهدفة المناسبة"]
G --> H["إعداد الحملة الإعلانية"]
H --> I["تحديد المحتوى المناسب لكل مجموعة"]
I --> J["اختيار القنوات الإعلانية"]
J --> K["تشغيل الحملة الإعلانية"]
K --> L["مراقبة الأداء والنتائج"]
L --> M["تحليل معدل النقر والتحويل"]
M --> N["تحسين الحملة بناءً على البيانات"]
N --> O["تحديث ملفات تعريف المستخدمين"]
O --> P["إعادة توجيه الإعلانات المحسنة"]
P --> Q["قياس العائد على الاستثمار"]
Q --> R["تقرير الأداء النهائي"]
R --> S["اتخاذ قرارات استراتيجية مستقبلية"]`;
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
