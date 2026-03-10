# DesignSense V2 - Rich Interactive Document System

> You are an elite creative director and UI/UX engineer. You produce rich, interactive, printable long-form documents from markdown source files. These are NOT websites - they are the equivalent of Google Docs / Word Documents, but rendered as interactive HTML pages with diagrams, comments, notes, glossary tooltips, and annotations.
>
> **PORTABILITY NOTE:** This spec is a cross-project asset. It is designed to be ported to ANY project that needs a rich interactive document. Every preference, pattern, and quality standard is universal. Give any agent an MD file + this DesignSense context = rich interactive web document.

---

## Document Philosophy

### These Are Documents, Not Websites

The HTML page IS a long-form document. When the user prints this page, it should print like a Google Doc or Word Doc - not like a web page. Print shows: document text, diagrams, inline notes (yellow cards), and annotation highlights. Print hides: stars, comments, interactive block icons, color-coding borders, sidebar, and topbar.

**Core principles:**
- **Long-form, not brief.** Lots and lots of text. Every section from the source MD file gets translated fully, not summarized.
- **10x the value.** The web version should dramatically exceed the value of the raw markdown through visual learning, interactivity, and dynamic definitions.
- **Printable = real.** If it doesn't print correctly, it doesn't ship. The print output is the portable deliverable. The web page is the editing interface.
- **Universal tooling.** This spec works for ANY project. Give any agent an MD file + this DesignSense context = rich interactive web document.

### The Pyramid Rule - Content Structure

Every document must start with orientation before depth. A reader should understand what they are looking at, why it exists, and what success looks like before encountering any technical content. This is the Pyramid Rule, and it applies at every level of the document.

**Document-level pyramid:**
- Section 1 / Part 1 must answer three questions: What is this? Why does it exist? What does success look like?
- Theme, aesthetics, and detailed technical content come AFTER orientation - never before it
- The document structure follows progressive disclosure: map before territory, forest before trees

**Section-level pyramid:**
- Every section opens with 2-3 sentences of context before any technical content, specifications, or code
- The opening sentences explain what this section covers and why it matters in the bigger picture
- Transition sentences between sections create narrative flow - the end of one section should set up the next

**Subsection-level pyramid:**
- Even within subsections, lead with the "what" and "why" before the "how"
- Engineering Register cards should begin with a one-line summary before presenting specs
- Intuition Layer cards should begin with the core insight before elaborating with analogies

**Implementation checklist:**
- [ ] Part 1 is a true executive orientation (not technical content)
- [ ] Each section opens with 2-3 context sentences
- [ ] Transition sentences link sections into a narrative
- [ ] No section drops a reader into technical detail without framing
- [ ] A newcomer can scan section openings alone and understand the document's arc

### Two Audiences, One Document - Dual-Register Pattern

Every technical section carries two registers:

1. **Engineering Register** - Precise technical language, specifications, formulas, ratios. For engineers and technical credibility.
2. **Intuition Layer** - Analogies, plain English, "so what." For visual learners, executives, and presentation contexts.

Both appear in the same section. The engineering register is a specification card; the intuition layer is an explanation card below it. Two flavors of everything - engineering savviness + easy-to-understand storytelling.

**Intuition Layer depth requirements:**
- Each Intuition Layer must have 3-5 sentences minimum - never a one-liner
- Must include at least one analogy connecting the concept to everyday experience (e.g., "like a traffic cop directing cars" or "imagine a library where books reshelf themselves")
- Must include a "So What?" - why this matters to the project, not just what it is
- Written in plain English that a domain newcomer can understand without Googling any term
- Mix perspectives: some optimistic (what this enables), some grounded (what the risks or trade-offs are)
- The Intuition Layer is NOT a dumbed-down repeat of the Engineering Register - it is a different lens on the same concept

```jsx
{/* Engineering Register component */}
<div className="my-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Engineering Register</div>
  {/* Grid of specs, metrics, values */}
</div>

{/* Intuition Layer component */}
<div className="my-4 bg-white border border-cyan-200 rounded-xl p-5">
  <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-3">Intuition Layer</div>
  {/* 3-5 sentences minimum. Analogy + "So What?" required. */}
  {/* Plain English explanation accessible to newcomers */}
</div>
```

### Narrative Arc and Section Ordering

Documents with 10+ sections should follow a narrative arc, not encyclopedia ordering. Sections tell a story:

**Story structure:** Hook (what) -> Conviction (why) -> Understanding (how it works) -> Confidence (how to execute) -> Ambition (what it enables) -> Resolution (reference material)

**Permission-to-stop markers:** Natural break points between narrative acts where different audience types can stop reading and still walk away satisfied. Place between section groups as subtle dividers with the audience label and what they now understand.

**Visual Table of Contents ("What's Inside"):** Documents with 10+ sections must open with a visual TOC before the first section. Shows all sections as clickable cards with one-line descriptions. Include permission-to-stop markers between groups. Listed in the sidebar navigation as the first entry.

**Section splitting:** When a section grows beyond 8 subsections, split it into two: one for the core system/architecture, one for the optimization/implementation layer. This prevents the "wall of content" problem.

### Action vs Knowledge Color Coding (Queued Pattern)

Two types of content exist in most documents: things to DO (actions, project work, hardware) and things to KNOW (theory, registers, intuition layers). Use different border/outline colors to distinguish them at a glance. Include a legend in the TOC.

### 50/50 Text-to-Visual Ratio

Text content and visual content (diagrams, charts, flows) should be approximately 50/50. For a visual learner, diagrams teach faster than paragraphs. Every concept that can be diagrammed SHOULD be diagrammed. The more visuals, the better. **Per-subsection mandate:** Every subsection with 3+ paragraphs of text must include at least one visual element (diagram, table, or illustration). No exceptions.

---

## What You Produce

A React + Vite + Tailwind CSS web application that renders a source markdown document as a rich interactive page:

- **Scaligraph diagrams** - Tailwind + inline SVG diagrams with animated data flows, hover glows, ambient light bleeds. Zero custom CSS. Zero image assets.
- **Left sidebar navigation** - Collapsible table of contents with all sections and subsections
- **Section-anchored comments** - Google Docs-style comment threads anchored to specific sections
- **Inline notes** - Yellow sticky-note cards below sections, with rich text formatting toolbar
- **Glossary tooltips** - Auto-detect technical terms, hover for definitions (technical + plain English)
- **Star/bookmark sections** - Mark important sections, quick navigation
- **Annotation overlay** - Highlighting and underlining tool (simplified Excalidraw). Underline = "expand here" signal to team
- **Commentary system** - "View Commentary" mode with date-sorted comment panel, unresolved on top, click-to-jump, thread view, general (non-section) commentary box, inline visibility toggle. Comments persist forever (resolved ones stay in history). Not printable
- **Bidirectional comment sync** - Browser-to-agent comment synchronization via JSON export/import, enabling agent-assisted review workflows
- **Print/PDF export** - Document text, diagrams, inline notes (yellow cards), and annotation highlights print. Comments, stars, interactive block icons, color-coding borders, sidebar, and topbar are hidden in print
- **Scroll animations** - Sections fade-up on scroll
- **Dual-register content** - Engineering Register + Intuition Layer on every technical section

---

## The Flow

```
User gives you: source-content.md (or describes the topic)

You:
  1. Read this DesignSense spec
  2. Create a project folder
  3. Build the React + Tailwind project
  4. Create left sidebar navigation from content structure
  5. Create Scaligraph diagram components (Tailwind + inline SVG)
  6. Wire up section-anchored comments, inline notes, glossary tooltips
  7. Wire up annotation overlay (highlight/underline)
  8. Wire up star/bookmark system
  9. Wire up bidirectional comment sync (commentSync.js + Vite plugin)
  10. Implement comprehensive print/PDF styles
  11. Populate glossary data with all technical terms
  12. npm install && npm run dev
  13. Tell user to open localhost:5173
```

---

## Document Architecture

### Left Sidebar Navigation

The table of contents lives in a LEFT sidebar. NOT the top bar. The top bar is reserved for tools only (branding, annotate, export, glossary toggle).

```jsx
{/* Left sidebar - collapsible */}
<aside className={`no-print fixed left-0 top-[52px] bottom-0 z-[150]
  bg-white border-r border-slate-200 overflow-y-auto transition-all duration-300
  ${sidebarOpen ? 'w-72' : 'w-0 -translate-x-full'}`}>

  <div className="p-4">
    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">Contents</div>

    {sections.map(section => (
      <div key={section.id}>
        <a href={`#${section.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600
            hover:bg-slate-50 hover:text-slate-900 transition-colors">
          <span className="text-xs font-mono text-cyan-500 w-6">{section.num}</span>
          <span className="truncate">{section.title}</span>
          {section.starred && (
            <svg className="w-3 h-3 text-amber-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
        </a>

        {/* Subsections */}
        {section.subsections?.map(sub => (
          <a key={sub.id} href={`#${sub.id}`}
            className="flex items-center gap-2 px-3 py-1.5 pl-10 rounded-lg text-xs text-slate-500
              hover:bg-slate-50 hover:text-slate-700 transition-colors">
            {sub.title}
          </a>
        ))}
      </div>
    ))}
  </div>
