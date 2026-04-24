
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["جهاز روبوتي"]
    A --- B0["آلية مشغلة تحقق خصائص الروبوت الصناعي أو الخدمي"]
    A --- B1["ولكنها تفتقد المحاور القابلة للبرمجة أو درجة التحكم الذاتي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
