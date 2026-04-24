
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تفاعل بين الإنسان والروبوت"]
    A --- B0["مجال يركز على تبادل المعلومات والأفعال بين الإنسان والروبوت لأداء المهام عن طريق واجهة المستخدم."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
