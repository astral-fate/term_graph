
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ترجمة الآلة العصبية"]
    A --- B0["طريقة في ترجمة الآلة تستخدم شبكة عصبية اصطناعية كبيرة للتنبؤ باحتمالية تسلسل من الكلمات"]
    A --- B1["وغالبًا ما تكون في جمل كاملة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
