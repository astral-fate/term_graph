
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بحث إرشادي"]
    A --- B0["أسلوب لإيجاد حل جيد"]
    A --- B1["ليس بالضرورة الحل الأمثل"]
    A --- B2["في غضون فترة زمنية معقولة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
