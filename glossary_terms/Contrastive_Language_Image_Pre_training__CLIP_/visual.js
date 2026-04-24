
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تدريب سابق تبايني للنصوص والصور"]
    A --- B0["نموذج شبكة عصبية يتعلم ربط الصور بأوصاف نصية عن طريق التدريب على مجموعة بيانات ضخمة من أزواج الصور والنصوص."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
