
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات بديلة"]
    A --- B0["البيانات التي تحل محل البيانات المفقودة أو التي لا يمكن الوصول إليها أو قياسها"]
    A --- B1["وذلك باستخدام بيانات ذات صلة من عمليات أو أنشطة مماثلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
