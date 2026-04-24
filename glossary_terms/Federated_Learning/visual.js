
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم مُتَّحِد))
    Start -->|خطوة 1| Step0["طريقة من طُرُق تعلُّم الآلة الموزَّع تُدرِّب النموذج في أجهزة متعددة ببيانات محلية للمحافظة على خصوصية البيانات."]
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
