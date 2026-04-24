
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((سير عمل تعلُّم الآلة))
    Start -->|خطوة 1| Step0["تسلسل من الخطوات التي تؤتمت عملية بناء نماذج تعلُّم الآلة وتدريبها وتقييمها ونشرها."]
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
