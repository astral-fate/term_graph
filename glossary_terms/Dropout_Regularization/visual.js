
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط الإسقاط"]
    A --- B0["أسلوب يُستخدم في تدريب الشبكات العصبية لمنع فرط التخصيص"]
    A --- B1["عن طريق إلغاء تنشيط مجموعة فرعية من الخلايا العصبية بشكل عشوائي أثناء تكرار التدريب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
