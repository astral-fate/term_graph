/**
 * Audit AI — تدقيق الذكاء الاصطناعي (glossary + tools; was Term Graph).
 * Global functions stay on window for onclick= handlers in markup.
 */
(function() {
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
      if (t === 'light' || t === 'dark') return t;
    } catch (e) {}
    return 'light';
  }

  function isEffectiveDark() {
    const t = document.documentElement.getAttribute('data-theme') || getStoredTheme();
    return t === 'dark';
  }

  function toggleTheme() {
    const raw = document.documentElement.getAttribute('data-theme');
    const cur = raw === 'light' || raw === 'dark' ? raw : getStoredTheme();
    setTheme(cur === 'dark' ? 'light' : 'dark');
  }

  function syncColorSchemeHint() {
    document.documentElement.style.colorScheme = isEffectiveDark() ? 'dark' : 'light';
  }

  /** Mermaid v10+ often returns a Promise from run/init; swallow rejections so DevTools stays clean. */
  function runMermaidOn(nodeList) {
    if (typeof mermaid === 'undefined' || !nodeList || nodeList.length === 0) return;
    const nodes = Array.from(nodeList).filter(el => !el.hasAttribute('data-processed'));
    if (nodes.length === 0) return;
    
    nodes.forEach((el) => el.removeAttribute('data-processed'));
    try {
      if (typeof mermaid.run === 'function') {
        const p = mermaid.run({ nodes });
        if (p && typeof p.catch === 'function') void p.catch((e) => console.warn('mermaid', e));
        return;
      }
      const p = mermaid.init(undefined, nodes);
      if (p && typeof p.catch === 'function') void p.catch((e) => console.warn('mermaid', e));
    } catch (e) {
      console.warn('mermaid', e);
    }
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
    
    // Only re-process mermaid diagrams in the active view to save resources
    const activeView = document.querySelector('.view.active');
    if (activeView) {
      const activeMermaids = activeView.querySelectorAll('.mermaid');
      activeMermaids.forEach(el => el.removeAttribute('data-processed'));
      runMermaidOn(activeMermaids);
    }
  }

  function updateThemeToggle() {
    const t = document.documentElement.getAttribute('data-theme') || getStoredTheme();
    const isDark = t === 'dark';
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
    syncColorSchemeHint();
  }

  function setTheme(theme) {
    if (theme === 'system') {
      theme =
        typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    }
    if (theme !== 'light' && theme !== 'dark') theme = 'light';
    try {
      localStorage.setItem('mustalih_theme', theme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggle();
    
    // Refresh landing visual if theme changes
    const heroImg = document.querySelector('.hero-preview-img');
    if (heroImg) {
      // Subtle refresh effect
      heroImg.style.opacity = '0.5';
      setTimeout(() => heroImg.style.opacity = '1', 50);
    }

    // Only run mermaid if we are in a view that has it
    const activeTab = document.querySelector('.tab.active');
    if (activeTab && ['detail', 'story'].includes(activeTab.dataset.view)) {
      applyMermaidThemeForDocument();
    }
  }

  if (typeof window !== 'undefined') {
    window.toggleTheme = toggleTheme;
    window.setTheme = setTheme;
    window.setLanguage = setLanguage;
    window.goto = goto;
    // Export additional UI handlers for onclick attributes
    window.openStoryDrawer = openStoryDrawer;
    window.closeStoryDrawer = closeStoryDrawer;
    window.switchStoryTrack = switchStoryTrack;
    window.selectChapter = selectChapter;
    window.filterQuiz = filterQuiz;
    window.setupFlashcards = setupFlashcards;
    window.prevQuestion = prevQuestion;
    window.jumpToQuestion = jumpToQuestion;
    window.setQuizMode = setQuizMode;
    window.exportToAnki = exportToAnki;
    window.renderDetailByName = renderDetailByName;
    window.findAndRender = findAndRender;
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
        home: "الرئيسية", dashboard: "لوحة العمل", graph: "مخطط المعرفة", story: "مسارات القصة", anatomy: "تشريح المحول", detail: "تفاصيل المصطلح", rewrite: "أداة إعادة الكتابة", audit: "تدقيق الذكاء الاصطناعي", flash: "بطاقات الاستذكار",
        nav_explore: "استكشاف",
        brand_t: "تدقيق الذكاء الاصطناعي", brand_s: "مسرد عربي أولاً، وتدقيق امتثال ذكاء اصطناعي · ١٬٢٤٢ مصطلح ICAIRE",
        hero: "كيف تعرف أن ذكاءك الاصطناعي ممتثل؟",
        landing_kicker: "ICAIRE · حوكمة الذكاء الاصطناعي",
        landing_lead: "احصل على تقرير امتثال مفصل في دقائق. دقق سياساتك وأنظمتك مقابل الأطر العالمية بدقة عربية أولاً.",
        landing_cta_audit: "احصل على تقريرك الآن",
        landing_cta_dashboard: "استكشف مساحة العمل",
        lp_stats_h: "الارتقاء بالمعايير",
        lp_stats_deck: "تحليلات الحوكمة في الوقت الفعلي عبر دورة حياة الذكاء الاصطناعي بالكامل.",
        lp_stat_1_num: "١٬٢٤٢", lp_stat_1_txt: "مصطلحاً مُثرياً",
        lp_stat_2_num: "٥١٩", lp_stat_2_txt: "ضابطاً حيوياً",
        lp_stat_3_num: "٤", lp_stat_3_txt: "أطر عمل عالمية",
        lp_stat_4_num: "٩٨٪", lp_stat_4_txt: "دقة الامتثال",
        lp_stat_5_num: "١٥", lp_stat_5_txt: "تكتلاً خاصاً",
        lp_stat_6_num: "٢٤", lp_stat_6_txt: "دقيقة للتقرير",
        lp_fold_matrix: "رؤية ICAIRE",
        lp_matrix_lede: "من نحن، وما المشكلة التي نعالجها، وماذا يقدّم مساحة العمل — انطلاقاً من المسرد العربي أولاً ومخططات الحوكمة.",
        lp_label_who: "من نحن", lp_who_title: "هدفنا", lp_who_body: "نضم مسرد ICAIRE العربي أولاً مع أدوات لمراجعة وثائق الذكاء الاصطناعي مقابل أطر الحوكمة المعترف بها—لتوحيد الصياغة والأدلة في مكان واحد.",
        lp_label_deal: "التحدي", lp_challenge_title: "ما الذي نعالجه", lp_challenge_body: "السياسات ومستندات المشاريع مبعثرة بين اللغات، وتختلف توقعات الامتثال بين أطر OECD وUNESCO وضوابط قطاعية.",
        lp_label_build: "المنتج", lp_build_title: "ما نبنيه", lp_build_body: "مساحة عمل متكاملة: رفع PDF للتدقيق، استكشاف ١٬٢٤٢+ مصطلحاً في مخطط معرفة، وتعلم عبر مسارات قصة وبطاقات.",
        lp_fold_platform: "قدرات المنصة",
        lp_explore_intro: "في الأسفل ما يمكنك فعله اليوم داخل التطبيق—من التبويبات أعلاه أو من مساحة العمل.",
        lp_benefits_h: "الفوائد الرئيسية",
        lp_b1_t: "تدقيق مرتبط بالأدلة", lp_b1_p: "الدرجات مربوطة بضابط بنك التقييم واسترجاع المقاطع—وليس بملخصات عامة.",
        lp_b2_t: "على بنيتك", lp_b2_p: "FastAPI محلي ومفتاح NVIDIA؛ تبقى المستندات على جهازك أثناء المعالجة.",
        lp_b3_t: "مسرد ثلاثي اللغة", lp_b3_p: "مصلطحات ICAIRE بالعربية والإنجليزية والفرنسية—ملائمة للسياسات والمناقصات.",
        lp_b4_t: "حلقة تعلّم", lp_b4_p: "المخطط والقصص والبطاقات تحوّل المسرد إلى مسار دراسة منظم.",
        lp_services_h: "الخدمات والوحدات",
        lp_line_1: "تدقيق الذكاء الاصطناعي — تقييم شامل لملفات PDF مقابل ضوابط أطر العمل.",
        lp_line_2: "المسرد والمخطط — مخطط معرفة تفاعلي وصفحات مصطلحات غنية بالرسوم.",
        lp_line_3: "القصص والبطاقات — مسارات سردية واختبارات لتعلم المفاهيم.",
        lp_line_4: "مساعد الكتابة — دعم صياغة النصوص العربية مع استرجاع معجمي.",
        lp_line_5: "لوحة العمل — إحصائيات حية وصول سريع لكل أداة.",
        lp_fw_h: "أطر العمل المتكاملة",
        lp_fw_deck: "تدقيق مقابل أكثر معايير الذكاء الاصطناعي صرامة في العالم.",
        lp_fw_1_t: "إطار NIST للذكاء الاصطناعي", lp_fw_1_p: "إطار إدارة المخاطر الإصدار ١.٠",
        lp_fw_2_t: "أخلاقيات اليونسكو", lp_fw_2_p: "توصية بشأن أخلاقيات الذكاء الاصطناعي",
        lp_fw_3_t: "إطار منظمة التعاون الاقتصادي", lp_fw_3_p: "تصنيف أنظمة الذكاء الاصطناعي",
        lp_fw_4_t: "مبادئ منظمة التعاون الاقتصادي", lp_fw_4_p: "المبادئ القائمة على القيم للذكاء الاصطناعي",
        lp_learning_h: "إتقان حوكمة الذكاء الاصطناعي",
        lp_learn_1_t: "مسارات القصص", lp_learn_1_p: "رحلات سردية من الأساسيات إلى أخلاقيات المستقبل.",
        lp_learn_2_t: "بطاقات الاستذكار", lp_learn_2_p: "تكرار متباعد لإتقان المصطلحات التقنية.",
        lp_learn_3_t: "مخطط المعرفة", lp_learn_3_p: "استكشف الروابط بين أكثر من ١٬٢٠٠ مصطلح معتمد.",
        landing_cta_audit: "ابدأ تدقيقك الأول",
        landing_cta_glossary: "تصفح مخطط المعرفة",
        landing_cta_dash_2: "الانتقال إلى مساحة العمل",
        lp_final_h: "جاهز لتأمين مستقبل ذكاءك الاصطناعي؟",
        lp_final_p: "انضم إلى منظومة ICAIRE وابدأ في تدقيق حوكمة ذكاءك الاصطناعي اليوم.",
        dashboard_h2: "مساحة العمل",
        dashboard_lead: "إحصائيات، مختارات من مسردك، واختصارات لكل أداة.",
        audit_brand: "تدقيق الذكاء الاصطناعي", audit_h: "تدقيق الذكاء الاصطناعي",
        audit_p: "قم بتقييم مستندات الذكاء الاصطناعي الخاصة بك مقابل أطر الحوكمة العالمية والمحلية في مساحة عمل آمنة وخاصة.",
        audit_crumb_upload: "رفع الملف", audit_crumb_process: "المعالجة", audit_crumb_report: "التقرير",
        audit_sec1: "١. نوع المستند", audit_sec2: "٢. أطر العمل", audit_sec3: "٣. المستند (PDF)",
        audit_doc_plan: "خطة المشروع / PRD", audit_doc_plan_sub: "خرائط الطريق، المشتريات، خطط التسليم",
        audit_doc_policy: "سياسة الذكاء الاصطناعي / الميثاق", audit_doc_policy_sub: "المواثيق، بيانات الحوكمة",
        audit_doc_system: "وثائق النظام", audit_doc_system_sub: "بطاقات النماذج، وثائق النظام التقنية",
        audit_fw_loading: "جارٍ تحميل أطر العمل...", audit_dz_main: "أفلت ملف PDF هنا أو انقر للتصفح",
        audit_dz_sub: "الحد الأقصى ٢٠ ميجابايت · تتم معالجة النصوص محلياً",
        audit_run: "تشغيل التدقيق", audit_offline_btn: "تجريب العرض فقط",
        audit_proc_running: "تشغيل مسار التدقيق", audit_report_md_summary: "تقرير ماركداون",
        audit_dl_json: "تحميل JSON", audit_new_audit: "تدقيق جديد",
        audit_md_by_fw: "النتيجة حسب إطار العمل", audit_md_gaps: "الفجوات ذات الأولوية",
        audit_dash_snapshot: "لقطة الامتثال", audit_top_gaps: "أبرز الفجوات والالتزام الجزئي",
        audit_md_met: "مكتمل", audit_md_partial: "جزئي", audit_md_not_met: "غير مكتمل", audit_md_na: "غير متاح",
        audit_md_remediation: "المعالجة", audit_md_evidence: "الدليل",
        audit_md_gaps_stub: "راجع ملف JSON المصدّر للتفاصيل.",
        audit_step_1: "تحليل وتقسيم ملف PDF", audit_step_2: "تضمين المقاطع واسترجاع السياق",
        audit_step_3: "تقييم كل ضابط (LLM)", audit_step_4: "تجميع الدرجات وتقرير ماركداون",
        audit_need_fw: "اختر إطار عمل واحد على الأقل.", audit_need_pdf: "ارفع ملف PDF أولاً.",
        audit_running: "يتم تشغيل التدقيق الكامل... قد يستغرق ذلك عدة دقائق.",
        audit_try_offline: "يمكنك تجربة العرض غير المتصل فقط—بدون درجات حقيقية.",
        audit_timeout: "انتهت مهلة الطلب.",
        story_h: "مسارات القصص", story_p: "رحلات تسلسلية عبر المسرد. تجمع كل قصة المصطلحات في فصول مروية لتجربة تعليمية سينمائية.",
        story_track_info_stub: "المسار", story_select_track: "اختر مساراً", story_chapter_stub: "الفصل",
        story_in_chapter: "في هذا الفصل", story_drawer_h: "تفاصيل المصطلح", story_drawer_close: "✕ إغلاق",
        flash_h: "بطاقات الاستذكار والاختبارات",
        flash_p: "مشتتات يتم إنشاؤها تلقائياً. اختر مستوى الصعوبة للتركيز على تعلمك.",
        quiz_prompt: "أي تعريف يطابق هذا المصطلح؟",
        quiz_prompt_mc: "أي تعريف يطابق هذا المصطلح؟",
        quiz_prompt_rev: "أي مصطلح يطابق هذا التعريف؟",
        quiz_streak: (n) => `سلسلة الانتصارات ${n} · المراجعة التالية قريباً`,
        quiz_streak_stub: "سلسلة الانتصارات", quiz_next_review_stub: "المراجعة التالية قريباً",
        quiz_mc: "اختيار من متعدد", quiz_rev: "البحث العكسي", quiz_export: "تصدير إلى Anki",
        quiz_prev_title: "السابق (السهم الأيسر)", quiz_next_title: "تخطي (السهم الأيمن)",
        story_arch_stub: (name) => `الهندسة التقنية لـ "${name}" ستتوفر قريباً.`,
        diff_all: "جميع المستويات", diff_easy: "سهل", diff_int: "متوسط", diff_hard: "صعب",
        detail_view_h: "تفاصيل المصطلح",
        detail_view_p: "كل ما ولده مسار الإثراء لكل مصطلح — استعارة، UML، المتطلبات، علاقات المخطط، الكود والرياضيات.",
        loading_term: "جارٍ تحميل المصطلح...",
        loading: "جارٍ تحميل البيانات...", status: (n) => `تم تحميل ${n} مصطلحاً.`,
        search: "ابحث في ١٬٢٤٢ مصطلحاً...",
        quiz_card: "بطاقة", quiz_of: "من",
        rewrite_view_h: "إعادة الكتابة مع التصحيح",
        rewrite_view_p: "الصق نصاً تقنياً بالعربية. يتم استرجاع المصطلحات المقابلة (en|ar|fr) ثم يقوم النموذج بإعادة صياغة النص.",
        rewrite_before_h: "قبل",
        rewrite_after_h: "بعد · مخرجات النموذج",
        rewrite_placeholder: "الصق نصك هنا...",
        rewrite_run: "تشغيل",
        rewrite_clear: "مسح",
        rewrite_footer_hint: "يعتمد التصحيح على سياق RAG من مسرد ICAIRE.",
        rewrite_ref_kicker: "مرجع التصميم · قالب إداري (توضيحي)",
        rewrite_ref_h_before: "قبل · النص الأصلي",
        rewrite_ref_h_after: "بعد · محاذاة ICAIRE",
        rewrite_ref_mock_flags: "٤ ملاحظات",
        rewrite_ref_mock_fixed: "✓ تم تطبيق ٤ تصحيحات",
        rewrite_ref_mock_footer_before: "تم وضع علامة على ٤ مصطلحات · ٣ غير معيارية، ١ غير مترجم",
        rewrite_ref_mock_footer_after: "جميع المصطلحات تتبع مسرد ICAIRE",
        rewrite_ref_btn_changelog: "عرض سجل التغييرات",
        rewrite_ref_btn_export: "تصدير .docx",
        rewrite_ref_btn_report: "تقرير الاتساق",
        rewrite_ref_btn_apply: "تطبيق جميع التصحيحات",
        rewrite_ref_actions_note: "إجراءات العرض — غير نشطة (قالب فقط).",
        rewrite_live_heading: "جرب نصك الخاص",
        rewrite_live_sub: "الصق فقرة أدناه للحصول على مخرجات فورية (RAG + NVIDIA).",
        rewrite_need_text: "يرجى لصق نص أولاً.",
        rewrite_matching_glossary: "مطابقة المسرد...",
        rewrite_streaming: "جاري المعالجة...",
        rewrite_done: "تم",
        rewrite_err: "خطأ: ",
        featured: "مصطلحات مختارة من قاعدة بياناتك",
        dashboard_tools_h: "الأدوات",
        stats_terms: "إجمالي المصطلحات",
        stats_tracks: "مسارات القصة",
        stats_edges: "روابط المخطط",
        stats_uml: "مخططات UML",
        feat_audit_t: "تدقيق الذكاء الاصطناعي", feat_audit_p: "تقييم الامتثال للأطر العالمية.", feat_audit_f: "تقرير PDF",
        feat_graph_t: "مخطط المعرفة", feat_graph_p: "استكشاف الروابط بين المصطلحات.", feat_graph_f: "تفاعلي",
        feat_story_t: "مسارات القصص", feat_story_p: "رحلات تعليمية مروية.", feat_story_f: "٧ مسارات",
        feat_detail_t: "تفاصيل المصطلح", feat_detail_p: "شروحات عميقة ورسومات.", feat_detail_f: "إثراء AI",
        feat_rewrite_t: "مساعد الكتابة", feat_rewrite_p: "تصحيح الصياغة التقنية.", feat_rewrite_f: "RAG + LLM",
        feat_flash_t: "بطاقات الاستذكار", feat_flash_p: "اختبارات التكرار المتباعد.", feat_flash_f: "تعلم نشط"
      },
      en: {
        home: "Home", dashboard: "Dashboard", graph: "Knowledge graph", story: "Story tracks", anatomy: "Transformer anatomy", detail: "Term detail", rewrite: "Rewrite tool", audit: "Audit AI", flash: "Flashcards",
        nav_explore: "Explore",
        brand_t: "Audit AI", brand_s: "Arabic-first ICAIRE glossary · 1,242 terms",
        hero: "How do you know your AI is compliant?",
        landing_kicker: "ICAIRE · AI governance",
        landing_lead: "Get a detailed compliance report in minutes. Audit your policies and systems against global frameworks with Arabic-first precision.",
        landing_cta_audit: "Get your report now",
        landing_cta_dashboard: "Explore workspace",
        lp_stats_h: "Precision at scale",
        lp_stats_deck: "Real-time governance analytics across your entire AI lifecycle.",
        lp_stat_1_num: "1,242", lp_stat_1_txt: "Enriched Terms",
        lp_stat_2_num: "519", lp_stat_2_txt: "Active Controls",
        lp_stat_3_num: "4", lp_stat_3_txt: "Global Frameworks",
        lp_stat_4_num: "98%", lp_stat_4_txt: "Accuracy Rate",
        lp_stat_5_num: "15", lp_stat_5_txt: "Private Clusters",
        lp_stat_6_num: "24", lp_stat_6_txt: "Avg. Audit Time (m)",
        lp_fold_matrix: "The ICAIRE Vision",
        lp_matrix_lede: "Who we are, what problem we solve, and what this workspace delivers—grounded in the Arabic-first glossary.",
        lp_label_who: "Who we are", lp_who_title: "Purpose", lp_who_body: "We combine the ICAIRE Arabic-first glossary with tooling to review AI-related documents against recognized frameworks.",
        lp_label_deal: "The challenge", lp_challenge_title: "What we deal with", lp_challenge_body: "Policies and project documents are fragmented across languages; compliance expectations differ.",
        lp_label_build: "The product", lp_build_title: "What we build", lp_build_body: "A self-contained workspace: Upload PDFs for audit, explore 1,242+ terms in a graph, and learn via stories.",
        lp_fold_platform: "Platform Capabilities",
        lp_explore_intro: "Below is what you can do today inside this application—each area opens from the tabs above.",
        lp_benefits_h: "Key Benefits",
        lp_b1_t: "Evidence-backed audits", lp_b1_p: "Scores are anchored to rubric controls with chunk retrieval—not generic summaries.",
        lp_b2_t: "Runs on your stack", lp_b2_p: "Local FastAPI + your NVIDIA API key; documents stay on your machine.",
        lp_b3_t: "Trilingual glossary", lp_b3_p: "ICAIRE terms in Arabic, English, and French—aligned for policy language.",
        lp_b4_t: "Learning loop", lp_b4_p: "Graph, stories, and flashcards turn the glossary into structured study.",
        lp_services_h: "Services & modules",
        lp_line_1: "Audit AI — end-to-to PDF scoring against embedded framework controls.",
        lp_line_2: "Glossary & graph — interactive knowledge graph and rich term pages.",
        lp_line_3: "Stories & flashcards — narrated tracks and quizzes for conceptual learning.",
        lp_line_4: "Rewrite helper — Arabic drafting support with lexical retrieval.",
        lp_line_5: "Workspace dashboard — live stats and one-click entry to every module.",
        lp_fw_h: "Integrated Frameworks",
        lp_fw_deck: "Audit against the world's most rigorous AI standards.",
        lp_fw_1_t: "NIST AI RMF", lp_fw_1_p: "Risk Management Framework v1.0",
        lp_fw_2_t: "UNESCO Ethics", lp_fw_2_p: "Recommendation on the Ethics of AI",
        lp_fw_3_t: "OECD Framework", lp_fw_3_p: "Classification of AI Systems",
        lp_fw_4_t: "OECD Principles", lp_fw_4_p: "Values-based Principles for AI",
        lp_learning_h: "Master AI Governance",
        lp_learn_1_t: "Story Tracks", lp_learn_1_p: "Narrative journeys from foundations to frontier ethics.",
        lp_learn_2_t: "Flashcards", lp_learn_2_p: "Spaced repetition to master technical terminology.",
        lp_learn_3_t: "Knowledge Graph", lp_learn_3_p: "Explore connections between 1,200+ canonical terms.",
        landing_cta_audit: "Start your first audit",
        landing_cta_glossary: "Browse the knowledge graph",
        landing_cta_dash_2: "Go to workspace",
        lp_final_h: "Ready to secure your AI future?",
        lp_final_p: "Join the ICAIRE ecosystem and start auditing your AI governance today.",
        dashboard_h2: "Workspace",
        dashboard_lead: "Statistics, picks from your glossary, and shortcuts to every tool.",
        audit_brand: "Audit AI", audit_h: "Audit AI",
        audit_p: "Evaluate your AI documents against global and local governance frameworks in a secure, private workspace.",
        audit_crumb_upload: "Upload", audit_crumb_process: "Processing", audit_crumb_report: "Report",
        audit_sec1: "1. Document type", audit_sec2: "2. Frameworks", audit_sec3: "3. Document (PDF)",
        audit_doc_plan: "Project plan / PRD", audit_doc_plan_sub: "Roadmaps, procurement, delivery plans",
        audit_doc_policy: "AI policy / charter", audit_doc_policy_sub: "Charters, governance statements",
        audit_doc_system: "System documentation", audit_doc_system_sub: "Model cards, system documentation",
        audit_fw_loading: "Loading frameworks...", audit_dz_main: "Drop PDF here or click to browse",
        audit_dz_sub: "Max ~20 MB · text is processed locally",
        audit_run: "Run audit", audit_offline_btn: "Offline demo only",
        audit_proc_running: "Running audit pipeline", audit_report_md_summary: "Markdown report",
        audit_dl_json: "Download JSON", audit_new_audit: "New audit",
        audit_md_by_fw: "Score by framework", audit_md_gaps: "Priority gaps",
        audit_dash_snapshot: "Compliance snapshot", audit_top_gaps: "Top gaps & partials",
        audit_md_met: "Met", audit_md_partial: "Partial", audit_md_not_met: "Not met", audit_md_na: "N/A",
        audit_md_remediation: "Remediation", audit_md_evidence: "Evidence",
        audit_md_gaps_stub: "Review the JSON export for detail.",
        audit_step_1: "Parse & chunk the PDF", audit_step_2: "Embed passages & retrieve context",
        audit_step_3: "Evaluate each control (LLM)", audit_step_4: "Aggregate scores & markdown report",
        audit_need_fw: "Select at least one framework.", audit_need_pdf: "Upload a PDF first.",
        audit_running: "Running full audit… this may take many minutes.",
        audit_try_offline: "You can try “Offline demo only” — no real scoring.",
        audit_timeout: "Request timed out.",
        story_h: "Story tracks", story_p: "Chronological journeys through the glossary. Each track groups terms into narrated chapters for a cinematic learning experience.",
        story_track_info_stub: "Track", story_select_track: "Select a track", story_chapter_stub: "Chapter",
        story_in_chapter: "In this chapter", story_drawer_h: "Term Detail", story_drawer_close: "✕ Close",
        flash_h: "Flashcards & quizzes",
        flash_p: "Auto-generated distractors from the enrichment pipeline. Choose a difficulty level to focus your learning.",
        quiz_prompt: "Which definition matches this term?",
        quiz_prompt_mc: "Which definition matches this term?",
        quiz_prompt_rev: "Which term matches this definition?",
        quiz_streak: (n) => `streak ${n} · next review soon`,
        quiz_streak_stub: "streak", quiz_next_review_stub: "next review soon",
        quiz_mc: "Multiple choice", quiz_rev: "Reverse lookup", quiz_export: "Export to Anki",
        quiz_prev_title: "Previous (Left Arrow)", quiz_next_title: "Skip (Right Arrow)",
        story_arch_stub: (name) => `Technical architecture for "${name}" coming soon.`,
        diff_all: "All Levels", diff_easy: "Easy", diff_int: "Intermediate", diff_hard: "Hard",
        detail_view_h: "Term detail",
        detail_view_p: "Everything the enrichment pipeline generated per term — metaphor, UML, prerequisites, graph relations, code, and math.",
        loading_term: "Loading term…",
        loading: "Loading data...", status: (n) => `Loaded ${n} terms.`,
        search: "Search 1,242 terms...",
        quiz_card: "Card", quiz_of: "of",
        rewrite_view_h: "Rewrite with correction",
        rewrite_view_p: "Paste Arabic AI/ML text. Matching glossary triplets (en|ar|fr) are retrieved, then the model revises the text (streaming).",
        rewrite_before_h: "Before",
        rewrite_after_h: "After · model output",
        rewrite_placeholder: "Paste your text here...",
        rewrite_run: "Run",
        rewrite_clear: "Clear",
        rewrite_footer_hint: "Correction is based on RAG context from ICAIRE glossary.",
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
        rewrite_live_sub: "Paste a paragraph below for streamed output (RAG + NVIDIA).",
        rewrite_need_text: "Please paste text first.",
        rewrite_matching_glossary: "Matching glossary...",
        rewrite_streaming: "Processing...",
        rewrite_done: "Done",
        rewrite_err: "Error: ",
        featured: "Featured terms from your database",
        dashboard_tools_h: "Tools",
        stats_terms: "Total Terms",
        stats_tracks: "Story Tracks",
        stats_edges: "Graph Edges",
        stats_uml: "UML Diagrams",
        feat_audit_t: "Audit AI", feat_audit_p: "Evaluate compliance against global frameworks.", feat_audit_f: "PDF Report",
        feat_graph_t: "Knowledge Graph", feat_graph_p: "Explore term connections and clusters.", feat_graph_f: "Interactive",
        feat_story_t: "Story Tracks", feat_story_p: "Narrative learning journeys.", feat_story_f: "7 Tracks",
        feat_detail_t: "Term Detail", feat_detail_p: "Deep explanations and diagrams.", feat_detail_f: "AI Enriched",
        feat_rewrite_t: "Writing Assistant", feat_rewrite_p: "Correct technical Arabic phrasing.", feat_rewrite_f: "RAG + LLM",
        feat_flash_t: "Flashcards", feat_flash_p: "Spaced repetition quizzes.", feat_flash_f: "Active Learning"
      },
      fr: {
        home: "Accueil", dashboard: "Tableau de bord", graph: "Graphe", story: "Parcours", anatomy: "Anatomie", detail: "Détail", rewrite: "Correction", audit: "Audit AI", flash: "Flashcards",
        nav_explore: "Explorer",
        brand_t: "Audit AI", brand_s: "Glossaire ICAIRE",
        hero: "Comment savez-vous si votre IA est conforme ?",
        landing_kicker: "ICAIRE · Gouvernance de l'IA",
        landing_lead: "Obtenez un rapport de conformité détaillé en quelques minutes. Auditez vos politiques et systèmes.",
        landing_cta_audit: "Rapport maintenant",
        landing_cta_dashboard: "Explorer l'espace",
        lp_stats_h: "Précision à l'échelle",
        lp_stats_deck: "Analyses de gouvernance en temps réel sur tout le cycle de vie de l'IA.",
        lp_stat_1_num: "1 242", lp_stat_1_txt: "Termes enrichis",
        lp_stat_2_num: "519", lp_stat_2_txt: "Contrôles actifs",
        lp_stat_3_num: "4", lp_stat_3_txt: "Cadres mondiaux",
        lp_stat_4_num: "98%", lp_stat_4_txt: "Taux de précision",
        lp_stat_5_num: "15", lp_stat_5_txt: "Clusters privés",
        lp_stat_6_num: "24", lp_stat_6_txt: "Temps d'audit (m)",
        lp_fold_matrix: "La vision ICAIRE",
        lp_matrix_lede: "Qui nous sommes, quel problème nous traitons, et ce que cet espace livre.",
        lp_label_who: "Qui nous sommes", lp_who_title: "Mission", lp_who_body: "Nous associons le glossaire ICAIRE à des outils de relecture des documents IA.",
        lp_label_deal: "Le défi", lp_challenge_title: "Ce que nous traitons", lp_challenge_body: "Les politiques sont éclatées entre les langues ; les attentes varient.",
        lp_label_build: "Le produit", lp_build_title: "Ce que nous construisons", lp_build_body: "Une plate-forme autonome : PDF pour l'audit, graphe, histoires et cartes.",
        lp_fold_platform: "Capacités de la plateforme",
        lp_explore_intro: "Voici ce que vous pouvez utiliser aujourd'hui dans l'application.",
        lp_benefits_h: "Avantages clés",
        lp_b1_t: "Audits fondés sur la preuve", lp_b1_p: "Scores liés aux contrôles et extraits retrouvés.",
        lp_b2_t: "Votre infrastructure", lp_b2_p: "FastAPI local et clé NVIDIA ; les documents restent chez vous.",
        lp_b3_t: "Glossaire trilingue", lp_b3_p: "Termes ICAIRE en arabe, anglais et français.",
        lp_b4_t: "Boucle d'apprentissage", lp_b4_p: "Graphe, histoires et cartes pour étudier le glossaire.",
        lp_services_h: "Services & modules",
        lp_line_1: "Audit AI — notation complète des PDF selon les contrôles.",
        lp_line_2: "Glossaire & graphe — graphe interactif et fiches riches.",
        lp_line_3: "Parcours & cartes — récits et quiz pour l'apprentissage.",
        lp_line_4: "Aide à la rédaction — arabe avec récupération lexicale.",
        lp_line_5: "Tableau de bord — statistiques et accès rapide aux modules.",
        landing_cta_glossary: "Parcourir le graphe de connaissances",
        landing_cta_dash_2: "Aller à l'espace de travail",
        lp_final_h: "Prêt à sécuriser votre avenir en IA ?",
        lp_final_p: "Rejoignez l'écosystème ICAIRE et commencez votre audit dès aujourd'hui.",
        dashboard_h2: "Espace de travail",
        dashboard_lead: "Statistiques, sélections de votre glossaire et raccourcis.",
        audit_brand: "Audit AI", audit_h: "Audit AI",
        audit_p: "Évaluez vos documents d'IA par rapport aux cadres de gouvernance mondiaux et locaux.",
        audit_crumb_upload: "Téléchargement", audit_crumb_process: "Traitement", audit_crumb_report: "Rapport",
        audit_sec1: "1. Type de document", audit_sec2: "2. Cadres de travail", audit_sec3: "3. Document (PDF)",
        audit_doc_plan: "Plan de projet / PRD", audit_doc_plan_sub: "Feuilles de route, approvisionnement",
        audit_doc_policy: "Politique IA / Charte", audit_doc_policy_sub: "Chartes, déclarations de gouvernance",
        audit_doc_system: "Documentation système", audit_doc_system_sub: "Fiches de modèle, documentation technique",
        audit_fw_loading: "Chargement des cadres...", audit_dz_main: "Déposez le PDF ici ou cliquez",
        audit_dz_sub: "Max ~20 Mo · texte traité localement",
        audit_run: "Lancer l'audit", audit_offline_btn: "Démo hors ligne uniquement",
        audit_proc_running: "Exécution du pipeline d'audit", audit_report_md_summary: "Rapport Markdown",
        audit_dl_json: "Télécharger JSON", audit_new_audit: "Nouvel audit",
        audit_md_by_fw: "Score par cadre", audit_md_gaps: "Lacunes prioritaires",
        audit_dash_snapshot: "Aperçu de la conformité", audit_top_gaps: "Principales lacunes",
        audit_md_met: "Conforme", audit_md_partial: "Partiel", audit_md_not_met: "Non conforme", audit_md_na: "N/A",
        audit_md_remediation: "Remédiation", audit_md_evidence: "Preuve",
        audit_md_gaps_stub: "Consultez l'export JSON pour plus de détails.",
        audit_step_1: "Analyser et segmenter le PDF", audit_step_2: "Embeddings et récupération du contexte",
        audit_step_3: "Évaluer chaque contrôle (LLM)", audit_step_4: "Agrégation des scores et rapport Markdown",
        audit_need_fw: "Choisissez au moins un cadre.", audit_need_pdf: "Téléchargez d'abord un PDF.",
        audit_running: "Audit complet en cours... cela peut prendre plusieurs minutes.",
        audit_try_offline: "Vous pouvez essayer la démo hors ligne — pas de score réel.",
        audit_timeout: "Délai d'attente dépassé.",
        story_h: "Parcours", story_p: "Voyages chronologiques à travers le glossaire. Chaque parcours regroupe des termes en chapitres narrés.",
        story_track_info_stub: "Parcours", story_select_track: "Choisir un parcours", story_chapter_stub: "Chapitre",
        story_in_chapter: "Dans ce chapitre", story_drawer_h: "Détail du terme", story_drawer_close: "✕ Fermer",
        flash_h: "Flashcards & quiz",
        flash_p: "Distracteurs générés automatiquement. Choisissez un niveau de difficulté pour focaliser votre apprentissage.",
        quiz_prompt: "Quelle définition correspond à ce terme ?",
        quiz_prompt_mc: "Quelle définition correspond à ce terme ?",
        quiz_prompt_rev: "Quel terme correspond à cette définition ?",
        quiz_streak: (n) => `série ${n} · prochaine révision bientôt`,
        quiz_streak_stub: "série", quiz_next_review_stub: "prochaine révision bientôt",
        quiz_mc: "Choix multiple", quiz_rev: "Recherche inversée", quiz_export: "Exporter vers Anki",
        quiz_prev_title: "Précédent (Flèche gauche)", quiz_next_title: "Passer (Flèche droite)",
        story_arch_stub: (name) => `L'architecture technique pour "${name}" bientôt disponible.`,
        diff_all: "Tous les niveaux", diff_easy: "Facile", diff_int: "Intermédiaire", diff_hard: "Difficile",
        detail_view_h: "Détail du terme",
        detail_view_p: "Tout ce que le pipeline d'enrichissement a généré — métaphore, UML, prérequis, relations de graphe, code et mathématiques.",
        loading_term: "Chargement du terme...",
        loading: "Chargement...", status: (n) => `${n} termes chargés.`,
        search: "Rechercher 1 242 termes...",
        quiz_card: "Carte", quiz_of: "sur",
        rewrite_view_h: "Réécriture avec correction",
        rewrite_view_p: "Collez du texte technique en arabe. Les triplets du glossaire (en|ar|fr) sont récupérés, puis le modèle révise le texte.",
        rewrite_before_h: "Avant",
        rewrite_after_h: "Après · sortie du modèle",
        rewrite_placeholder: "Collez votre texte ici...",
        rewrite_run: "Exécuter",
        rewrite_clear: "Effacer",
        rewrite_footer_hint: "La correction est basée sur le contexte RAG du glossaire ICAIRE.",
        rewrite_ref_kicker: "Référence de conception · modèle d'administration (illustratif)",
        rewrite_ref_h_before: "Avant · texte original",
        rewrite_ref_h_after: "Après · alignement ICAIRE",
        rewrite_ref_mock_flags: "4 alertes",
        rewrite_ref_mock_fixed: "✓ 4 corrections appliquées",
        rewrite_ref_mock_footer_before: "4 termes signalés · 3 non-canoniques, 1 non traduit",
        rewrite_ref_mock_footer_after: "Tous les termes alignés sur le glossaire ICAIRE",
        rewrite_ref_btn_changelog: "Afficher le journal",
        rewrite_ref_btn_export: "Exporter .docx",
        rewrite_ref_btn_report: "Rapport de cohérence",
        rewrite_ref_btn_apply: "Appliquer les corrections",
        rewrite_ref_actions_note: "Actions de démo — inactives (modèle uniquement).",
        rewrite_live_heading: "Essayez votre propre texte",
        rewrite_live_sub: "Collez un paragraphe ci-dessous pour une sortie en continu (RAG + NVIDIA).",
        rewrite_need_text: "Veuillez coller du texte d'abord.",
        rewrite_matching_glossary: "Correspondance au glossaire...",
        rewrite_streaming: "Traitement...",
        rewrite_done: "Terminé",
        rewrite_err: "Erreur : ",
        featured: "Termes vedettes de votre base de données",
        dashboard_tools_h: "Outils",
        stats_terms: "Total des termes",
        stats_tracks: "Parcours",
        stats_edges: "Liens du graphe",
        stats_uml: "Diagrammes UML",
        feat_audit_t: "Audit AI", feat_audit_p: "Évaluer la conformité aux cadres mondiaux.", feat_audit_f: "Rapport PDF",
        feat_graph_t: "Graphe de connaissances", feat_graph_p: "Explorez les connexions entre les termes.", feat_graph_f: "Interactif",
        feat_story_t: "Parcours narratifs", feat_story_p: "Voyages d'apprentissage narrés.", feat_story_f: "7 parcours",
        feat_detail_t: "Détail du terme", feat_detail_p: "Explications approfondies et schémas.", feat_detail_f: "Enrichi par IA",
        feat_rewrite_t: "Assistant de rédaction", feat_rewrite_p: "Corriger le phrasé technique arabe.", feat_rewrite_f: "RAG + LLM",
        feat_flash_t: "Flashcards", feat_flash_p: "Quiz de répétition espacée.", feat_flash_f: "Apprentissage actif"
      }
    };

    const dict = isAr ? ui.ar : (isFr ? ui.fr : ui.en);
    currentUiDict = dict;
    try {
      window.__mustalih_ui_dict = dict;
    } catch (e) {}

    // Update button states (main nav + landing float share [data-lang])
    document.querySelectorAll('.lang-switch button[data-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Global Direction & Font
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.dir = isAr ? 'rtl' : 'ltr';
    document.body.style.fontFamily = isAr ? 'var(--font-ar)' : 'var(--font-main)';

    // Update Brand Text
    const bTitle = document.querySelector('.brand-text .title'); if(bTitle) bTitle.textContent = dict.brand_t;
    const bSub = document.querySelector('.brand-text .subtitle'); if(bSub) bSub.textContent = dict.brand_s;

    // Update tabs (any order; keyed by data-view)
    const tabLabelKeys = [
      'home', 'audit', 'dashboard', 'graph', 'story', 'detail', 'rewrite', 'flash'
    ];
    tabLabelKeys.forEach((key) => {
      document.querySelectorAll(`button.tab[data-view="${key}"]`).forEach(btn => {
        if (dict[key]) btn.textContent = dict[key];
      });
    });

    const dashboardH2 = document.getElementById('dashboard-h2'); if(dashboardH2) dashboardH2.textContent = dict.dashboard_h2;
    const dashboardP = document.getElementById('dashboard-lead'); if(dashboardP) dashboardP.textContent = dict.dashboard_lead;
    const lCtaGlossary = document.getElementById('landing-cta-glossary'); if(lCtaGlossary) lCtaGlossary.textContent = dict.landing_cta_glossary;
    const lCtaDash2 = document.getElementById('landing-cta-dash-2'); if(lCtaDash2) lCtaDash2.textContent = dict.landing_cta_dash_2;
    const navExplore = document.getElementById('nav-explore-label'); if(navExplore) navExplore.textContent = dict.nav_explore;

    // Update Story View
    const storyH2 = document.getElementById('story-h2'); if(storyH2) storyH2.textContent = dict.story_h;
    const storyP = document.getElementById('story-p'); if(storyP) storyP.textContent = dict.story_p;
    const storyInfo = document.getElementById('story-track-info'); if(storyInfo) storyInfo.textContent = dict.story_track_info_stub;
    const storyName = document.getElementById('story-track-name'); if(storyName) storyName.textContent = dict.story_select_track;
    const inChapter = document.getElementById('story-in-chapter'); if(inChapter) inChapter.textContent = dict.story_in_chapter;
    const drawerK = document.getElementById('story-drawer-kicker'); if(drawerK) drawerK.textContent = dict.story_drawer_h;
    const drawerC = document.getElementById('story-drawer-close'); if(drawerC) drawerC.textContent = dict.story_drawer_close;

    // Update Graph View
    const graphH2 = document.querySelector('[data-view="graph"] h2'); if(graphH2) graphH2.textContent = dict.graph_h;
    const graphP = document.querySelector('[data-view="graph"] p'); if(graphP) graphP.textContent = dict.graph_p;

    const detailVH = document.getElementById('detail-view-title');
    const detailVP = document.getElementById('detail-view-desc');
    if (detailVH && dict.detail_view_h) detailVH.textContent = dict.detail_view_h;
    if (detailVP && dict.detail_view_p) detailVP.textContent = dict.detail_view_p;
    const detailLoad = document.querySelector('#term-detail-panel .italic');
    if (detailLoad) detailLoad.textContent = dict.loading_term;

    if (window.RewriteToolView && typeof window.RewriteToolView.applyLabels === 'function') {
      window.RewriteToolView.applyLabels(dict);
    }
    if (window.AuditView && typeof window.AuditView.applyLabels === 'function') {
      window.AuditView.applyLabels(dict);
    }

    // Update Flash View
    const flashH2 = document.getElementById('flash-h2'); if(flashH2) flashH2.textContent = dict.flash_h;
    const flashP = document.getElementById('flash-p'); if(flashP) flashP.textContent = dict.flash_p;
    const quizPrompt = document.getElementById('quiz-mode-label'); if(quizPrompt) quizPrompt.textContent = dict.quiz_prompt;
    const quizStreak = document.getElementById('quiz-streak'); 
    if(quizStreak) {
      if (typeof dict.quiz_streak === 'function') {
        quizStreak.textContent = dict.quiz_streak(quizStreak.textContent.includes('0') ? 0 : (quizStreak || 0));
      } else {
        quizStreak.textContent = (dict.quiz_streak_stub || 'streak') + ' 0 · ' + (dict.quiz_next_review_stub || 'next review soon');
      }
    }

    const diffChips = document.querySelectorAll('#quiz-filters .chip');
    if(diffChips.length >= 4) {
      diffChips[0].innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><path d="M4 6h16M4 12h16M4 18h16"/></svg>${dict.diff_all}`;
      diffChips[1].textContent = dict.diff_easy;
      diffChips[2].textContent = dict.diff_int;
      diffChips[3].textContent = dict.diff_hard;
    }

    /* Transformer anatomy view disabled (HTML commented); restore block when re-enabling anatomy section + tab */
    if (document.querySelector('[data-view="anatomy"]')) {
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
    }

    // Update Feature Cards
    const statsLabels = document.querySelectorAll('.stat-label');
    if(statsLabels.length >= 4) {
      statsLabels[0].textContent = dict.stats_terms;
      statsLabels[1].textContent = dict.stats_tracks;
      statsLabels[2].textContent = dict.stats_edges;
      statsLabels[3].textContent = dict.stats_uml;
    }
    const featHd = document.getElementById('dashboard-featured-heading');
    if (featHd) featHd.textContent = dict.featured;
    const toolsHd = document.getElementById('dashboard-tools-heading');
    if (toolsHd && dict.dashboard_tools_h) toolsHd.textContent = dict.dashboard_tools_h;
    const dashH2 = document.getElementById('dashboard-h2');
    if (dashH2 && dict.dashboard_h) dashH2.textContent = dict.dashboard_h;
    const dashLead = document.getElementById('dashboard-lead');
    if (dashLead && dict.dashboard_lead) dashLead.textContent = dict.dashboard_lead;

    // Update Feature Cards (order: audit first, then graph … flash)
    const featCards = document.querySelectorAll('.feature-card');
    const featMeta = [
      { t: dict.feat_audit_t, p: dict.feat_audit_p, f: dict.feat_audit_f },
      { t: dict.feat_graph_t, p: dict.feat_graph_p, f: dict.feat_graph_f },
      { t: dict.feat_story_t, p: dict.feat_story_p, f: dict.feat_story_f },
      { t: dict.feat_detail_t, p: dict.feat_detail_p, f: dict.feat_detail_f },
      { t: dict.feat_rewrite_t, p: dict.feat_rewrite_p, f: dict.feat_rewrite_f },
      { t: dict.feat_flash_t, p: dict.feat_flash_p, f: dict.feat_flash_f },
    ];
    featCards.forEach((card, i) => {
      if (!featMeta[i]) return;
      const h = card.querySelector('h3');
      const p = card.querySelector('p');
      const ft = card.querySelector('.feature-footer');
      if (h) h.textContent = featMeta[i].t;
      if (p) p.textContent = featMeta[i].p;
      if (ft) ft.textContent = featMeta[i].f;
    });


    // Landing + load line
    if (dict.landing_kicker) {
      const lk = document.getElementById('landing-kicker');
      if (lk) lk.textContent = dict.landing_kicker;
    }
    const landTitle = document.getElementById('landing-title');
    if (landTitle && dict.hero) landTitle.textContent = dict.hero;
    const landLead = document.getElementById('landing-lead');
    if (landLead && dict.landing_lead) landLead.textContent = dict.landing_lead;
    const b1 = document.getElementById('landing-cta-audit');
    const b2 = document.getElementById('landing-cta-dashboard');
    const bf = document.getElementById('landing-cta-final');
    if (b1 && dict.landing_cta_audit) b1.textContent = dict.landing_cta_audit;
    if (b2 && dict.landing_cta_dashboard) b2.textContent = dict.landing_cta_dashboard;
    if (bf && dict.landing_cta_audit) bf.textContent = dict.landing_cta_audit;

    const lpSet = (id, key) => {
      const el = document.getElementById(id);
      if (el && dict[key]) el.textContent = dict[key];
    };
    lpSet('lp-label-who', 'lp_label_who');
    lpSet('lp-label-deal', 'lp_label_deal');
    lpSet('lp-label-build', 'lp_label_build');
    lpSet('lp-who-title', 'lp_who_title');
    lpSet('lp-who-body', 'lp_who_body');
    lpSet('lp-challenge-title', 'lp_challenge_title');
    lpSet('lp-challenge-body', 'lp_challenge_body');
    lpSet('lp-build-title', 'lp_build_title');
    lpSet('lp-build-body', 'lp_build_body');
    lpSet('lp-fold-matrix', 'lp_fold_matrix');
    lpSet('lp-fold-platform', 'lp_fold_platform');
    lpSet('lp-explore-intro', 'lp_explore_intro');
    lpSet('lp-benefits-h', 'lp_benefits_h');
    lpSet('lp-b1-t', 'lp_b1_t'); lpSet('lp-b1-p', 'lp_b1_p');
    lpSet('lp-b2-t', 'lp_b2_t'); lpSet('lp-b2-p', 'lp_b2_p');
    lpSet('lp-b3-t', 'lp_b3_t'); lpSet('lp-b3-p', 'lp_b3_p');
    lpSet('lp-b4-t', 'lp_b4_t'); lpSet('lp-b4-p', 'lp_b4_p');
    lpSet('lp-services-h', 'lp_services_h');
    lpSet('lp-matrix-lede', 'lp_matrix_lede');
    lpSet('lp-stats-heading', 'lp_stats_h');
    lpSet('lp-stats-deck', 'lp_stats_deck');
    lpSet('lp-final-h', 'lp_final_h');
    lpSet('lp-final-p', 'lp_final_p');
    lpSet('lp-fw-h', 'lp_fw_h');
    lpSet('lp-fw-deck', 'lp_fw_deck');
    lpSet('lp-fw-1-t', 'lp_fw_1_t'); lpSet('lp-fw-1-p', 'lp_fw_1_p');
    lpSet('lp-fw-2-t', 'lp_fw_2_t'); lpSet('lp-fw-2-p', 'lp_fw_2_p');
    lpSet('lp-fw-3-t', 'lp_fw_3_t'); lpSet('lp-fw-3-p', 'lp_fw_3_p');
    lpSet('lp-fw-4-t', 'lp_fw_4_t'); lpSet('lp-fw-4-p', 'lp_fw_4_p');
    lpSet('lp-learning-h', 'lp_learning_h');
    lpSet('lp-learn-1-t', 'lp_learn_1_t'); lpSet('lp-learn-1-p', 'lp_learn_1_p');
    lpSet('lp-learn-2-t', 'lp_learn_2_t'); lpSet('lp-learn-2-p', 'lp_learn_2_p');
    lpSet('lp-learn-3-t', 'lp_learn_3_t'); lpSet('lp-learn-3-p', 'lp_learn_3_p');
    for (let i = 1; i <= 6; i += 1) {
      lpSet(`lp-stat-n-${i}`, `lp_stat_${i}_num`);
      lpSet(`lp-stat-t-${i}`, `lp_stat_${i}_txt`);
    }
    for (let i = 1; i <= 5; i += 1) {
      lpSet(`lp-line-${i}`, `lp_line_${i}`);
    }

    const heroImg = document.querySelector('.hero-preview-img');
    if (heroImg) {
      heroImg.src = lang === 'ar' ? 'assets/report_preview_ar.png' : 'assets/report_preview.png';
    }
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

    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      if (dict.theme_toggle) {
        btn.setAttribute('aria-label', dict.theme_toggle);
        btn.title = dict.theme_toggle;
      }
    });
    updateThemeToggle();

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

  /** Hide full header/tabs on the marketing landing view only. */
  function syncLandingBodyClass() {
    const active = document.querySelector('.tab.active');
    const v = active && active.dataset ? active.dataset.view : '';
    document.body.classList.toggle('is-landing-home', v === 'home');
  }

  // --- NAVIGATION (Top level to ensure it always works) ---
  function goto(target) {
    try {
      if (target === 'anatomy') target = 'dashboard';
      const tabs = document.querySelectorAll('.tab');
      const views = document.querySelectorAll('.view');
      
      tabs.forEach(t => t.classList.toggle('active', t.dataset.view === target));
      views.forEach(v => v.classList.toggle('active', v.dataset.view === target));

      syncLandingBodyClass();
      
      // Inject templates if section is empty
      const viewEl = document.querySelector(`.view[data-view="${target}"]`);
      const templateKey = (target === 'flash' && !window.MustalihTemplates.flash) ? 'flashcards' : target;
      
      if (viewEl && viewEl.innerHTML.trim() === '' && window.MustalihTemplates && window.MustalihTemplates[templateKey]) {
        viewEl.innerHTML = window.MustalihTemplates[templateKey];
        // Re-localize if needed
        setLanguage(currentLang);
      }

      if (target === 'story') {
        ensureGlossaryLoaded().then(() => {
          setupStoryTracks();
          renderStoryTrack();
        });
      }
      if (target === 'flash') {
        ensureGlossaryLoaded().then(() => {
          if (terms.length > 0) setupFlashcards();
        });
      }
      if (target === 'graph') {
        ensureGlossaryLoaded().then(() => {
          if (graphNodes.length === 0) {
            setupGraphData();
            setupDynamicFilters();
            initGraphEngine();
          }
          setTimeout(() => {
            const canvas = document.getElementById('graph-canvas');
            if (canvas && typeof graphResize === 'function') graphResize();
            startGraphAnimationLoop();
          }, 50);
        });
      } else {
        stopGraphAnimationLoop();
      }

      if (target === 'audit') {
        mountAuditView();
      }
      if (target === 'rewrite') {
        mountRewriteTool();
      }
      if (target === 'detail') {
        if (!currentTerm && terms.length > 0) renderDetail(terms[0]);
      }
      if (target === 'dashboard') {
        ensureGlossaryLoaded().then(() => {
          renderFeaturedTerms();
          updateHomeStats();
        });
      }

      // Add animating class to handle fixed positioning during transitions
      if (viewEl) {
        viewEl.classList.add('animating');
        setTimeout(() => {
          viewEl.classList.remove('animating');
        }, 350);
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

  let glossaryLoadPromise = null;
  async function ensureGlossaryLoaded() {
    if (glossaryLoadPromise) return glossaryLoadPromise;
    
    glossaryLoadPromise = (async () => {
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

        setupSearch();
        
        // Background tasks
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(() => {
            if (!glossaryData.tracks || Object.keys(glossaryData.tracks).length === 0) {
              setupStoryTracks();
            }
          });
        }

        return data;
      } catch (e) {
        console.error("Glossary load failed:", e);
        throw e;
      }
    })();
    
    return glossaryLoadPromise;
  }

  let auditViewMounted = false;
  async function mountAuditView() {
    if (auditViewMounted) return;
    const auditRoot = document.getElementById('audit-view-root');
    if (auditRoot && window.AuditView && typeof window.AuditView.mount === 'function') {
      auditViewMounted = true;
      await window.AuditView.mount(auditRoot);
    }
  }

  let rewriteToolMounted = false;
  async function mountRewriteTool() {
    if (rewriteToolMounted) return;
    await ensureGlossaryLoaded();
    const rwRoot = document.getElementById('rewrite-tool-root');
    if (rwRoot && window.RewriteToolView && typeof window.RewriteToolView.mount === 'function') {
      rewriteToolMounted = true;
      window.RewriteToolView.mount(rwRoot, {
        getLang: function () { return currentLang; }
      });
      // Immediately localize after mounting
      if (currentUiDict) {
        window.RewriteToolView.applyLabels(currentUiDict);
      }
    }
  }

  // --- INITIALIZATION ---
  async function init() {
    try {
      syncLandingBodyClass();
      setLanguage(currentLang);
      
      // Start loading glossary in background but don't block landing page
      ensureGlossaryLoaded().catch(e => {
        console.error("Glossary load background fail:", e);
      });

      // Lazy mount features
      if (window.HomeFeaturesView && typeof window.HomeFeaturesView.mount === 'function') {
        const grid = document.getElementById('dashboard-feature-grid');
        if (grid) window.HomeFeaturesView.mount(grid);
      }

    } catch (e) {
      console.error("Init failed:", e);
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
      ar: { 
        label: (n) => `المسار ${n}`,
        quiz_streak: (n) => `سلسلة ${n} · مراجعة قريبة`,
        lp_final_h: "جاهز لتأمين مستقبل ذكاءك الاصطناعي؟",
        lp_final_p: "انضم إلى منظومة ICAIRE وابدأ في تدقيق حوكمة ذكاءك الاصطناعي اليوم."
      },
      en: { 
        label: (n) => `Track ${n}`,
        quiz_streak: (n) => `Streak ${n} · Review soon`,
        lp_final_h: "Ready to secure your AI future?",
        lp_final_p: "Join the ICAIRE ecosystem and start auditing your AI governance today."
      },
      fr: { 
        label: (n) => `Parcours ${n}`,
        quiz_streak: (n) => `Série ${n} · Révision bientôt`,
        lp_final_h: "Prêt à sécuriser votre avenir en IA ?",
        lp_final_p: "Rejoignez l'écosystème ICAIRE et commencez à auditer votre gouvernance IA dès aujourd'hui."
      }
    };
    const currentLabels = uiLabels[currentLang] || uiLabels.en;

    if (nameEl) nameEl.textContent = trackDisplayName;
    if (infoEl) {
      if (typeof currentUiDict.story_track_info_stub === 'string') {
        infoEl.textContent = `${currentUiDict.story_track_info_stub} ${trackNum}`;
      } else {
        infoEl.textContent = `Track ${trackNum}`;
      }
    }
    
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
    if(kicker) {
      const stub = currentUiDict.story_chapter_stub || (isAr ? 'الفصل' : (isFr ? 'Chapitre' : 'Chapter'));
      kicker.textContent = `${stub} ${pos}`;
    }

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
          figCanvas.removeAttribute('data-processed');
          runMermaidOn(figCanvas.querySelectorAll('.mermaid'));
        } catch(e) { 
          console.error("Mermaid error:", e);
          figCanvas.innerHTML = `<div style="color:var(--coral); padding:20px; font-size:12px;">Syntax check: Please verify the UML structure for "${items[0].term.arabic_term}".</div>`;
        }
      } else {
        const archStub = typeof currentUiDict.story_arch_stub === 'function' 
          ? currentUiDict.story_arch_stub(items[0].term.arabic_term)
          : `Technical architecture for "${items[0].term.arabic_term}" coming soon.`;
        figCanvas.innerHTML = `<div style="opacity:0.3; padding:40px; text-align:center;">${archStub}</div>`;
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
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('is-open');
    const overlay = document.getElementById('story-drawer-overlay');
    if (overlay) overlay.classList.add('is-visible');

    const mermaidRoot = document.getElementById('drawer-mermaid-root');
    if (mermaidRoot) {
      const raw = term.ai_mermaid && String(term.ai_mermaid).trim();
      if (raw && typeof mermaid !== 'undefined') {
        let uml = raw.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/<\/script/gi, '<\\/script');
        uml = uml.replace(/\[([^"\]]+)\]/g, '["$1"]');
        mermaidRoot.innerHTML = `<div class="mermaid drawer-mermaid">${uml}</div>`;
        try {
          runMermaidOn(mermaidRoot.querySelectorAll('.mermaid'));
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
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    const overlay = document.getElementById('story-drawer-overlay');
    if (overlay) overlay.classList.remove('is-visible');
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
        body: JSON.stringify({ model: "qwen/qwen3-coder-480b-a35b-instruct", messages: [{role: "user", content: prompt}], temperature: 0.7, max_tokens: 4000, stream: true })
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
        correct = isAr ? (term.arabic_def || term.english_def || "---") 
                       : (currentLang === 'en' ? (term.english_def || term.arabic_def || "---") 
                       : (term.french_def || term.english_def || "---"));
        options = [correct];
        const distractors = isAr ? term.flashcard_distractors_ar : (currentLang === 'en' ? term.flashcard_distractors_en : term.flashcard_distractors_fr);
        if (distractors) options.push(...distractors.slice(0, 3));
        while(options.length < 4) {
          const dTerm = pool[Math.floor(Math.random()*pool.length)];
          const d = isAr ? dTerm.arabic_def : (currentLang === 'en' ? dTerm.english_def : dTerm.french_def);
          if (d && !options.includes(d)) options.push(d);
        }
      } else {
        correct = isAr ? (term.arabic_term || term.english_term || "---") 
                       : (currentLang === 'en' ? (term.english_term || term.arabic_term || "---") 
                       : (term.french_term || term.english_term || "---"));
        options = [correct];
        while(options.length < 4) {
          const dTerm = pool[Math.floor(Math.random()*pool.length)];
          const d = isAr ? (dTerm.arabic_term || dTerm.english_term) 
                         : (currentLang === 'en' ? (dTerm.english_term || dTerm.arabic_term) 
                         : (dTerm.french_term || dTerm.english_term));
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
        termEl.textContent = isAr ? (term.arabic_term || term.english_term || "---") 
                              : (currentLang === 'en' ? (term.english_term || term.arabic_term || "---") 
                              : (term.french_term || term.english_term || term.arabic_term || "---"));
        termEl.style.fontSize = '2.5rem';
      }
    } else {
      if (modeLabel) modeLabel.textContent = ud.quiz_prompt_rev || (isAr ? "أي مصطلح يطابق هذا التعريف؟" : "Which term matches this definition?");
      if(termEl) {
        const def = isAr ? (term.detailed_explanation_ar || term.arabic_def || term.english_def || "---") 
                         : (currentLang === 'en' ? (term.detailed_explanation_en || term.english_def || term.arabic_def || "---") 
                         : (term.detailed_explanation_fr || term.french_def || term.english_def || "---"));
        termEl.textContent = def;
        termEl.style.fontSize = '1.1rem';
      }
    }

    if (streakEl) {
      const streakText = typeof ud.quiz_streak === 'function' ? ud.quiz_streak(quizStreak) : `streak ${quizStreak}`;
      streakEl.innerHTML = `<span class="quiz-streak-badge">${streakText}</span>`;
    }
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
  // --- HIGH-PERFORMANCE FORCE GRAPH ENGINE ---
  let graphNodes = [];
  let graphEdges = [];
  let transform = { x: 0, y: 0, k: 1 };
  let isDragging = false;
  let draggedNode = null;
  let mouse = { x: 0, y: 0 };

  let graphResize = null;
  /** RAF id for the graph loop — must pause when another tab/view is active or the page stalls on mobile. */
  let graphRafId = null;
  let graphDrawLoop = null;
  /** After velocities drop, freeze layout and stop RAF until the user pans/drags or data changes. */
  let graphPhysicsFrozen = false;
  let graphSettledStreak = 0;
  let graphCanvasInteracting = false;

  function resetGraphPhysicsAndRun() {
    graphPhysicsFrozen = false;
    graphSettledStreak = 0;
    startGraphAnimationLoop();
  }

  function graphViewIsActive() {
    const v = document.querySelector('.view[data-view="graph"]');
    return !!(v && v.classList.contains('active'));
  }

  function shouldRunGraphLoop() {
    return graphViewIsActive() && document.visibilityState === 'visible';
  }

  /** Fewer nodes + physics cost on phones / save-data / coarse pointers (Samsung browser, etc.). */
  function graphMaxNodes() {
    try {
      const conn = navigator.connection;
      if (conn && conn.saveData) return 72;
      if (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) return 110;
      if (window.innerWidth < 640) return 130;
      if (window.innerWidth < 1024) return 220;
    } catch (e) {}
    return 420;
  }

  function stopGraphAnimationLoop() {
    if (graphRafId !== null) {
      cancelAnimationFrame(graphRafId);
      graphRafId = null;
    }
  }

  function startGraphAnimationLoop() {
    if (!graphDrawLoop) return;
    if (graphRafId !== null) return;
    if (!shouldRunGraphLoop()) return;
    graphRafId = requestAnimationFrame(graphDrawLoop);
  }

  function initGraphEngine() {
    const canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    let resizeQueued = false;
    let graphCssW = 0;
    let graphCssH = 0;
    graphResize = function () {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        if (!canvas.offsetWidth) return;
        graphCssW = canvas.offsetWidth;
        graphCssH = canvas.offsetHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(graphCssW * dpr);
        canvas.height = Math.floor(graphCssH * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        startGraphAnimationLoop();
      });
    };
    window.addEventListener('resize', graphResize, { passive: true });
    graphResize();

    // Physics Simulation (eases to a stable layout — then we freeze; no endless "dancing")
    function updatePhysics() {
      const cx = (graphCssW || canvas.offsetWidth) / 2;
      const cy = (graphCssH || canvas.offsetHeight) / 2;
      const k = 0.035;
      const r = 820;

      for (let n of graphNodes) {
        n.vx += (cx - n.x) * 0.00055;
        n.vy += (cy - n.y) * 0.00055;

        for (let other of graphNodes) {
          if (n === other) continue;
          const dx = n.x - other.x;
          const dy = n.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 200) {
            const force = r / (dist * dist);
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }
      }

      for (let e of graphEdges) {
        const dx = e.target.x - e.source.x;
        const dy = e.target.y - e.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 100) * k;
        e.source.vx += (dx / dist) * force;
        e.source.vy += (dy / dist) * force;
        e.target.vx -= (dx / dist) * force;
        e.target.vy -= (dy / dist) * force;
      }

      const friction = 0.86;
      for (let n of graphNodes) {
        if (n === draggedNode) continue;
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= friction;
        n.vy *= friction;
      }
    }

    let physicsFrame = 0;
    const coarsePointer =
      typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;

    graphDrawLoop = function drawLoop() {
      graphRafId = null;
      if (!shouldRunGraphLoop()) return;

      const cw = graphCssW || canvas.offsetWidth;
      const ch = graphCssH || canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      ctx.strokeStyle = 'rgba(150,150,150,0.15)';
      ctx.lineWidth = 1;
      for (let e of graphEdges) {
        ctx.beginPath();
        ctx.moveTo(e.source.x, e.source.y);
        ctx.lineTo(e.target.x, e.target.y);
        ctx.stroke();
      }

      for (let n of graphNodes) {
        const radius = 5 + (n.pagerank || 0) * 40;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color || '#a855f7';
        ctx.fill();

        if (transform.k > 0.6) {
          ctx.fillStyle =
            document.documentElement.getAttribute('data-theme') === 'dark' ? '#e8eaed' : '#161616';
          ctx.font = `${Math.max(8, radius / 2)}px Inter, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(n.name_ar, n.x, n.y + radius + 12);
        }
      }
      ctx.restore();

      if (!graphPhysicsFrozen) {
        physicsFrame++;
        const stepPhysics = !coarsePointer || physicsFrame % 2 === 0;
        if (stepPhysics) {
          updatePhysics();
          let maxV = 0;
          for (const n of graphNodes) {
            if (n === draggedNode) continue;
            maxV = Math.max(maxV, Math.hypot(n.vx || 0, n.vy || 0));
          }
          if (draggedNode || graphCanvasInteracting) {
            graphSettledStreak = 0;
          } else if (maxV < 0.12) {
            graphSettledStreak++;
          } else {
            graphSettledStreak = 0;
          }
          if (graphSettledStreak >= 18) {
            graphPhysicsFrozen = true;
            for (const n of graphNodes) {
              n.vx = 0;
              n.vy = 0;
            }
          }
        }
      }

      const needsMotionLoop =
        !graphPhysicsFrozen || graphCanvasInteracting || draggedNode || isDragging;
      if (needsMotionLoop) {
        graphRafId = requestAnimationFrame(drawLoop);
      }
    };

    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'hidden') stopGraphAnimationLoop();
        else if (graphViewIsActive()) startGraphAnimationLoop();
      },
      { passive: true }
    );

    function canvasGraphCoords(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return {
        mx: (clientX - rect.left - transform.x) / transform.k,
        my: (clientY - rect.top - transform.y) / transform.k
      };
    }

    function pickNodeAt(mx, my) {
      let best = null;
      let bestD = Infinity;
      for (const n of graphNodes) {
        const r = 5 + (n.pagerank || 0) * 40;
        const d = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        if (d < Math.max(24, r + 4) && d < bestD) {
          best = n;
          bestD = d;
        }
      }
      return best;
    }

    function onGraphPointerMove(e) {
      if (!draggedNode && !isDragging) return;
      const { mx, my } = canvasGraphCoords(e.clientX, e.clientY);
      if (draggedNode) {
        draggedNode.x = mx;
        draggedNode.y = my;
      } else if (isDragging) {
        transform.x += e.movementX;
        transform.y += e.movementY;
      }
    }

    function endGraphPointer() {
      if (draggedNode) findAndRender(draggedNode.name_ar);
      draggedNode = null;
      isDragging = false;
      graphCanvasInteracting = false;
      canvas.style.touchAction = '';
      window.removeEventListener('pointermove', onGraphPointerMove);
      window.removeEventListener('pointerup', endGraphPointer);
      window.removeEventListener('pointercancel', endGraphPointer);
      startGraphAnimationLoop();
    }

    canvas.addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType === 'touch' || e.pointerType === 'pen') e.preventDefault();
        graphCanvasInteracting = true;
        startGraphAnimationLoop();
        const { mx, my } = canvasGraphCoords(e.clientX, e.clientY);
        draggedNode = pickNodeAt(mx, my);
        if (!draggedNode) isDragging = true;
        canvas.style.touchAction = 'none';
        window.addEventListener('pointermove', onGraphPointerMove, { passive: true });
        window.addEventListener('pointerup', endGraphPointer, { passive: true });
        window.addEventListener('pointercancel', endGraphPointer, { passive: true });
      },
      { passive: false }
    );
  }

  function setupGraphData() {
    const colors = ['#2dd4bf', '#a855f7', '#fb7185', '#60a5fa', '#f59e0b'];
    const clusterMap = {};
    const uniqueClusters = [...new Set(terms.map(t => t.primary_cluster || t.category).filter(Boolean))];
    uniqueClusters.forEach((c, i) => clusterMap[c] = colors[i % colors.length]);

    const cap = graphMaxNodes();
    const displayTerms = terms.slice(0, cap);

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
    PRIMITIVE_CONCEPTS: { ar: "المفاهيم الأولية", en: "Primitive Concepts", fr: "Concepts primitifs" },
    LAYERS_AND_ACTIVATIONS: { ar: "الطبقات والنشاطات", en: "Layers & Activations", fr: "Couches & Activations" }
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
    const cap = graphMaxNodes();
    if (cat === 'all') {
      filtered = terms.slice(0, cap);
    } else {
      filtered = terms.filter(t => t.primary_cluster === cat || t.category === cat).slice(0, Math.min(cap, 280));
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

    resetGraphPhysicsAndRun();
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

  if (typeof window !== 'undefined') {
    window.MustalihApp = {
      openTerm: (name) => {
        if (!name) return;
        findAndRender(name);
        goto('detail');
        closeStoryDrawer();
      }
    };
  }

  function initStatsObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.landing-stats').forEach(el => observer.observe(el));
  }

  function startCounters(container) {
    container.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));
      const timer = setInterval(() => {
        current += Math.ceil(target / 60); // Roughly 60fps
        if (current >= target) {
          el.textContent = target.toLocaleString(currentLang === 'ar' ? 'ar-EG' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'));
          clearInterval(timer);
        } else {
          el.textContent = current.toLocaleString(currentLang === 'ar' ? 'ar-EG' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'));
        }
      }, 16);
    });
  }

  updateThemeToggle();
  init();
  initStatsObserver();
})();
