
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة عصبية تكرارية"}
    Core -->|معالجة| Node0("نوع من الشبكات العصبية يُستخدم لفهم المعلومات المتسلسلة")
    Core -->|معالجة| Node1("وتحديد الأنماط عن طريق التشغيل عدة مرات.")
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
