
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مساحة تحت منحنى دقّة الأداء"]
    A --- B0["مقياس أداء يُستخدم لتقييم قدرة نموذج التصنيف الثنائي على التمييز بين الأصناف الإيجابية والسلبية عبر جميع حدود التصنيف."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
