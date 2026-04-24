
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["تعرُّف على الأفعال"] --> B["استقبال الفيديو"]
B --> C["تحليل الإطارات الزمنية"]
C --> D["استخراج الميزات"]
D --> E["تصنيف الأفعال"]
E --> F["عرض النتائج"]

subgraph "مرحلة ما قبل المعالجة"
B
C
D
end

subgraph "مرحلة المعالجة"
E
F
end

B --> G["تقسيم الفيديو إلى إطارات"]
G --> H["تحويل الصور إلى مصفوفات"]
H --> I["تطبيع البيانات"]

I --> D

D --> J["استخراج الميزات البصرية"]
D --> K["استخراج الميزات الحركية"]
D --> L["تحليل الأنماط الزمنية"]

J --> E
K --> E
L --> E

E --> M["نموذج التصنيف الزمني"]
E --> N["نموذج الشبكة العصبية"]
N --> O["نموذج التعرف على الأنماط"]

M --> F
O --> F

F --> P["تحديد نوع الفعل"]
P --> Q["حساب درجة الثقة"]
Q --> R["إخراج النتيجة النهائية"]`;
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
