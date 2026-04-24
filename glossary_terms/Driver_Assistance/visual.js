
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مساعدة السائق"]
    A --- B0["نظام مصمَّم لدعم السائق في مهام القيادة وتعزيز السلامة والراحة"]
    A --- B1["ويُطلق عليه أيضًا "أنظمة مساعدة السائق المتقدمة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
