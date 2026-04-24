
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام توصيات"}
    Core -->|معالجة| Node0("نظام يوصي المستخدمين بمجموعة من العناصر بناءً على اختياراتهم وسلوكياتهم")
    Core -->|معالجة| Node1("يُطلق عليه أيضًا "مُحَرِّك توصيات".")
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
