
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحقق تقاطعي"]
    A --- B0["آلية لتقييم تعميم النموذج على البيانات الجديدة"]
    A --- B1["عن طريق اختبار النموذج على مجموعة فرعية واحدة أو أكثر"]
    A --- B2["مأخوذة من مجموعة التدريب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
