
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُرمِّز تلقائي"]
    A --- B0["نوع من الشبكات العصبية الاصطناعية يُستخدم لإنتاج تمثيلات بيانات فاعلة للتعلُّم غير الموجَّه."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
