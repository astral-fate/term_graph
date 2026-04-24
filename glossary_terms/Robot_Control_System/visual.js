
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نظام التحكم بالروبوت"}
    Core -->|معالجة| Node0("مجموعة من التحكم المنطقي ووظائف الطاقة التي تتحكم في الهيكل الميكانيكي للروبوت وتواصله مع البيئة المحيطة.")
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
