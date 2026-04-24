
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"شبكة توليدية تنافسية"}
    Core -->|معالجة| Node0("خوارزمية تعلُّم آلة غير موجَّه مكوَّنة من شبكتين عصبيتين: شبكة مولدة وشبكة تمييزية")
    Core -->|معالجة| Node1("تتنافسان في إطار لعبة صفرية الناتج.")
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
