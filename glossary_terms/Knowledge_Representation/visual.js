
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تمثيل المعرفة"]
    A --- B0["مجال في الذكاء الاصطناعي يركز على تمثيل معلومات العالم الحقيقي في شكل يمكن للحاسب استخدامه لأداء مهام معقدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
