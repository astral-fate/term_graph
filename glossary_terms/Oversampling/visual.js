
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["زيادة العيِّنات"]
    A --- B0["أسلوب يُستخدم لموازنة البيانات غير المتوازنة الأصناف"]
    A --- B1["عن طريق تكرار أمثلة من صنف الأقلية"]
    A --- B2["ويُطلق عليه ايضًا "رفع العيِّنات"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
