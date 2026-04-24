
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة عصبية كبسولية"}
    Core -->|معالجة| Node0("شبكة عصبية اصطناعية تتكون من مجموعة من الخلايا العصبية (كبسولات)")
    Core -->|معالجة| Node1("تُمثِّل مُعامِلات إنشاء لكيان معين.")
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
