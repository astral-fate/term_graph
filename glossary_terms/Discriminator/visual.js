
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُميِّز"]
    A --- B0["جزء من شبكة توليدية تنافسية يفحص ما إذا كان المثال الذي أنشأه المُولِّد حقيقيًّا أم مزيفًا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
