
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام استنتاج عصبي-ضبابي تَّكَيُّفيّ"}
    Core -->|معالجة| Node0("أسلوب يجمع بين المنطق الضبابي والشبكات العصبية")
    Core -->|معالجة| Node1("لتحسين أداء التنبؤ وقابليته للتطبيق.")
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
