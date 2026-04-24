
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استخراج الخصائص"]
    A --- B0["عملية توليد أو اشتقاق متغيرات مفيدة وغير متكررة من البيانات الأولية لوصف خصائص الأشياء أو الكيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
