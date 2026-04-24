
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج تمييزي"}
    Core -->|معالجة| Node0("نموذج يُستخدم في التصنيف والانحدار للتنبؤ بالأسماء")
    Core -->|معالجة| Node1("عن طريق تحديد الاحتمال الشرطي للمخرجات بالنظر إلى الخصائص والأوزان")
    Core -->|معالجة| Node2("ويُطلق عليه أيضًا "نموذج شرطي".")
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
