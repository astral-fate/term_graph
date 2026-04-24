
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["فك الترميز التخميني"]
    A --- B0["أسلوب تحسين يُسرِّع الاستنتاج"]
    A --- B1["عن طريق التنبؤ بالوحدات اللغوية والتحقق من صحتها بالتوازي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
