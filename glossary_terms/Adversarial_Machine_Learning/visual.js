
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
    A["تعلُّم الآلة العدائي"] --> B["النموذج العدائي"]
    A --> C["النموذج الدفاعي"]
    
    B --> D["توليد أمثلة عدائية"]
    D --> E["اختبار النموذج"]
    E --> F["حساب التدرج"]
    F --> G["تعديل المدخلات"]
    G --> H["إحداث تشويش"]
    
    C --> I["الكشف عن التهديدات"]
    I --> J["تحليل السلوك"]
    J --> K["تحديد الأنماط العدائية"]
    K --> L["تطوير مضاد"]
    
    H --> M["نموذج متدرب"]
    L --> M
    
    M --> N["تقييم الأداء"]
    N --> O["تحسين المقاومة"]
    O --> P["إعادة التدريب"]
    P --> Q["الحماية المحسّنة"]
    
    Q --> R["التحقق من الأمان"]
    R --> S["النشر النهائي"]
    
    style A fill:#e1f5fe
    style M fill:#fff3e0
    style S fill:#f1f8e9`;
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
${mermaidCode}
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error("Mermaid Error:", e); }
        }
    }, 50);
}
