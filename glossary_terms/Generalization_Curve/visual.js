
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["منحنى التعميم"]
    A --- B0["منحنى خسارة يوضح مجموعة التدريب"]
    A --- B1["ومجموعة التحقق"]
    A --- B2["للمساعدة في اكتشاف فرط التخصيص."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
