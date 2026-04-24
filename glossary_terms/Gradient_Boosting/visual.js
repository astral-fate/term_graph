
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تعزيز تدرجي"]
    A --- B0["أسلوب في تعلُّم الآلة يُستخدم في التصنيف والانحدار لإنشاء نموذج تنبؤ قوي من نماذج تنبؤ ضعيفة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
