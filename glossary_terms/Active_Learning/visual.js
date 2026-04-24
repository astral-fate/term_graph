
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["بدء التعلم النشط"] --> B["تحديد مجموعة البيانات الأولية"]
B --> C["تدريب النموذج على البيانات المتوفرة"]
C --> D["هل النموذج يحتاج لمزيد من البيانات؟"]
D -- نعم --> E["حساب درجة عدم اليقين لكل عينة غير مُوسَمة"]
E --> F["اختيار العينات ذات أعلى درجات عدم اليقين"]
F --> G["طلب تسمية العينات المختارة من الخبير البشري"]
G --> H["إضافة العينات المُوسَمة إلى مجموعة التدريب"]
H --> I["إعادة تدريب النموذج"]
I --> D
D -- لا --> J["تقييم أداء النموذج النهائي"]
J --> K["نهاية التعلم النشط"]`;
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
