
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["هلوسة الذكاء الاصطناعي"]
    A --- B0["حالة يولِّد فيها نموذج الذكاء الاصطناعي نتائج غير صحيحة أو مضللة أو غير منطقية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
