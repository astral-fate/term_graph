
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر التحسين الذاتي"]
    A --- B0["أسلوب في هندسة الأوامر يُتيح للنموذج تحسين مخرجاته"]
    A --- B1["عن طريق عملية تكرارية من التغذية الراجعة والتحسين"]
    A --- B2["يُطلق عليه أيضًا "أوامر النقد الذاتي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
