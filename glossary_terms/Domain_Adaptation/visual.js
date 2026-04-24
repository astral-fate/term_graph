
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تكييف المجال"]
    A --- B0["مجال فرعي من مجالات تعلُّم الآلة يهدف إلى تطبيق خوارزمية سبق تدريبها في مجال معين على مجال آخر له ارتباط بالمجال الأول."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
