
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قابلية التدقيق"]
    A --- B0["القدرة على مراجعة البيانات والعمليات واتخاذ القرارات في نظام الذكاء الاصطناعي وتقييمها"]
    A --- B1["لضمان الشفافية والمساءلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
