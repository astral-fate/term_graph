
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مساحة تحت منحنى الإحكام-الاستدعاء"]
    A --- B0["مساحة تحت منحنى نقاط الإحكام والاستدعاء تُمثِّل قيمًا مختلفة لحدود التصنيف."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
