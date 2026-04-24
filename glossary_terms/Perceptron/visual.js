
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيرسبترون"]
    A --- B0["خلية عصبية اصطناعية مصممة لإجراء تصنيفات ثنائية عن طريق معالجة البيانات المُدْخَلة وإنتاج مخرجات بناءً على الأوزان المُتعلَّمة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
