
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بث"]
    A --- B0["طريقة في تعلُّم الآلة لمطابقة أبعاد المصفوفات ذات الأحجام المختلفة"]
    A --- B1["وإتاحة إجراء عمليات حسابية بين تلك المصفوفات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
