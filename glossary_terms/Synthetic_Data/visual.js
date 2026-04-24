
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات مصطنعة"]
    A --- B0["البيانات التي تُنشأ بشكل اصطناعي باستخدام خوارزميات أو عمليات محاكاة لتقليد بيانات العالم الحقيقي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
