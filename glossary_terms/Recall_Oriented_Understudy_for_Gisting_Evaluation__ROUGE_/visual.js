
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مقياس روج"]
    A --- B0["مجموعة من المقاييس المستخدمة لتقييم جودة التلخيص التلقائي وترجمة الآلة"]
    A --- B1["عن طريق قياس التداخل بين المخرجات التي ينشئها النظام والمراجع التي ينشئها الإنسان."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
