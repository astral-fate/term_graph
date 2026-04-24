
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["وحدة بوابة تكرارية"]
    A --- B0["نوع من الشبكات العصبية التكرارية المصممة لمعالجة البيانات المتسلسلة باستخدام آليات البوابات للتحكم في تدفق المعلومات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
