
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قابلية مراقبة البيانات"]
    A --- B0["القدرة على مراقبة صحة البيانات وفهمها والحفاظ عليها"]
    A --- B1["لضمان دقتها واتساقها وموثوقيتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
