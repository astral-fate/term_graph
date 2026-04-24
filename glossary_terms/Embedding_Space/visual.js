
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["فضاء التضمين"]
    A --- B0["فضاء مُتَّجه قليل الأبعاد نسبيًّا تُعيّن عليه خصائص من فضاء مُتَّجه ذي أبعاد أكثر."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
