# Coco Editor - Changelog

What was learned and changed across iterations of building the rich interactive document system.

## v3.0.0 - Story-First Architecture (2026-03-11)

Major evolution: two personas, story-first workflow, experience architecture, and the greatness standard.

### New: Dual Persona System
- **Storee** (Communication Architect) added as companion to Clippy
- Storee architects the narrative: story structure, emotional arc, audience framing, bucket synthesis, pyramid principle
- Clippy executes the design: visual coherence, accessibility, layout, diagram clarity
- Handoff pattern: Storee defines WHAT to communicate, Clippy defines HOW to render it
- Both personas fully genericized - work for any project (tech docs, business plans, recipes, portfolios)

### New: Story-First Workflow
- Documents are built narrative-first, not content-first
- Three-step process: (1) narrative architecture, (2) content filling, (3) visual rendering
- Prevents the #1 failure mode: technically accurate but narratively incoherent documents

### New: Three-Act Progressive Disclosure
- Act 1 (Vision): zero jargon, pure aspiration - non-technical readers stop here satisfied
- Act 2 (Conceptual): mental models and analogies - product managers stop here informed
- Act 3 (Technical): full specs and implementation - engineers stop here ready to build
- Each act is self-contained with explicit transitions between them

### New: Pre-Read Education Cards
- Collapsed by default, comprehensive in depth
- Must appear BEFORE the content they prepare for, never after
- Long content (3-5 paragraphs minimum) so readers who expand get full understanding
- Skip-safe: readers who know the concept lose nothing by skipping

### New: Experience Architecture
- Design what the reader FEELS, not just what they learn
- Emotional targets per section (intrigued, convinced, empowered)
- 3-5 designed aha moments at narrative climax points
- Voice direction per act (storyteller, teacher, engineer)

### New: The Greatness Standard
- "Good enough" is the enemy of great documents
- Self-challenge mandatory at every level: section, subsection, card, diagram
- The question is never "does this work?" but "is this the absolute best version?"

### New: Visual QA as Distinct Dimension
- Content accuracy does not imply visual correctness - these are orthogonal
- Both content QA and visual QA are mandatory before any deliverable ships

### Updated: DesignSense V2
- All V1 patterns preserved
- Added: Story-First Workflow, Three-Act Progressive Disclosure, Pre-Read Cards, Experience Architecture, Greatness Standard, Visual QA
- Added: Tailwind CSS safety rules (JIT purge protection, colorMap pattern mandatory)
- Added: Advanced diagram standards (minimum font sizes, z-index discipline, mobile responsiveness)
- All project-specific references removed - fully portable across any domain

### Updated: README and START-HERE
- References updated from Creative to Clippy + Storee dual persona system
- Prompt updated with Story-First Workflow steps
- Design principles expanded with V2 patterns
- Project structure reflects new persona files

### Renamed: Creative to Clippy
- Creative Director persona renamed to Clippy (Design Specialist)
- Same role, same depth, clearer name - Clippy builds tools and documents, doesn't own storytelling

---

## v1.0.0 - Initial Release (2026-03-10)

Initial release after 6 sessions of iterative development.

### Design System Learnings

**Documents, Not Websites**
- Documents should feel like books, not web pages
- No scrollbars on diagrams - redesign layout if content doesn't fit
- No italics (use font-light or lighter colors)
- No em dashes or en dashes (use regular hyphens with spaces)
- Print output is a separate "product" requiring its own design pass

**Dual-Register Pattern**
- Every technical section carries Engineering Register + Intuition Layer
- Single document serves technical and executive audiences
- Intuition Layers need 3-5 sentences minimum with analogies and "So What?"

**Pyramid Rule**
- Start with big picture before zooming into technical depth
- Part 1 must answer: What is this? Why does it exist? What does success look like?
- Every section opens with 2-3 context sentences before technical content

**Interactive Block Coverage**
- EVERY content block must support star, note, and comment (InteractiveBlock wrapper)
- Partial coverage is worse than no coverage - trains users to expect inconsistency
- Coverage audit must be systematic after every structural change

**Commentary System**
- Comments are communication infrastructure, not just annotation features
- Auto-sync (browser to file) removes friction from feedback loop
- Bidirectional sync enables agent review workflow
- Merge is additive-only: never import status changes, only new replies
- Only the user resolves comments - agents can only add replies
- General and inline comments behave identically (resolve/reply/delete/edit)
- Only difference: inline comments are anchored to content blocks
- "Show unresolved only" defaults to checked (actionable items first)
- Filter must apply to ALL comment types equally

**Right Panel Architecture**
- Mutual exclusion: only one thread active at a time
- Selecting block comment clears general selection, vice versa
- Visual distinction: Inline Comment (cyan), General Comment (violet), Section Comment (slate)
- Slides in from right with animation

**Sidebar Mode System**
- Enumerate all modes upfront: Contents, Commentary, Starred, Notes
- Clear entry/exit transitions between modes
- Mutual exclusion (only one mode active at a time)
- Expand/Collapse resets to Contents mode

**Annotation System**
- Persistent mode: pick up highlighter, mark continuously, put down when done
- Tool stays active until explicitly deactivated
- Ctrl+Z undo support
- Toolbar uses fixed positioning with viewport-relative coordinates

**Color Coding**
- Action items (cyan border) vs Knowledge items (gray border)
- Color coding without a legend is invisible decoration
- Legend at bottom of page content area

**Typography**
- Strict type hierarchy: one style per heading level, no exceptions
- Document hierarchy in index.css comment block
- Section headings must be large enough to create visual rhythm
- TopBar title should be single clean line

**Quality Gates**
- "Polished" doesn't mean done - user's first-scroll experience is different
- Content robustness checks before reader engagement
- Screenshot feedback requires pixel-level attention
- If feedback repeats more than twice, trace WHY previous fix failed

**Print Output**
- Show: document text, diagrams, inline notes, annotation highlights
- Hide: stars, comments, interactive block icons, color borders, sidebar, topbar
- Compressed: tight margins (15mm), smaller fonts (10pt), reduced spacing
- Collapsed sections always print expanded

### Technical Architecture

- React 18 + Vite 5 + Tailwind CSS 3
- Bidirectional comment sync via Vite dev server plugin
- localStorage persistence with coco-editor- prefix
- Additive merge pattern for agent response import
- InteractiveBlockProvider context for block-level state
- useCommentary hook for commentary state management
- Scroll-position-based sidebar tracking (not IntersectionObserver)
- Print CSS with comprehensive overrides for document-quality output
