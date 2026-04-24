
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مقياس إف أو مقياس إف 1"]
    A --- B0["مقياس لدقة النموذج في التصنيف الثنائي عن طريق حساب المتوسط التوافقي للإحكام والاستدعاء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
