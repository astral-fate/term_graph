
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انعدام تأثير الإزاحة"]
    A --- B0["قدرة النموذج على التعرُّف على الأنماط أو معالجتها في البيانات المُدْخَلة بغض النظر عن موقعها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
