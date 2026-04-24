
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["دقة النموذج"] --> B["معدل التنبؤات الصحيحة"]
B --> C["عدد التنبؤات الصحيحة / إجمالي التنبؤات"]
C --> D["التنبؤات الصحيحة"]
C --> E["إجمالي التنبؤات"]
D --> F["التنبؤات الخاطئة"]
D --> G["التنبؤات الصحيحة = التنبؤات المطابقة للحالة الفعلية"]
E --> H["إجمالي = التنبؤات الصحيحة + التنبؤات الخاطئة"]
F --> I["مثال: 90 تنبؤ صحيح من أصل 100 تنبؤ"]
H --> J["دقة = 90/100 = 90%"]
J --> K["越高越好 - كلما اقتربت من 100% كانت أفضل"]
K --> L["القيود: قد تكون مضللة في حالة عدم التوازن في البيانات"]
L --> M["مثال: 95% دقة قد تعني 5% أخطاء حرجة"]
M --> N["استخدام مع مقاييس أخرى مثل الدقة والانحسار"]`;
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
