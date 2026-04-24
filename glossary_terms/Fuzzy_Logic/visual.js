
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"منطق ضبابي"}
    Root -->|مسار أ| L1("نوع من أنواع النُّظُم المنطقية يُتيح التعبير بطريقة موسعة عن البيانات المنطقية")
    Root -->|مسار ب| R1("عن طريق توفير تمييز متعدد القيم بين الصواب والخطأ.")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
