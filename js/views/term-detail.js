/**
 * Term detail view — renders from glossary_enriched term objects (graph_raw, mermaid, math, code).
 * Loaded after mustalih-app.js; uses global findAndRender, goto.
 */
(function (global) {
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Mermaid source must stay unescaped for parsing; strip patterns that could break HTML. */
  function sanitizeMermaidSource(s) {
    return String(s || '').replace(/<\/script/gi, '<\\/script');
  }

  const I18N = {
    en: {
      feel: 'Feel',
      metaphor: 'Metaphor',
      definition: 'Definition',
      examples: 'Examples',
      prereq: 'Prerequisites',
      unlocks: 'Unlocks',
      is_a: 'Is a',
      part_of: 'Part of',
      alternative_to: 'Alternatives',
      used_with: 'Used with',
      contrasts_with: 'Contrasts with',
      related: 'Related concepts',
      uml: 'UML flow',
      math: 'Math',
      code: 'Code',
      none: 'None',
      na: 'N/A',
      audio: '▸ Audio',
      quiz: 'Quiz me',
      untracked: 'Untracked',
      unknown_cat: 'Unknown category',
      unspecified: 'Unspecified',
      track: 'Track',
      chapter: 'Chapter'
    },
    ar: {
      feel: 'الانطباع',
      metaphor: 'التشبيه',
      definition: 'التعريف',
      examples: 'أمثلة',
      prereq: 'المتطلبات',
      unlocks: 'يفتح',
      is_a: 'نوع من',
      part_of: 'جزء من',
      alternative_to: 'بدائل',
      used_with: 'يُستخدم مع',
      contrasts_with: 'يُقابل',
      related: 'مفاهيم ذات صلة',
      uml: 'مخطط UML',
      math: 'الرياضيات',
      code: 'الكود',
      none: 'لا يوجد',
      na: 'غير متوفر',
      audio: '▸ استمع',
      quiz: 'اختبرني',
      untracked: 'غير مخصص لمسار',
      unknown_cat: 'فئة غير معروفة',
      unspecified: 'غير محدد',
      track: 'المسار',
      chapter: 'الفصل'
    },
    fr: {
      feel: 'Ressenti',
      metaphor: 'Métaphore',
      definition: 'Définition',
      examples: 'Exemples',
      prereq: 'Prérequis',
      unlocks: 'Débloque',
      is_a: 'Est un',
      part_of: 'Partie de',
      alternative_to: 'Alternatives',
      used_with: 'Utilisé avec',
      contrasts_with: 'Contraste avec',
      related: 'Concepts liés',
      uml: 'Flux UML',
      math: 'Maths',
      code: 'Code',
      none: 'Aucun',
      na: 'N/A',
      audio: '▸ Audio',
      quiz: 'Quiz',
      untracked: 'Non classé',
      unknown_cat: 'Catégorie inconnue',
      unspecified: 'Non défini',
      track: 'Parcours',
      chapter: 'Chapitre'
    }
  };

  function L(lang) {
    if (lang === 'ar') return I18N.ar;
    if (lang === 'fr') return I18N.fr;
    return I18N.en;
  }

  function resolveFeel(term, lang) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    if (isAr && term.one_sentence_feel_ar) return term.one_sentence_feel_ar;
    if (!isAr && !isFr && term.one_sentence_feel_en) return term.one_sentence_feel_en;
    if (isFr && term.one_sentence_feel_fr) return term.one_sentence_feel_fr;
    const o = term.one_sentence_feel;
    if (o && typeof o === 'object') {
      if (isAr && o.ar) return o.ar;
      if (isFr && o.fr) return o.fr;
      if (o.en) return o.en;
    }
    return '';
  }

  function resolveExplanation(term, lang) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    if (isAr) {
      return term.detailed_explanation_ar
        || (term.detailed_explanation && term.detailed_explanation.ar)
        || term.arabic_def
        || '';
    }
    if (isFr) {
      return term.detailed_explanation_fr
        || (term.detailed_explanation && term.detailed_explanation.fr)
        || term.french_def
        || '';
    }
    return term.detailed_explanation_en
      || (term.detailed_explanation && term.detailed_explanation.en)
      || term.english_def
      || '';
  }

  function resolveMetaphor(term, lang) {
    if (lang === 'ar') return term.metaphor_ar || '';
    if (lang === 'fr') return term.metaphor_fr || '';
    return term.metaphor_en || '';
  }

  function resolveExamples(term, lang) {
    let list = [];
    if (lang === 'ar' && term.examples_ar) list = term.examples_ar;
    else if (lang === 'fr' && term.examples_fr) list = term.examples_fr;
    else if (term.examples && typeof term.examples === 'object') {
      const k = lang === 'ar' ? 'ar' : (lang === 'fr' ? 'fr' : 'en');
      list = term.examples[k] || term.examples.en || [];
    } else if (lang === 'en' && term.examples_en) list = term.examples_en;
    return Array.isArray(list) ? list : [];
  }

  function primaryTitle(term, lang) {
    if (lang === 'ar') return term.arabic_term || term.english_term || '—';
    if (lang === 'fr') return term.french_term || term.english_term || term.arabic_term || '—';
    return term.english_term || term.arabic_term || '—';
  }

  /** Matches mustalih-app: Arabic shows EN·FR under title; EN/FR shows Arabic · category. */
  function subtitleWithCategory(term, lang) {
    const isAr = lang === 'ar';
    const sub = isAr
      ? `${term.english_term || ''} · ${term.french_term || ''}`.replace(/^ ·|· $/g, '').trim()
      : (term.arabic_term || '');
    const cat = term.category || '';
    if (cat && sub) return `${sub} · ${cat}`;
    if (sub) return sub;
    return cat || '—';
  }

  function normalizeList(v) {
    if (v == null) return [];
    return (Array.isArray(v) ? v : [v]).filter(Boolean);
  }

  function pillsFor(names, labels) {
    const items = normalizeList(names);
    if (!items.length) return `<span class="italic">${escapeHtml(labels.none)}</span>`;
    return items.map((name) => {
      const enc = encodeURIComponent(String(name));
      return `<span class="term-pill" role="button" tabindex="0" onclick="findAndRender(decodeURIComponent('${enc}'))">${escapeHtml(name)}</span>`;
    }).join('');
  }

  function rowHtml(label, innerHtml, dir) {
    const d = dir || 'ltr';
    return `<div class="detail-row"><div class="detail-label">${escapeHtml(label)}</div><div class="detail-content" style="direction:${d};">${innerHtml}</div></div>`;
  }

  function chapterBadgeText(term, lang, labels) {
    const chapter = term.story_assignments_v2 && term.story_assignments_v2.story_assignments
      && term.story_assignments_v2.story_assignments[0];
    if (!chapter) return labels.untracked;
    if (lang === 'ar') {
      return `${chapter.track_name_ar || chapter.track_name || labels.track} · ${labels.chapter} ${chapter.position_in_track || '-'}`;
    }
    if (lang === 'fr') {
      return `${chapter.track_name_fr || chapter.track_name || labels.track} · ${labels.chapter} ${chapter.position_in_track || '-'}`;
    }
    return `${chapter.track_name_en || chapter.track_name || 'Track'} · Chapter ${chapter.position_in_track || '-'}`;
  }

  function render(term, opts) {
    const lang = (opts && opts.lang) || 'en';
    const labels = L(lang);
    const panel = document.getElementById('term-detail-panel');
    if (!panel || !term) return;

    const isAr = lang === 'ar';
    const gr = term.graph_raw || {};
    const rows = [];

    const feel = resolveFeel(term, lang);
    rows.push(rowHtml(labels.feel, `<span class="italic">${escapeHtml(feel) || escapeHtml(labels.na)}</span>`, isAr ? 'rtl' : 'ltr'));

    const metaphor = resolveMetaphor(term, lang);
    if (metaphor) {
      rows.push(rowHtml(labels.metaphor, `<span class="italic">${escapeHtml(metaphor)}</span>`, isAr ? 'rtl' : 'ltr'));
    }

    const expl = resolveExplanation(term, lang);
    rows.push(rowHtml(labels.definition, escapeHtml(expl) || escapeHtml(labels.na), isAr ? 'rtl' : 'ltr'));

    const exList = resolveExamples(term, lang);
    if (exList.length) {
      const ul = '<ul style="margin:0;padding-inline-start:1.2em;">'
        + exList.map((e) => `<li>${escapeHtml(e)}</li>`).join('')
        + '</ul>';
      rows.push(rowHtml(labels.examples, ul, isAr ? 'rtl' : 'ltr'));
    }

    rows.push(rowHtml(labels.prereq, pillsFor(gr.prerequisites, labels), 'ltr'));
    rows.push(rowHtml(labels.unlocks, pillsFor(gr.unlocks, labels), 'ltr'));

    if (normalizeList(gr.is_a).length) {
      rows.push(rowHtml(labels.is_a, pillsFor(gr.is_a, labels), 'ltr'));
    }
    if (normalizeList(gr.part_of).length) {
      rows.push(rowHtml(labels.part_of, pillsFor(gr.part_of, labels), 'ltr'));
    }
    if (normalizeList(gr.alternative_to).length) {
      rows.push(rowHtml(labels.alternative_to, pillsFor(gr.alternative_to, labels), 'ltr'));
    }
    if (normalizeList(gr.used_with).length) {
      rows.push(rowHtml(labels.used_with, pillsFor(gr.used_with, labels), 'ltr'));
    }
    if (normalizeList(gr.contrasts_with).length) {
      rows.push(rowHtml(labels.contrasts_with, pillsFor(gr.contrasts_with, labels), 'ltr'));
    }
    if (normalizeList(gr.related_concepts).length) {
      rows.push(rowHtml(labels.related, pillsFor(gr.related_concepts, labels), 'ltr'));
    }

    if (term.ai_mermaid && String(term.ai_mermaid).trim()) {
      const raw = sanitizeMermaidSource(term.ai_mermaid);
      rows.push(rowHtml(labels.uml, `<div class="mermaid-block"><div class="mermaid">${raw}</div></div>`, 'ltr'));
    } else {
      rows.push(rowHtml(labels.uml, escapeHtml(labels.na), 'ltr'));
    }

    // Math + code rows disabled (were often empty / "غير متوفر").
    // const mathRaw = (term.math_notation_latex && String(term.math_notation_latex).trim())
    //   ? term.math_notation_latex
    //   : (term.math_notation || '');
    // rows.push(rowHtml(labels.math, `<div class="code-block">${escapeHtml(mathRaw) || escapeHtml(labels.na)}</div>`, 'ltr'));
    // const code = term.code_example_python || '';
    // rows.push(rowHtml(labels.code, `<div class="code-block">${escapeHtml(code) || escapeHtml('# —')}</div>`, 'ltr'));

    const chapterText = chapterBadgeText(term, lang, labels);
    const cat = term.category || labels.unknown_cat;
    const diff = term.difficulty || labels.unspecified;
    const prank = typeof term.pagerank === 'number' ? term.pagerank.toFixed(4) : 'N/A';

    const head = `
      <div class="detail-head">
        <div>
          <h1 class="detail-ar">${escapeHtml(primaryTitle(term, lang))}</h1>
          <div class="detail-en">${escapeHtml(subtitleWithCategory(term, lang))}</div>
          <div class="badges">
            <span class="badge teal">${escapeHtml(chapterText)}</span>
            <span class="badge purple">${escapeHtml(cat)}</span>
            <span class="badge">${escapeHtml(diff)}</span>
            <span class="badge">PageRank ${escapeHtml(String(prank))}</span>
          </div>
        </div>
        <div style="display:flex;gap:6px;">
          <button type="button" class="btn" style="width:auto;">${escapeHtml(labels.audio)}</button>
          <button type="button" class="btn" style="width:auto;" onclick="goto('flash')">${escapeHtml(labels.quiz)}</button>
        </div>
      </div>
    `;

    panel.innerHTML = head + rows.join('');

    const h1 = panel.querySelector('.detail-ar');
    if (h1) {
      h1.style.direction = isAr ? 'rtl' : 'ltr';
      h1.style.fontFamily = isAr ? 'var(--font-ar)' : 'var(--font-main)';
    }

    if (opts && typeof opts.afterPaint === 'function') opts.afterPaint();
  }

  global.MustalihTermDetail = { render, I18N };
})(typeof window !== 'undefined' ? window : this);
