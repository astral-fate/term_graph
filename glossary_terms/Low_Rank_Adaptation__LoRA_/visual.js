
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تَكَيُّف منخفض الرتبة"]
    A --- B0["أسلوب تدريبي لتكييف النماذج مع مهام جديدة عن طريق تقديم عدد صغير من المُعامِلات القابلة للتدريب بدلًا من تعديل جميع المعاملات الأصلية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
