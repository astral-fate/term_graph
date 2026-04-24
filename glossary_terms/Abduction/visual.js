
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["الاستدلال الاستنتاجي"] --> B["الملاحظة"]
A --> C["الفرضية"]
B --> D["التفسير"]
C --> D
D --> E["التحقق"]
E --> F["النتيجة"]
F --> G["التحليل"]
G --> H["الاستنتاج"]
H --> I["اتخاذ القرار"]
I --> J["التنفيذ"]
J --> K["المراجعة"]
K --> L["التحسين"]
L --> M["التطبيق المستمر"]
M --> N["التطوير"]
N --> A`;
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
