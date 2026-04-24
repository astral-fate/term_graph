
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قابلية التفسير"]
    A --- B0["القدرة على شرح العوامل المهمة التي تؤثِّر في نتائج نظام الذكاء الاصطناعي بعبارات مفهومة للإنسان"]
    A --- B1["ويُطلق عليها أيضًا "ذكاء اصطناعي قابل للتفسير" أو "قابلية الشرح"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
