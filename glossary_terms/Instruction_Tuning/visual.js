
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط التعليمات"]
    A --- B0["شكل من أشكال الضبط الدقيق يُدرَّب فيه النموذج بناءً على سلسلة من التعليمات لتحسين أدائه في مهام محددة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
