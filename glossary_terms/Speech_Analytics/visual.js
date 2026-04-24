
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات الكلام"]
    A --- B0["عملية تحليل التسجيلات الصوتية لاستخراج رؤى من اللغة المنطوقة"]
    A --- B1["مثل الكلمات الرئيسة والعواطف والنوايا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
