
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بؤرة تجميع"]
    A --- B0["مركز مجموعة محدد بواسطة خوارزمية تجميع"]
    A --- B1["مثل: خوارزميات تجميع بالمتوسط أو بالوسيط."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
