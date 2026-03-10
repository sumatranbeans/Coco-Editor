# Coco Editor

A portable, self-contained framework for turning markdown documents into rich interactive web experiences. Drop in any markdown file, get annotations, notes, stars, commentary, glossary tooltips, diagrams, and print-quality PDF output.

## What It Does

Coco Editor transforms a source markdown document into an interactive HTML page with:

- **Scaligraph diagrams** - Tailwind + inline SVG diagrams with animated data flows and hover effects
- **Left sidebar navigation** - Collapsible table of contents with scroll-position tracking
- **Commentary system** - Google Docs-style comment threads (general + inline + section-level)
- **Bidirectional comment sync** - Browser exports to JSON, agents read/respond, browser imports replies
- **Inline notes** - Yellow sticky-note cards with rich text formatting
- **Glossary tooltips** - Auto-detect technical terms, hover for definitions
- **Star/bookmark** - Mark important blocks for quick navigation
- **Annotation overlay** - Persistent highlighter and underline tool
- **Dual-register content** - Engineering Register + Intuition Layer on every technical section
- **Print/PDF export** - Document-quality output that prints like a Google Doc

## Quick Start

```bash
cd Coco-Editor
npm install
npm run dev
# Open http://localhost:5173
```

## How to Use

### 1. Read the Design System

Read `docs/DesignSense.md` - this is the comprehensive specification for how documents should be built. It covers content structure, typography, interactivity, diagrams, print styles, and quality checklists.

### 2. Edit Your Content

Open `src/App.jsx` and replace the example content with your document's content. Follow the patterns shown:

- Wrap the app in `InteractiveBlockProvider` and `AnnotationProvider`
- Define your sections array for sidebar navigation
- Use `ScrollSection` for top-level sections
- Use `InteractiveBlock` to wrap EVERY content block
- Use the dual-register pattern (Engineering Register + Intuition Layer)
- Create diagram components in `src/components/diagrams/`

### 3. Populate the Glossary

Edit `src/data/glossary.js` with your project's technical terms. Each term needs a `technical` and `plain` definition.

### 4. Build and Deploy

```bash
npm run build    # Production build in dist/
npm run preview  # Preview the production build
```

## Project Structure

```
Coco-Editor/
  docs/
    DesignSense.md    # Design system specification (THE key document)
    Creative.md       # Creative Director persona for design reviews
  src/
    App.jsx           # Your document content goes here
    main.jsx          # React entry point
    index.css         # Type hierarchy + print styles + animations
    components/
      TopBar.jsx              # Slim toolbar (annotate, export, modes)
      LeftSidebar.jsx         # Section navigation + print TOC
      ScrollSection.jsx       # Section wrapper with collapse/star/comment
      InteractiveBlock.jsx    # Block-level star/comment/note (wraps everything)
      AnnotationOverlay.jsx   # Highlight and underline system
      CommentaryPanel.jsx     # Commentary sidebar mode
      CommentaryThread.jsx    # Right panel comment thread
      InlineNote.jsx          # Yellow sticky note cards
      SectionComments.jsx     # Section-level comment thread
      GlossaryTooltip.jsx     # Auto-detect terms + hover tooltips
      GlossarySection.jsx     # Printable glossary at document end
      StarredPanel.jsx        # Starred items sidebar mode
      NotesPanel.jsx          # Notes sidebar mode
      NoteThread.jsx          # Right panel note detail
      Sidebar.jsx             # Legacy sidebar (comments/notes tabs)
    hooks/
      useCommentary.js        # Commentary state management
    utils/
      commentSync.js          # Bidirectional comment sync engine
    data/
      glossary.js             # Glossary terms (edit for your project)
  package.json
  vite.config.js              # Includes comment sync plugin
  tailwind.config.js          # Custom animations for diagrams
  eslint.config.js
  postcss.config.js
  index.html
  CHANGELOG.md                # What was learned across iterations
```

## Comment Sync System

Coco Editor includes a bidirectional comment sync system that enables human-AI collaboration:

1. **Browser to file**: Comments auto-sync to `comments-export.json` via the Vite dev server
2. **Agent reads**: CLI agents read the JSON file to see user comments
3. **Agent responds**: Agents add replies and edit content based on comments
4. **Browser imports**: On reload, the browser imports new agent replies (additive only)

### Ownership Boundaries

- **User owns**: resolution status (resolved/unresolved), comment text, deletion
- **Agents own**: replies only - agents never resolve, delete, or modify user comments
- **Merge rule**: only new replies are imported, never status changes or deletions

## Design Principles

See `docs/DesignSense.md` for the full specification. Key principles:

1. **Documents, not websites** - prints like a Google Doc, not a web page
2. **Pyramid Rule** - orientation before depth, big picture before details
3. **Dual-register** - Engineering Register + Intuition Layer on every section
4. **50/50 visual ratio** - every concept that can be diagrammed should be
5. **Universal interactivity** - every content block supports star/note/comment
6. **No scrollbars on diagrams** - redesign layout if content doesn't fit
7. **Print is a separate product** - its own design pass, compressed styles

## Built With

- React 18
- Vite 5
- Tailwind CSS 3
- Zero external image assets (all diagrams are Tailwind + inline SVG)

## Origin

Extracted from the Coco Loco project (Edge AI Driving Reasoning Device) after 6 sessions of iterative development with comprehensive user feedback. Every design decision in DesignSense was battle-tested against real user interactions.
