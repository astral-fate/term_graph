
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذاكرة قصيرة المدى مُطَوَّلة"]
    A --- B0["نوع من الشبكات العصبية التكرارية التي تعالج تسلسل البيانات بأداء مقبول لكل التوابع الطويلة والقصيرة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
