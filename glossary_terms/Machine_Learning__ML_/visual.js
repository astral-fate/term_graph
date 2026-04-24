
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم الآلة))
    Start -->|خطوة 1| Step0["مجال فرعي من الذكاء الاصطناعي يركز على تمكين الآلات من التعلُّم من البيانات وتحسين أدائها في مهام محددة دون الحاجة إلى برمجة صريحة."]
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
