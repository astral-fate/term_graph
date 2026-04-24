
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["تدرج تَّكَيُّفيّ (أدا جراد)"] --> B["تجميع تدرجات التربيع السابقة"]
B --> C["حساب معدل التعلم التكييفي"]
C --> D["تحديث الأوزان باستخدام التدرج"]
D --> E["حساب التدرج الحالي"]
E --> F["هل التدرج < الحد الأدنى؟"]
F -->|نعم| G["إنهاء التكرار"]
F -->|لا| H["تخزين التدرج الحالي"]
H --> I["إضافة التدرج الحالي إلى المجموع"]
I --> J["تحديث معدل التعلم"]
J --> D`;
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
