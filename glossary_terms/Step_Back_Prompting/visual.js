
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر الرجوع إلى العموم"]
    A --- B0["أسلوب في هندسة الأوامر يُمكِّن النموذج من تحديد المفاهيم أو المبادئ العامة ذات الصلة"]
    A --- B1["واستخدامها لاستخلاص الاستجابات الصحيحة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
