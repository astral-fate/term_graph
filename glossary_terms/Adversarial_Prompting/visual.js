
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر عدائية"]
    A --- B0["أسلوب لصياغة أوامر مصممة لتضليل النموذج أو التلاعب به"]
    A --- B1["لإنتاج مخرجات ضارة أو غير مرغوب فيها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
