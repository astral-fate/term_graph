
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إيمج نت"]
    A --- B0["قاعدة بيانات كبيرة للصور تتكون من أكثر من 14 مليون صورة موَصَّفة ومصنَّفة في 20 ألف فئة"]
    A --- B1["معدة لأبحاث رؤية الحاسب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
