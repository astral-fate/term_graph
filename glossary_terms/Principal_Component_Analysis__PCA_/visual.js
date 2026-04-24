
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليل المُكوِّن الرئيس"]
    A --- B0["أسلوب يُستخدم لإزالة تكرار المعلومات وتقليل خصائص مجموعة البيانات إلى مُكوِّناتها الرئيسة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
