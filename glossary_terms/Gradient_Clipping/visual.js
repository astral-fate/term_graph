
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قص تدرجي"]
    A --- B0["آلية لتقليل مشكلة انفجار التدرج عن طريق تقييد القيمة القصوى للتدرجات عند تدريب نموذج باستخدام النزول التدرجي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
