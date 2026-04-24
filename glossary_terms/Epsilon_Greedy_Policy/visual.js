
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سياسة إبسيلون الجشعة"]
    A --- B0["سياسة في التعلُّم التعزيزي تتبع سياسة عشوائية مع احتمال إبسيلون أو سياسة الجشع."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
