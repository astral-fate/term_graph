
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((نظرية التعلُّم الخوارزمي))
    Start -->|خطوة 1| Step0["مجال من مجالات نظرية التعلُّم الحوسبي التي تُحلل حدود التعلُّم بطُرُق غير إحصائية وغير احتمالية."]
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
