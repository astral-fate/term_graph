
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توازي البيانات"]
    A --- B0["أسلوب يُستخدم لتسريع التدريب أو الاستنتاج عن طريق تكرار النموذج على عدة أجهزة"]
    A --- B1["ثم تقسيم البيانات المُدْخَلة على هذه الأجهزة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
