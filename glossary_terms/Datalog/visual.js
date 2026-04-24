
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["داتا لوج"]
    A --- B0["لغة برمجة منطقية تصريحية تتضمن مجموعة محدودة من الحقائق والقواعد"]
    A --- B1["ويمكن استخدامها في قواعد البيانات الاستنباطية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
