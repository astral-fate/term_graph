
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُرَمِّز تلقائي متغير"]
    A --- B0["شبكة عصبية تتعلم ضغط البيانات إلى تمثيل قليل الأبعاد"]
    A --- B1["ثم إعادة بناء البيانات الأصلية من التمثيل المضغوط."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
