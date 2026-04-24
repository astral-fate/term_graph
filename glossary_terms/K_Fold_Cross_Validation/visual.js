
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحقق تقاطعي مُجَزَّأ"]
    A --- B0["أسلوب لتقييم النماذج عن طريق تقسيم مجموعة البيانات إلى عدد (ك) مجموعات فرعية لتدريب النماذج واختبارها بصورة تكرارية"]
    A --- B1["ثم حساب متوسط ​​النتائج لتقدير الأداء العام."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
