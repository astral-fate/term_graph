
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سمة"]
    A --- B0["صفة أو ميزة لشيء ما بمقدور البشر أو الطُّرُق المؤتمتة التعرُّف عليها"]
    A --- B1["وغالبًا ما تستخدم كمرادف لكلمة "خاصية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
