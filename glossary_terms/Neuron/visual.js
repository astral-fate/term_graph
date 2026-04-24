
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خلية عصبية"]
    A --- B0["عقدة في الشبكة العصبية تعالج قيم مُدْخَلات متعددة"]
    A --- B1["وينتج منها قيمة مخرج واحد"]
    A --- B2["يُطلق عليها أيضًا "خلية عصبية اصطناعية" أو "عقدة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
