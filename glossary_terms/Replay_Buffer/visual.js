
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذاكرة إعادة التشغيل"]
    A --- B0["ذاكرة يستخدمها الوكيل لتخزين التحولات"]
    A --- B1["ويمكن استخدامها لإعادة تشغيل التجربة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
