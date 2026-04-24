
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مربعات صغرى موزونة تناوبيًّا"]
    A --- B0["خوارزمية تُستخدم في أنظمة التوصية"]
    A --- B1["لتقليل دالة الهدف أثناء تحليل المصفوفة إلى عوامل."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
