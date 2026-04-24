
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["رؤية الحاسب"]
    A --- B0["مجال في الذكاء الاصطناعي يركز على تحليل البيانات المرئية (صور وفيديوهات) وفهم محتواها"]
    A --- B1["ويُطلق عليه أيضًا "رؤية الآلة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
