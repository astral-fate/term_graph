
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خليط من الخبراء"]
    A --- B0["أسلوب في تعلُّم الآلة يُقسِّم النموذج إلى شبكات فرعية متعددة تعمل معًا في مهمة ما"]
    A --- B1["وتتخصص كل منها في مجموعة فرعية معينة من البيانات المُدْخَلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
