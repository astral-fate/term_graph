
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph LR
    Input[مدخلات] --> Core{"معمارية إدراكية"}
    Core -->|معالجة| Node0("فرضية حول البنية الثابتة للعقل البشري أو الاصطناعي والمعرفة والمهارات المُجسَّدة لإنتاج سلوك ذكي.")
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
