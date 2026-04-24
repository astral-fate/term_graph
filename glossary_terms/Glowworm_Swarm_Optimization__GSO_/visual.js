
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحسين سرب الدودة المضيئة"]
    A --- B0["خوارزمية ذكاء سرب تحاكي سلوك الحشرات المضيئة للحصول على الحد الأقصى من دالة الصيغ المتعددة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
