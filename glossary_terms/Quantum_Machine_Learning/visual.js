
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم الآلة بالكم))
    Start -->|خطوة 1| Step0["مجال يجمع بين حوسبة الكم وخوارزميات تعلُّم الآلة لمعالجة البيانات وحل المشكلات المعقدة بكفاءة أكبر."]
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
