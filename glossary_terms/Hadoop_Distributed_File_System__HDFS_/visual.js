
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام هدوب للملفات الموزَّعة"}
    Core -->|معالجة| Node0("مُحرِّك تخزين مفتوح المصدر")
    Core -->|معالجة| Node1("يعتمد على معمارية نظام ملفات جوجل")
    Core -->|معالجة| Node2("ومصمَّم للتخزين الفاعل للملفات الكبيرة.")
    Node2 -.-> Output[المخرجات]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
