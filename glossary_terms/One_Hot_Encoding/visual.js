
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ترميز الواحد النشط"]
    A --- B0["طريقة لتحويل البيانات إلى مُتَّجهات تُعيَّن فيها جميع العناصر إلى 0 باستثناء عنصر واحد يُعيَّن إلى 1."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
