
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة دالة القاعدة الشعاعية"}
    Core -->|معالجة| Node0("شبكة عصبية اصطناعية تستخدم دالة الأساس النصف قطرية كدالة تنشيط لمهام التصنيف غير الخطية.")
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
