
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["متوسط التجميع"]
    A --- B0["أسلوب مستخدم في الشبكات العصبية الاصطناعية لإنتاج نموذج متوسط من مجموعة من النماذج المتواضعة الدقة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
