
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحسين السياسة الأقرب"]
    A --- B0["خوارزمية للتعلُّم المُعَزَّز تُدرِّب الوكيل على تحقيق مهام معقدة"]
    A --- B1["عن طريق تحسين دالة هدف بديلة لتقييد حجم الخطوة في كل تحديث للسياسة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
