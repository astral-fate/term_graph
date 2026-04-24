
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["طفرة الذكاء"]
    A --- B0["فرضية تصف حالة يمكن فيها للآلات الفائقة الذكاء أن تنتج آلات أكثر ذكاء"]
    A --- B1["يفوق ذكاؤها الذكاء البشري"]
    A --- B2["يُطلق عليها أيضًا "تفرُّد تقني" أو "تفرُّد"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
