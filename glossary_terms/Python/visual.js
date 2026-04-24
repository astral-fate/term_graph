
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بايثون"]
    A --- B0["لغة برمجة عالية المستوى تُستخدم لأغراض متعددة"]
    A --- B1["وقد لقيت رواجًا متزايدًا في علم البيانات وتعلُّم الآلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
