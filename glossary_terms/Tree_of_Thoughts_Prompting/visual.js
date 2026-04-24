
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"أوامر شجرة الأفكار"}
    Root -->|مسار أ| L1("أسلوب في هندسة الأوامر يُمكِّن النموذج من توليد واستكشاف مسارات استدلال متعددة")
    Root -->|مسار ب| R1("مثل فروع الشجرة")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
