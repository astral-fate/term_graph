
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["آلة المُتَّجهات الداعمة"]
    A --- B0["نموذج تعلُّم آلة موجَّه يُستخدم في تصنيف البيانات وتحليل الانحدار"]
    A --- B1["لإيجاد حدود قرار ذات هوامش قصوى."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
