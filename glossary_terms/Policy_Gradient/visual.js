
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تدرج السياسة"]
    A --- B0["أسلوب تعلُّم مُعَزَّز يُحسِّن السياسة ذات المُعامِلات باستخدام النزول التدرجي لتعظيم المكافأة المتوقعة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
