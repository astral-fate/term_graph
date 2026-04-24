
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قاعدة بيانات في الذاكرة"]
    A --- B0["قاعدة بيانات تخزن البيانات في الذاكرة الرئيسة بدلًا من مُحرِّك الأقراص لتسريع أوقات الاستجابة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
