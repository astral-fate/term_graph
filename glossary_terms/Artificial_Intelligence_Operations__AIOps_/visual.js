
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي للعمليات"]
    A --- B0["تطبيق تقنيات الذكاء الاصطناعي لأتمتة عمليات تشغيل تقنية المعلومات وتحسينها"]
    A --- B1["مثل: المراقبة والتحليل والإدارة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
