
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام تنبؤي"}
    Core -->|معالجة| Node0("تطبيق تعلُّم آلة قادر على اكتشاف العلاقات بين المتغيرات في مجموعات البيانات السابقة من أجل التنبؤ بالنتائج المستقبلية.")
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
