
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((أوامر الاستدلال والتصرف))
    Start -->|خطوة 1| Step0["أسلوب في هندسة الأوامر يجمع بين الاستدلال والتصرف لتمكين النماذج من حل مهام متنوعة في الاستدلال واتخاذ القرار."]
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
