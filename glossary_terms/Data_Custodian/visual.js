
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أمين البيانات"]
    A --- B0["شخص أو مؤسسة مسؤولة عن توفير البنية التحتية لتقنية المعلومات وحماية البيانات وفقًا لسياسات حوكمة البيانات وممارساتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
