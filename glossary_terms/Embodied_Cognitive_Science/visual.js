
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["علوم إدراكية مُجسَّدة"]
    A --- B0["مجال يهدف إلى دراسة آليات تطوير العمليات الإدراكية"]
    A --- B1["وتأكيد دور التفاعل مع البيئة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
