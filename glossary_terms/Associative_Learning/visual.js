
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم ترابطي))
    Start -->|خطوة 1| Step0["أسلوب من أساليب تعلُّم الآلة قائم على قواعد لاكتشاف العلاقات المهمة بين الخصائص أو المتغيرات في مجموعة البيانات."]
    Step0 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
