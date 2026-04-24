
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["آلة المُتَّجهات الداعمة باستخدام النواة"]
    A --- B0["خوارزمية تصنيف تُحوِّل مُتَّجهات البيانات المُدْخَلة إلى مساحة بُعدية أكثر لزيادة الهامش بين الأصناف الموجبة والسالبة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
