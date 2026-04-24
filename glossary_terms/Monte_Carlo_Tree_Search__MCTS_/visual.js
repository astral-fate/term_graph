
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"بحث مونت كارلو الشجري"}
    Root -->|مسار أ| L1("خوارزمية لصنع القرار تبحث عن القرارات المثلى في مجال معين")
    Root -->|مسار ب| R1("عن طريق الجمع بين محاكاة مونت كارلو وطريقة البحث الشجري.")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
