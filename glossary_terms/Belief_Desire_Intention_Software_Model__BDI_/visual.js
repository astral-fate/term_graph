
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج برمجي للمعتقدات والرغبات والمقاصد"}
    Core -->|معالجة| Node0("إطار لتصميم وتنفيذ وكلاء أذكياء يحاكون البشر في الاستدلال واتخاذ القرارات.")
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
