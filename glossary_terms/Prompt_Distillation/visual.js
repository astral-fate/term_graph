
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تقطير الأوامر"]
    A --- B0["أسلوب يُستخدم لتبسيط الأوامر وتحسينها"]
    A --- B1["عن طريق تقليل أطوالها"]
    A --- B2["مع الحفاظ على قدراتها في الحصول على الاستجابات المطلوبة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
