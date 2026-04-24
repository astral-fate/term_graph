
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج الانحدار الذاتي"}
    Core -->|معالجة| Node0("نموذج يتنبأ بالقيمة المستقبلية لمتغير ما")
    Core -->|معالجة| Node1("بناءً على قِيَمه السابقة.")
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
