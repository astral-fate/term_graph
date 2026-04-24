
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["آلة بولتزمان المقيدة"]
    A --- B0["شبكة عصبية اصطناعية عشوائية تتعلَّم توزيع الاحتمالات على المُدْخَلات"]
    A --- B1["عن طريق تطبيق نماذج شبكية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
