
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر تكرارية"]
    A --- B0["أسلوب في هندسة الأوامر تُحسِّن الأوامر وتُعدِّلها بناءً على استجابات النموذج"]
    A --- B1["عبر تكرارات متعددة للحصول على نتائج مرغوبة وأكثر دقة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
