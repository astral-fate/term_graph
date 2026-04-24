
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة حالة الصدى"}
    Core -->|معالجة| Node0("نوع من حوسبة المكامن ينشئ شبكة تكرارية متصلة عشوائيًّا ويدرب أوزان اتصال مناسبة لإنتاج المخرجات المرغوبة.")
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
