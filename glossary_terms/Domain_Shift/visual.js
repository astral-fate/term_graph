
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تغيُّر المجال"]
    A --- B0["تغيير في توزيع البيانات بين المجال المصدر (مثل بيانات التدريب) والمجال الهدف (مثل بيانات الاختبار)."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
