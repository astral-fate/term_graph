
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام خبير"}
    Core -->|معالجة| Node0("نظام حاسب يحاكي قدرة الخبير البشري على اتخاذ القرارات في مجال معين بناءً على قاعدة معرفة تتضمن حقائق وقواعد.")
    Node0 -.-> Output[المخرجات]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
