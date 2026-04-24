
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط المُكيِّف"]
    A --- B0["أسلوب ضبط دقيق يضيف طبقات صغيرة قابلة للتدريب إلى نموذج مُدرَّب سابقًا"]
    A --- B1["ويُحدِّث فقط مُعامِلات هذه الطبقات"]
    A --- B2["لتكييف النموذج على مهام محددة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
