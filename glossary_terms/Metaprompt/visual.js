
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر وصفية"]
    A --- B0["توجيه عالي المستوى أو مجموعة من التعليمات المقدمة للنموذج لتوجيه كيفية توليد المخرجات المطلوبة"]
    A --- B1["ويُطلق عليها أيضًا "أوامر النظام" أو "رسائل النظام"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
