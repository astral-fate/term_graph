
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مشكلة انفجار التدرج"]
    A --- B0["مشكلة تحدث في تدريب الشبكات العصبية عندما تتراكم تدرجات خطأ كبير"]
    A --- B1["وهو ما يؤدي إلى نموذج غير مستقر بسبب التحديثات الكبيرة جدًّا للأوزان."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
