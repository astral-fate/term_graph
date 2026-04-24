
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["الملاحظة"] --> B["جمع الأدلة"]
B --> C["تحليل المعلومات المتاحة"]
C --> D["استخلاص الفرضيات الممكنة"]
D --> E["تقييم البدائل"]
E --> F["اختيار أفضل تفسير"]
F --> G["التحقق من الصحة"]
G --> H["اتخاذ القرار أو الاستنتاج"]
H --> I["مراجعة وتحسين"]
I --> J["النتيجة النهائية"]
J --> K["تغذية راجعة للملاحظة"]`;
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
