
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات متعددة الهياكل"]
    A --- B0["عملية تحليل البيانات ذات الأشكال المختلفة"]
    A --- B1["بما في ذلك الصيغ المهيكلة وشبه المهيكلة وغير المهيكلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
