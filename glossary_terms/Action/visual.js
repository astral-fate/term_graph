
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["بداية العملية"] --> B["تحديد الحالة الحالية للوكيل"]
B --> C["اختيار действие من السياسة"]
C --> D["تنفيذ الإجراء في البيئة"]
D --> E["البيئة تنقل الحالة"]
E --> F["حساب المكافأة"]
F --> G["الانتقال إلى الحالة الجديدة"]
G --> H["هل تم الوصول للهدف؟"]
H -->|نعم| I["نهاية العملية"]
H -->|لا| J["تحديث سياسة الاختيار"]
J --> B`;
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
