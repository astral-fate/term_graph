/**
 * Term Graph — بيان المصطلح (client app; was inline in index.html).
 * Global functions stay on window for onclick= handlers in markup.
 */
  // --- STATE ---
  let glossaryData = { terms: [], tracks: {} };
  let terms = [];
  let currentTerm = null;
  const storedLang = localStorage.getItem('mustalih_lang');
  let currentLang = ['ar', 'en', 'fr'].includes(storedLang) ? storedLang : 'en'; // Global language state
  let currentStoryTrackId = null;
  let currentChapterPos = null;
  /** Last i18n dict from setLanguage — used by flashcards before next language switch. */
  let currentUiDict = null;
  /** Same-origin Pages Function → NVIDIA; never call NVIDIA's integrate chat host from the browser (CORS). */
  function nvidiaChatProxyUrl() {
    try {
      if (typeof location !== 'undefined' && location.origin && location.protocol !== 'file:') {
        return new URL('/api/v1/chat/completions', location.origin).href;
      }
    } catch (e) {}
    return '/api/v1/chat/completions';
  }
  if (typeof window !== 'undefined') {
    window.nvidiaChatProxyUrl = nvidiaChatProxyUrl;
  }

  function getStoredTheme() {
    try {
      const t = localStorage.getItem('mustalih_theme');
      if (t === 'light' || t === 'dark' || t === 'system') return t;
    } catch (e) {}
    return 'system';
  }

  function isEffectiveDark() {
    const t = document.documentElement.getAttribute('data-theme') || getStoredTheme();
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function syncColorSchemeHint() {
    document.documentElement.style.colorScheme = isEffectiveDark() ? 'dark' : 'light';
  }

  function applyMermaidThemeForDocument() {
    if (typeof mermaid === 'undefined') return;
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isEffectiveDark() ? 'dark' : 'neutral',
        securityLevel: 'loose'
      });
    } catch (e) {}
    document.querySelectorAll('.mermaid').forEach((el) => el.removeAttribute('data-processed'));
    const nodes = document.querySelectorAll('.mermaid');
    if (nodes.length) {
      try {
        mermaid.init(undefined, nodes);
      } catch (e) {
        console.warn('mermaid reinit', e);
      }
    }
  }

  function updateThemeSwitch() {
    const t = document.documentElement.getAttribute('data-theme') || getStoredTheme();
    document.querySelectorAll('#global-theme-switch button').forEach((btn) => {
      const mode = btn.getAttribute('data-theme-mode');
      const on = mode === t;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    syncColorSchemeHint();
  }

  function setTheme(theme) {
    if (!['light', 'dark', 'system'].includes(theme)) theme = 'system';
    try {
      localStorage.setItem('mustalih_theme', theme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeSwitch();
    applyMermaidThemeForDocument();
  }

  function setLanguage(lang) {
    if (!['ar', 'en', 'fr'].includes(lang)) lang = 'en';
    currentLang = lang;
    localStorage.setItem('mustalih_lang', lang);
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';

    // UI Dictionary
    const ui = {
      ar: {
        home: "الرئيسية", graph: "مخطط المعرفة", story: "مسارات القصة", anatomy: "تشريح المحول", detail: "تفاصيل المصطلح", rewrite: "أداة إعادة الكتابة", flash: "بطاقات الاستذكار",
        brand_t: "Term Graph - بيان المصطلح", brand_s: "قاموس تفاعلي يركز على العربية · بُني على 1,242 مصطلحاً من ICAIRE",
        hero: "بيان المصطلح: خريطة تفاعلية للذكاء الاصطناعي، بالعربية أولاً",
        loading: "جارٍ تحميل بيانات المسرد…",
        status: (n) => `تم تحميل ${n} مصطلحاً بنجاح من قاعدة بياناتك. ابحث أو اختر مصطلحاً للاستكشاف.`,
        story_h: "مسارات القصة",
        story_p: "رحلات زمنية عبر المسرد. يجمع كل مسار المصطلحات في فصولاً مروية لتجربة تعلم أوضح.",
        quiz_mc: "اختيار من متعدد",
        quiz_rev: "بحث عكسي",
        quiz_export: "تصدير لأنكي",
        quiz_prompt_mc: "أي تعريف يطابق هذا المصطلح؟",
        quiz_prompt_rev: "أي مصطلح يطابق هذا التعريف؟",
        quiz_streak: (n) => `سلسلة ${n} · مراجعة قريبة`,
        quiz_card: "بطاقة",
        quiz_of: "من",
        quiz_prev_title: "السابق (سهم يسار)",
        quiz_next_title: "تخطي (سهم يمين)",
        stats_terms: "إجمالي المصطلحات", stats_tracks: "مسارات القصة", stats_edges: "روابط المخطط", stats_uml: "مخططات UML",
        featured: "مصطلحات مختارة من قاعدة بياناتك",
        search: "ابحث في 1,242 مصطلحاً بالعربية أو الإنجليزية أو الفرنسية...",
        feat_graph_t: "استكشف مخطط المعرفة", feat_graph_p: "1,242 عقدة، 50+ تكتلاً، روابط لأنواع العلاقات بين المفاهيم.",
        feat_story_t: "اتبع مسار القصة", feat_story_p: "7 روايات زمنية من أسس البيانات إلى الذكاء الاصطناعي الموثوق.",
        feat_anatomy_t: "تشريح المحول", feat_anatomy_p: "انقر على أي جزء من المحول لرؤية المصطلح والتعريف والمخطط.",
        feat_detail_t: "تفاصيل المصطلح", feat_detail_p: "التشبيه، مخطط UML، النطق الصوتي، المتطلبات، كود بايثون.",
        feat_rewrite_t: "إعادة الكتابة والتصحيح", feat_rewrite_p: "صحح نصوص الذكاء الاصطناعي العربية وفقاً لمصطلحات ICAIRE المعتمدة.",
        feat_flash_t: "البطاقات والاختبارات", feat_flash_p: "اختبارات مولدة آلياً، تكرار متباعد، وتصدير لبرنامج Anki.",
        feat_graph_f: "شبكة تفاعلية", feat_story_f: "سرد قصصي", feat_anatomy_f: "مبني على الرسوم", feat_detail_f: "عرض لكل مصطلح", feat_rewrite_f: "مدقق إملائي للذكاء الاصطناعي", feat_flash_f: "استذكار نشط",
        detail_view_h: "تفاصيل المصطلح",
        detail_view_p: "مخرجات الإثراء لكل مصطلح: الشعور، التشبيه، التعريف، أمثلة، مخطط UML، المتطلبات وعلاقات المخطط (نوع من، يقابل، …)، الرياضيات والكود.",
        rewrite_view_h: "إعادة الكتابة والتصحيح",
        rewrite_view_p: "الصق نصاً عربياً. يُسترجع أولاً أقرب ثلاثيات مصطلحات (إنجليزي|عربي|فرنسي) من ملف المسرد، ثم يُستدعى نموذج NVIDIA لإعادة الصياغة (راجع المخرجات).",
        rewrite_before_h: "قبل · النص",
        rewrite_after_h: "بعد · مخرجات النموذج",
        rewrite_placeholder: "الصق الفقرة العربية هنا…",
        rewrite_run: "تشغيل",
        rewrite_clear: "مسح",
        rewrite_footer_hint: "المخرجات اقتراحات تحريرية؛ راجعها قبل النشر.",
        rewrite_streaming: "جارٍ الاستلام…",
        rewrite_done: "تم",
        rewrite_need_text: "الصق نصاً أولاً.",
        rewrite_matching_glossary: "مطابقة المسرد (RAG)…",
        rewrite_err: "خطأ: ",
        rewrite_ref_kicker: "مرجع تصميم · قالب إداري (عرض توضيحي)",
        rewrite_ref_h_before: "قبل · النص الأصلي",
        rewrite_ref_h_after: "بعد · صياغة ICAIRE المعتمدة",
        rewrite_ref_mock_flags: "4 تنبيهات",
        rewrite_ref_mock_fixed: "✓ 4 تصحيحات",
        rewrite_ref_mock_footer_before: "4 مصطلحات مُعلَّمة · 3 غير معيارية، 1 دون ترجمة",
        rewrite_ref_mock_footer_after: "جميع المصطلحات محاذية لمسرد ICAIRE",
        rewrite_ref_btn_changelog: "سجل التغييرات",
        rewrite_ref_btn_export: "تصدير .docx",
        rewrite_ref_btn_report: "تقرير التناسق",
        rewrite_ref_btn_apply: "تطبيق كل التصحيحات",
        rewrite_ref_actions_note: "أزرار تجريبية غير فعّالة — للعرض فقط.",
        rewrite_live_heading: "جرب بنصك",
        rewrite_live_sub: "أدخل فقرة عربية أدناه، ثم اضغط تشغيل لتدفق المخرجات (RAG + NVIDIA).",
        track_label: (n) => `المسار ${n}`, chapter_label: (n) => `الفصل ${n}`, in_chapter: "في هذا الفصل",
        graph_h: "مخطط المعرفة", graph_p: "كل مصطلح هو عقدة؛ كل رابط له نوع. يتم اكتشاف التكتلات تلقائياً. حجم العقدة = PageRank.",
        all_terms: "الكل",
        flash_h: "البطاقات والاختبارات", flash_p: "اختبارات مولدة آلياً من قاعدة البيانات. اختر مستوى الصعوبة للتركيز على تعلمك.",
        diff_all: "كافة المستويات", diff_easy: "سهل", diff_int: "متوسط", diff_hard: "صعب",
        theme_light: "فاتح", theme_dark: "داكن", theme_auto: "تلقائي", theme_aria: "مظهر الألوان"
      },
      en: {
        home: "Home", graph: "Knowledge graph", story: "Story tracks", anatomy: "Transformer anatomy", detail: "Term detail", rewrite: "Rewrite tool", flash: "Flashcards",
        brand_t: "Term Graph - بيان المصطلح", brand_s: "Arabic-first interactive glossary · built on 1,242 ICAIRE terms",
        hero: "Term Graph — an Arabic-first map of AI",
        loading: "Loading glossary data…",
        status: (n) => `Successfully loaded ${n} terms from your database. Search or click a term below to explore.`,
        story_h: "Story tracks", story_p: "Chronological journeys through the glossary. Each track groups terms into narrated chapters for a cinematic learning experience.",
        quiz_mc: "Multiple choice",
        quiz_rev: "Reverse lookup",
        quiz_export: "Export to Anki",
        quiz_prompt_mc: "Which definition matches this term?",
        quiz_prompt_rev: "Which term matches this definition?",
        quiz_streak: (n) => `streak ${n} · next review soon`,
        quiz_card: "Card",
        quiz_of: "of",
        quiz_prev_title: "Previous (left arrow)",
        quiz_next_title: "Skip (right arrow)",
        stats_terms: "Total Terms", stats_tracks: "Story Tracks", stats_edges: "Graph edges", stats_uml: "UML diagrams",
        featured: "Featured terms from your database",
        search: "Search 1,242 terms in Arabic, English, or French...",
        feat_graph_t: "Explore the knowledge graph", feat_graph_p: "1,242 nodes, 50+ clusters, typed edges for prerequisites and unlocks.",
        feat_story_t: "Follow a story track", feat_story_p: "7 chronological narratives from data foundations to trustworthy AI.",
        feat_anatomy_t: "Transformer anatomy", feat_anatomy_p: "Click any part of a Transformer figure to see details and Mermaid diagrams.",
        feat_detail_t: "Rich term detail", feat_detail_p: "Metaphors, UML flows, audio, code examples, and math notation.",
        feat_rewrite_t: "Rewrite with correction", feat_rewrite_p: "Paste Arabic text to flag non-canonical terms against ICAIRE vocabulary.",
        feat_flash_t: "Flashcards & quizzes", feat_flash_p: "Auto-generated distractors, spaced repetition, and Anki export.",
        feat_graph_f: "interactive network", feat_story_f: "scrollytelling", feat_anatomy_f: "figure-based", feat_detail_f: "per-term view", feat_rewrite_f: "Grammarly for Arabic AI", feat_flash_f: "active recall",
        detail_view_h: "Term detail",
        detail_view_p: "Enrichment output per term — feel, metaphor, definition, examples, UML, prerequisites, and graph relations (is-a, part-of, contrasts, related, …), math, and code.",
        rewrite_view_h: "Rewrite with correction",
        rewrite_view_p: "Paste Arabic AI/ML text. Top matching glossary triplets (en|ar|fr) load from data/rag_terms_index.json, then an NVIDIA model streams a revision — review before publishing.",
        rewrite_before_h: "Before · your text",
        rewrite_after_h: "After · model output",
        rewrite_placeholder: "Paste Arabic paragraph here…",
        rewrite_run: "Run",
        rewrite_clear: "Clear",
        rewrite_footer_hint: "Output is machine-generated; verify terminology for your context.",
        rewrite_streaming: "Streaming…",
        rewrite_done: "Done",
        rewrite_need_text: "Paste some text first.",
        rewrite_matching_glossary: "Matching glossary (RAG)…",
        rewrite_err: "Error: ",
        rewrite_ref_kicker: "Design reference · admin template (illustrative)",
        rewrite_ref_h_before: "Before · original text",
        rewrite_ref_h_after: "After · ICAIRE canonical",
        rewrite_ref_mock_flags: "4 flags",
        rewrite_ref_mock_fixed: "✓ 4 fixes applied",
        rewrite_ref_mock_footer_before: "4 terms flagged · 3 non-canonical, 1 untranslated",
        rewrite_ref_mock_footer_after: "All terms aligned with ICAIRE glossary",
        rewrite_ref_btn_changelog: "View change log",
        rewrite_ref_btn_export: "Export .docx",
        rewrite_ref_btn_report: "Consistency report",
        rewrite_ref_btn_apply: "Apply all fixes",
        rewrite_ref_actions_note: "Demo actions — inactive (template only).",
        rewrite_live_heading: "Try your own text",
        rewrite_live_sub: "Paste a paragraph below, then Run for streamed output (RAG + NVIDIA proxy).",
        track_label: (n) => `Track ${n}`, chapter_label: (n) => `Chapter ${n}`, in_chapter: "In this chapter",
        graph_h: "Knowledge graph", graph_p: "Every term is a node; every edge is typed. Clusters auto-discovered. Node size = PageRank.",
        all_terms: "All",
        flash_h: "Flashcards & quizzes", flash_p: "Auto-generated distractors from the enrichment pipeline. Choose a difficulty level to focus your learning.",
        diff_all: "All Levels", diff_easy: "Easy", diff_int: "Intermediate", diff_hard: "Hard",
        theme_light: "Light", theme_dark: "Dark", theme_auto: "Auto", theme_aria: "Color theme"
      }
    };
    ui.fr = {
      ...ui.en,
      home: "Accueil", graph: "Graphe", story: "Parcours", anatomy: "Anatomie", detail: "Détail", rewrite: "Correction", flash: "Flashcards",
      brand_t: "Term Graph - بيان المصطلح", brand_s: "Glossaire IA interactif · basé sur 1 242 termes ICAIRE",
      hero: "Term Graph — une carte interactive de l'IA, en arabe d'abord",
      loading: "Chargement du glossaire…",
      status: (n) => `${n} termes chargés avec succès. Recherchez ou cliquez sur un terme pour explorer.`,
      quiz_mc: "QCM",
      quiz_rev: "Sens inverse",
      quiz_export: "Exporter vers Anki",
      quiz_prompt_mc: "Quelle définition correspond à ce terme ?",
      quiz_prompt_rev: "Quel terme correspond à cette définition ?",
      quiz_streak: (n) => `Série ${n} · prochaine révision bientôt`,
      quiz_card: "Carte",
      quiz_of: "sur",
      quiz_prev_title: "Précédent (flèche gauche)",
      quiz_next_title: "Passer (flèche droite)",
      search: "Recherchez 1 242 termes en arabe, anglais ou français...",
      feat_graph_f: "réseau interactif", feat_story_f: "scrollytelling", feat_anatomy_f: "basé sur l'image", feat_detail_f: "vue par terme", feat_rewrite_f: "Correcteur IA", feat_flash_f: "rappel actif",
      detail_view_h: "Détail du terme",
      detail_view_p: "Données enrichies par terme — ressenti, métaphore, définition, exemples, UML, prérequis et relations du graphe, maths et code.",
      rewrite_view_h: "Réécriture et correction",
      rewrite_view_p: "Collez un texte arabe. Les triplets de termes (en|ar|fr) les plus proches sont chargés depuis data/rag_terms_index.json, puis un modèle NVIDIA propose une révision — à relire.",
      rewrite_before_h: "Avant · votre texte",
      rewrite_after_h: "Après · sortie du modèle",
      rewrite_placeholder: "Collez le paragraphe arabe ici…",
      rewrite_run: "Lancer",
      rewrite_clear: "Effacer",
      rewrite_footer_hint: "Sortie générée par un modèle : vérifiez la terminologie.",
      rewrite_streaming: "Réception…",
      rewrite_done: "Terminé",
      rewrite_need_text: "Collez d'abord du texte.",
      rewrite_matching_glossary: "Correspondance glossaire (RAG)…",
      rewrite_err: "Erreur : ",
      rewrite_ref_kicker: "Référence design · gabarit admin (illustratif)",
      rewrite_ref_h_before: "Avant · texte original",
      rewrite_ref_h_after: "Après · canonique ICAIRE",
      rewrite_ref_mock_flags: "4 signalements",
      rewrite_ref_mock_fixed: "✓ 4 corrections",
      rewrite_ref_mock_footer_before: "4 termes signalés · 3 non canoniques, 1 non traduit",
      rewrite_ref_mock_footer_after: "Termes alignés sur le glossaire ICAIRE",
      rewrite_ref_btn_changelog: "Journal des changements",
      rewrite_ref_btn_export: "Exporter .docx",
      rewrite_ref_btn_report: "Rapport de cohérence",
      rewrite_ref_btn_apply: "Appliquer toutes les corrections",
      rewrite_ref_actions_note: "Actions de démo — inactives (gabarit seulement).",
      rewrite_live_heading: "Votre texte",
      rewrite_live_sub: "Collez un paragraphe ci-dessous, puis Lancer pour la sortie en flux (RAG + proxy NVIDIA).",
      story_h: "Parcours", story_p: "Voyages chronologiques à travers le glossaire. Chaque parcours regroupe les termes en chapitres pour une expérience d'apprentissage.",
      track_label: (n) => `Parcours ${n}`, chapter_label: (n) => `Chapitre ${n}`, in_chapter: "Dans ce chapitre",
      graph_h: "Graphe de connaissances", graph_p: "Chaque terme est un nœud. Les clusters sont auto-découverts. Taille du nœud = PageRank.",
      all_terms: "Tous",
      flash_h: "Flashcards & quiz", flash_p: "Quiz générés automatiquement. Choisissez un niveau de difficulté.",
      diff_all: "Tous les niveaux", diff_easy: "Facile", diff_int: "Intermédiaire", diff_hard: "Difficile",
      theme_light: "Clair", theme_dark: "Sombre", theme_auto: "Auto", theme_aria: "Thème couleurs"
    };

    const dict = isAr ? ui.ar : (isFr ? ui.fr : ui.en);
    currentUiDict = dict;

    // Update button states
    document.querySelectorAll('#global-lang-switch button').forEach((btn, idx) => {
      const langs = ['ar', 'en', 'fr'];
      btn.classList.toggle('active', langs[idx] === lang);
    });
    
    // Global Direction & Font
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.dir = isAr ? 'rtl' : 'ltr';
    document.body.style.fontFamily = isAr ? 'var(--font-ar)' : 'var(--font-main)';

    // Update Brand Text
    const bTitle = document.querySelector('.brand-text .title'); if(bTitle) bTitle.textContent = dict.brand_t;
    const bSub = document.querySelector('.brand-text .subtitle'); if(bSub) bSub.textContent = dict.brand_s;

    // Update Tabs
    const tabBtns = document.querySelectorAll('.tab');
    tabBtns[0].textContent = dict.home;
    tabBtns[1].textContent = dict.graph;
    tabBtns[2].textContent = dict.story;
    tabBtns[3].textContent = dict.anatomy;
    tabBtns[4].textContent = dict.detail;
    tabBtns[5].textContent = dict.rewrite;
    tabBtns[6].textContent = dict.flash;

    // Update Story View
    const storyH2 = document.querySelector('[data-view="story"] h2'); if(storyH2) storyH2.textContent = dict.story_h;
    const storyP = document.querySelector('[data-view="story"] p'); if(storyP) storyP.textContent = dict.story_p;
    const inChapter = document.querySelector('.term-pane .pane-kicker'); if(inChapter) inChapter.textContent = dict.in_chapter;

    // Update Graph View
    const graphH2 = document.querySelector('[data-view="graph"] h2'); if(graphH2) graphH2.textContent = dict.graph_h;
    const graphP = document.querySelector('[data-view="graph"] p'); if(graphP) graphP.textContent = dict.graph_p;

    const detailVH = document.getElementById('detail-view-title');
    const detailVP = document.getElementById('detail-view-desc');
    if (detailVH && dict.detail_view_h) detailVH.textContent = dict.detail_view_h;
    if (detailVP && dict.detail_view_p) detailVP.textContent = dict.detail_view_p;
    if (window.RewriteToolView && typeof window.RewriteToolView.applyLabels === 'function') {
      window.RewriteToolView.applyLabels(dict);
    }

    // Update Flash View
    const flashH2 = document.querySelector('[data-view="flash"] h2'); if(flashH2) flashH2.textContent = dict.flash_h;
    const flashP = document.querySelector('[data-view="flash"] p'); if(flashP) flashP.textContent = dict.flash_p;
    const diffChips = document.querySelectorAll('#quiz-filters .chip');
    if(diffChips.length >= 4) {
      diffChips[0].innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><path d="M4 6h16M4 12h16M4 18h16"/></svg>${dict.diff_all}`;
      diffChips[1].textContent = dict.diff_easy;
      diffChips[2].textContent = dict.diff_int;
      diffChips[3].textContent = dict.diff_hard;
    }

    // Update Anatomy View
    const anaH2 = document.querySelector('[data-view="anatomy"] h2'); if(anaH2) anaH2.textContent = dict.anatomy_h;
    const anaP = document.querySelector('[data-view="anatomy"] p'); if(anaP) anaP.textContent = dict.anatomy_p;
    const anaLabels = {
      'ana-out': dict.ana_out, 'ana-enc': dict.ana_enc, 'ana-ff': dict.ana_ff, 'ana-norm1': dict.ana_norm,
      'ana-norm2': dict.ana_norm, 'ana-mha': dict.ana_mha, 'ana-emb': dict.ana_emb, 'ana-pos': dict.ana_pos, 
      'ana-tok': dict.ana_tok, 'ana-input': dict.ana_input
    };
    Object.entries(anaLabels).forEach(([id, txt]) => {
      const el = document.getElementById(id); if(el) el.textContent = txt;
    });
    const hsLabels = [dict.step_tok, dict.step_emb, dict.step_att, dict.step_trans, dict.step_out];
    document.querySelectorAll('.hs-label').forEach((el, i) => { if(hsLabels[i]) el.textContent = hsLabels[i]; });

    const anaBtns = document.querySelectorAll('.anatomy-side .btn');
    if(anaBtns.length >= 4) {
      anaBtns[0].textContent = `▸ ${dict.btn_audio}`;
      anaBtns[1].textContent = dict.btn_uml;
      anaBtns[2].textContent = dict.btn_detail;
      anaBtns[3].textContent = dict.btn_related;
    }

    // Update Feature Cards
    const statsLabels = document.querySelectorAll('.stat-label');
    if(statsLabels.length >= 4) {
      statsLabels[0].textContent = dict.stats_terms;
      statsLabels[1].textContent = dict.stats_tracks;
      statsLabels[2].textContent = dict.stats_edges;
      statsLabels[3].textContent = dict.stats_uml;
    }
    const featTitle = document.querySelector('.card h3'); if(featTitle) featTitle.textContent = dict.featured;
    
    // Update Feature Cards
    const featCards = document.querySelectorAll('.feature-card');
    if(featCards.length >= 6) {
      featCards[0].querySelector('h3').textContent = dict.feat_graph_t; featCards[0].querySelector('p').textContent = dict.feat_graph_p; featCards[0].querySelector('.feature-footer').textContent = dict.feat_graph_f;
      featCards[1].querySelector('h3').textContent = dict.feat_story_t; featCards[1].querySelector('p').textContent = dict.feat_story_p; featCards[1].querySelector('.feature-footer').textContent = dict.feat_story_f;
      featCards[2].querySelector('h3').textContent = dict.feat_anatomy_t; featCards[2].querySelector('p').textContent = dict.feat_anatomy_p; featCards[2].querySelector('.feature-footer').textContent = dict.feat_anatomy_f;
      featCards[3].querySelector('h3').textContent = dict.feat_detail_t; featCards[3].querySelector('p').textContent = dict.feat_detail_p; featCards[3].querySelector('.feature-footer').textContent = dict.feat_detail_f;
      featCards[4].querySelector('h3').textContent = dict.feat_rewrite_t; featCards[4].querySelector('p').textContent = dict.feat_rewrite_p; featCards[4].querySelector('.feature-footer').textContent = dict.feat_rewrite_f;
      featCards[5].querySelector('h3').textContent = dict.feat_flash_t; featCards[5].querySelector('p').textContent = dict.feat_flash_p; featCards[5].querySelector('.feature-footer').textContent = dict.feat_flash_f;
    }

    // Home hero + load line (always follow current language)
    const homeHero = document.querySelector('[data-view="home"] .view-header h2');
    if (homeHero && dict.hero) homeHero.textContent = dict.hero;
    const searchInput = document.querySelector('.search input'); if(searchInput) searchInput.placeholder = dict.search;
    const statusEl = document.getElementById('load-status');
    if (statusEl) statusEl.textContent = terms.length > 0 ? dict.status(terms.length) : dict.loading;

    // Flash / quiz chrome
    const mcBtn = document.getElementById('mode-mc');
    const revBtn = document.getElementById('mode-rev');
    const exBtn = document.getElementById('quiz-export-anki');
    if (mcBtn && dict.quiz_mc) mcBtn.textContent = dict.quiz_mc;
    if (revBtn && dict.quiz_rev) revBtn.textContent = dict.quiz_rev;
    if (exBtn && dict.quiz_export) exBtn.textContent = dict.quiz_export;
    const qCard = document.getElementById('quiz-progress-card');
    const qOf = document.getElementById('quiz-progress-of');
    if (qCard && dict.quiz_card) qCard.textContent = dict.quiz_card;
    if (qOf && dict.quiz_of) qOf.textContent = dict.quiz_of;
    const qPrev = document.getElementById('quiz-prev');
    const qNext = document.getElementById('quiz-next');
    if (qPrev && dict.quiz_prev_title) qPrev.setAttribute('title', dict.quiz_prev_title);
    if (qNext && dict.quiz_next_title) qNext.setAttribute('title', dict.quiz_next_title);

    const themeWrap = document.getElementById('global-theme-switch');
    if (themeWrap) {
      themeWrap.setAttribute('aria-label', dict.theme_aria);
      const tb = themeWrap.querySelectorAll('button');
      if (tb[0]) { tb[0].textContent = dict.theme_light; tb[0].title = dict.theme_light; }
      if (tb[1]) { tb[1].textContent = dict.theme_dark; tb[1].title = dict.theme_dark; }
      if (tb[2]) { tb[2].textContent = dict.theme_auto; tb[2].title = dict.theme_auto; }
    }
    updateThemeSwitch();

    // Re-render current views
    if (currentTerm) renderDetail(currentTerm);
    setupFlashcards();
    renderFeaturedTerms();
    renderStoryTrackList();
    const activeTab = document.querySelector('.tab.active');
    if (activeTab && activeTab.dataset.view === 'story' && currentStoryTrackId) {
      renderStoryTrack(currentStoryTrackId);
      if (currentChapterPos !== null) selectChapter(currentChapterPos, currentStoryTrackId);
    }
  }

  // --- NAVIGATION (Top level to ensure it always works) ---
  function goto(target) {
    try {
      const tabs = document.querySelectorAll('.tab');
      const views = document.querySelectorAll('.view');
      
      tabs.forEach(t => t.classList.toggle('active', t.dataset.view === target));
      views.forEach(v => v.classList.toggle('active', v.dataset.view === target));
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      if (target === 'story') renderStoryTrack();
      if (target === 'flash' && terms.length > 0) setupFlashcards();
      if (target === 'graph') {
        setTimeout(() => {
          const canvas = document.getElementById('graph-canvas');
          if (canvas && typeof graphResize === 'function') graphResize();
        }, 50);
      }
    } catch (e) {
      console.error("Navigation error:", e);
    }
  }

  // Attach tab listeners
  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      goto(t.dataset.view);
    });
  });

  document.body.addEventListener('click', (e) => {
    const t = e.target.closest('[data-goto]');
    if (!t || !t.dataset.goto) return;
    e.preventDefault();
    goto(t.dataset.goto);
  });

  if (typeof window.matchMedia === 'function') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (document.documentElement.getAttribute('data-theme') === 'system') {
        syncColorSchemeHint();
        applyMermaidThemeForDocument();
      }
    });
  }

  // --- INITIALIZATION ---
  async function init() {
    try {
      console.log("Loading glossary_enriched.json...");
      const response = await fetch('glossary_enriched.json');
      if (!response.ok) throw new Error("Fetch failed: " + response.statusText);
      
      const data = await response.json();
      glossaryData = data;
      terms = data.terms || [];
      console.log(`Loaded ${terms.length} terms.`);
      
      const statusEl = document.getElementById('load-status');
      const ui = {
        ar: (n) => `تم تحميل ${n} مصطلحاً بنجاح من قاعدة بياناتك. ابحث أو اختر مصطلحاً للاستكشاف.`,
        en: (n) => `Successfully loaded ${n} terms from your database. Search or click a term below to explore.`,
        fr: (n) => `${n} termes chargés avec succès. Recherchez ou cliquez sur un terme pour explorer.`
      };
      if (statusEl) statusEl.textContent = ui[currentLang](terms.length);

      updateHomeStats();
      setupSearch();
      renderFeaturedTerms();
      setupStoryTracks();
      
      // Initialize Graph Data
      setupGraphData();
      setupDynamicFilters();
      initGraphEngine();

      const rwRoot = document.getElementById('rewrite-tool-root');
      if (rwRoot && window.RewriteToolView && typeof window.RewriteToolView.mount === 'function') {
        window.RewriteToolView.mount(rwRoot, {
          terms: terms,
          getLang: function () { return currentLang; }
        });
      }

      if (terms.length > 0) renderDetail(terms[0]);
      setLanguage(currentLang);
    } catch (e) {
      console.error("Init failed:", e);
      const homeHeader = document.querySelector('[data-view="home"] .view-header');
      if (homeHeader) {
        homeHeader.innerHTML += `<div style="padding:15px; background:#fff3cd; color:#856404; border-radius:8px; margin-top:10px; font-size:13px; border:1px solid #ffeeba;">
          <b>Error:</b> ${e.message}<br>
          <small>Check console for stack trace. Ensure you are using http://localhost:8080</small>
        </div>`;
      }
    }
  }

  function updateHomeStats() {
    const statEl = document.getElementById('stat-count');
    if (statEl && terms.length > 0) statEl.textContent = terms.length;
  }

  function renderFeaturedTerms() {
    const container = document.getElementById('featured-terms');
    if (!container) return;
    
    // Pick 12 random terms
    const featured = [...terms].sort(() => 0.5 - Math.random()).slice(0, 12);
    const isAr = currentLang === 'ar';
    const isFr = currentLang === 'fr';
    container.innerHTML = featured.map(t => `
      <div class="term-pill" style="padding:12px; border:1px solid var(--border); background:var(--surface); cursor:pointer; text-align:center;" onclick="findAndRender('${t.arabic_term}')">
        <div style="font-weight:bold; font-size:15px; direction:${isAr ? 'rtl' : 'ltr'};">${isAr ? (t.arabic_term || t.english_term || '') : (isFr ? (t.french_term || t.english_term || t.arabic_term || '') : (t.english_term || t.arabic_term || ''))}</div>
        <div style="font-size:11px; color:var(--text-tertiary); direction:${isAr ? 'ltr' : 'rtl'};">${isAr ? (t.english_term || '') : (t.arabic_term || '')}</div>
      </div>
    `).join('');
  }

  function setupSearch() {
    const searchInput = document.querySelector('.search input');
    if (!searchInput) return;
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.toLowerCase();
        const match = terms.find(t => 
          (t.arabic_term && t.arabic_term.toLowerCase().includes(q)) || 
          (t.english_term && t.english_term.toLowerCase().includes(q)) ||
          (t.french_term && t.french_term.toLowerCase().includes(q))
        );
        if (match) {
          renderDetail(match);
          goto('detail');
        }
      }
    });
  }

  function renderDetail(term) {
    if (!term) return;
    currentTerm = term;
    if (!document.getElementById('term-detail-panel')) return;
    try {
      if (window.MustalihTermDetail && typeof window.MustalihTermDetail.render === 'function') {
        window.MustalihTermDetail.render(term, { lang: currentLang, afterPaint: applyMermaidThemeForDocument });
      } else {
        document.getElementById('term-detail-panel').innerHTML =
          '<p class="italic" style="padding:24px;color:var(--text-secondary);">term-detail.js did not load.</p>';
      }
    } catch (err) {
      console.error('RenderDetail error:', err);
    }
  }

  function findAndRender(termName) {
    if (!termName) return;
    const q = termName.toLowerCase();
    const match = terms.find(t => 
      (t.arabic_term && t.arabic_term.toLowerCase() === q) || 
      (t.english_term && t.english_term.toLowerCase() === q) ||
      (t.french_term && t.french_term.toLowerCase() === q) ||
      (t.arabic_term && t.arabic_term === termName)
    );
    if (match) {
      renderDetail(match);
      goto('detail');
    } else {
      console.warn("No match found for:", termName);
    }
  }

  function setupStoryTracks() {
    const tracks = {};
    terms.forEach(t => {
      if (t.story_assignments_v2 && t.story_assignments_v2.story_assignments) {
        t.story_assignments_v2.story_assignments.forEach(sa => {
          if (!tracks[sa.track]) tracks[sa.track] = { name: sa.track_name || sa.track, chapters: {} };
          if (!tracks[sa.track].chapters[sa.position_in_track]) {
            tracks[sa.track].chapters[sa.position_in_track] = [];
          }
          tracks[sa.track].chapters[sa.position_in_track].push({ term: t, sa });
        });
      }
    });
    glossaryData.tracks = tracks;
    renderStoryTrackList();
  }

  function renderStoryTrackList() {
    const switcher = document.getElementById('story-track-switcher');
    if (!switcher) return;
    const localizedTrackNames = {
      HOW_A_MODEL_LEARNS: { ar: "كيف يتعلم النموذج", en: "How a Model Learns", fr: "Comment un modèle apprend" },
      DATA_FOUNDATIONS: { ar: "أسس البيانات", en: "Data Foundations", fr: "Fondamentaux des données" },
      NEURAL_NETWORKS_AND_DEEP: { ar: "الشبكات العصبية والتعلم العميق", en: "Neural Networks & Deep Learning", fr: "Réseaux neuronaux" },
      CLASSICAL_ML_AND_STATS: { ar: "تعلم الآلة الكلاسيكي", en: "Classical ML & Stats", fr: "ML Classique et Stats" },
      AI_INFRASTRUCTURE: { ar: "البنية التحتية للذكاء الاصطناعي", en: "AI Infrastructure", fr: "Infrastructure IA" },
      TRUSTWORTHY_AI: { ar: "الذكاء الاصطناعي الموثوق", en: "Trustworthy AI", fr: "IA de confiance" },
      APPLIED_AI: { ar: "الذكاء الاصطناعي التطبيقي", en: "Applied AI", fr: "IA Appliquée" }
    };
    const trackIds = Object.keys(glossaryData.tracks);
    switcher.innerHTML = trackIds.map((id, i) => {
      const nameObj = localizedTrackNames[id] || { en: id };
      const displayName = currentLang === 'ar' ? (nameObj.ar || nameObj.en) : (currentLang === 'fr' ? (nameObj.fr || nameObj.en) : nameObj.en);
      const isActive = (currentStoryTrackId ? currentStoryTrackId === id : i === 0);
      return `<button class="chip ${isActive ? 'active' : ''}" data-track-id="${id}" onclick="switchStoryTrack('${id}', this)">${displayName}</button>`;
    }).join('');
    if (trackIds.length > 0) renderStoryTrack(currentStoryTrackId && trackIds.includes(currentStoryTrackId) ? currentStoryTrackId : trackIds[0]);
  }

  function switchStoryTrack(trackId, btn) {
    currentStoryTrackId = trackId;
    document.querySelectorAll('#story-track-switcher .chip').forEach(c => c.classList.remove('active'));
    if(btn) btn.classList.add('active');
    renderStoryTrack(trackId);
  }

  function renderStoryTrack(trackId) {
    currentStoryTrackId = trackId;
    const track = glossaryData.tracks ? glossaryData.tracks[trackId] : null;
    if (!track) return;
    const list = document.getElementById('story-chapter-list');
    const nameEl = document.getElementById('story-track-name');
    const infoEl = document.getElementById('story-track-info');
    
    const localizedTrackNames = {
      HOW_A_MODEL_LEARNS: { ar: "كيف يتعلم النموذج", en: "How a Model Learns", fr: "Comment un modèle apprend" },
      DATA_FOUNDATIONS: { ar: "أسس البيانات", en: "Data Foundations", fr: "Fondamentaux des données" },
      NEURAL_NETWORKS_AND_DEEP: { ar: "الشبكات العصبية والتعلم العميق", en: "Neural Networks & Deep Learning", fr: "Réseaux neuronaux" },
      CLASSICAL_ML_AND_STATS: { ar: "تعلم الآلة الكلاسيكي", en: "Classical ML & Stats", fr: "ML Classique et Stats" },
      AI_INFRASTRUCTURE: { ar: "البنية التحتية للذكاء الاصطناعي", en: "AI Infrastructure", fr: "Infrastructure IA" },
      TRUSTWORTHY_AI: { ar: "الذكاء الاصطناعي الموثوق", en: "Trustworthy AI", fr: "IA de confiance" },
      APPLIED_AI: { ar: "الذكاء الاصطناعي التطبيقي", en: "Applied AI", fr: "IA Appliquée" }
    };
    const nameObj = localizedTrackNames[trackId] || { en: trackId };
    const trackDisplayName = currentLang === 'ar' ? (nameObj.ar || nameObj.en) : (currentLang === 'fr' ? (nameObj.fr || nameObj.en) : nameObj.en);
    
    const trackNum = Object.keys(glossaryData.tracks).indexOf(trackId) + 1;
    const uiLabels = {
      ar: { label: (n) => `المسار ${n}` },
      en: { label: (n) => `Track ${n}` },
      fr: { label: (n) => `Parcours ${n}` }
    };
    const currentLabels = uiLabels[currentLang] || uiLabels.en;

    if (nameEl) nameEl.textContent = trackDisplayName;
    if (infoEl) infoEl.textContent = currentLabels.label(trackNum);
    
    const sortedPositions = Object.keys(track.chapters).sort((a, b) => a - b);
    if (list) {
      list.innerHTML = sortedPositions.map((pos, i) => {
        const item = track.chapters[pos][0];
        const termName = currentLang === 'ar' ? item.term.arabic_term : (currentLang === 'en' ? item.term.english_term : item.term.french_term);
        const countBadge = track.chapters[pos].length > 1 ? ` (+${track.chapters[pos].length - 1})` : '';
        return `
          <li class="${i === 0 ? 'active' : ''}" onclick="selectChapter(${pos}, '${trackId}')">
            <span class="num-circle"><span>${pos}</span></span>
            ${termName || item.term.arabic_term}${countBadge}
          </li>
        `;
      }).join('');
    }
    selectChapter(sortedPositions[0], trackId);
  }

  function selectChapter(pos, trackId) {
    currentChapterPos = Number(pos);
    const track = glossaryData.tracks[trackId];
    if (!track || !track.chapters[pos]) return;
    const items = track.chapters[pos];
    document.querySelectorAll('#story-chapter-list li').forEach(li => {
      const num = li.querySelector('.num-circle span').textContent;
      li.classList.toggle('active', num == pos);
    });
    const narration = document.querySelector('.narration');
    if (!narration) return;
    const isAr = currentLang === 'ar';
    const isEn = currentLang === 'en';
    const isFr = currentLang === 'fr';

    const h3 = narration.querySelector('h3'); 
    if(h3) h3.textContent = isAr ? items[0].term.arabic_term : (isEn ? items[0].term.english_term : items[0].term.french_term);
    
    const kicker = narration.querySelector('.pane-kicker'); 
    if(kicker) kicker.textContent = isAr ? `الفصل ${pos}` : (isFr ? `Chapitre ${pos}` : `Chapter ${pos}`);

    const hook = isAr ? (items[0].sa.one_line_hook_ar || items[0].term.one_sentence_feel_ar) : 
                (isEn ? (items[0].sa.one_line_hook_en || items[0].term.one_sentence_feel_en) : 
                (items[0].sa.one_line_hook_fr || items[0].term.one_sentence_feel_fr));
    const hookEl = narration.querySelector('.hook'); if(hookEl) hookEl.textContent = hook || "";
    
    // Force Local Mermaid Rendering with Syntax Sanitization
    const figCanvas = document.getElementById('main-fig-canvas');
    if (figCanvas) {
      let uml = items[0].term.ai_mermaid;
      if (uml) {
        // Clean up JSON escape characters and ensure healthy newlines
        uml = uml.replace(/\\n/g, '\n').replace(/\\"/g, '"');
        
        // Wrap labels in quotes if they aren't already (simple heuristic)
        // This fixes syntax errors with spaces in Arabic terms
        uml = uml.replace(/\[([^"\]]+)\]/g, '["$1"]');

        figCanvas.innerHTML = `<div class="mermaid" id="story-mermaid">${uml}</div>`;
        try {
          // Reset Mermaid to clear previous state
          figCanvas.removeAttribute('data-processed');
          mermaid.init(undefined, figCanvas.querySelectorAll(".mermaid"));
        } catch(e) { 
          console.error("Mermaid error:", e);
          figCanvas.innerHTML = `<div style="color:var(--coral); padding:20px; font-size:12px;">Syntax check: Please verify the UML structure for "${items[0].term.arabic_term}".</div>`;
        }
      } else {
        figCanvas.innerHTML = `<div style="opacity:0.3; padding:40px; text-align:center;">Technical architecture for "${items[0].term.arabic_term}" coming soon.</div>`;
      }
    }

    narration.querySelectorAll('p').forEach(p => p.remove());
    items.forEach(item => {
      const p = document.createElement('p');
      const name = isAr ? item.term.arabic_term : (isEn ? item.term.english_term : item.term.french_term);
      const expl = isAr ? (item.term.detailed_explanation_ar || item.term.arabic_def) : 
                   (isEn ? (item.term.detailed_explanation_en || item.term.english_def) : 
                   (item.term.detailed_explanation_fr || item.term.french_def));
      p.innerHTML = `<strong>${name}:</strong> ${expl || ""}`;
      p.style.marginBottom = "15px";
      p.style.direction = isAr ? 'rtl' : 'ltr';
      narration.appendChild(p);
    });

    const miniList = document.querySelector('.term-mini-list');
    if (miniList) {
      miniList.innerHTML = items.map((item, i) => {
        const name = isAr ? item.term.arabic_term : (isEn ? item.term.english_term : item.term.french_term);
        return `
          <div class="mini ${i === 0 ? 'active' : ''}" onclick="openStoryDrawer('${item.term.arabic_term}')">
            <div class="mini-name">${name}</div>
            <div class="mini-meta">${item.term.architecture_role || 'core'} · ${item.term.difficulty || 'intermediate'}</div>
          </div>
        `;
      }).join('');
    }
  }

  function openStoryDrawer(termName) {
    const term = terms.find(t => t.arabic_term === termName);
    if (!term) return;
    const drawer = document.getElementById('story-term-drawer');
    const content = document.getElementById('drawer-content');
    if (!drawer || !content) return;

    const isAr = currentLang === 'ar';
    const isEn = currentLang === 'en';
    const isFr = currentLang === 'fr';

    const t = {
      name: isAr ? term.arabic_term : (isEn ? term.english_term : term.french_term),
      sub: isAr ? term.english_term : term.arabic_term,
      feel: isAr ? term.one_sentence_feel_ar : (isEn ? term.one_sentence_feel_en : term.one_sentence_feel_fr),
      expl: isAr ? (term.detailed_explanation_ar || term.arabic_def) : (isEn ? (term.detailed_explanation_en || term.english_def) : (term.detailed_explanation_fr || term.french_def)),
      metaphor: isAr ? term.metaphor_ar : (isEn ? term.metaphor_en : term.metaphor_fr)
    };
    const labels = {
      ar: { def: "التعريف", feel: "الإحساس", metaphor: "التشبيه", prereq: "المتطلبات", unlocks: "يفتح", uml: "مخطط UML", none: "لا يوجد" },
      en: { def: "Definition", feel: "Feel", metaphor: "Metaphor", prereq: "Prerequisites", unlocks: "Unlocks", uml: "UML Flow", none: "None" },
      fr: { def: "Définition", feel: "Intuition", metaphor: "Métaphore", prereq: "Prérequis", unlocks: "Débloque", uml: "Flux UML", none: "Aucun" }
    };
    const l = labels[currentLang] || labels.en;
    const story = term.story_assignments_v2 && term.story_assignments_v2.story_assignments && term.story_assignments_v2.story_assignments[0];
    const prereqs = (term.graph_raw && term.graph_raw.prerequisites) || [];
    const unlocks = (term.graph_raw && term.graph_raw.unlocks) || [];
    const toPills = (items) => items.length
      ? items.map(name => {
          const encoded = encodeURIComponent(String(name || ""));
          return `<span class="term-pill" onclick="findAndRender(decodeURIComponent('${encoded}'))">${name}</span>`;
        }).join('')
      : `<span class="italic">${l.none}</span>`;

    content.innerHTML = `
      <h2 style="font-family:${isAr ? 'var(--font-ar)' : 'var(--font-main)'}; direction:${isAr ? 'rtl' : 'ltr'}; margin-bottom:5px;">${t.name || "---"}</h2>
      <div style="color:var(--text-secondary); margin-bottom:20px;">${t.sub}</div>
      <div class="badges" style="margin-bottom:16px;">
        <span class="badge teal">${story ? `${story.track_name_en || story.track_name || "Track"} · ${isAr ? "الفصل" : (isEn ? "Chapter" : "Chapitre")} ${story.position_in_track || "-"}` : (isAr ? "غير مصنف" : (isEn ? "Untracked" : "Non classé"))}</span>
        <span class="badge purple">${term.category || (isAr ? "غير مصنف" : (isEn ? "Unknown category" : "Catégorie inconnue"))}</span>
        <span class="badge">${term.difficulty || (isAr ? "غير محدد" : (isEn ? "Unspecified" : "Non défini"))}</span>
      </div>
      <div class="detail-label">${l.feel}</div>
      <p style="margin-bottom:12px; direction:${isAr ? 'rtl' : 'ltr'};"><span class="italic">${t.feel || l.none}</span></p>
      <div class="detail-label">${l.metaphor}</div>
      <p style="margin-bottom:16px; direction:${isAr ? 'rtl' : 'ltr'};">${t.metaphor || l.none}</p>
      <div class="detail-label">${l.def}</div>
      <p style="margin-bottom:20px; direction:${isAr ? 'rtl' : 'ltr'};">${t.expl || ""}</p>
      <div class="detail-label">${l.prereq}</div>
      <p style="margin-bottom:16px;">${toPills(prereqs)}</p>
      <div class="detail-label">${l.unlocks}</div>
      <p style="margin-bottom:16px;">${toPills(unlocks)}</p>
      <div class="detail-label">${l.uml}</div>
      <div id="drawer-mermaid-root" class="mermaid-block" style="margin-bottom:16px;"></div>
      <div style="margin-top:16px;">
        <button class="btn primary" onclick="renderDetailByName('${encodeURIComponent(term.arabic_term || "")}')">${isAr ? "فتح صفحة التفاصيل الكاملة" : (isEn ? "Open full term detail" : "Ouvrir le détail complet")}</button>
      </div>
    `;
    drawer.style.pointerEvents = 'auto';
    drawer.setAttribute('aria-hidden', 'false');
    drawer.style.right = '0';

    const mermaidRoot = document.getElementById('drawer-mermaid-root');
    if (mermaidRoot) {
      const raw = term.ai_mermaid && String(term.ai_mermaid).trim();
      if (raw && typeof mermaid !== 'undefined') {
        let uml = raw.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/<\/script/gi, '<\\/script');
        uml = uml.replace(/\[([^"\]]+)\]/g, '["$1"]');
        mermaidRoot.innerHTML = `<div class="mermaid drawer-mermaid">${uml}</div>`;
        try {
          mermaidRoot.querySelectorAll('.mermaid').forEach((el) => el.removeAttribute('data-processed'));
          mermaid.init(undefined, mermaidRoot.querySelectorAll('.mermaid'));
        } catch (e) {
          console.warn('drawer mermaid', e);
          mermaidRoot.innerHTML = `<div style="color:var(--coral);font-size:12px;">${isAr ? 'تعذّر عرض المخطط.' : (isEn ? 'Could not render diagram.' : 'Impossible d’afficher le diagramme.')}</div>`;
        }
      } else if (raw && typeof mermaid === 'undefined') {
        mermaidRoot.textContent = raw;
      } else {
        mermaidRoot.innerHTML = `<span class="italic">${l.none}</span>`;
      }
    }
  }

  function renderDetailByName(encodedName) {
    const name = decodeURIComponent(encodedName || "");
    if (!name) return;
    findAndRender(name);
    goto('detail');
    closeStoryDrawer();
  }

  function closeStoryDrawer() {
    const drawer = document.getElementById('story-term-drawer');
    if (!drawer) return;
    const w = drawer.offsetWidth || 450;
    drawer.style.right = `-${w}px`;
    drawer.setAttribute('aria-hidden', 'true');
    drawer.style.pointerEvents = 'none';
  }

  async function askDeepSeek() {
    const outputDiv = document.querySelector('.nim-output');
    const reasoningDiv = document.querySelector('.nim-reasoning');
    const contentDiv = document.querySelector('.nim-content');
    const btn = document.querySelector('.nim-section .btn');
    if (!outputDiv || !btn) return;
    outputDiv.style.display = 'block';
    reasoningDiv.textContent = 'Thinking...';
    contentDiv.textContent = '';
    btn.disabled = true;
    const prompt = `اشرح لي مصطلح "${currentTerm.arabic_term}" (${currentTerm.english_term || ""}) في سياق الذكاء الاصطناعي بعمق، مع ذكر أمثلة تطبيقية وتشبيهات لتقريب المعنى.`;
    try {
      const response = await fetch(nvidiaChatProxyUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: "deepseek-ai/deepseek-v3", messages: [{role: "user", content: prompt}], temperature: 0.7, max_tokens: 4000, stream: true })
      });
      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(errBody || response.statusText);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      reasoningDiv.textContent = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') break;
            try {
              const data = JSON.parse(dataStr);
              const delta = data.choices[0].delta;
              if (delta.reasoning_content) reasoningDiv.textContent += delta.reasoning_content;
              if (delta.content) contentDiv.textContent += delta.content;
            } catch (e) {}
          }
        }
      }
    } catch (e) {
      const msg = e && typeof e.message === 'string' ? e.message : String(e);
      contentDiv.textContent = 'Error: ' + msg;
    }
    finally { btn.disabled = false; }
  }

  let quizDifficulty = 'all';
  let quizMode = 'multiple-choice';
  let quizStreak = parseInt(localStorage.getItem('mustalih_streak') || '0');

  function filterQuiz(level) {
    quizDifficulty = level;
    document.querySelectorAll('#quiz-filters .chip').forEach(c => {
      const chipLevel = c.getAttribute('data-quiz-level');
      c.classList.toggle('active', chipLevel === level);
    });
    setupFlashcards();
  }

  function setQuizMode(mode) {
    quizMode = mode;
    document.getElementById('mode-mc').classList.toggle('active', mode === 'multiple-choice');
    document.getElementById('mode-rev').classList.toggle('active', mode === 'reverse');
    setupFlashcards();
  }

  let quizHistory = [];
  let quizHistoryIdx = -1;

  function prevQuestion() {
    if (quizHistoryIdx > 0) {
      quizHistoryIdx--;
      setupFlashcards(false, quizHistory[quizHistoryIdx]);
    }
  }

  function jumpToQuestion(val) {
    const idx = parseInt(val) - 1;
    if (!isNaN(idx)) setupFlashcards(true, null, idx);
  }

  function setupFlashcards(isNew = true, savedState = null, jumpIdx = -1) {
    const termEl = document.getElementById('quiz-term-display');
    const optionsContainer = document.getElementById('quiz-options-container');
    const modeLabel = document.getElementById('quiz-mode-label');
    const streakEl = document.getElementById('quiz-streak');
    const jumpInput = document.getElementById('quiz-jump');
    const totalEl = document.getElementById('quiz-total');
    const prevBtn = document.getElementById('quiz-prev');

    if (!termEl || !optionsContainer || terms.length === 0) return;

    if (prevBtn) prevBtn.disabled = quizHistoryIdx <= 0;

    let pool = terms;
    if (quizDifficulty !== 'all') pool = terms.filter(t => t.difficulty === quizDifficulty);
    if (pool.length === 0) pool = terms;
    
    if (totalEl) totalEl.textContent = pool.length;

    let term, correct, options, currentMode;

    if (savedState) {
      term = savedState.term;
      correct = savedState.correct;
      options = savedState.options;
      currentMode = savedState.mode;
    } else {
      if (jumpIdx >= 0) {
        term = pool[Math.max(0, Math.min(jumpIdx, pool.length - 1))];
      } else {
        term = pool[Math.floor(Math.random() * pool.length)];
      }
      
      currentMode = quizMode;
      const isAr = currentLang === 'ar';

      if (currentMode === 'multiple-choice') {
        correct = isAr ? (term.arabic_def || "---") : (currentLang === 'en' ? term.english_def : term.french_def);
        options = [correct];
        const distractors = isAr ? term.flashcard_distractors_ar : (currentLang === 'en' ? term.flashcard_distractors_en : term.flashcard_distractors_fr);
        if (distractors) options.push(...distractors.slice(0, 3));
        while(options.length < 4) {
          const dTerm = pool[Math.floor(Math.random()*pool.length)];
          const d = isAr ? dTerm.arabic_def : (currentLang === 'en' ? dTerm.english_def : dTerm.french_def);
          if (d && !options.includes(d)) options.push(d);
        }
      } else {
        correct = isAr ? term.arabic_term : (currentLang === 'en' ? term.english_term : term.french_term);
        options = [correct];
        while(options.length < 4) {
          const dTerm = pool[Math.floor(Math.random()*pool.length)];
          const d = isAr ? dTerm.arabic_term : (currentLang === 'en' ? dTerm.english_term : dTerm.french_term);
          if (d && !options.includes(d)) options.push(d);
        }
      }
      options.sort(() => Math.random() - 0.5);

      if (isNew) {
        quizHistory.push({ term, correct, options, mode: currentMode });
        quizHistoryIdx = quizHistory.length - 1;
      }
    }

    const isAr = currentLang === 'ar';
    const ud = currentUiDict || {};
    if (currentMode === 'multiple-choice') {
      if (modeLabel) modeLabel.textContent = ud.quiz_prompt_mc || (isAr ? "أي تعريف يطابق هذا المصطلح؟" : "Which definition matches this term?");
      if(termEl) {
        termEl.textContent = isAr ? term.arabic_term : (currentLang === 'en' ? term.english_term : term.french_term);
        termEl.style.fontSize = '2.5rem';
      }
    } else {
      if (modeLabel) modeLabel.textContent = ud.quiz_prompt_rev || (isAr ? "أي مصطلح يطابق هذا التعريف؟" : "Which term matches this definition?");
      if(termEl) {
        termEl.textContent = isAr ? (term.detailed_explanation_ar || term.arabic_def) : (currentLang === 'en' ? term.english_def : term.french_def);
        termEl.style.fontSize = '1.1rem';
      }
    }

    if (streakEl) streakEl.textContent = typeof ud.quiz_streak === 'function' ? ud.quiz_streak(quizStreak) : `streak ${quizStreak} · next review soon`;
    if (jumpInput) {
      jumpInput.value = quizHistoryIdx + 1;
      jumpInput.max = pool.length;
    }

    optionsContainer.innerHTML = options.map(opt => `<div class="flash-option ${opt === correct ? 'correct-answer' : ''}">${opt}</div>`).join('');
    optionsContainer.querySelectorAll('.flash-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (opt.classList.contains('correct-answer')) { 
          opt.classList.add('correct'); 
          quizStreak++;
          localStorage.setItem('mustalih_streak', quizStreak);
          setTimeout(() => setupFlashcards(true), 1000); 
        } else {
          opt.classList.add('wrong');
          quizStreak = 0;
          localStorage.setItem('mustalih_streak', 0);
          if (streakEl) streakEl.textContent = typeof (currentUiDict && currentUiDict.quiz_streak) === 'function' ? currentUiDict.quiz_streak(0) : 'streak 0 · next review soon';
        }
      });
    });
  }

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const activeView = document.querySelector('.view.active');
    if (activeView && activeView.dataset.view === 'flash') {
      if (e.key === 'ArrowLeft') prevQuestion();
      if (e.key === 'ArrowRight') setupFlashcards(true);
    }
  });

  function exportToAnki() {
    alert("Anki Export: CSV structure generated for " + terms.length + " terms. Check downloads (simulated).");
  }

  document.querySelectorAll('.chip').forEach(c =>
    c.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
    }));

  // --- GRAPH RENDERING ---
  function filterGraphByCategory(cat) {
    document.querySelectorAll('#graph-filters .chip').forEach(c => 
      c.classList.toggle('active', c.textContent.includes(cat) || (cat === 'all' && c.textContent.includes('All'))));
    renderGraph(cat);
  }

  function filterGraph(query) {
    renderGraph('all', query.toLowerCase());
  }

  function sortGraph(type) {
    if (type === 'pagerank') terms.sort((a, b) => (b.pagerank || 0) - (a.pagerank || 0));
    else terms.sort((a, b) => a.arabic_term.localeCompare(b.arabic_term));
    renderGraph('all');
  }

  // --- HIGH-PERFORMANCE FORCE GRAPH ENGINE ---
  let graphNodes = [];
  let graphEdges = [];
  let transform = { x: 0, y: 0, k: 1 };
  let isDragging = false;
  let draggedNode = null;
  let mouse = { x: 0, y: 0 };

  let graphResize = null;
  function initGraphEngine() {
    const canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    graphResize = function() {
      if (!canvas.offsetWidth) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      console.log("Graph resized:", canvas.width, canvas.height);
    };
    window.addEventListener('resize', graphResize);
    graphResize();

    // Physics Simulation
    function updatePhysics() {
      const k = 0.05; // Spring constant
      const r = 1000; // Repulsion constant
      
      for (let n of graphNodes) {
        // Center gravity
        n.vx += (canvas.offsetWidth/2 - n.x) * 0.001;
        n.vy += (canvas.offsetHeight/2 - n.y) * 0.001;

        // Node repulsion
        for (let other of graphNodes) {
          if (n === other) continue;
          const dx = n.x - other.x;
          const dy = n.y - other.y;
          const dist = Math.sqrt(dx*dx + dy*dy) || 1;
          if (dist < 200) {
            const force = r / (dist * dist);
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }
      }

      // Edge springs
      for (let e of graphEdges) {
        const dx = e.target.x - e.source.x;
        const dy = e.target.y - e.source.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        const force = (dist - 100) * k;
        e.source.vx += (dx / dist) * force;
        e.source.vy += (dy / dist) * force;
        e.target.vx -= (dx / dist) * force;
        e.target.vy -= (dy / dist) * force;
      }

      // Apply velocity
      for (let n of graphNodes) {
        if (n === draggedNode) continue;
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.9; // Friction
        n.vy *= 0.9;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      // Draw Edges
      ctx.strokeStyle = 'rgba(150,150,150,0.15)';
      ctx.lineWidth = 1;
      for (let e of graphEdges) {
        ctx.beginPath();
        ctx.moveTo(e.source.x, e.source.y);
        ctx.lineTo(e.target.x, e.target.y);
        ctx.stroke();
      }

      // Draw Nodes
      for (let n of graphNodes) {
        const radius = 5 + (n.pagerank || 0) * 40;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color || 'var(--purple)';
        ctx.fill();
        
        if (transform.k > 0.6) {
          ctx.fillStyle = 'var(--text)';
          ctx.font = `${Math.max(8, radius/2)}px var(--font-sans)`;
          ctx.textAlign = 'center';
          ctx.fillText(n.name_ar, n.x, n.y + radius + 12);
        }
      }
      ctx.restore();
      
      updatePhysics();
      requestAnimationFrame(draw);
    }

    // Interaction handling
    canvas.addEventListener('mousedown', e => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left - transform.x) / transform.k;
      const my = (e.clientY - rect.top - transform.y) / transform.k;
      
      draggedNode = graphNodes.find(n => {
        const d = Math.sqrt((n.x-mx)**2 + (n.y-my)**2);
        return d < 20;
      });
      
      if (!draggedNode) isDragging = true;
    });

    window.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left - transform.x) / transform.k;
      const my = (e.clientY - rect.top - transform.y) / transform.k;
      
      if (draggedNode) {
        draggedNode.x = mx;
        draggedNode.y = my;
      } else if (isDragging) {
        transform.x += e.movementX;
        transform.y += e.movementY;
      }
    });

    window.addEventListener('mouseup', () => {
      if (draggedNode) findAndRender(draggedNode.name_ar);
      draggedNode = null;
      isDragging = false;
    });

    draw();
  }

  function setupGraphData() {
    const colors = ['#2dd4bf', '#a855f7', '#fb7185', '#60a5fa', '#f59e0b'];
    const clusterMap = {};
    const uniqueClusters = [...new Set(terms.map(t => t.primary_cluster || t.category).filter(Boolean))];
    uniqueClusters.forEach((c, i) => clusterMap[c] = colors[i % colors.length]);

    // Use a subset for performance
    const displayTerms = terms.slice(0, 500);

    graphNodes = displayTerms.map(t => ({
      id_ar: t.arabic_term,
      id_en: t.english_term,
      name_ar: t.arabic_term,
      x: Math.random() * 800,
      y: Math.random() * 600,
      vx: 0,
      vy: 0,
      pagerank: t.pagerank || 0,
      color: clusterMap[t.primary_cluster || t.category] || '#a855f7'
    }));

    // Build edges with bilingual mapping
    const nodeLookup = {};
    graphNodes.forEach(n => {
      if (n.id_ar) nodeLookup[n.id_ar] = n;
      if (n.id_en) nodeLookup[n.id_en] = n;
      if (n.id_en) nodeLookup[n.id_en.toLowerCase()] = n;
    });
    
    graphEdges = [];
    displayTerms.forEach(t => {
      const sourceNode = nodeLookup[t.arabic_term];
      if (!sourceNode) return;

      const prereqs = (t.graph_raw && t.graph_raw.prerequisites) || [];
      prereqs.forEach(p => {
        const targetNode = nodeLookup[p] || nodeLookup[p.toLowerCase()];
        if (targetNode && targetNode !== sourceNode) {
          graphEdges.push({ source: targetNode, target: sourceNode });
        }
      });
    });
    console.log(`Graph ready: ${graphNodes.length} nodes, ${graphEdges.length} edges.`);
  }

  const categoryMap = {
    NLP_TASKS_AND_CONCEPTS: { ar: "مهام البرمجة اللغوية العصبية", en: "NLP Tasks & Concepts", fr: "Tâches & Concepts NLP" },
    NLP_MODELS_AND_TECHNIQUES: { ar: "نماذج البرمجة اللغوية العصبية", en: "NLP Models & Techniques", fr: "Modèles & Techniques NLP" },
    LARGE_LANGUAGE_MODELS: { ar: "نماذج اللغات الكبيرة", en: "Large Language Models", fr: "Grands modèles de langage" },
    TRANSFORMER_ARCHITECTURE: { ar: "هندسة المحولات", en: "Transformer Architecture", fr: "Architecture Transformer" },
    NEURAL_NETWORK_BASICS: { ar: "أساسيات الشبكات العصبية", en: "Neural Network Basics", fr: "Bases des réseaux neuronaux" },
    NEURAL_NETWORKS_AND_DEEP: { ar: "الشبكات العصبية والتعلم العميق", en: "Neural Networks & Deep Learning", fr: "Réseaux neuronaux" },
    AI_ETHICS_PRINCIPLES: { ar: "مبادئ أخلاقيات الذكاء الاصطناعي", en: "AI Ethics Principles", fr: "Principes d'éthique de l'IA" },
    AI_GOVERNANCE: { ar: "حوكمة الذكاء الاصطناعي", en: "AI Governance", fr: "Gouvernance de l'IA" },
    AI_SAFETY_AND_ALIGNMENT: { ar: "سلامة الذكاء الاصطناعي ومواءمته", en: "AI Safety & Alignment", fr: "Sécurité & Alignement de l'IA" },
    TRUSTWORTHY_AI: { ar: "الذكاء الاصطناعي الموثوق", en: "Trustworthy AI", fr: "IA de confiance" },
    BIAS_AND_FAIRNESS_TYPES: { ar: "أنواع الانحياز والعدالة", en: "Bias & Fairness Types", fr: "Types de biais & équité" },
    FAIRNESS_METRICS: { ar: "مقاييس العدالة", en: "Fairness Metrics", fr: "Mesures d'équité" },
    COMPUTER_VISION_TASKS: { ar: "مهام الرؤية الحاسوبية", en: "Computer Vision Tasks", fr: "Tâches de vision par ordinateur" },
    COMPUTER_VISION_TECHNIQUES: { ar: "تقنيات الرؤية الحاسوبية", en: "Computer Vision Techniques", fr: "Techniques de vision par ordinateur" },
    REINFORCEMENT_LEARNING_FUNDAMENTALS: { ar: "أساسيات التعلم التعزيزي", en: "Reinforcement Learning Fundamentals", fr: "Bases de l'apprentissage par renforcement" },
    REINFORCEMENT_LEARNING_METHODS: { ar: "طرق التعلم التعزيزي", en: "Reinforcement Learning Methods", fr: "Méthodes d'apprentissage par renforcement" },
    OPTIMIZATION_ALGORITHMS: { ar: "خوارزميات التحسين", en: "Optimization Algorithms", fr: "Algorithmes d'optimisation" },
    LOSS_FUNCTIONS: { ar: "دوال الخسارة", en: "Loss Functions", fr: "Fonctions de perte" },
    REGULARIZATION: { ar: "الضبط (Regularization)", en: "Regularization", fr: "Régularisation" },
    EVALUATION_METRICS: { ar: "مقاييس التقييم", en: "Evaluation Metrics", fr: "Métriques d'évaluation" },
    DATA_STORAGE_AND_ARCHITECTURE: { ar: "تخزين البيانات وهندستها", en: "Data Storage & Architecture", fr: "Stockage & Architecture de données" },
    DATA_COLLECTION_AND_LABELING: { ar: "جمع البيانات وتصنيفها", en: "Data Collection & Labeling", fr: "Collecte & Étiquetage de données" },
    DATA_QUALITY_AND_CLEANING: { ar: "جودة البيانات وتنظيفها", en: "Data Quality & Cleaning", fr: "Qualité & Nettoyage des données" },
    DATA_GOVERNANCE_AND_ETHICS: { ar: "حوكمة البيانات وأخلاقياتها", en: "Data Governance & Ethics", fr: "Gouvernance & Éthique des données" },
    MATH_FOUNDATIONS: { ar: "الأسس الرياضية", en: "Math Foundations", fr: "Fondamentaux mathématiques" },
    PROBABILITY_DISTRIBUTIONS: { ar: "التوزيعات الاحتمالية", en: "Probability Distributions", fr: "Distributions de probabilité" },
    BAYESIAN_METHODS: { ar: "الطرق البايزية", en: "Bayesian Methods", fr: "Méthodes bayésiennes" },
    MLOPS_AND_DEPLOYMENT: { ar: "عمليات تعلم الآلة والنشر", en: "MLOps & Deployment", fr: "MLOps & Déploiement" },
    CLOUD_AND_EDGE_COMPUTING: { ar: "الحوسبة السحابية وحوسبة الحافة", en: "Cloud & Edge Computing", fr: "Cloud & Edge Computing" },
    AI_HARDWARE: { ar: "أجهزة الذكاء الاصطناعي", en: "AI Hardware", fr: "Matériel IA" },
    AI_AGENTS: { ar: "وكلاء الذكاء الاصطناعي", en: "AI Agents", fr: "Agents d'IA" },
    ROBOTICS: { ar: "الروبوتات", en: "Robotics", fr: "Robotique" },
    GENERATIVE_MODELS: { ar: "النماذج التوليدية", en: "Generative Models", fr: "Modèles génératifs" },
    DIFFUSION_AND_STABLE_GENERATION: { ar: "الانتشار والتوليد المستقر", en: "Diffusion & Stable Generation", fr: "Diffusion & Génération stable" },
    RAG_AND_RETRIEVAL: { ar: "توليد الاسترجاع المعزز (RAG)", en: "RAG & Retrieval", fr: "RAG & Récupération" },
    PROMPTING_TECHNIQUES: { ar: "تقنيات هندسة الأوامر", en: "Prompting Techniques", fr: "Techniques de prompt" },
    FINE_TUNING_AND_ADAPTATION: { ar: "الضبط الدقيق والتكيف", en: "Fine-tuning & Adaptation", fr: "Fine-tuning & Adaptation" },
    EXPLAINABILITY_AND_INTERPRETABILITY: { ar: "القابلية للتفسير والوضوح", en: "Explainability & Interpretability", fr: "Explicabilité & Interprétabilité" },
    INFERENCE_OPTIMIZATION: { ar: "تحسين الاستدلال", en: "Inference Optimization", fr: "Optimisation de l'inférence" },
    PRIVACY_AND_SECURITY: { ar: "الخصوصية والأمن", en: "Privacy & Security", fr: "Confidentialité & Sécurité" },
    AI_HISTORY_AND_PARADIGMS: { ar: "تاريخ ونماذج الذكاء الاصطناعي", en: "AI History & Paradigms", fr: "Histoire & Paradigmes de l'IA" },
    HUMAN_AI_INTERACTION: { ar: "التفاعل بين الإنسان والذكاء الاصطناعي", en: "Human-AI Interaction", fr: "Interaction Homme-IA" },
    DATA_ANALYTICS_AND_BI: { ar: "تحليل البيانات وذكاء الأعمال", en: "Data Analytics & BI", fr: "Analyse de données & BI" },
    TREE_AND_ENSEMBLE_METHODS: { ar: "طرق الأشجار والتعلم الجمعي", en: "Tree & Ensemble Methods", fr: "Méthodes d'arbres & ensemble" },
    CLASSIFICATION_MODELS: { ar: "نماذج التصنيف", en: "Classification Models", fr: "Modèles de classification" },
    REGRESSION_MODELS: { ar: "نماذج الانحدار", en: "Regression Models", fr: "Modèles de régression" },
    CLUSTERING_ALGORITHMS: { ar: "خوارزميات التجميع", en: "Clustering Algorithms", fr: "Algorithmes de clustering" },
    AUTOENCODERS_AND_REPRESENTATION: { ar: "المشفرات التلقائية والتمثيل", en: "Autoencoders & Representation", fr: "Auto-encodeurs & Représentation" },
    RECURRENT_AND_SEQUENCE_MODELS: { ar: "النماذج المتكررة والمتسلسلة", en: "Recurrent & Sequence Models", fr: "Modèles récurrents & séquentiels" },
    CONVOLUTIONAL_ARCHITECTURES: { ar: "هياكل الشبكات الالتفافية", en: "Convolutional Architectures", fr: "Architectures convolutionnelles" },
    CROSS_VALIDATION_AND_SPLITS: { ar: "التحقق المتقاطع وتقسيم البيانات", en: "Cross-validation & Splits", fr: "Validation croisée & Divisions" },
    GENERALIZATION_AND_OVERFITTING: { ar: "التعميم وفرط التخصيص", en: "Generalization & Overfitting", fr: "Généralisation & Surapprentissage" },
    KERNEL_METHODS_AND_SVM: { ar: "طرق النواة و SVM", en: "Kernel Methods & SVM", fr: "Méthodes à noyau & SVM" },
    PROGRAMMING_TOOLS_AND_LIBRARIES: { ar: "أدوات ومكتبات البرمجة", en: "Programming Tools & Libraries", fr: "Outils & Bibliothèques de programmation" },
    PRIMITIVE_CONCEPTS: { ar: "المفاهيم الأولية", en: "Primitive Concepts", fr: "Concepts primitifs" }
  };

  function setupDynamicFilters() {
    const filterContainer = document.getElementById('graph-filters');
    const legendContainer = document.getElementById('graph-legend-dynamic');
    if (!filterContainer) return;
    const clusters = [...new Set(terms.map(t => t.primary_cluster || t.category).filter(Boolean))];
    const isAr = currentLang === 'ar';
    const allLabel = isAr ? "الكل" : (currentLang === 'fr' ? "Tous" : "All");

    filterContainer.innerHTML = `
      <button class="chip active" onclick="filterGraphByCategory('all')">${allLabel} ${terms.length}</button>
      ${clusters.map(c => {
        const nameObj = categoryMap[c] || { en: c };
        const displayName = isAr ? (nameObj.ar || nameObj.en) : (currentLang === 'fr' ? (nameObj.fr || nameObj.en) : nameObj.en);
        return `<button class="chip" onclick="filterGraphByCategory('${c}')">${displayName}</button>`;
      }).join('')}
      <div style="flex:1"></div>
    `;
    if (legendContainer) {
      const colors = ['#2dd4bf', '#a855f7', '#fb7185', '#60a5fa', '#f59e0b'];
      legendContainer.innerHTML = clusters.slice(0, 5).map((c, i) => {
        const nameObj = categoryMap[c] || { en: c };
        const displayName = isAr ? (nameObj.ar || nameObj.en) : (currentLang === 'fr' ? (nameObj.fr || nameObj.en) : nameObj.en);
        return `<div><span class="dot" style="background: ${colors[i % colors.length]}"></span>${displayName}</div>`;
      }).join('');
    }
  }

  function filterGraphByCategory(cat) {
    let filtered;
    if (cat === 'all') {
      filtered = terms.slice(0, 500);
    } else {
      filtered = terms.filter(t => t.primary_cluster === cat || t.category === cat).slice(0, 300);
    }
    
    // Reset nodes and edges
    const colors = ['#2dd4bf', '#a855f7', '#fb7185', '#60a5fa', '#f59e0b'];
    const clusterMap = {};
    const uniqueClusters = [...new Set(terms.map(t => t.primary_cluster || t.category).filter(Boolean))];
    uniqueClusters.forEach((c, i) => clusterMap[c] = colors[i % colors.length]);

    graphNodes = filtered.map(t => ({
      id_ar: t.arabic_term,
      id_en: t.english_term,
      name_ar: t.arabic_term,
      x: Math.random() * 800,
      y: Math.random() * 600,
      vx: 0,
      vy: 0,
      pagerank: t.pagerank || 0,
      color: clusterMap[t.primary_cluster || t.category] || '#a855f7'
    }));

    const nodeLookup = {};
    graphNodes.forEach(n => {
      if (n.id_ar) nodeLookup[n.id_ar] = n;
      if (n.id_en) nodeLookup[n.id_en] = n;
      if (n.id_en) nodeLookup[n.id_en.toLowerCase()] = n;
    });
    
    graphEdges = [];
    filtered.forEach(t => {
      const sourceNode = nodeLookup[t.arabic_term];
      if (!sourceNode) return;
      const prereqs = (t.graph_raw && t.graph_raw.prerequisites) || [];
      prereqs.forEach(p => {
        const targetNode = nodeLookup[p] || nodeLookup[p.toLowerCase()];
        if (targetNode && targetNode !== sourceNode) {
          graphEdges.push({ source: targetNode, target: sourceNode });
        }
      });
    });

    document.querySelectorAll('#graph-filters .chip').forEach(c => {
      const isAr = currentLang === 'ar';
      const nameObj = categoryMap[cat] || { en: cat };
      const displayName = isAr ? (nameObj.ar || nameObj.en) : (currentLang === 'fr' ? (nameObj.fr || nameObj.en) : nameObj.en);
      const allLabel = isAr ? "الكل" : (currentLang === 'fr' ? "Tous" : "All");
      const targetText = cat === 'all' ? allLabel : displayName;
      c.classList.toggle('active', c.textContent.includes(targetText));
    });
  }

  function selectHotspot(n, termName) {
    document.querySelectorAll('.hot').forEach((h, i) => h.classList.toggle('active', (i+1) === n));
    
    const term = terms.find(t => t.arabic_term === termName || t.english_term === termName);
    const side = document.querySelector('.anatomy-side');
    if (!term || !side) return;

    const isAr = currentLang === 'ar';
    const isEn = currentLang === 'en';
    const isFr = currentLang === 'fr';

    const stopLabel = isAr ? `المختارة · المرحلة ${n} من 5` : (isFr ? `Sélectionné · Étape ${n} sur 5` : `Selected · Stop ${n} of 5`);
    const kicker = side.querySelector('.side-kicker'); if(kicker) kicker.textContent = stopLabel;

    const titleAr = side.querySelector('.side-title-ar'); if(titleAr) titleAr.textContent = isAr ? term.arabic_term : term.english_term;
    const titleEn = side.querySelector('.side-title-en'); if(titleEn) titleEn.textContent = isAr ? term.english_term : term.arabic_term;

    const feel = isAr ? term.one_sentence_feel_ar : (isEn ? term.one_sentence_feel_en : term.one_sentence_feel_fr);
    const feelEl = side.querySelector('.side-feel'); if(feelEl) feelEl.textContent = feel || "";

    const expl = isAr ? (term.detailed_explanation_ar || term.arabic_def) : (isEn ? (term.detailed_explanation_en || term.english_def) : (term.detailed_explanation_fr || term.french_def));
    const explEl = side.querySelector('div[style*="font-size: 13px"]'); if(explEl) explEl.textContent = expl || "";

    const badges = side.querySelectorAll('.badge');
    if(badges.length >= 2) {
      badges[0].textContent = isAr ? "أساسي" : "core";
      badges[1].textContent = isAr ? "متوسط" : "intermediate";
    }
  }

  if (window.HomeFeaturesView && typeof window.HomeFeaturesView.mount === 'function') {
    const grid = document.getElementById('home-feature-grid');
    if (grid) window.HomeFeaturesView.mount(grid);
  }
  updateThemeSwitch();
  applyMermaidThemeForDocument();
  setLanguage(currentLang);
  init();
