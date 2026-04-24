
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قيد الإنصاف"]
    A --- B0["شرط أو مجموعة من الشروط لضمان أن لا تُنتِج خوارزميات تعلم الآلة نتائج متحيزة أو تمييزية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
