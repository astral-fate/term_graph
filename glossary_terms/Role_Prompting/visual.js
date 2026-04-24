
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر تعيين الدور"]
    A --- B0["أسلوب لهندسة الأوامر يُوجَّه فيه النموذج لتبني دور أو شخصية محددة من أجل تشكيل مخرجاته وأسلوبه."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
