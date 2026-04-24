
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات غير تقليدية"]
    A --- B0["البيانات التي تُجمَع أو تُلاحَظ رقميًّا باستخدام تقنيات جديدة"]
    A --- B1["وغالبًا ما تُستخدم في حالات لا علاقة لها بالهدف الأصلي لجمعها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
