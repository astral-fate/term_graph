
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم منهجي))
    Start -->|خطوة 1| Step0["إستراتيجية تدريب في تعلُّم الآلة"]
    Step0 -->|خطوة 2| Step1["تُدرِّب النماذج على البيانات بتسلسل ذي معنى"]
    Step1 -->|خطوة 3| Step2["بدءًا من الأمثلة الأسهل"]
    Step2 -->|خطوة 4| Step3["ثم التقدم تدريجيًّا إلى الأمثلة الأكثر صعوبة."]
    Step3 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
