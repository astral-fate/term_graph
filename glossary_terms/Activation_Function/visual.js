
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["دالة التنشيط"] --> B["تلقي المدخلات الموزونة"]
B --> C["معالجة المدخلات رياضياً"]
C --> D["توليد المخرجات"]
D --> E["نقل الإشارة للعُقدة التالية"]
E --> F["إذا كانت الإشارة > 0 تمر الإشارة"]
F --> G["إذا كانت الإشارة ≤ 0 تُسَد العُقدة"]
G --> H["نهاية المعالجة"]

A --> I["أنواع دوال التنشيط"]
I --> J["دالة السداسي المفرط"]
I --> K["دالة السداسي"]
I --> L["دالة الخطية الوحدوية"]
I --> M["دالة السيني"]

J --> N["ReLU (الوحدوية)"]
K --> O["Sigmoid"]
L --> P["Tanh"]
M --> Q["Softmax"]`;
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
