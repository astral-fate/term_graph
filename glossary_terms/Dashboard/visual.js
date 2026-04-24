
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["لوحة معلومات"]
    A --- B0["واجهة مستخدم رسومية تجمع المعلومات والتصويرات لعرض المقاييس أو المعايير أو المؤشرات التي تساعد في المراقبة واتخاذ القرار."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
