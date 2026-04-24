
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إلمام بالبيانات"]
    A --- B0["القدرة على فهم البيانات وتحليلها وتوصيلها بصورة فاعلة"]
    A --- B1["واتخاذ قرارات مستنيرة تعتمد على رؤى مبنية على البيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
