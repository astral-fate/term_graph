
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["هندسة المعرفة"]
    A --- B0["مجال يركز على اكتساب المعرفة من خبراء المجال والمصادر الأخرى"]
    A --- B1["وتخزينها في قاعدة المعرفة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
