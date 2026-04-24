
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم الآلة المُصغَّر))
    Start -->|خطوة 1| Step0["مجال فرعي من تعلُّم الآلة يركز على تشغيل نماذج تعلُّم الآلة على الأجهزة المحدودة الموارد"]
    Step0 -->|خطوة 2| Step1["مثل أجهزة إنترنت الأشياء ووحدات التحكم الدقيقة."]
    Step1 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
