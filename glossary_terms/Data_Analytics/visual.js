
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات البيانات"]
    A --- B0["مفهوم يضم عمليات جمع البيانات والتحقق من صحتها ومعالجتها وتصويرها"]
    A --- B1["لأجل اكتشاف رؤى مفيدة في اتخاذ القرار."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
