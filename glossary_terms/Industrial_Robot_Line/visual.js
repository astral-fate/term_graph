
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مسار روبوت صناعي"]
    A --- B0["مجموعة من خلايا الروبوتات الصناعية التي تؤدي بعض الوظائف مع المعدات المرتبطة بها في أماكن محمية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
