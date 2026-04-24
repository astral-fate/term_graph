
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تَكَيُّف مشترك"]
    A --- B0["مشكلة في الشبكات العصبية تحدث عندما تعتمد الخلايا العصبية بصورة كبيرة على خلايا عصبية محددة بدلًا من اعتمادها على السلوك العام للشبكة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
