
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["روبوت خدمي شخصي"]
    A --- B0["روبوت يستخدمه الشخص العادي لأداء مهام غير تجارية"]
    A --- B1["ويُطلق عليه أيضًا "روبوت شخصي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
