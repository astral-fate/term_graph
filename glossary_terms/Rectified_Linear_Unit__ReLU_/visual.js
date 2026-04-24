
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["وحدة خطية مصححة ريلو"]
    A --- B0["دالة تنشيط تُعطي القيمة صفرًا إذا كان المُدْخَل سالبًا أو صفرًا"]
    A --- B1["وتعطي القيمة نفسها إذا كان المُدْخَل موجبًا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
