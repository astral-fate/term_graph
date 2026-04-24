
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["اكتشاف الشذوذ"]
    A --- B0["عملية تحديد المشاهدات غير المعتادة أو غير الطبيعية في البيانات"]
    A --- B1["نظرًا لخصائصها المختلفة عن غالبية البيانات المعالجة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
