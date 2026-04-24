
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة عصبية نبضية"}
    Core -->|معالجة| Node0("نوع من الشبكات العصبية التي تحاكي نظام الإشارات الموفر للطاقة في الدماغ")
    Core -->|معالجة| Node1("وتتواصل فيه الخلايا العصبية بطريقة غير متزامنة")
    Core -->|معالجة| Node2("عن طريق القيم الثنائية.")
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