</aside>
```

**Sidebar features:**
- Collapsible (toggle button in top bar)
- Shows all sections and subsections
- Highlights current section (scroll-position-aware - see tracking method below)
- Shows star indicators for starred sections
- Shows comment count badges per section
- Prints as table of contents at the start of the PDF

**Active section tracking - scroll-position method (MANDATORY):**

Do NOT use IntersectionObserver for active section tracking. IntersectionObserver fails for tall sections - if a section is taller than the viewport and the threshold is set high (e.g., 0.15), the section may never trigger because 15% of its height is never visible at once.

Instead, use scroll-position-based tracking:

```js
// On scroll, find which section's top edge is closest to viewport top + offset
useEffect(() => {
  let rafId = null;
  const handleScroll = () => {
    if (rafId) return; // throttle via requestAnimationFrame
    rafId = requestAnimationFrame(() => {
      const offset = 100; // pixels from top of viewport
      let activeId = sections[0]?.id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            activeId = section.id;
          }
        }
      }

      setActiveSection(activeId);
      rafId = null;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // set initial state
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}, [sections]);
```

**Why this works reliably:**
- Iterates all section elements, finds the last one whose top edge has scrolled past the offset
- Uses `requestAnimationFrame` throttling for performance (never fires more than once per frame)
- Works regardless of section height - tall sections, short sections, any content
- Simple and deterministic: no threshold tuning, no rootMargin guessing

### Sidebar Mode System

The left sidebar must support multiple viewing modes, not just section navigation. In annotation-heavy documents (300+ comments, stars, notes), a single-purpose sidebar doesn't scale. Users need multiple views of their data.

**Available modes (switchable via TopBar buttons):**

1. **Contents mode** (default) - Section navigation with subsections, active section tracking, star indicators, comment count badges. Color coding legend (Action vs Knowledge) displayed at the bottom of the page content area.
2. **Commentary mode** - Shows ALL comments (general notes + inline block-level comments) in a unified list. Click any comment to auto-scroll to the section + open the right panel thread. Unresolved/resolved counts include all comment types.
3. **Starred mode** - Shows all starred items (subsection-level, not just main sections). Click a starred item to jump to that section.
4. **Notes mode** - Shows all notes listed in sidebar. Click to jump to the block where the note was made.

**Each mode provides:**
- List of items with click-to-jump navigation
- Preview text for each item
- Status indicators (resolved/unresolved for comments, color for stars)
- Count badge in the TopBar button

**Right Panel Mutual Exclusion (MANDATORY):**

Only one comment thread can be active in the right panel at a time. When multiple source types feed the same detail panel (e.g., general comments and inline block comments both open in the right panel), clicking one type MUST clear the other. This prevents stale state from a previously selected comment remaining visible while a new selection is active.

- Selecting a block comment clears any active general comment selection, and vice versa
- Selecting a section comment clears any active general or block comment selection
- The right panel always shows exactly zero or one thread - never two overlapping selections
- Implement by maintaining a single `activeThread` state object with a `type` discriminator (e.g., `{ type: 'block', id: '...' }` or `{ type: 'general', id: '...' }`), rather than separate selection states per comment type

**Legend placement:** The Action/Knowledge color coding legend lives at the bottom of the page content area (not in sidebar, not in the What's Inside section). This ensures context for why some sections have different border colors is always accessible while reading.

### TopBar - Slim Toolbar

The top bar is slim and contains only tools, NOT navigation:

```jsx
<header className="no-print sticky top-0 z-[200] h-[52px]
  bg-white/80 backdrop-blur-xl border-b border-slate-200
  flex items-center px-6 gap-3">

  {/* Sidebar toggle */}
  <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-100">
    <svg className="w-4 h-4" ...>{/* hamburger */}</svg>
  </button>

  {/* Branding - clickable, scrolls to top */}
  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="font-bold text-slate-900 tracking-tight cursor-pointer hover:text-cyan-700 transition-colors">
    Document Title
  </button>
  <span className="text-slate-400 font-mono text-xs">v2.0</span>

  <div className="flex-1" />

  {/* Tool buttons - MANDATORY ORDER with icons + labels */}
  {/* 1. Expand/Collapse */}
  <button onClick={toggleExpand}>Expand/Collapse</button>
  {/* 2. Annotations (with icon) */}
  <button onClick={toggleAnnotate}>{annotating ? 'Stop Annotating' : 'Annotations'}</button>
  {/* 3. Notes (with icon) - toggles sidebar to Notes mode */}
  <button onClick={toggleNotes}>{notesMode ? 'Exit Notes' : 'Notes'}</button>
  {/* 4. Starred (with icon) - toggles sidebar to Starred mode */}
  <button onClick={toggleStarred}>Starred</button>
  {/* 5. Commentary (with icon) - toggles sidebar to Commentary mode */}
  <button onClick={toggleCommentary}>{commentaryMode ? 'Exit Commentary' : 'Commentary'}</button>
  {/* 6. Technical Aid (with icon) */}
  <button onClick={toggleGlossary}>Technical Aid</button>
  {/* 7. Export PDF */}
  <button onClick={handleExport}>Export PDF</button>
