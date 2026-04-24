
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تصوير البيانات"]
    A --- B0["تمثيل رسومي للمعلومات يسلط الضوء على الأنماط والاتجاهات في البيانات"]
    A --- B1["ويساعد القارئ على اكتساب رؤى سريعة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
