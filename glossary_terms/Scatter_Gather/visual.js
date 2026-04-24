
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توزيع-تجميع"]
    A --- B0["نوع من معالجة البيانات الكبيرة يُوزِّع الحوسبة المطلوبة عبر عُقَد مختلفة"]
    A --- B1["ثم يُجمِّع النتائج الإجمالية من كل عقدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