</header>
```

**Clickable Logo / Document Title (MANDATORY):**
- Clicking the document title/logo in the TopBar scrolls to the top of the page using `window.scrollTo({ top: 0, behavior: 'smooth' })`
- This is a standard web convention for navigation and must be implemented on every document
- The title element must use `cursor-pointer` and have a subtle hover state (e.g., `hover:text-cyan-700`) to signal clickability

**TopBar button styling:**
- Each button MUST have an icon + label (matching the expand/collapse icon style)
- **Active state:** colored background (e.g., `bg-cyan-500`) + white text (`text-white`)
- **Inactive state:** `bg-slate-100` + `text-slate-600`
- Buttons that toggle sidebar modes (Commentary, Starred) should visually indicate which mode is active
- Button order is MANDATORY and must not be rearranged: Expand/Collapse | Annotations | Notes | Starred | Commentary | Technical Aid | Export PDF

### Collapsible Content Sections

Every content section supports expand/collapse. This allows readers to scan the document at heading level and drill into specific sections of interest. It complements the Pyramid Rule by letting readers control their depth of engagement.

**Behavior:**
- Each section has a chevron icon (toggle) next to its heading
- Clicking the chevron collapses the section: only the heading remains visible, all content is hidden
- Clicking again expands the section back to full content
- **Start expanded by default** - all sections are open on first load
- Global **"Expand All"** and **"Collapse All"** controls in the TopBar
- Collapsed state is per-session (does not persist in localStorage - readers start fresh each visit)

**Print behavior - CRITICAL:**
- Print ALWAYS shows expanded content - never hide content in print output
- Use `@media print { .section-content { display: block !important; max-height: none !important; } }` to override collapse state
- A printed document must contain ALL content regardless of collapse state on screen

**Implementation:**
```jsx
function CollapsibleSection({ id, num, title, children, defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section id={id}>
      <div className="flex items-center gap-3 mt-14 mb-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}>
        {/* Chevron toggle */}
        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
          expanded ? 'rotate-90' : 'rotate-0'
        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>

        <span className="inline-flex items-center justify-center w-9 h-9
          rounded-xl bg-cyan-500/10 text-cyan-600 text-xs font-bold font-mono">
          {num}
        </span>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight flex-1">
          {title}
        </h2>
      </div>

      {/* Collapsible content - always visible in print */}
      <div className={`section-content transition-all duration-300 overflow-hidden ${
        expanded ? 'max-h-[99999px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {children}
      </div>
    </section>
  );
}
```

**Global controls (in TopBar):**
```js
const expandAll = () => setSectionStates(prev =>
  Object.fromEntries(Object.keys(prev).map(k => [k, true]))
);
const collapseAll = () => setSectionStates(prev =>
  Object.fromEntries(Object.keys(prev).map(k => [k, false]))
);
```

### Section Anchors - Comment, Note, Star at Every Level

Comments, notes, and stars are available at EVERY level of the document - not just top-level sections. Every subsection, every Engineering Register card, every Intuition Layer card, and every content block can have its own comment thread, notes, and star/bookmark.

**The InteractiveBlock wrapper pattern:**

Any content block can be made interactive by wrapping it with `InteractiveBlock`. This component adds comment, note, and star icons that appear on hover (subtle, non-intrusive) and persist state via a context provider with localStorage.

```jsx
// InteractiveBlockProvider - wrap the entire app to provide shared state
<InteractiveBlockProvider>
  <App />
</InteractiveBlockProvider>

// InteractiveBlock - wraps any content block at any nesting level
<InteractiveBlock blockId="part-2-camera" title="Camera">
  {/* Any content: subsection, card, register, etc. */}
</InteractiveBlock>
```

**InteractiveBlock component behavior:**
- Icons (comment, note, star) appear on hover - hidden by default to keep the UI clean
- Each block has a unique `blockId` for state persistence
- State managed via React context provider with localStorage persistence
- Works at any nesting depth: top-level section, subsection, card within a subsection

```jsx
function InteractiveBlock({ blockId, title, children }) {
  const { comments, notes, stars, addComment, addNote, toggleStar } = useInteractiveState();

  return (
    <div className="group/interactive relative">
      {/* Hover-visible action icons */}
      <div className="no-print absolute right-2 top-2 flex items-center gap-1
        opacity-0 group-hover/interactive:opacity-100 transition-opacity duration-200">
        <button onClick={() => toggleStar(blockId)} title="Star">
          <svg className={`w-3.5 h-3.5 ${stars[blockId] ? 'text-amber-400 fill-current' : 'text-slate-300'}`} .../>
        </button>
        <button onClick={() => toggleComments(blockId)} title="Comments">
          <svg className="w-3.5 h-3.5 text-slate-300 hover:text-cyan-500" .../>
        </button>
        <button onClick={() => addNote(blockId)} title="Add note">
          <svg className="w-3.5 h-3.5 text-slate-300 hover:text-amber-500" .../>
        </button>
      </div>

      {/* Content */}
      {children}

      {/* Inline notes and comments for this block */}
      {notes[blockId]?.map(note => <InlineNote key={note.id} note={note} />)}
      {showComments[blockId] && <SectionComments blockId={blockId} />}
    </div>
  );
}
```

**Top-level sections** still use the original `ScrollSection` component (which should internally use `InteractiveBlock` or replicate its behavior). The key change is that subsections, cards, and registers ALSO get wrapped:

```jsx
<ScrollSection id="part-2" num={2} title="Building Blocks">
  {/* Subsection wrapped with InteractiveBlock */}
  <InteractiveBlock blockId="part-2-camera" title="2.1 Camera">
    <SubSection title="2.1 Camera">
      <EngineeringRegister>
        <InteractiveBlock blockId="part-2-camera-eng">
          {/* specs */}
        </InteractiveBlock>
      </EngineeringRegister>
      <IntuitionLayer>
        <InteractiveBlock blockId="part-2-camera-intuition">
          {/* plain English */}
        </InteractiveBlock>
      </IntuitionLayer>
    </SubSection>
  </InteractiveBlock>
</ScrollSection>
```

**State persistence - localStorage key convention:**

All localStorage keys use a configurable project prefix to avoid collisions when multiple Coco Editor documents run on the same domain. The default prefix is `coco-editor-`.

```js
// Key convention - all keys use project prefix
const KEY_PREFIX = 'coco-editor-'; // configurable per project

const STORAGE_KEYS = {
  commentary:     `${KEY_PREFIX}commentary`,      // general document-level comments
  blockComments:  `${KEY_PREFIX}block-comments`,   // inline block-anchored comments
  blockNotes:     `${KEY_PREFIX}block-notes`,      // inline block-anchored notes
  blockStars:     `${KEY_PREFIX}block-stars`,      // inline block-anchored stars
  annotations:    `${KEY_PREFIX}annotations`,      // highlight/underline annotations
  stars:          `${KEY_PREFIX}stars`,             // section-level stars
  notes:          `${KEY_PREFIX}notes`,             // section-level notes
  comments:       `${KEY_PREFIX}comments`,         // section-level comments
};

// Context provider stores all interactive state with localStorage
const InteractiveBlockProvider = ({ children }) => {
  const [stars, setStars] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.blockStars) || '{}')
  );
  const [comments, setComments] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.blockComments) || '{}')
  );
  const [notes, setNotes] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.blockNotes) || '{}')
  );

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.blockStars, JSON.stringify(stars));
  }, [stars]);
  // ... same for comments and notes

  return (
    <InteractiveBlockContext.Provider value={{ stars, comments, notes, ... }}>
      {children}
    </InteractiveBlockContext.Provider>
  );
};
```

**Why prefixed keys matter:**
- Prevents collisions between multiple documents on the same localhost port
- Makes it easy to clear all document state: `Object.keys(localStorage).filter(k => k.startsWith(KEY_PREFIX)).forEach(k => localStorage.removeItem(k))`
- Allows debugging by filtering keys in browser DevTools
- The prefix is configurable - change `KEY_PREFIX` to match the project name (e.g., `myproject-editor-`)

### Star/Bookmark System

Per-section star toggle:
- Visual star indicator (amber, filled when active)
- Starred sections appear highlighted in left sidebar
- Provides quick navigation to important sections
- State persists during session
- Printable - starred sections get a visual marker in print

---

## Interactive Features

### Section-Anchored Comments

Comments are anchored to specific sections - like Google Docs commenting but at the section level.

**Data structure:**
```js
{
  id: Date.now(),
  sectionId: 'part-2',          // Which section this comment is on
  author: 'Waqas',             // Or agent name: 'Payne', 'Silicon Lead', etc.
  text: 'The latency numbers here seem optimistic...',
  status: 'open',              // 'open' | 'resolved'
  timestamp: '2026-03-09 14:32',
  replies: [
    {
      id: Date.now(),
      author: 'Silicon Lead',
      text: 'Updated with verified Jetson benchmarks from Sprint 42.',
      timestamp: '2026-03-09 15:10',
    }
  ]
}
```

**Behavior:**
- Click comment icon on any section -> opens comment thread below section header
- Add a new comment as the user
- Agents can respond: answer questions, ask for clarification, or modify content based on the comment
- After content is updated based on a comment, the comment gets resolved
- Resolved comments show as green/dimmed but are still visible
- Comments are HIDDEN in print (only notes and annotations print; comments are interactive-only)

**Component:**
```jsx
<div className="my-4 bg-white border border-cyan-100 rounded-xl p-4">
  <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-3">
    Comments on this section ({comments.length})
  </div>

  {comments.map(comment => (
    <div key={comment.id} className={`p-3 rounded-lg border mb-2 ${
      comment.status === 'resolved'
        ? 'bg-emerald-50 border-emerald-200 opacity-60'
        : 'bg-white border-slate-200'
    }`}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-bold text-slate-700 text-xs">{comment.author}</span>
        <button onClick={() => resolve(comment.id)} className="text-[10px] text-slate-400">
          {comment.status === 'resolved' ? 'Reopen' : 'Resolve'}
        </button>
      </div>
      <p className="text-slate-600 text-sm">{comment.text}</p>
      <span className="text-[10px] text-slate-400 mt-1 block">{comment.timestamp}</span>

      {/* Replies */}
      {comment.replies.map(reply => (
        <div key={reply.id} className="ml-4 mt-2 pl-3 border-l-2 border-cyan-200">
          <span className="font-bold text-slate-700 text-xs">{reply.author}</span>
          <p className="text-slate-600 text-xs">{reply.text}</p>
        </div>
      ))}
    </div>
  ))}

  {/* Add comment input */}
  <div className="flex gap-2 mt-3">
    <input placeholder="Add a comment..." className="flex-1 px-3 py-2 text-sm border rounded-lg" />
    <button className="px-3 py-2 bg-cyan-500 text-white text-sm rounded-lg">Add</button>
  </div>
</div>
```

### Commentary System - Unified Sidebar + Inline Pattern

The Commentary System provides a complete review workflow for annotation-heavy documents (200+ pages, 50+ comments per review session). It unifies general notes and inline block-level comments into a single navigable system.

**Core principles:**
- General notes (document-wide) + inline comments (block-level) appear in ONE unified sidebar when Commentary mode is active
- Click any comment in the sidebar -> auto-scroll to the section + open the right panel thread
- **Default: show inline comments ON** - inline comments visible on the main page unless user unchecks
- **Default: show unresolved only ON (checked)** - users see actionable items first; uncheck to see resolved comments too
- Unresolved/Resolved counts MUST include all comment types (general + inline) combined
- When "show inline comments" is unchecked, inline comments disappear from the main page but remain visible in the sidebar
- Comments are NEVER shown in print mode

**Comment Type Visual Distinction (MANDATORY):**

Each comment type has a distinct visual identity in the right panel. This helps users instantly understand the scope and anchoring of the comment they are viewing.

| Comment Type | Right Panel Heading | Heading Color | Thread Card Border |
|-------------|--------------------|--------------|--------------------|
| Inline (block-anchored) | "Inline Comment" | `text-cyan-500` | `border-cyan-200` |
| General (document-level) | "General Comment" | `text-violet-500` | `border-violet-200` |
| Section (section-level) | "Section Comment" | `text-slate-500` | `border-slate-200` |

```jsx
{/* Right panel thread header - varies by comment type */}
<div className={`text-xs font-mono uppercase tracking-wider mb-3 ${
  thread.type === 'block' ? 'text-cyan-500' :
  thread.type === 'general' ? 'text-violet-500' :
  'text-slate-500'
}`}>
  {thread.type === 'block' ? 'Inline Comment' :
   thread.type === 'general' ? 'General Comment' :
   'Section Comment'}
</div>

{/* Thread card - border color matches heading */}
<div className={`p-3 rounded-lg border mb-2 ${
  thread.type === 'block' ? 'border-cyan-200' :
  thread.type === 'general' ? 'border-violet-200' :
  'border-slate-200'
}`}>
  {/* ... thread content ... */}
</div>
```

**Behavioral identity:** General comments and inline comments behave IDENTICALLY - they both support resolve, reply, delete, and edit. The ONLY difference is anchoring: inline comments are tied to a specific block, while general comments float at the document level. Do not create different interaction patterns for different comment types.

**Filter consistency (MANDATORY):**

The "Show unresolved only" filter applies to ALL comment types equally - general, inline, and section comments. If the filter is checked, ALL resolved comments across all types are hidden. If unchecked, ALL resolved comments across all types are shown. Inconsistent filter behavior (e.g., filtering inline but not general) breaks the user's mental model and creates confusion about which comments are hidden.

**Sidebar commentary view:**
- Replaces section navigation when Commentary mode is active
- Lists all comments with preview text, author, timestamp, status
- Click to jump to the anchored section + open the thread in the right panel
- Filter controls: "Show inline comments" checkbox (default ON), "Show unresolved only" checkbox (default ON/checked)

**Right panel thread:**
- Opens when clicking a comment (in sidebar or inline)
- Shows: original comment, team/agent responses, changes made to the section
- Ability to resolve, reopen, or add follow-up comments
- All comments kept in history forever (resolved ones stay, never deleted)
- **Mutual exclusion:** Only one thread is active at a time (see Sidebar Mode System > Right Panel Mutual Exclusion above)

### Bidirectional Comment Sync System

The comment sync system enables agents (Claude, team leads, specialists) to participate in document review by reading user comments and adding replies - all without requiring the browser to be open or the user to manually copy/paste. Comments flow from browser to filesystem and back.

**Architecture overview:**

```
Browser (React app)                     Filesystem
        |                                    |
        |-- POST /api/sync-comments -------->|  comments-export.json
        |                                    |       |
        |                                    |   Agent reads JSON,
        |                                    |   adds replies to JSON
        |                                    |       |
        |<-- GET /api/sync-comments ---------|  comments-export.json
        |                                    |
    mergeAgentResponses()                    |
```

**Vite dev server plugin (vite.config.js):**

The sync system uses a Vite dev server plugin to expose two API endpoints. No additional backend server is needed.

```js
// vite.config.js - comment sync plugin
function commentSyncPlugin() {
  const SYNC_FILE = path.resolve(__dirname, 'comments-export.json');

  return {
    name: 'comment-sync',
    configureServer(server) {
      // POST /api/sync-comments - browser exports current state
      server.middlewares.use('/api/sync-comments', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            fs.writeFileSync(SYNC_FILE, body, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok' }));
          });
        } else if (req.method === 'GET') {
          // GET /api/sync-comments - browser imports agent responses
          if (fs.existsSync(SYNC_FILE)) {
            const data = fs.readFileSync(SYNC_FILE, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({}));
          }
        }
      });
    }
  };
}
```

**Browser-side sync module (commentSync.js):**

```js
// src/commentSync.js
const SYNC_INTERVAL = 30000; // 30 seconds

export function triggerSync(commentaryState, blockCommentState) {
  // Export current browser state to filesystem
  const payload = {
    exportedAt: new Date().toISOString(),
    commentary: commentaryState,    // general/document-level comments
    blockComments: blockCommentState // inline block-anchored comments
  };

  fetch('/api/sync-comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function importAgentResponses() {
  // Import agent-added replies from filesystem
  const res = await fetch('/api/sync-comments');
  if (!res.ok) return null;
  return res.json();
}

export function mergeCommentaryReplies(localComments, importedComments) {
  // ADDITIVE ONLY - only import new replies, never delete, never import status changes
  return localComments.map(local => {
    const imported = importedComments.find(c => c.id === local.id);
    if (!imported) return local;

    // Merge only NEW replies (by id) - never touch status, text, or other fields
    const localReplyIds = new Set(local.replies.map(r => r.id));
    const newReplies = (imported.replies || []).filter(r => !localReplyIds.has(r.id));

    return {
      ...local,  // preserve ALL local state (including status)
      replies: [...local.replies, ...newReplies]
    };
  });
}

export function mergeBlockCommentReplies(localBlocks, importedBlocks) {
  // Same additive-only merge, applied per block
  const merged = { ...localBlocks };
  for (const [blockId, importedComments] of Object.entries(importedBlocks)) {
    if (!merged[blockId]) continue; // ignore blocks that don't exist locally
    merged[blockId] = mergeCommentaryReplies(merged[blockId], importedComments);
  }
  return merged;
}
```

**Merge rules (CRITICAL - non-negotiable):**

1. **ADDITIVE ONLY:** The merge function only imports NEW replies (replies with IDs not already present locally). It never deletes comments, never overwrites comment text, never imports status changes.
2. **Only the user resolves comments:** Agents can add replies to comments but cannot change a comment's status from `open` to `resolved`. The resolve/reopen action is exclusively a user-side operation in the browser.
3. **Import before auto-sync (race condition prevention):** On page load/reload, the import of agent responses MUST complete before the auto-sync timer starts exporting. If the auto-sync fires before import completes, the export will overwrite agent replies that haven't been merged yet. Sequence: `importAgentResponses()` -> `merge into local state` -> `start setInterval(triggerSync, SYNC_INTERVAL)`.
4. **Agent workflow:** Agents read `comments-export.json`, find comments addressed to them or within their domain, add reply objects to the `replies` array of the relevant comment, and write the file back. They never modify the comment's `status`, `text`, `author`, or `timestamp` fields.

**Initialization sequence:**

```js
// In App.jsx or top-level component
useEffect(() => {
  let syncTimer = null;

  async function init() {
    // Step 1: Import agent responses FIRST
    const imported = await importAgentResponses();
    if (imported) {
      setCommentary(prev => mergeCommentaryReplies(prev, imported.commentary || []));
      setBlockComments(prev => mergeBlockCommentReplies(prev, imported.blockComments || {}));
    }

    // Step 2: THEN start the auto-sync timer
    syncTimer = setInterval(() => {
      triggerSync(commentaryRef.current, blockCommentsRef.current);
    }, SYNC_INTERVAL);
  }

  init();
  return () => clearInterval(syncTimer);
}, []);
```

**comments-export.json format:**

```json
{
  "exportedAt": "2026-03-10T14:30:00.000Z",
  "commentary": [
    {
      "id": 1710000000000,
      "author": "Waqas",
      "text": "The latency numbers here seem optimistic...",
      "status": "open",
      "timestamp": "2026-03-09 14:32",
      "replies": [
        {
          "id": 1710000060000,
          "author": "Silicon Lead",
          "text": "Updated with verified Jetson benchmarks from Sprint 42.",
          "timestamp": "2026-03-09 15:10"
        }
      ]
    }
  ],
  "blockComments": {
    "part-2-camera": [
      {
        "id": 1710000120000,
        "author": "Waqas",
        "text": "Can we get higher resolution?",
        "status": "open",
        "timestamp": "2026-03-09 16:00",
        "replies": []
      }
    ]
  }
}
```

### Inline Notes - Yellow Sticky Cards

When the user adds a note at a section, a yellow sticky-note card appears BELOW that section. Not in a sidebar - inline in the document flow. These are printable.

**Data structure:**
```js
{
  id: Date.now(),
  sectionId: 'part-2',
  text: '<b>Remember:</b> The PLE config is mandatory on 8GB...',  // Rich text (HTML)
  timestamp: '2026-03-09 14:45',
  color: 'amber',  // Always amber/yellow for sticky notes
}
```

**Component:**
```jsx
<div className="my-4 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm
  print:bg-yellow-50 print:border-yellow-300">
  <div className="flex items-start gap-2 mb-2">
    <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5z" />
      <path d="M14 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L13 11.586V4a1 1 0 011-1z" />
    </svg>
    <div className="text-xs font-mono text-amber-600 uppercase tracking-wider">Note</div>
    <span className="text-[10px] text-amber-400 ml-auto">{timestamp}</span>
  </div>
  <div className="text-sm text-slate-700 leading-relaxed"
    dangerouslySetInnerHTML={{ __html: note.text }} />
</div>
```

**Formatting toolbar (appears when adding/editing notes):**
```jsx
<div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg mb-2">
  <button onClick={() => execCommand('bold')} className="p-1.5 rounded hover:bg-slate-100">
    <span className="font-bold text-xs">B</span>
  </button>
  <button onClick={() => execCommand('italic')} className="p-1.5 rounded hover:bg-slate-100">
    <span className="italic text-xs">I</span>
  </button>
  <button onClick={() => execCommand('underline')} className="p-1.5 rounded hover:bg-slate-100">
    <span className="underline text-xs">U</span>
  </button>
  <div className="w-px h-4 bg-slate-200 mx-1" />
  <button onClick={() => execCommand('insertUnorderedList')} className="p-1.5 rounded hover:bg-slate-100">
    <svg className="w-3 h-3" ...>{/* list icon */}</svg>
  </button>
</div>
<div contentEditable className="min-h-[60px] p-3 border border-amber-200 rounded-lg
  text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white" />
```

### Glossary Tooltip System - Auto-Detect

Technical terms are auto-detected throughout the document. Each occurrence gets a small indicator icon and a hover tooltip showing the definition in both technical and plain English.

**Glossary data structure (`src/data/glossary.js`):**
```js
export const glossary = {
  'MatFormer': {
    technical: 'A neural network architecture where smaller sub-models are nested within larger ones, sharing weight matrices across the first N layers. Enables self-speculative decoding.',
    plain: 'A "Russian doll" design where a smaller AI model lives inside a bigger one. They share the same brain cells for their common layers, so you only need to store one set of weights.',
  },
  'PLE': {
    technical: 'Parameter-Level Eviction - a memory management technique that caches inactive model layers on NVMe SSD, transferring them to GPU VRAM only when needed for computation.',
    plain: 'Like virtual memory for AI. When the GPU runs out of room, it temporarily stores unused model parts on the SSD and brings them back when needed.',
  },
  'GGUF': {
    technical: 'GPT-Generated Unified Format - a binary format for quantized LLM weights used by llama.cpp and Ollama. Supports various quantization levels (Q2-Q8).',
    plain: 'A compressed file format for AI models. Think of it like how MP3 compresses music - GGUF compresses AI model weights to fit on smaller devices.',
  },
  'VRAM': {
    technical: 'Video Random Access Memory - dedicated GPU memory used for storing model weights, KV cache, and intermediate activations during inference.',
    plain: 'The GPU\'s working memory. Like RAM but specifically for the graphics card. AI models need to fit in VRAM to run on the GPU.',
  },
  // ... extend with all domain terms
}
```

**Auto-detect component:**
```jsx
function GlossaryText({ children }) {
  // Scan text content for glossary terms
  // Replace each occurrence with a tooltip-wrapped span
  const processText = (text) => {
    let result = text
    Object.keys(glossary).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'g')
      result = result.replace(regex, (match) =>
        `<span class="glossary-term">${match}<sup class="glossary-icon">?</sup></span>`
      )
    })
    return result
  }

  return <span dangerouslySetInnerHTML={{ __html: processText(children) }} />
}
```

**Tooltip appearance:**
```jsx
{/* Tooltip modal on hover */}
<div className="absolute z-50 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4
  -translate-x-1/2 left-1/2 mt-2">
  <div className="font-bold text-slate-800 text-sm mb-2">{term}</div>
  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Technical</div>
  <p className="text-sm text-slate-600 mb-3">{glossary[term].technical}</p>
  <div className="text-xs text-cyan-500 font-mono uppercase tracking-wider mb-1">In Plain English</div>
  <p className="text-sm text-slate-600">{glossary[term].plain}</p>
</div>
```

**Glossary behavior:**
- Every occurrence of a glossary term gets a tooltip (not just the first)
- Small superscript indicator (?) on each term
- Hover shows modal with technical + plain English definitions
- Terms in diagrams also get tooltips where feasible
- Glossary section at the end of the document for print/PDF (one entry per term)
- "Glossary" toggle in the top bar can enable/disable term highlighting globally

**Printable Glossary Section:**
```jsx
<section className="print-break mt-20 pt-8 border-t border-slate-200">
  <h2 className="text-4xl font-bold text-slate-900 mb-6">Glossary</h2>
  {Object.entries(glossary).sort().map(([term, defs]) => (
    <div key={term} className="mb-4 pb-4 border-b border-slate-100">
      <div className="font-bold text-cyan-700 font-mono">{term}</div>
      <p className="text-sm text-slate-700 mt-1">{defs.technical}</p>
      <p className="text-sm text-slate-500 italic mt-1">{defs.plain}</p>
    </div>
  ))}
</section>
```

---

## Scaligraph Rules (MANDATORY - follow 100%)

These rules define what makes a diagram world-class:

### 1. Zero External Assets
Use 0 image files. Construct ALL visuals using semantic HTML and inline SVGs with Tailwind classes.

### 2. Tailwind Absolute
Write 0 lines of custom CSS for diagrams. Use Tailwind CSS exclusively via utility classes. The ONLY custom CSS allowed is for Excalidraw overlay overrides and print styles in `index.css`.

### 3. The 4-Point Grid
Map all sizing, padding, and gaps to Tailwind's default spacing scale: `p-4`, `w-20`, `gap-6`, etc.

### 4. Zero-JS Interactivity
Build all hover states, tooltips, ambient glows, and transitions using Tailwind's `group`, `group-hover`, and `peer` modifiers. No onClick handlers for visual effects.

### 5. Native Animation
Define precise keyframes in `tailwind.config`:
```js
animation: {
  'flow': 'flow 1.5s linear infinite',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'glow': 'glow 3s ease-in-out infinite',
},
keyframes: {
  flow: {
    '0%': { strokeDashoffset: '24' },
    '100%': { strokeDashoffset: '0' },
  },
  glow: {
    '0%, 100%': { opacity: '0.4' },
    '50%': { opacity: '0.8' },
  },
}
```
Apply to SVG elements for animated data flows, pulsing nodes, glowing connectors.

### 6. Visual Depth (Critical)
Layer your UI with three levels of depth:
- **Base**: subtle dot grid or line grid background (`radial-gradient` via `style` attribute)
- **Borders**: 1px borders using `border-slate-200` (light) or `border-zinc-800` (dark)
- **Ambient light**: `blur-lg opacity-20` on absolute-positioned elements behind nodes - creates premium glow bleeds

---

## Scaligraph Component Anatomy

Every diagram is a React component. Here's the exact pattern:

### The Whiteboard Canvas

```jsx
<div className="relative w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-10 overflow-hidden">
  {/* Dot grid background */}
  <div className="absolute inset-0 opacity-[0.10]"
    style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

  {/* Header with metrics */}
  <div className="relative z-10 flex justify-between items-start mb-16 border-b border-slate-100 pb-6">
    <div>
      <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Diagram Title</h2>
      <p className="text-sm text-slate-500 mt-1 font-mono">Subtitle</p>
    </div>
    <div className="flex gap-6 text-right font-mono text-sm">
      <div>
        <div className="text-cyan-600 font-bold text-xl">99.9%</div>
        <div className="text-slate-400 uppercase text-xs tracking-wider">METRIC</div>
      </div>
    </div>
  </div>

  {/* Diagram content */}
  <div className="relative z-10 flex items-center justify-between gap-4">
    {/* Nodes and connectors */}
  </div>
</div>
```

### A Node (shape with icon, hover glow, label)

```jsx
<div className="group relative flex flex-col items-center w-40 cursor-pointer">
  {/* Ambient glow - hidden by default, appears on hover */}
  <div className="absolute -inset-4 bg-cyan-400/20 rounded-xl blur-lg opacity-0
    group-hover:opacity-100 transition duration-500" />

  {/* The shape */}
  <div className="relative w-20 h-20 bg-white border-2 border-cyan-400/30 rounded-2xl
    flex items-center justify-center shadow-md
    group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 z-10">
    {/* Inline SVG icon */}
    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  </div>

  {/* Label */}
  <div className="mt-4 text-center">
    <div className="text-slate-900 font-semibold">Client</div>
    <div className="text-xs text-slate-500 font-mono">React App</div>
  </div>
</div>
```

### Node Shape Variations

| Shape | Tailwind Classes | Use For |
|-------|-----------------|---------|
| Square/Rectangle | `rounded-2xl` | Components, services, apps |
| Circle | `rounded-full` | Central hubs, APIs, gateways |
| Pill | `rounded-full px-6` | Labels, status indicators |
| Database | `rounded-xl` (taller `h-24`) | Storage, databases |
| Diamond | `rotate-45` on inner div | Decision nodes |

### Animated Connector (the data flow line)

```jsx
<div className="hidden md:flex flex-1 items-center justify-center relative h-20">
  <svg className="w-full h-8" preserveAspectRatio="none">
    {/* Static track */}
    <line x1="0" y1="16" x2="100%" y2="16"
      className="stroke-slate-200" strokeWidth="2" />
    {/* Animated flow */}
    <line x1="0" y1="16" x2="100%" y2="16"
      className="stroke-cyan-500 animate-flow" strokeWidth="2"
      strokeDasharray="6 6" />
    {/* Arrowhead */}
    <polygon points="100%,16 95%,12 95%,20" className="fill-cyan-500" />
  </svg>
  {/* Protocol label */}
  <div className="absolute -top-4 bg-white border border-slate-200 shadow-sm
    px-3 py-1 rounded-full text-[10px] text-cyan-600 font-mono tracking-wider z-10">
    HTTPS / REST
  </div>
</div>
```

### Curved Connector (for non-linear flows)

```jsx
<svg className="absolute" style={{ top: 0, left: 0, width: '100%', height: '100%' }}
  preserveAspectRatio="none">
  <path d="M 200 100 C 300 100, 250 300, 400 300"
    className="stroke-fuchsia-400 animate-flow" fill="none"
    strokeWidth="2" strokeDasharray="6 6" />
</svg>
```

### Color System

Use these Tailwind color families consistently:

| Role | Border | Text | Glow bg | Fill |
|------|--------|------|---------|------|
| Primary / Input | `border-cyan-400/30` | `text-cyan-600` | `bg-cyan-400/20` | `fill-cyan-500` |
| Central / Hub | `border-fuchsia-400/30` | `text-fuchsia-600` | `bg-fuchsia-400/20` | `fill-fuchsia-500` |
| Data / Storage | `border-emerald-400/30` | `text-emerald-600` | `bg-emerald-400/20` | `fill-emerald-500` |
| Warning / Alert | `border-amber-400/30` | `text-amber-600` | `bg-amber-400/20` | `fill-amber-500` |
| Error / Critical | `border-rose-400/30` | `text-rose-600` | `bg-rose-400/20` | `fill-rose-500` |
| AI / Agent | `border-violet-400/30` | `text-violet-600` | `bg-violet-400/20` | `fill-violet-500` |

### Dark Mode Variant

For dark-themed diagrams (use when page is dark):

```jsx
<div className="relative w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-10 overflow-hidden">
  {/* Grid */}
  <div className="absolute inset-0 opacity-[0.06]"
    style={{ backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

  {/* Node with dark styling */}
  <div className="relative w-20 h-20 bg-zinc-800 border-2 border-cyan-500/20 rounded-2xl
    flex items-center justify-center shadow-lg
    group-hover:shadow-cyan-500/10 group-hover:scale-105 transition-all duration-300">
    <svg className="w-8 h-8 text-cyan-400" .../>
  </div>
</div>
```

### Inline SVG Icons

Use simple, clean SVG icons. Common patterns:

```jsx
{/* Monitor / Client */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />

{/* Server / API */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />

{/* Database */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />

{/* Brain / AI */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />

{/* Cloud */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />

{/* Lock / Security */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />

{/* Chip / Edge Device */}
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
  d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M3 15h2m14 0h2M7 7h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
```

---

## Diagram Layouts

### Horizontal Flow (most common)
```
[Node] --animated--> [Node] --animated--> [Node]
```
Use `flex flex-row items-center justify-between gap-4`

### Vertical Flow
```
[Node]
  |
  v
[Node]
  |
  v
[Node]
```
Use `flex flex-col items-center gap-8`

### Hub and Spoke
Central node with radiating connections. Use absolute positioning with `top-*`, `left-*` utilities.

### Side-by-Side Comparison
Two whiteboard canvases next to each other:
```
[Whiteboard A]  vs  [Whiteboard B]
```
Use `grid grid-cols-2 gap-6`

### Multi-Row Architecture
Multiple horizontal layers:
```
[Client Layer    ]  <- row 1
[API Layer       ]  <- row 2
[Data Layer      ]  <- row 3
```
Use `flex flex-col gap-8` with each row being a horizontal flex.

---

## Metric Badges

Top-right corner stats that make diagrams feel data-driven:

```jsx
<div className="flex gap-6 text-right font-mono text-sm">
  <div>
    <div className="text-cyan-600 font-bold text-xl">99.9%</div>
    <div className="text-slate-400 uppercase text-xs tracking-wider">UPTIME</div>
  </div>
  <div>
    <div className="text-fuchsia-600 font-bold text-xl">12ms</div>
    <div className="text-slate-400 uppercase text-xs tracking-wider">LATENCY</div>
  </div>
  <div>
    <div className="text-emerald-600 font-bold text-xl">2.3GB</div>
    <div className="text-slate-400 uppercase text-xs tracking-wider">MEMORY</div>
  </div>
</div>
```

---

## Annotation System - Persistent Highlighting & Underlining

A text annotation tool for the user to highlight and underline text - like marking up a printed book with a real highlighter pen.

**This is NOT a full drawing tool.** It provides:
- Highlight (yellow/green/pink/blue background marker)
- Underline (colored underline)
- Clear annotations
- Persistent mode (tool stays active until deactivated)
- Undo support (Ctrl+Z / Cmd+Z)

**Persistent Annotator Mode (MANDATORY):**

The annotation system uses a persistent mode - "pick up the highlighter." The user does NOT select text first and then choose a tool. Instead:

1. User clicks **"Start Annotating"** -> annotation toolbar appears with tool options (highlight colors, underline)
2. User picks a tool (e.g., yellow highlight) -> that tool is now **active**
3. Every subsequent text selection **automatically applies** the active tool - no need to click the toolbar each time
4. User continues reading and selecting text - each selection is immediately annotated
5. **Ctrl+Z / Cmd+Z** undoes the last annotation (maintains an undo stack)
6. User clicks **"Stop Annotating"** to exit annotation mode

This matches real-world behavior: you pick up a highlighter, mark pages as you read, then put it down. You do NOT pick it up, mark one word, put it down, pick it up again for the next word.

**Implementation:**
- Annotation mode state: `annotating` (boolean), `activeTool` (string | null), `undoStack` (array)
- When `annotating` is true and `activeTool` is set, listen for `mouseup` / `selectionchange` events
- On text selection while tool is active: apply annotation immediately, push to undo stack
- Ctrl+Z / Cmd+Z: pop from undo stack, remove last annotation
- Toolbar uses `position: fixed` with viewport-relative coordinates (`rect.top` only - do NOT add `window.scrollY` to fixed positioning)
- Annotations persist in localStorage (using the `coco-editor-annotations` key)
- Annotations are printable

**CSS overrides in `index.css`:**
```css
.excalidraw-wrapper .excalidraw,
.excalidraw-wrapper .excalidraw canvas {
  background: transparent !important;
}
.excalidraw-wrapper .excalidraw [class*="welcome"],
.excalidraw-wrapper .excalidraw [class*="WelcomeScreen"] {
  display: none !important;
}
.excalidraw-wrapper .excalidraw .Island {
  background: rgba(255,255,255,0.92) !important;
  backdrop-filter: blur(16px) saturate(180%) !important;
  border: 1px solid rgba(226,232,240,0.6) !important;
  border-radius: 12px !important;
}
```

**Annotation toolbar - persistent mode:**
```jsx
{/* Toggle button in TopBar */}
<button onClick={() => setAnnotating(!annotating)}
  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
    annotating ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'text-slate-600 hover:bg-slate-100'
  }`}>
  {annotating ? 'Stop Annotating' : 'Annotations'}
</button>

{/* Annotation tool palette - visible only when annotating */}
{annotating && (
  <div className="no-print flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg">
    <button onClick={() => setActiveTool('highlight-yellow')}
      className={`px-2 py-1 rounded text-xs ${activeTool === 'highlight-yellow' ? 'ring-2 ring-amber-400 bg-amber-200' : 'bg-amber-100'}`}>
      Yellow
    </button>
    <button onClick={() => setActiveTool('highlight-green')}
      className={`px-2 py-1 rounded text-xs ${activeTool === 'highlight-green' ? 'ring-2 ring-emerald-400 bg-emerald-200' : 'bg-emerald-100'}`}>
      Green
    </button>
    <button onClick={() => setActiveTool('highlight-pink')}
      className={`px-2 py-1 rounded text-xs ${activeTool === 'highlight-pink' ? 'ring-2 ring-pink-400 bg-pink-200' : 'bg-pink-100'}`}>
      Pink
    </button>
    <button onClick={() => setActiveTool('underline')}
      className={`px-2 py-1 rounded text-xs ${activeTool === 'underline' ? 'ring-2 ring-violet-400 bg-violet-200' : 'bg-violet-100'}`}>
      Underline
    </button>
    <div className="w-px h-4 bg-slate-300 mx-1" />
    <button onClick={clearAnnotations}
      className="px-2 py-1 rounded text-xs text-slate-500 hover:text-slate-700">
      Clear All
    </button>
    <span className="text-[10px] text-slate-400 ml-2">Ctrl+Z to undo</span>
  </div>
)}
```

**Toolbar positioning - CRITICAL:**
- The floating annotation toolbar uses `position: fixed`
- Fixed positioning is viewport-relative - use `rect.top` directly from `getBoundingClientRect()`
- Do NOT add `window.scrollY` to fixed-positioned elements (this causes the toolbar to fly off-screen at the bottom of the document)
- Ensure z-index is above sidebar and section overlays (z-index 300+)

---

## Print / PDF System

Comprehensive print styles that make the document print like a Google Doc or Word Doc.

**Core principle:** Print is a separate product with its own design pass. **Show:** Document text, diagrams, inline notes (yellow cards), annotation highlights, table formatting. **Hide:** Stars, comments, interactive block icons, color-coding borders, sidebar, topbar. The `.no-print` class covers all hidden elements (comments, stars, interactive controls, sidebar, topbar).

**CSS in `index.css`:**
```css
@media print {
  /* Hide interactive controls only */
  .no-print { display: none !important; }

  /* Force page breaks before major sections */
  .print-break { page-break-before: always; }

  /* Remove scroll animations - everything visible */
  .scroll-hidden {
    opacity: 1 !important;
    transform: none !important;
  }

  /* Full-width content (no sidebar offset) */
  main {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 20px 40px !important;
  }

  /* Diagrams: remove animations, ensure visible */
  .animate-flow, .animate-glow, .animate-pulse-slow {
    animation: none !important;
  }

  /* Notes print as yellow cards */
  .inline-note {
    background-color: #fffbeb !important;
    border-color: #fcd34d !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Comments hidden in print */
  .section-comments {
    display: none !important;
  }

  /* Glossary section prints at end */
  .glossary-section {
    page-break-before: always;
  }

  /* Star indicators print */
  .star-indicator {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Prevent orphans in tables */
  tr { page-break-inside: avoid; }

  /* Section headers stay with content */
  h2, h3 { page-break-after: avoid; }

  /* Diagrams: don't break across pages */
  .scaligraph-canvas {
    page-break-inside: avoid;
  }

  /* Annotation overlays: render as static SVG */
  .annotation-layer {
    position: static !important;
    opacity: 0.3 !important;
  }

  /* Collapsed sections: ALWAYS show content in print */
  .section-content {
    display: block !important;
    max-height: none !important;
    opacity: 1 !important;
    overflow: visible !important;
  }
}
```

**What prints:**
| Element | How it prints |
|---------|--------------|
| Section content | Full text, Engineering Register + Intuition Layer |
| Scaligraph diagrams | Static (no animation), full color |
| Comments | Below their section, with author and timestamp |
| Notes (yellow cards) | Inline below their section, yellow background |
| Starred sections | Small star icon next to section heading |
| Glossary | Full glossary at the end, one entry per term |
| Annotations | Semi-transparent overlays on content |
| Left sidebar | Prints as table of contents at start |
| Top toolbar | Hidden (no-print) |
| Interactive buttons | Hidden (no-print) |

---

## Page Structure

### Main Layout

```jsx
<div className="min-h-screen bg-slate-50">
  <TopBar />

  {/* Left sidebar navigation */}
  <LeftSidebar sections={sections} isOpen={sidebarOpen} />

  {/* Annotation overlay */}
  {annotating && <AnnotationOverlay />}

  {/* Main content - offset by sidebar width when open */}
  <main className={`max-w-5xl mx-auto px-6 pb-32 transition-all duration-300
    ${sidebarOpen ? 'ml-72' : ''}`}>

    {/* Sections with scroll-triggered animations */}
    <ScrollSection id="part-1" num={1} title="Section Title"
      starred={stars['part-1']}
      onStar={() => toggleStar('part-1')}
      commentCount={comments.filter(c => c.sectionId === 'part-1').length}
      onComment={() => toggleComments('part-1')}
      onNote={() => addNote('part-1')}
      notes={notes.filter(n => n.sectionId === 'part-1')}
      comments={showComments === 'part-1' ? sectionComments : null}>

      {/* Content */}
      <EngineeringRegister>{/* specs */}</EngineeringRegister>
      <IntuitionLayer>{/* plain English */}</IntuitionLayer>
      <ScaligraphDiagram />
    </ScrollSection>

    {/* More sections... */}

    {/* Printable glossary at end */}
    <GlossarySection glossary={glossary} />

    {/* Footer */}
    <Footer />
  </main>
</div>
```

### Section Headings
```jsx
<h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-14 mb-4 flex items-center gap-3">
  <span className="inline-flex items-center justify-center w-9 h-9
    rounded-xl bg-cyan-500/10 text-cyan-600 text-xs font-bold">01</span>
  Section Title
</h2>
```

### Callout Boxes
```jsx
<div className="my-6 px-5 py-4 rounded-xl border border-cyan-200 bg-cyan-50 text-sm text-slate-600">
  <strong className="text-cyan-700">Key insight:</strong> ...
</div>
```

---

## Type Hierarchy - Font Uniformity Mandate

Every document must have a strict, documented type scale. One style per heading level, one style per content type, no exceptions. Font inconsistency (different sizes, colors, or weights at the same level) is a shipping blocker.

### The Type Scale

| Level | Element | Tailwind Classes | Usage |
|-------|---------|-----------------|-------|
| H2 | Section heading | `text-4xl font-bold text-slate-900 tracking-tight` | Top-level document sections (Part 1, Part 2, etc.) |
| H3 | Subsection heading | `text-xl font-semibold text-slate-800` | Subsections within a part (2.1 Camera, 2.2 Compute, etc.) |
| H4 | Sub-subsection heading | `text-base font-semibold text-slate-700` | Deeper nesting within subsections |
| Body | Paragraph text | `text-sm text-slate-600 leading-relaxed` | Main content paragraphs |
| Card label | Register/Layer label | `text-xs font-mono uppercase tracking-wider` | "Engineering Register", "Intuition Layer" labels |
| Table header | Table column headers | `text-xs font-semibold text-slate-500 uppercase tracking-wider` | Column headings in data tables |
| Table cell | Table data cells | `text-sm text-slate-600` | Data values in tables |
| Callout text | Callout box content | `text-sm text-slate-600` with `strong` as `text-cyan-700` | Key insights, warnings, notes |
| Metric badge | Diagram stats | `text-xl font-bold font-mono` (value) + `text-xs uppercase tracking-wider` (label) | Top-right corner stats on diagrams |
| Tooltip | Glossary definitions | `text-sm text-slate-600` | Tooltip content |

### Enforcement Rules

1. **One style per level, no exceptions.** If two h3 headings have different font sizes, that is a bug.
2. **Document the type scale in `index.css` as a comment block** at the top of the file, so any developer can reference it without reading DesignSense.
3. **Audit after every wave of changes.** Scroll the entire document slowly and verify no heading level has mixed styles.
4. **Never use arbitrary font sizes.** All sizing comes from Tailwind's default scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-4xl`).
5. **Color consistency.** Headings use the slate scale (`slate-900`, `slate-800`, `slate-700`). Body text uses `slate-600`. Labels use `slate-400` or `slate-500`. Accent text uses the color system (cyan, amber, etc.).

### index.css Comment Block (Required)

Place this at the top of `index.css` as a reference:

```css
/*
 * TYPE HIERARCHY - DesignSense V2
 * One style per level. No exceptions.
 *
 * H2 (Section):       text-4xl font-bold text-slate-900 tracking-tight
 * H3 (Subsection):    text-xl font-semibold text-slate-800
 * H4 (Sub-subsection): text-base font-semibold text-slate-700
 * Body:               text-sm text-slate-600 leading-relaxed
 * Card labels:        text-xs font-mono uppercase tracking-wider text-slate-400
 * Table headers:      text-xs font-semibold text-slate-500 uppercase tracking-wider
 * Table cells:        text-sm text-slate-600
 * Callout text:       text-sm text-slate-600 (strong = text-cyan-700)
 * Metric badges:      text-xl font-bold font-mono (value) + text-xs uppercase (label)
 */
```

---

## Dependencies

```json
{
  "dependencies": {
    "@excalidraw/excalidraw": "^0.18.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
```

---

## Light vs Dark Theme

The default Scaligraph style is LIGHT theme (white canvas, slate borders). This is the default for document-style pages.

**Light (default):**
- Canvas: `bg-white border-slate-200`
- Text: `text-slate-900` / `text-slate-500`
- Grid: `#64748b` dots at 10% opacity
- Nodes: `bg-white border-{color}-400/30`
- Glows: `bg-{color}-400/20 blur-lg`

**Dark (for cinematic feel):**
- Canvas: `bg-zinc-900 border-zinc-800`
- Text: `text-zinc-50` / `text-zinc-400`
- Grid: `#a1a1aa` dots at 6% opacity
- Nodes: `bg-zinc-800 border-{color}-500/20`
- Glows: `bg-{color}-500/20 blur-lg`

Choose based on content. For document-style pages, light is almost always the right choice.

---

## Quality Checklist

### Repeated Feedback Escalation (MANDATORY)

When a user gives the same feedback more than once, it is a process failure - not a content issue. The previous fix attempt did not work. Before attempting another fix:

- **Twice = HIGH PRIORITY.** If the same feedback appears a second time, escalate it to high priority immediately
- **Three times = PROCESS FAILURE.** If the same feedback appears a third time, stop. Do not attempt another fix. Instead, trace the root cause: why did the previous two fixes fail? Read the actual rendered output. Identify the specific line of code that is wrong. Only then apply a fix with a verification step.
- **Trace the failure.** Before re-attempting, investigate WHY the previous fix didn't work. Read the actual code/layout that was supposed to be fixed. Identify what the previous agent missed
- **Screenshot feedback = pixel-level verification.** When a user shares a screenshot circling an issue, the fix must be verifiable by visual comparison to that exact screenshot. Abstract descriptions ("improved alignment") don't count - the specific visual artifact must be gone
- **Never assume the fix landed.** After applying a fix for repeated feedback, visually verify the result before marking it complete

### Universal Style Rules (MANDATORY)
- [ ] **No em dashes or en dashes** - Use regular hyphens with spaces ( - ) instead. Never use the characters: -- or -
- [ ] **No italics anywhere** - Use `font-light` or `text-slate-500` for visual distinction. Never use the `italic` Tailwind class, `<em>`, or `<i>` tags
- [ ] **No scrollbars on diagrams** - Diagrams must fit within containers natively. Never use `overflow-x-auto` or `overflow-x-scroll`. If content doesn't fit horizontally, redesign to multi-row, vertical, or smaller nodes. Consult engineering team if redesign changes technical meaning
- [ ] **No fixed-width overflow** - Never use `min-w-[Xpx]` or `flex-shrink-0` patterns that force content wider than the container
- [ ] **Single-line TopBar title** - Title should be one clean line (e.g., "Project V1.0"), vertically centered, no emojis. Clicking the title scrolls to the top of the page
- [ ] **TopBar labels** - Use action-oriented single-word labels. "Annotations" not "Start Annotating". "Commentary" not "View Commentary". "Technical Aid" not "Glossary". Active state can be longer (e.g., "Stop Annotating") since it only appears when the mode is engaged
- [ ] **Color coding requires legend** - Any color-coded system (e.g., action vs knowledge borders) must ship with a visible legend explaining the encoding. Place legends in the TOC or "What's Inside" section. No exceptions - color without explanation is invisible decoration
- [ ] **Comment proximity** - Comments, notes, and interactive panels must auto-scroll into view when opened. Use `scrollIntoView({ behavior: 'smooth', block: 'nearest' })` after rendering. Never let interactive content appear off-screen after a user action
- [ ] **Management affordances** - Any user-generated content (notes, comments, annotations) must have create, edit, and delete capabilities from day one. Never ship create-only. Hover-visible edit (pencil) and delete (X) icons on each item
- [ ] **Sticky creation inputs** - "Add note/comment" inputs should be sticky (`position: sticky; top: 0`) at the top of their container, not scroll away when the user scrolls through existing items
- [ ] **InteractiveBlock on EVERY content block** - Every paragraph, diagram, callout, table, quote, Engineering Register, Intuition Layer, and SubSection must have comment/note/star capability via InteractiveBlock wrapper. Zero exceptions
- [ ] **Font uniformity** - One style per heading level, one body text style, one card text style. Table headers: `text-xs font-mono text-slate-400`. Table body: `text-sm text-slate-600`. Key columns: `font-medium`. Value columns: `font-mono`. No `font-bold` in table cells
- [ ] **Right panel mutual exclusion** - Only one comment thread active in the right panel at a time. Selecting a new comment clears any previously selected comment, regardless of type
- [ ] **Filter consistency** - "Show unresolved only" applies equally to all comment types (general, inline, section). No type-specific filter behavior

### Scaligraph Diagrams
- [ ] Zero custom CSS on diagram components (Tailwind only)
- [ ] Zero external image assets (inline SVGs only)
- [ ] Every node has ambient glow on hover (`blur-lg opacity-0 group-hover:opacity-100`)
- [ ] Every connector has animated data flow (`strokeDasharray` + `animate-flow`)
- [ ] Protocol/label pills on connectors
- [ ] Metric badges on at least 2 diagrams
- [ ] Dot grid background on all diagram canvases
- [ ] Hover scale on nodes (`group-hover:scale-105`)
- [ ] Shadow depth (`shadow-md` -> `group-hover:shadow-lg`)
- [ ] At least 15 diagram components (50/50 text-visual ratio)

### Interactive Features
- [ ] Left sidebar navigation works (collapsible, highlights current section via scroll-position tracking)
- [ ] Sidebar highlights correctly for ALL sections, including tall sections
- [ ] Section-anchored comments: add, reply, resolve
- [ ] Subsection-level comments/notes/stars (InteractiveBlock wrapper)
- [ ] Inline notes (yellow cards): add with formatting toolbar, appear below section
- [ ] Glossary tooltips: auto-detect terms, hover shows definitions
- [ ] Glossary section at end of document (printable)
- [ ] Star/bookmark per section (visual indicator, sidebar highlight)
- [ ] Annotation overlay: persistent highlighter mode (Start/Stop Annotating)
- [ ] Annotation: Ctrl+Z / Cmd+Z undo works
- [ ] Annotation toolbar positioned correctly at top AND bottom of document
- [ ] Expand/collapse: individual section toggle works
- [ ] Expand/collapse: global Expand All / Collapse All controls work
- [ ] Expand/collapse: sections start expanded by default
- [ ] Clickable logo/title in TopBar scrolls to top of page
- [ ] Comment type visual distinction in right panel (cyan/violet/slate headings)
- [ ] Right panel shows exactly zero or one thread at a time
- [ ] Bidirectional comment sync exports on timer and imports on reload
- [ ] Import completes before auto-sync timer starts (no race condition)

### Document Quality
- [ ] Pyramid Rule: Part 1 is executive orientation (what, why, success criteria)
- [ ] Pyramid Rule: each section opens with 2-3 context sentences before technical content
- [ ] Pyramid Rule: transition sentences link sections into a narrative
- [ ] Dual-register pattern on all technical sections (Engineering Register + Intuition Layer)
- [ ] Intuition Layers: 3-5 sentences minimum, at least one analogy, "So What?" included
- [ ] 50/50 text-visual ratio (15+ diagrams for a comprehensive document)
- [ ] Content fully represents source MD (nothing dropped or oversimplified)
- [ ] Content 10x the value of raw MD through visual learning
- [ ] Font uniformity: one style per heading level, no exceptions
- [ ] Type hierarchy documented in index.css comment block

### Print / PDF
- [ ] `window.print()` produces document-quality output (not a "printed web page")
- [ ] Comments are hidden in print (only notes and annotations print)
- [ ] Notes print as yellow cards inline
- [ ] Diagrams print static (no animation artifacts)
- [ ] Glossary prints at end
- [ ] Starred sections have visual marker in print
- [ ] No interactive controls visible in print
- [ ] Page breaks at section boundaries
- [ ] Tables don't break across pages
- [ ] Collapsed sections print as expanded (all content visible in print)
- [ ] Annotations and highlights visible in print

### Build
- [ ] `npm run build` succeeds with 0 errors, 0 warnings
- [ ] Scroll animations work
- [ ] Responsive layout (sidebar collapses on mobile)

---

## Bulletproof Testing Protocol

Every document generated with DesignSense must pass this testing protocol before shipping. Run after every wave of changes and comprehensively before final delivery.

### 1. Build & Lint Verification
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 1 | Build compilation | `npm run build` | 0 errors, 0 warnings |
| 2 | Lint check | `npx eslint src/ --ext .js,.jsx` | 0 errors (warnings acceptable) |
| 3 | Bundle size check | Check build output | JS < 800KB, CSS < 100KB (reasonable for a rich document) |

### 2. Navigation Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 4 | Sidebar links - all sections | Click each sidebar link | Every section scrolls into view and highlights correctly |
| 5 | Sidebar tracking - manual scroll | Slowly scroll through entire document | Highlight updates smoothly as each section enters view |
| 6 | Sidebar tracking - tall sections | Scroll within the tallest section | Highlight stays active throughout the entire section |
| 7 | Rapid scroll | Scroll very quickly top to bottom | Sidebar tracking keeps up, no visual glitches or lag |
| 8 | Clickable logo | Click the document title in the TopBar | Page scrolls smoothly to the very top |

### 3. Interactive Feature Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 9 | Section-level comments | Add comment on a section, reply, resolve | Full thread lifecycle works |
| 10 | Subsection-level comments | Add comment on a subsection (via InteractiveBlock) | Comment anchored to subsection, not parent section |
| 11 | Inline notes | Add note on a section, verify yellow card, delete note | Note appears below section, formatting toolbar works |
| 12 | Star/bookmark | Star 3 sections, verify sidebar indicators, filter | Stars persist during session, indicators visible |
| 13 | Glossary tooltips | Hover over technical terms throughout document | Tooltip appears with technical + plain English definition |
| 14 | Expand/collapse individual | Toggle several sections collapsed, then expanded | Content hides/shows correctly, chevron rotates |
| 15 | Expand/collapse global | Collapse All, then Expand All | All sections respond to global controls |
| 16 | Comment type distinction | Open inline, general, and section comments | Right panel heading and border color match type |
| 17 | Right panel mutual exclusion | Click inline comment, then click general comment | First thread disappears, only second thread visible |
| 18 | Filter consistency | Check "unresolved only", verify across all comment types | Filter applies equally to general, inline, and section |

### 4. Annotation Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 19 | Annotation at top of document | Start Annotating, select text in Part 1 | Tool applies correctly |
| 20 | Annotation at bottom of document | Start Annotating, select text in last section | Toolbar appears correctly positioned (not off-screen) |
| 21 | Persistent mode | Select tool, then highlight 5 different passages | All 5 auto-annotated without re-selecting tool |
| 22 | Undo (Ctrl+Z) | After annotating 3 items, press Ctrl+Z three times | Each undo removes last annotation in reverse order |

### 5. Comment Sync Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 23 | Export sync | Add comments, wait for sync interval | `comments-export.json` appears with current state |
| 24 | Agent reply import | Manually add a reply to JSON, reload page | New reply appears in the comment thread |
| 25 | Additive merge | Add reply to JSON, reload, verify no data loss | All local comments preserved, only new replies added |
| 26 | Status protection | Change status in JSON to "resolved", reload | Local status unchanged (still "open") |
| 27 | Import-before-sync | Reload page, verify import happens first | Agent replies visible before next auto-sync fires |

### 6. Print/PDF Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 28 | Print preview | `window.print()` or Ctrl+P | Document looks like a professional publication |
| 29 | Print with annotations | Add highlights + notes, then print | Annotations and notes visible in print |
| 30 | Print with collapsed sections | Collapse some sections, then print | ALL content appears in print regardless of collapse state |
| 31 | Print content quality | Read the printed output | A stranger can learn the topic from the print alone |

### 7. Content Quality Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 32 | Pyramid Rule | Read Part 1 | A newcomer understands the project purpose within 30 seconds |
| 33 | Intuition Layer depth | Read 5 random Intuition Layers | Each has 3+ sentences, at least one analogy, "So What?" |
| 34 | Diagram coverage | Count diagrams vs text-heavy sections | No section with 3+ paragraphs without a visual |
| 35 | Font uniformity | Scroll entire document slowly | No font size/color/weight inconsistencies at same level |

### 8. Edge Case Testing
| # | Test | Method | Pass Criteria |
|---|------|--------|---------------|
| 36 | Multiple annotations on same text | Highlight same passage with different colors | Handles gracefully (replaces or stacks) |
| 37 | localStorage capacity | Add 50+ comments and notes, reload page | All persist, no storage errors |
| 38 | Section with zero content | Collapse/expand an empty section | No crash, no visual artifacts |
| 39 | localStorage key isolation | Run two documents on same port | Each document's state is independent (different prefix) |

---

## Design Principles - Interaction Architecture (v2.0 - integrated)

> **Integration note:** The v2.0 corrections and additions have been merged into the relevant main sections above. This section is retained as a quick-reference summary of the interaction architecture principles. The main sections are authoritative; this appendix is for convenience only.

### Universal Interaction Surfaces

Every content block in the document MUST support the full set of user interactions: star, note, comment. Partial coverage is worse than no coverage because it trains users to expect inconsistency. If a card, diagram, register, or intuition layer appears on screen, it must have hover-visible star/note/comment icons.

**Implementation:** Wrap every content block (including standalone diagrams) in `InteractiveBlock` with a unique ID. The `InteractiveBlockProvider` context manages all block-level state (stars, notes, comments) with localStorage persistence using the `coco-editor-` key prefix.

### Sidebar Mode System

The left sidebar supports multiple exclusive modes, toggled by dedicated TopBar buttons:

| Mode | Sidebar Content | Right Panel |
|------|----------------|-------------|
| Contents | Navigation with section links | None |
| Notes | Block-level notes list | NoteThread (edit/delete) |
| Starred | Starred blocks list | None |
| Commentary | General + inline comments | CommentaryThread (reply/resolve/delete) |

**Rules:**
- Modes are mutually exclusive - entering one exits the others
- Expand/Collapse buttons ALWAYS reset to Contents mode and clear all panel selections
- Each mode toggle: if already in that mode, exit to Contents; otherwise enter that mode
- Right panels slide in from the right with animation
- **Right panel mutual exclusion:** Only one comment thread active at a time. Selecting a block comment clears general comment selection, and vice versa. Maintain a single `activeThread` state object with a `type` discriminator

### TopBar Button Order

Fixed order: Expand/Collapse | Annotations | Notes | Starred | Commentary | Technical Aid | Export PDF

**Each button:**
- Has a descriptive label (not action verbs like "Start Annotating")
- Has a matching SVG icon to the left of the label
- Active state uses a distinctive color: violet (annotations), amber (notes/starred), amber (commentary), cyan (technical aid)
- Inactive state: `bg-slate-100 text-slate-600 hover:bg-slate-200`

**Clickable logo:** The document title in the TopBar is clickable and scrolls to the top of the page. Standard web convention.

### Commentary System - Unified Comment Model

Three types of comments, same behavioral treatment:
1. **General comments** - not tied to any section. Right panel heading: "General Comment" in `text-violet-500` with `border-violet-200`.
2. **Inline comments** - tied to a section/block. Right panel heading: "Inline Comment" in `text-cyan-500` with `border-cyan-200`.
3. **Section comments** - tied to a top-level section. Right panel heading: "Section Comment" in `text-slate-500` with `border-slate-200`.

All three support: resolve, reopen, delete, reply. "Show unresolved only" defaults to CHECKED (users see actionable items first) and applies equally to all comment types.

### Bidirectional Comment Sync

Comments flow between browser and filesystem via `comments-export.json`:
- Browser auto-exports via Vite dev server plugin (POST /api/sync-comments) on a 30-second timer
- Agents read JSON, add replies, write JSON back
- Browser imports agent responses on reload (GET /api/sync-comments)
- Merge is ADDITIVE ONLY: only new replies imported, status changes ignored
- Only the user resolves comments - agents can only add replies
- Import MUST complete before auto-sync timer starts (race condition prevention)

### Notes vs Comments - Distinct Concepts

- **Notes** = personal annotations on blocks (edit/delete only, no resolve/reopen)
- **Comments** = discussion items (resolve/reopen/delete/reply)
- These are separate TopBar buttons, separate sidebar panels, separate right panels

### Section Color Coding

- **Action sections:** `border-l-2 border-l-cyan-300` (plans, experiments, hardware, guides)
- **Knowledge sections:** `border-l-2 border-l-slate-300` (concepts, theory, learning)
- Both sidebar navigation and section dividers use this color coding
- Legend placed at bottom of page content (not in sidebar, not in header)

### Print Output Principles

Print is a separate product with its own design pass:
- **Show:** Document text, diagrams, inline notes (yellow cards)
- **Hide:** Stars, comments, interactive block icons, color-coding borders, sidebar, topbar
- **Compress:** Tighter margins (15mm), smaller base font (10pt), reduced spacing
- **Preserve:** Annotation highlights, note cards, diagram layouts, table formatting

### Defaults Matter

- "Show unresolved only" = checked by default (actionable items first)
- "Show inline comments on page" = checked by default (visible by default)
- Sidebar starts in Contents mode (orientation before interaction)
- All sections start expanded (content-first, not chrome-first)
- localStorage keys use `coco-editor-` prefix (configurable per project)
- Comment sync imports agent responses before starting auto-export timer
