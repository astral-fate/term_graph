/**
 * HTML Templates for Mustalih App views to keep index.html clean and maintainable.
 */
window.MustalihTemplates = {
  dashboard: `
    <div class="contained-view dashboard-container">
      <div class="view-header dashboard-intro">
        <h2 id="dashboard-h2">Workspace</h2>
        <p id="dashboard-lead">Statistics, picks from your glossary, and shortcuts to every tool.</p>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="stat-label">Total Terms</div>
          <div class="stat-value" id="stat-count">0</div>
        </div>
        <div class="stat">
          <div class="stat-label">Story Tracks</div>
          <div class="stat-value">7</div>
        </div>
        <div class="stat">
          <div class="stat-label">Graph edges</div>
          <div class="stat-value">8,400</div>
          <div class="stat-hint">8 edge types</div>
        </div>
        <div class="stat">
          <div class="stat-label">UML diagrams</div>
          <div class="stat-value">1,180</div>
          <div class="stat-hint">auto-generated</div>
        </div>
      </div>

      <div class="card dashboard-featured">
        <h3 class="dashboard-featured-title" id="dashboard-featured-heading">Featured terms from your database</h3>
        <div id="featured-terms" class="featured-terms-grid"></div>
      </div>

      <h3 class="tools-heading" id="dashboard-tools-heading">Tools</h3>
      <div class="feature-grid" id="dashboard-feature-grid"></div>
    </div>
  `,

  graph: `
    <div class="contained-view">
      <div class="view-header">
        <h2>Knowledge graph</h2>
        <p>Every term is a node; every edge is typed. Clusters auto-discovered via Louvain community detection. Node size = PageRank.</p>
      </div>

      <div class="graph-panel">
        <div class="graph-toolbar" id="graph-filters"></div>
        <div class="graph-legend" id="graph-legend-dynamic"></div>

        <div id="graph-container" style="background: var(--surface); position: relative; height: 600px; cursor: crosshair; overflow: hidden; border-radius: var(--radius-lg); border: 0.5px solid var(--border);">
          <canvas id="graph-canvas" style="width: 100%; height: 100%;"></canvas>
          <div id="graph-tooltip" style="position: absolute; pointer-events: none; background: var(--bg); border: 1px solid var(--border); padding: 8px; border-radius: 6px; display: none; font-size: 12px; z-index: 1000; box-shadow: var(--shadow-lg);"></div>
        </div>
      </div>
    </div>
  `,

  story: `
    <div class="contained-view">
      <div class="view-header">
        <h2 id="story-h2">Story tracks</h2>
        <p id="story-p">Chronological journeys through the glossary. Each track groups terms into narrated chapters for a cinematic learning experience.</p>
      </div>

      <div class="chips" id="story-track-switcher" style="margin-bottom: 20px;"></div>

      <div class="story-grid">
        <aside class="story-pane">
          <div class="pane-kicker" id="story-track-info">Track 1</div>
          <h3 class="pane-title" id="story-track-name">Select a track</h3>
          <ul class="chapter-list" id="story-chapter-list"></ul>
        </aside>

        <section class="story-pane story-main">
          <div class="narration">
            <div class="pane-kicker" style="direction:ltr">Chapter</div>
            <h3>---</h3>
            <div class="hook">---</div>
          </div>

          <div class="live-figure" id="live-figure-container">
            <div class="kicker">Logic Architecture</div>
            <div class="fig-canvas" id="main-fig-canvas">
              <div style="opacity:0.2; padding:80px; text-align:center;">Select a chapter to render its architecture.</div>
            </div>
            <div class="fig-caption">Local JS Rendering · No external tokens used</div>
          </div>
        </section>

        <aside class="term-pane">
          <div class="pane-kicker" id="story-in-chapter">In this chapter</div>
          <div class="term-mini-list"></div>
        </aside>
      </div>

      <div class="side-drawer-overlay" id="story-drawer-overlay" onclick="closeStoryDrawer()"></div>
      <div id="story-term-drawer" class="side-drawer" aria-hidden="true">
        <div class="side-drawer-header">
          <span class="pane-kicker" id="story-drawer-kicker" style="margin: 0;">Term Detail</span>
          <button class="btn" onclick="closeStoryDrawer()" id="story-drawer-close" style="width: auto; padding: 8px 16px;">✕ Close</button>
        </div>
        <div id="drawer-content" class="side-drawer-body"></div>
      </div>
    </div>
  `,

  flashcards: `
    <div class="contained-view">
      <div class="view-header">
        <h2 id="flash-h2">Flashcards &amp; quizzes</h2>
        <p id="flash-p">Auto-generated distractors from the enrichment pipeline. Choose a difficulty level to focus your learning.</p>
      </div>

      <div class="filter-row" id="quiz-filters" style="margin-bottom: 20px; display: flex; gap: 8px;">
        <button type="button" class="chip active" data-quiz-level="all" onclick="filterQuiz('all')">All Levels</button>
        <button type="button" class="chip" data-quiz-level="beginner" onclick="filterQuiz('beginner')">Easy</button>
        <button type="button" class="chip" data-quiz-level="intermediate" onclick="filterQuiz('intermediate')">Intermediate</button>
        <button type="button" class="chip" data-quiz-level="advanced" onclick="filterQuiz('advanced')">Hard</button>
      </div>

      <div class="flash-wrap">
        <div class="flash-nav">
          <button class="nav-btn" id="quiz-prev" onclick="prevQuestion()" title="Previous (Left Arrow)">←</button>
          <div class="flash-prompt" id="quiz-mode-label">Which definition matches this term?</div>
          <button class="nav-btn" id="quiz-next" onclick="setupFlashcards(true)" title="Skip (Right Arrow)">→</button>
        </div>
        
        <div class="flash-term" id="quiz-term-display">---</div>
        <div class="flash-options" id="quiz-options-container"></div>
        <div class="flash-progress">
          <span id="quiz-progress-text">
            <span id="quiz-progress-card">Card</span> 
            <input type="number" id="quiz-jump" min="1" value="1" onchange="jumpToQuestion(this.value)" style="width: 50px; background: transparent; border: 0.5px solid var(--border); border-radius: 4px; color: inherit; font: inherit; text-align: center; padding: 2px;">
            <span id="quiz-progress-of">of</span> <span id="quiz-total">0</span>
          </span>
          <span id="quiz-streak">streak 0 · next review soon</span>
        </div>
      </div>

      <div class="mode-tabs">
        <button type="button" class="btn active" id="mode-mc" onclick="setQuizMode('multiple-choice')">Multiple choice</button>
        <button type="button" class="btn" id="mode-rev" onclick="setQuizMode('reverse')">Reverse lookup</button>
        <button type="button" class="btn" id="quiz-export-anki" onclick="exportToAnki()">Export to Anki</button>
      </div>
    </div>
  `,

  detail: `
    <div class="contained-view">
      <div class="view-header">
        <h2 id="detail-view-title">Term detail</h2>
        <p id="detail-view-desc">Everything the enrichment pipeline generated per term — metaphor, UML, prerequisites, graph relations, code, and math.</p>
      </div>
      <div id="term-detail-panel" class="card" style="padding:0; min-height:600px; border:none; background:transparent;">
        <p class="italic" style="padding:24px; color:var(--text-secondary);">Loading term...</p>
      </div>
    </div>
  `,

  rewrite: `
    <div id="rewrite-tool-root"></div>
  `,

  audit: `
    <div id="audit-view-root"></div>
  `
};
