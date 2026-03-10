# Coco Editor - Changelog

What was learned and changed across iterations of building the rich interactive document system.

## v1.0.0 - Initial Release (2026-03-10)

Packaged from Coco Loco Solution 2.0 after 6 sessions of iterative development.

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
