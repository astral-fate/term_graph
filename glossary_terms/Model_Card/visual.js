
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"بطاقة النموذج"}
    Core -->|معالجة| Node0("وثيقة موجزة تقدم معلومات أساسية حول نموذج تعلُّم الآلة")
    Core -->|معالجة| Node1("بما في ذلك غرضه وأداؤه وقيوده واعتباراته الأخلاقية.")
    Node1 -.-> Output[المخرجات]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
