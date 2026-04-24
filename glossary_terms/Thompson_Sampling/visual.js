
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أخذ عيِّنات تومبسون"]
    A --- B0["خوارزمية تعلُّم إرشادية تُنفِّذ الأفعال بطريقة متسلسلة لتوازن بين تعظيم الأداء الفوري وتجميع المعلومات الجديدة التي يمكن أن تحسن الأداء في المستقبل."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
