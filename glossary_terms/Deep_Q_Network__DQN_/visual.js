
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة كيو العميقة"}
    Core -->|معالجة| Node0("خوارزمية تجمع بين التعلُّم التعزيزي والشبكات العصبية العميقة لحل المشكلات المعقدة")
    Core -->|معالجة| Node1("والتعامل مع البيئات الكثيرة الأبعاد.")
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
