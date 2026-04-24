
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مصفوفة العناصر"]
    A --- B0["مصفوفة من التضمينات في أنظمة التوصية مُولَّدة بواسطة تحليل المصفوفة إلى عوامل تتضمن إشارات كامنة حول كل عنصر."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
