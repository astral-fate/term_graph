
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تتبُّع الأشياء"]
    A --- B0["أسلوب في رؤية الحاسب لتحديد موقع الأشياء ومراقبتها باستمرار في تسلسل من إطارات الفيديو."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
