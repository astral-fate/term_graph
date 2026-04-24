
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع تكتُّلي"]
    A --- B0["طريقة لإنشاء شجرة هرمية عن طريق تعيين كل مثال في مجموعته"]
    A --- B1["ودمج أقرب المجموعات بصورة تَكرارية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
