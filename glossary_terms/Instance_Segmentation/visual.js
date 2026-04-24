
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تقسيم الأشياء"]
    A --- B0["مهمة في رؤية الحاسب تتضمن تحديد وتوضيح كل شيء مُميَّز داخل الصورة"]
    A --- B1["وتُعيِّن حدودًا دقيقة واسمًا فريدًا لكل الأشياء فيها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
