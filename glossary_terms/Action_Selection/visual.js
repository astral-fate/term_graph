
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["بدء اختيار الفعل"] --> B["تقييم الحالة الحالية"]
B --> C["جمع الممكنات المتاحة"]
C --> D["تحليل الأهداف"]
D --> E["حساب القيم المتوقعة"]
E --> F["تطبيق خوارزمية الاختيار"]
F --> G["تقييم المخاطر والفوائد"]
G --> H["اتخاذ القرار"]
H --> I["تحديد الفعل الأمثل"]
I --> J["تنفيذ الفعل المحدد"]
J --> K["مراقبة النتائج"]
K --> L["تعديل الاستراتيجية"]
L --> M["تحديث التجربة"]
M --> N["الانتهاء"]
N --> O["بدء دورة جديدة"]
F --> P["استخدام التعلم المعزز"]
P --> Q["حساب مكافأة الفعل"]
Q --> R["تحديث قيم الحالة"]
R --> S["تحسين السياسة"]
S --> T["تحديد الاستكشاف مقابل الاستغلال"]
T --> U["اختيار الاستراتيجية التالية"]
U --> V["تنفيذ العملية التالية"]`;
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
