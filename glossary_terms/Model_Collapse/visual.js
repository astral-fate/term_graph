
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"تدهور النموذج"}
    Core -->|معالجة| Node0("تدهور جودة البيانات التي تولدها نماذج الذكاء الاصطناعي مع مرور الوقت")
    Core -->|معالجة| Node1("بسبب تدريب النماذج على بيانات أنتجتها نماذج ذكاء اصطناعي.")
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
