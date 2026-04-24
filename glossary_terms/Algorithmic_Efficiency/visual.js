
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((كفاءة خوارزمية))
    Start -->|خطوة 1| Step0["مقياس لحساب متوسط الوقت اللازم للخوارزمية لتنفذ العمل كاملًا على مجموعة من البيانات."]
    Step0 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
