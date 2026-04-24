
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["هندسة البيانات"]
    A --- B0["مجال يركز على التصميم والبناء والصيانة للبنية التحتية والأنظمة اللازمة لدعم جمع كميات كبيرة من البيانات ومعالجتها وتخزينها وتحليلها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
