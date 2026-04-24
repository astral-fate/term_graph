
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم سطحي))
    Start -->|خطوة 1| Step0["نوع من خوارزميات تعلُّم الآلة يحتوي عادةً على طبقة واحدة أو عدد محدود من الطبقات للتعلُّم وتمثيل البيانات."]
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
