
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إم نيست"]
    A --- B0["مجموعة بيانات عامة تشتمل على صور لأرقام مكتوبة بخط اليد تُستخدم لتدريب خوارزميات تعلُّم الآلة الموجَّه واختبارها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
