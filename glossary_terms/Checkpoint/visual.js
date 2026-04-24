
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نقطة حفظ"]
    A --- B0["حفظ نسخة من متغيرات النموذج في نقطة زمنية معينة"]
    A --- B1["على وجه يُتيح تصدير أوزان النموذج وأداء التدريب عبر جلسات متعددة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
