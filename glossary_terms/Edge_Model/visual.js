
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج طرفي"}
    Core -->|معالجة| Node0("نموذج يعمل على الأجهزة الطرفية")
    Core -->|معالجة| Node1("مثل أجهزة الاستشعار وأجهزة إنترنت الأشياء")
    Core -->|معالجة| Node2("ويتيح معالجة البيانات محليًّا.")
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
