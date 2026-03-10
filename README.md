# Coco Editor

**Turn any document into a rich, interactive reading experience — locally, in minutes.**

You have a complex document. Maybe it's a technical guide, a research paper, a project plan, an art portfolio write-up, or a 200-page spec. Right now it's a wall of text in markdown. You want it to feel like a professionally published interactive book — with the ability to annotate, comment, bookmark, look up terms, and print a clean PDF.

Coco Editor does that. You give it your markdown and a Claude instance. You get back a locally-running web page with professional tooling built in — no design skills required, no cloud services, no deployment.

---

## Who Is This For

- **Researchers and writers** who want their documents to be more than flat text
- **Team leads** who want to leave comments on a document and have AI agents respond in-thread
- **Students and educators** who want glossary tooltips and dual-register explanations (technical + plain English) on every section
- **Anyone with a long document** who wants to annotate, bookmark, and navigate it like a real publication
- **Side projects and portfolios** where you want a polished, interactive presentation of your work without building a website from scratch

---

## What You Get — No Setup, No Configuration

All of this works immediately on any content. These are framework features, not content-dependent:

| Feature | What It Does |
|---|---|
| **Annotations** | Persistent highlighter and underline. Pick up the marker, keep marking. Undo with Ctrl+Z. Survives reloads. |
| **Commentary** | Google Docs-style threads. General (document-level) and inline (block-level). Resolve, reopen, reply, edit, delete. |
| **Sticky Notes** | Yellow note cards on any content block. Edit, delete, browse all in sidebar. |
| **Stars** | Bookmark any block. Dedicated sidebar view. Click to jump. |
| **Glossary Tooltips** | Hover any technical term for definitions — both technical and plain English. |
| **Sidebar Navigation** | Collapsible table of contents that tracks your scroll position in real time. |
| **Print / PDF** | One-click export. Compressed margins, clean typography, no interactive clutter. Looks like a published document. |
| **Comment Sync** | Comments auto-save to JSON. AI agents read, respond, and edit content. Replies appear on reload. |
| **Persistence** | All annotations, notes, stars, and comments survive page reloads via localStorage. |

---

## What Claude Generates For You

Only two things change per project:

- **`src/App.jsx`** — your content, structured into interactive sections
- **`src/data/glossary.js`** — your project's technical terms

Claude does the conversion. You give it your markdown file and the prompt from [START-HERE.md](START-HERE.md). Claude reads the design system spec (1,876 lines of battle-tested rules), adopts the Creative Director persona, and generates your interactive document following every typography, layout, and interaction rule automatically.

The design system tells Claude: use the Pyramid Rule (big picture first, then zoom in), add Engineering Registers and Intuition Layers to technical sections, create animated diagrams with Tailwind + SVG, ensure every block is interactive, and make it print like a book.

---

## How to Leverage Coco Editor

### As a Document Reader
Clone, install, drop in your markdown, run the prompt. You get a reading experience with annotations, bookmarks, and notes — like a Kindle for your own documents.

### As a Collaboration Tool
Leave comments on your document. Tell Claude to address them. Claude responds in-thread and edits the content. You review, resolve, leave follow-ups. This is a human-AI feedback loop built into the document itself.

### As a Publishing Tool
Hit "Export PDF" and get a print-quality document. Compressed margins, professional typography, no interactive elements. Hand it to someone who's never seen the project — they can understand it from the print alone.

### As a Presentation Base
The dual-register pattern (technical specs + plain English on every section) means the same document works for both expert and newcomer audiences. One document, two levels of depth.

### As a Reusable Framework
The design system (`docs/DesignSense.md`) and the Creative Director persona (`docs/Creative.md`) are portable. Take them to your next project. Every project benefits from the same quality standards without re-learning them.

---

## Quick Start

```bash
git clone https://github.com/sumatranbeans/Coco-Editor.git
cd Coco-Editor
npm install
npm run dev
# Opens at http://localhost:5173
```

See **[START-HERE.md](START-HERE.md)** for the full guide, including the exact prompt to give Claude.

---

## How It Works

```
Your Markdown  -->  Claude + DesignSense + Creative  -->  Interactive Web Page
                         (reads your doc,                  (all tooling works
                          follows the spec,                 out of the box)
                          generates App.jsx)
```

1. Drop your markdown into the project folder
2. Give Claude the prompt from [START-HERE.md](START-HERE.md)
3. Claude converts your content into React components using the framework
4. Open localhost:5173 — your interactive document is live

---

## The Comment Workflow

After your page is built, this is where the real value kicks in:

1. Read your document at localhost:5173
2. Leave comments on any block — every block has a comment icon
3. Comments auto-save to `comments-export.json`
4. Tell Claude: "Read comments-export.json and address every comment"
5. Claude reads your feedback, responds in threads, edits content
6. Reload — Claude's replies appear in your comment threads
7. Review, resolve, follow up, repeat

---

## What This Does NOT Do

- **Not a markdown auto-renderer** — it doesn't just convert `.md` to HTML. Claude converts your content into structured React components. The result is richer than any markdown renderer.
- **Not a CMS** — no database, no user accounts. You edit code (or have Claude edit it).
- **Not a cloud service** — everything runs locally. No accounts, no deployment, no subscriptions.
- **Not a theme engine** — the design system is opinionated and comprehensive. It produces one style: professional, book-quality interactive documents.

---

## Project Structure

```
Coco-Editor/
  START-HERE.md               # Getting started + copy-paste prompt for Claude
  docs/
    DesignSense.md            # Design system spec (1,876 lines)
    Creative.md               # Creative Director persona
  src/
    App.jsx                   # Your content (the only file you change)
    data/glossary.js          # Your glossary terms
    components/               # 15 framework components (don't touch)
    hooks/                    # Commentary state management
    utils/                    # Bidirectional comment sync engine
    index.css                 # Typography + print styles + animations
  CHANGELOG.md                # Design evolution across 6 sessions
```

---

## Design Principles

Full spec in `docs/DesignSense.md`. The essentials:

1. **Documents, not websites** — feels like reading a book, not browsing a page
2. **Pyramid Rule** — big picture first, then zoom in
3. **Dual-register** — technical specs + plain English on every section
4. **50/50 visual ratio** — if it can be a diagram, it should be
5. **Universal interactivity** — every block supports star, note, comment
6. **Print is a separate product** — its own design pass, its own quality bar

---

## Built With

- React 18 + Vite 5 + Tailwind CSS 3
- Zero external images — all diagrams are Tailwind + inline SVG
- Zero cloud dependencies — fully local

---

## Origin

Extracted from the [Coco Loco](https://github.com/sumatranbeans/Coco-Loco) project after 6 sessions of iterative development with 108 rounds of direct user feedback. Every rule in the design system was earned, not assumed. The framework, the spec, and the persona are the distilled result.

---

**v2.2** · [Get Started](START-HERE.md) · [Design System](docs/DesignSense.md) · [Changelog](CHANGELOG.md)
