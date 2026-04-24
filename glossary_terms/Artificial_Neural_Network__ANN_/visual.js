
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة عصبية اصطناعية"}
    Core -->|معالجة| Node0("نموذج حوسبي في الذكاء الاصطناعي مستوحى من الشبكات العصبية البيولوجية لأدمغة الحيوانات")
    Core -->|معالجة| Node1("ويُطلق عليه أيضًا "شبكة عصبية".")
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
