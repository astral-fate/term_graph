
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["اتفاق المُقيِّمين"]
    A --- B0["مقياس لحساب عدد المرات التي يتفق فيها المقيِّمون البشريون عند القيام بمهمة ما"]
    A --- B1["ويُطلق عليه أيضًا "اتفاق المُوصِّفين" أو "موثوقية المُقيِّمين"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
