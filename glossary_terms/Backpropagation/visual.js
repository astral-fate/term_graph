
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انتشار عكسي"]
    A --- B0["خوارزمية تُستخدم عند تدريب الشبكات العصبية الاصطناعية لتقليل الأخطاء عن طريق إيجاد قيمة التدرج المطلوب لحساب أوزان الشبكة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
