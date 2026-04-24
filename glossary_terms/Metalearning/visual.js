
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم عملية التعلُّم))
    Start -->|خطوة 1| Step0["مجال فرعي من تعلُّم الآلة يُستخدم لاكتشاف خوارزمية التعلُّم أو تحسينها عن طريق التعلُّم من كمية صغيرة من البيانات أو الخبرات من المهام السابقة."]
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
