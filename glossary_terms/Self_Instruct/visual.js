
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إرشاد ذاتي"]
    A --- B0["طريقة لتحسين قدرة النماذج على اتباع تعليمات اللغات الطبيعية"]
    A --- B1["عن طريق توليد بيانات اتباع التعليمات بنفسها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
