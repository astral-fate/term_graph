
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر بمثال واحد"]
    A --- B0["أسلوب في هندسة الأوامر يُعطى فيه النموذج مثالًا واحدًا للمهمة المطلوبة ضمن الأمر المُدخَل."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
