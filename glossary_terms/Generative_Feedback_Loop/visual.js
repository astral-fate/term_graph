
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حلقة تغذية راجعة توليدية"]
    A --- B0["عملية دورة تُغذَّى فيها المخرجات الناتجة عن النموذج مرة أخرى إلى النظام على شكل بيانات تدريب"]
    A --- B1["وهو ما يتيح التعلُّم والتحسين المستمر."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
