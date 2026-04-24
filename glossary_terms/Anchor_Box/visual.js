
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إطار مرجعي"]
    A --- B0["إطار تحديد بارتفاع وعرض محددين سابقًا"]
    A --- B1["يساعد في اكتشاف الأشياء المتداخلة والأشياء ذات المقاييس المختلفة داخل الصورة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
