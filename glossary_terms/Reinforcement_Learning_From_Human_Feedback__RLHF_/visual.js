
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم تعزيزي بالتغذية الراجعة البشرية))
    Start -->|خطوة 1| Step0["أسلوب لتحسين جودة مخرجات النماذج عن طريق دمج التغذية الراجعة من التفاعلات أو التقييمات البشرية."]
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
