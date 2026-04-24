
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["عمليات البيانات"]
    A --- B0["ممارسة لإدارة البيانات تستخدم منهجية رشيقة وتعاونية"]
    A --- B1["لتبسيط دورة الحياة لتحليلات البيانات"]
    A --- B2["وتحسين جودتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
