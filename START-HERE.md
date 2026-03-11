# Start Here

## What This Is

- A framework that turns any markdown document into a rich interactive web page
- You get: annotations, sticky notes, stars, commentary threads, glossary tooltips, diagrams, and print-quality PDF
- Everything runs locally on your machine — no cloud, no accounts, no deployment
- Your Claude instance does the conversion — you give it your markdown and a prompt

## What You Need

- Node.js (v18+)
- A terminal
- Claude Code (CLI) or any Claude instance with file access
- Your markdown file

## Setup (2 minutes)

```bash
git clone https://github.com/sumatranbeans/Coco-Editor.git
cd Coco-Editor
npm install
npm run dev
# Opens at http://localhost:5173
```

You'll see a demo page. That's the framework working. Now you replace the demo with your content.

## How It Works

1. You drop your markdown file into the project folder
2. You give Claude the prompt below
3. Claude reads your markdown + the design system (`docs/DesignSense.md`) + Storee (`docs/Storee.md`) + Clippy (`docs/Clippy.md`)
4. Storee architects the narrative structure; Clippy handles the visual design
5. Claude converts your markdown into React components using the framework
6. You get a live interactive page at localhost:5173

## The Prompt

Copy this entire block and paste it into Claude Code from inside the Coco-Editor folder. Replace `YOUR-FILE.md` with your actual file name.

---

```
I have a markdown document at YOUR-FILE.md that I want to convert into a rich interactive web page using the Coco Editor framework.

Before you start:
1. Read docs/DesignSense.md — this is the design system specification. Follow it exactly.
2. Read docs/Storee.md — this is the communication architect persona. Use this lens for narrative structure, section flow, and audience-first framing.
3. Read docs/Clippy.md — this is the design specialist persona. Use this lens for visual design, layout, and coherence decisions.
4. Read src/App.jsx — this is the example. You'll replace this with my content.
5. Read my markdown file: YOUR-FILE.md

Then convert my document using the Story-First Workflow:
Step 1 — Narrative architecture (Storee's lens):
- Define the three-act structure: Vision (why it matters), Conceptual (how it works), Technical (how to build it)
- Design the emotional arc: what should the reader feel at each section?
- Identify 3-5 aha moments — emotional peaks where concepts click
- Place pre-read education cards before any concept that requires background knowledge

Step 2 — Content conversion:
- Break the markdown into logical sections (each becomes a ScrollSection)
- Wrap EVERY content block in InteractiveBlock (paragraphs, lists, tables, quotes — everything)
- Add Engineering Register (technical specs) and Intuition Layer (plain English analogy) to technical sections
- Create Scaligraph diagrams (Tailwind + inline SVG, no images) for concepts that benefit from visuals
- Populate src/data/glossary.js with technical terms from my document
- Follow the Pyramid Rule: big picture first, then zoom into details

Step 3 — Visual design (Clippy's lens):
- Apply the project's card taxonomy with distinct visual categories
- Ensure consistent color palette across all diagrams
- Verify every diagram communicates its concept in seconds, not minutes
- Update the TopBar title and version to match my project

Design rules (non-negotiable):
- No italics anywhere
- No em dashes — use hyphens with spaces
- No scrollbars on diagrams — if it doesn't fit, redesign the layout
- Documents should feel like books, not websites
- Every content block must have star/note/comment capability
- Print output must look like a professional publication
- The greatness standard: not "does this work?" but "is this the best version?"

When done, run: npm run build && npm run lint
Fix any errors. Then tell me it's ready to review at localhost:5173.
```

---

## What You'll Get

- **Left sidebar** — clickable table of contents that tracks your scroll position
- **Top toolbar** — annotations, notes, starred items, commentary, glossary, PDF export
- **Annotations** — persistent highlighter and underline (pick up the marker, keep marking)
- **Sticky notes** — yellow cards on any content block, with edit/delete
- **Stars** — bookmark any block, see all starred items in sidebar
- **Commentary** — Google Docs-style comment threads with resolve/reopen
- **Glossary tooltips** — hover over technical terms for definitions (technical + plain English)
- **Diagrams** — animated Tailwind + SVG visuals, zero image files
- **Print/PDF** — export button produces document-quality output with compressed margins

## Tips

- **Story first**: Define the narrative arc before writing any content. What should the reader feel at each point?
- **Three acts**: Vision (no jargon), Conceptual (mental models), Technical (full specs). Each act is self-contained
- **Pre-reads**: Before any concept that needs background knowledge, add a collapsed Pre-Read card
- **Long documents**: Break into 10-15 sections max for sidebar readability
- **Glossary**: Aim for every technical term a newcomer wouldn't know
- **Diagrams**: Target 50/50 text-to-visual ratio — every concept that can be a visual should be
- **Sections**: Use the dual-register pattern — Engineering Register for specs, Intuition Layer for "explain it to me like I'm new"
- **Greatness check**: Ask yourself "would I be proud to show this?" — not just "does this work?"
- **After first build**: Leave comments on the page, then ask Claude to "read comments-export.json and address every comment"

## File You'll Edit

The only file you need to touch is `src/App.jsx`. Everything else is framework.

If you need a custom glossary: edit `src/data/glossary.js`

## Comment Workflow (After Your Page Is Built)

1. Open your page at localhost:5173
2. Click "Commentary" in the toolbar
3. Leave comments on any section (click the comment icon on any block)
4. Your comments auto-save to `comments-export.json`
5. Tell Claude: "Read comments-export.json and address every comment. Read the review-comments instructions for how to process them."
6. Reload the page — Claude's replies appear in the comment threads
7. Review, resolve, leave follow-ups, repeat

## Questions?

- **"How do I change the title?"** — Edit the `title` and `version` props in the `TopBar` component call in `src/App.jsx`
- **"How do I add more glossary terms?"** — Edit `src/data/glossary.js`, add objects with `term`, `technical`, and `plain` fields
- **"How do I print?"** — Click "Export PDF" in the toolbar, or Cmd+P / Ctrl+P
- **"Can I change colors/fonts?"** — Edit `src/index.css` for typography, `tailwind.config.js` for theme colors
- **"What if my document is huge?"** — Break it into parts. Each part is a ScrollSection. The sidebar handles navigation.
