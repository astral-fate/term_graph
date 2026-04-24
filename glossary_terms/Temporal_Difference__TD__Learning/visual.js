
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم الفرق الزمني))
    Start -->|خطوة 1| Step0["أسلوب تعلُّم غير موجَّه في التعلُّم التعزيزي"]
    Step0 -->|خطوة 2| Step1["يتعلَّم فيه الوكيل التنبؤ بقيمة متغير في نهاية تسلسل من الحالات."]
    Step1 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
