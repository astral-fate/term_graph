
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تقليم"]
    A --- B0["أسلوب تسوية يُستخدم للتعامل مع القيم الشاذة"]
    A --- B1["عن طريق وضع حد أقصى بقيمة ثابتة لجميع قيم الخصائص التي تكون أعلى أو أقل من قيمة محددة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
