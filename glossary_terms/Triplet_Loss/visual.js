
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خسارة ثلاثية"]
    A --- B0["دالة خسارة تُستخدم للتأكد من أن العناصر المتشابهة قريبة من بعضها بعضًا"]
    A --- B1["والعناصر غير المتشابهة متباعدة في فضاء التضمين."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
