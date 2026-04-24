
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات مستثناة"]
    A --- B0["مجموعة البيانات التي لم تُستخدم عن قصد أثناء التدريب"]
    A --- B1["وستُستخدم لتقييم قدرة النموذج على التعميم."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
