
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((عملية قرار ماركوف الملاحظة جزئيًّا))
    Start -->|خطوة 1| Step0["إطار رياضي يُستخدم لنمذجة سيناريوهات اتخاذ القرار في ظل عدم اليقين بشأن الحالة الحالية للبيئة."]
    Step0 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
