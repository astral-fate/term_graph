
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"معمارية الوكيل"}
    Core -->|معالجة| Node0("مخطط لنظام التحكم الخاص بالوكيل")
    Core -->|معالجة| Node1("يوضح مُكوِّنات التحكم والتنظيم الوظيفي.")
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
