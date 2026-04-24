
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي تناظري"]
    A --- B0["نوع من الذكاء الاصطناعي يستخدم مبادئ الحوسبة التناظرية وأنظمتها"]
    A --- B1["لتصميم وتنفيذ خوارزميات ونماذج الذكاء الاصطناعي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
