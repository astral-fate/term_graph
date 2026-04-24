
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نظرية بايز"]
    A --- B0["صيغة رياضية لحساب الاحتمالات الشرطية التي تصف احتمالية وقوع حدث ما"]
    A --- B1["بناءً على حدث سابق"]
    A --- B2["ويُطلق عليها أيضًا "قانون بايز" أو "قاعدة بايز"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
