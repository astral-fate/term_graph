
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر ناعمة"]
    A --- B0["أسلوب لتحسين مخرجات نموذج مُدرَّب سابقًا"]
    A --- B1["عن طريق إضافة تضمينات غير نصية إلى تضمينات المُدْخَلات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
