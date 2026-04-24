
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"معايرة النموذج"}
    Core -->|معالجة| Node0("عملية تعديل تنبؤات النموذج لتتناسب مع النتائج الفعلية بصورة أفضل")
    Core -->|معالجة| Node1("وتحسين الدقة والموثوقية.")
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
