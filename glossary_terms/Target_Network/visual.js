
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة الهدف"}
    Core -->|معالجة| Node0("نسخة من شبكة عصبية تُستخدم في التعلُّم التعزيزي وتُحدَّث بوتيرة أقل لتحقيق استقرار التعلُّم وتحسين دقة تقدير القيم.")
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
