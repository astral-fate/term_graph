
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"نموذج إضافي مُعمَّم"}
    Core -->|معالجة| Node0("نموذج إحصائي يُتيح علاقات مرنة وغير خطية بين المتغير التابع والمتغيرات المستقلة")
    Core -->|معالجة| Node1("عن طريق الجمع بين النماذج الخطية والدوال السلسة.")
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
