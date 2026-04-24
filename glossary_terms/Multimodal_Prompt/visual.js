
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أمر متعدد الصيغ"]
    A --- B0["نوع من الأوامر يتضمن أنواعًا متعددة من البيانات"]
    A --- B1["مثل النصوص والصور"]
    A --- B2["لتوجيه استجابات النموذج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
