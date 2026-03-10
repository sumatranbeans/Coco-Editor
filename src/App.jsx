/**
 * Coco Editor - Example Document
 *
 * This is a self-documenting example that demonstrates all Coco Editor features.
 * Replace this content with your own document. Follow the patterns shown here:
 *
 * 1. Wrap the app in InteractiveBlockProvider + AnnotationProvider
 * 2. Define your sections array for sidebar navigation
 * 3. Use ScrollSection for top-level sections
 * 4. Use InteractiveBlock to wrap EVERY content block
 * 5. Use the dual-register pattern (Engineering Register + Intuition Layer)
 * 6. Create diagram components in src/components/diagrams/
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import TopBar from './components/TopBar'
import LeftSidebar from './components/LeftSidebar'
import ScrollSection from './components/ScrollSection'
import InteractiveBlock, { InteractiveBlockProvider, useInteractiveBlock } from './components/InteractiveBlock'
import { AnnotationProvider, useAnnotation } from './components/AnnotationOverlay'
import { GlossaryText } from './components/GlossaryTooltip'
import GlossarySection from './components/GlossarySection'
import CommentaryPanel from './components/CommentaryPanel'
import CommentaryThread from './components/CommentaryThread'
import StarredPanel from './components/StarredPanel'
import NotesPanel from './components/NotesPanel'
import NoteThread from './components/NoteThread'
import useCommentary from './hooks/useCommentary'

/* ═══════════════════════════════════════════════════════
   Section Registry - Define all sections for sidebar nav
   ═══════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: 'part-1', num: '01', title: 'Welcome to Coco Editor', short: 'Welcome', variant: 'knowledge', group: 'Getting Started' },
  { id: 'part-2', num: '02', title: 'Content Structure', short: 'Structure', variant: 'knowledge' },
  { id: 'part-3', num: '03', title: 'Interactive Features', short: 'Features', variant: 'action', group: 'Features' },
  { id: 'part-4', num: '04', title: 'Diagrams & Visuals', short: 'Diagrams', variant: 'action' },
  { id: 'part-5', num: '05', title: 'Print & Export', short: 'Print', variant: 'knowledge', group: 'Reference' },
]

/* ═══════════════════════════════════════════════════════
   Helper Components
   ═══════════════════════════════════════════════════════ */

function SubSection({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  )
}

function EngineeringRegister({ children }) {
  return (
    <div className="my-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Engineering Register</div>
      {children}
    </div>
  )
}

function IntuitionLayer({ children }) {
  return (
    <div className="my-4 bg-white border border-cyan-200 rounded-xl p-5">
      <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-3">Intuition Layer</div>
      {children}
    </div>
  )
}

function Callout({ type = 'info', children }) {
  const colors = {
    info: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  }
  return (
    <div className={`my-6 px-5 py-4 rounded-xl border text-sm ${colors[type]}`}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Example Diagram Component
   ═══════════════════════════════════════════════════════ */

function ExampleDiagram() {
  return (
    <div className="relative w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-8 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.10]"
        style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start mb-10 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Document Pipeline</h3>
          <p className="text-sm text-slate-500 mt-1 font-mono">Markdown to Interactive Document</p>
        </div>
        <div className="flex gap-6 text-right font-mono text-sm">
          <div>
            <div className="text-cyan-600 font-bold text-xl">10x</div>
            <div className="text-slate-400 uppercase text-xs tracking-wider">Value</div>
          </div>
          <div>
            <div className="text-fuchsia-600 font-bold text-xl">50/50</div>
            <div className="text-slate-400 uppercase text-xs tracking-wider">Text/Visual</div>
          </div>
        </div>
      </div>

      {/* Flow */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        {/* Node 1: Markdown */}
        <div className="group relative flex flex-col items-center w-32">
          <div className="absolute -inset-4 bg-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-16 h-16 bg-white border-2 border-cyan-400/30 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 z-10">
            <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="mt-3 text-center">
            <div className="text-slate-900 font-semibold text-sm">Markdown</div>
            <div className="text-xs text-slate-500 font-mono">Source</div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex-1 flex items-center justify-center relative h-16">
          <svg className="w-full h-6" preserveAspectRatio="none">
            <line x1="0" y1="12" x2="100%" y2="12" className="stroke-slate-200" strokeWidth="2" />
            <line x1="0" y1="12" x2="100%" y2="12" className="stroke-cyan-500 animate-flow" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <div className="absolute -top-3 bg-white border border-slate-200 shadow-sm px-2 py-0.5 rounded-full text-[9px] text-cyan-600 font-mono tracking-wider z-10">
            DesignSense
          </div>
        </div>

        {/* Node 2: Coco Editor */}
        <div className="group relative flex flex-col items-center w-32">
          <div className="absolute -inset-4 bg-fuchsia-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-16 h-16 bg-white border-2 border-fuchsia-400/30 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 z-10">
            <svg className="w-7 h-7 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="mt-3 text-center">
            <div className="text-slate-900 font-semibold text-sm">Coco Editor</div>
            <div className="text-xs text-slate-500 font-mono">Framework</div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex-1 flex items-center justify-center relative h-16">
          <svg className="w-full h-6" preserveAspectRatio="none">
            <line x1="0" y1="12" x2="100%" y2="12" className="stroke-slate-200" strokeWidth="2" />
            <line x1="0" y1="12" x2="100%" y2="12" className="stroke-fuchsia-500 animate-flow" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <div className="absolute -top-3 bg-white border border-slate-200 shadow-sm px-2 py-0.5 rounded-full text-[9px] text-fuchsia-600 font-mono tracking-wider z-10">
            React + Tailwind
          </div>
        </div>

        {/* Node 3: Interactive Doc */}
        <div className="group relative flex flex-col items-center w-32">
          <div className="absolute -inset-4 bg-emerald-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-16 h-16 bg-white border-2 border-emerald-400/30 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 z-10">
            <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="mt-3 text-center">
            <div className="text-slate-900 font-semibold text-sm">Interactive</div>
            <div className="text-xs text-slate-500 font-mono">Document</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SidebarBridge - Renders the correct sidebar panel
   based on current mode
   ═══════════════════════════════════════════════════════ */

function SidebarBridge({ mode, sidebarOpen, sections, currentSection, stars, commentCounts, collapsed, commentary, blockCtx, onSelectBlockComment, onSelectGeneralComment, onSelectNote }) {
  if (mode === 'commentary') {
    return (
      <CommentaryPanel
        groupedComments={commentary.groupedComments}
        unresolvedCount={commentary.unresolvedCount}
        resolvedCount={commentary.resolvedCount}
        selectedCommentId={commentary.selectedCommentId}
        onSelectComment={(id) => {
          if (onSelectGeneralComment) onSelectGeneralComment(id)
        }}
        showUnresolvedOnly={commentary.showUnresolvedOnly}
        onToggleUnresolvedOnly={() => commentary.setShowUnresolvedOnly(p => !p)}
        showInlineComments={commentary.showInlineComments}
        onToggleInlineComments={() => commentary.setShowInlineComments(p => !p)}
        generalComments={commentary.generalComments}
        onAddGeneralComment={(text) => commentary.addComment(null, null, text, 'General Comment')}
        onDeleteGeneralComment={commentary.deleteComment}
        onEditGeneralComment={commentary.editComment}
        isOpen={sidebarOpen}
        blockComments={blockCtx?.blockComments || {}}
        onSelectBlockComment={onSelectBlockComment}
        onDeleteBlockComment={blockCtx?.deleteBlockComment}
      />
    )
  }
  if (mode === 'starred') {
    return (
      <StarredPanel
        isOpen={sidebarOpen}
        blockStars={blockCtx?.blockStars || {}}
        blockNotes={blockCtx?.blockNotes || {}}
        blockComments={blockCtx?.blockComments || {}}
      />
    )
  }
  if (mode === 'notes') {
    return (
      <NotesPanel
        isOpen={sidebarOpen}
        blockNotes={blockCtx?.blockNotes || {}}
        onSelectNote={onSelectNote}
      />
    )
  }
  return (
    <LeftSidebar
      sections={sections}
      isOpen={sidebarOpen}
      currentSection={currentSection}
      stars={stars}
      commentCounts={commentCounts}
      collapsed={collapsed}
    />
  )
}

/* ═══════════════════════════════════════════════════════
   RightPanelBridge - Renders the correct right panel
   ═══════════════════════════════════════════════════════ */

function RightPanelBridge({ commentaryMode, commentary, selectedBlockComment, onCloseBlockComment, blockCtx, notesMode, selectedNote, selectedNoteLabel, onCloseNote }) {
  /* Commentary thread for general/section comments */
  if (commentaryMode && commentary.selectedComment && !selectedBlockComment) {
    return (
      <CommentaryThread
        comment={commentary.selectedComment}
        onClose={() => commentary.setSelectedCommentId(null)}
        onAddReply={(id, text) => commentary.addReply(id, text)}
        onToggleResolve={(id) => commentary.toggleResolve(id)}
        onDelete={(id) => { commentary.deleteComment(id); commentary.setSelectedCommentId(null) }}
        onEdit={(id, text) => commentary.editComment(id, text)}
      />
    )
  }

  /* Commentary thread for block/inline comments */
  if (commentaryMode && selectedBlockComment && !commentary.selectedComment) {
    return (
      <CommentaryThread
        comment={selectedBlockComment}
        onClose={onCloseBlockComment}
        onAddReply={(id, text) => blockCtx?.addBlockReply(id, text)}
        onToggleResolve={(id) => blockCtx?.resolveBlockComment(id)}
        onDelete={(id) => { blockCtx?.deleteBlockComment(id); onCloseBlockComment() }}
        onEdit={(id, text) => blockCtx?.updateBlockComment(id, text)}
      />
    )
  }

  /* Note thread */
  if (notesMode && selectedNote) {
    return (
      <NoteThread
        note={selectedNote}
        blockLabel={selectedNoteLabel}
        onClose={onCloseNote}
        onDelete={(id) => { blockCtx?.deleteBlockNote(id); onCloseNote() }}
        onUpdate={(id, text) => blockCtx?.updateBlockNote(id, text)}
      />
    )
  }

  return null
}

/* ═══════════════════════════════════════════════════════
   Main App
   ═══════════════════════════════════════════════════════ */

function DocumentApp() {
  /* ── Sidebar & Mode State ── */
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarMode, setSidebarMode] = useState('contents') // contents | commentary | starred | notes
  const [currentSection, setCurrentSection] = useState(SECTIONS[0]?.id)

  /* ── Section State ── */
  const [sectionStars, setSectionStars] = useState({})
  const [sectionCollapsed, setSectionCollapsed] = useState({})
  const [showSectionComments, setShowSectionComments] = useState(null)
  const [sectionNotes, setSectionNotes] = useState({})
  const [addingNoteSection, setAddingNoteSection] = useState(null)

  /* ── Commentary ── */
  const commentary = useCommentary()

  /* ── Annotation ── */
  const { annotating, setAnnotating } = useAnnotation()

  /* ── Block-level context ── */
  const blockCtx = useInteractiveBlock()

  /* ── Right panel state ── */
  const [selectedBlockComment, setSelectedBlockComment] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedNoteLabel, setSelectedNoteLabel] = useState('')

  /* ── Scroll tracking ── */
  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const offset = 100
        let activeId = SECTIONS[0]?.id
        for (const section of SECTIONS) {
          const el = document.getElementById(section.id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= offset) activeId = section.id
          }
        }
        setCurrentSection(activeId)
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Section comment counts ── */
  const commentCounts = useMemo(() => {
    const counts = {}
    SECTIONS.forEach(s => {
      counts[s.id] = commentary.getCommentsForSection(s.id).length
    })
    return counts
  }, [commentary])

  /* ── Mode toggles ── */
  const commentaryMode = sidebarMode === 'commentary'
  const starredMode = sidebarMode === 'starred'
  const notesMode = sidebarMode === 'notes'

  const toggleMode = useCallback((mode) => {
    setSidebarMode(prev => prev === mode ? 'contents' : mode)
    setSidebarOpen(true)
  }, [])

  /* ── Section helpers ── */
  const toggleStar = useCallback((id) => {
    setSectionStars(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const toggleCollapse = useCallback((id) => {
    setSectionCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const expandAll = useCallback(() => {
    setSectionCollapsed({})
    setSidebarMode('contents')
    commentary.setSelectedCommentId(null)
    setSelectedBlockComment(null)
  }, [commentary])

  const collapseAll = useCallback(() => {
    const c = {}
    SECTIONS.forEach(s => { c[s.id] = true })
    setSectionCollapsed(c)
    setSidebarMode('contents')
    commentary.setSelectedCommentId(null)
    setSelectedBlockComment(null)
  }, [commentary])

  const handleExport = useCallback(() => {
    window.print()
  }, [])

  /* ── Section notes ── */
  const addSectionNote = useCallback((sectionId, html) => {
    setSectionNotes(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), {
        id: Date.now(), sectionId, text: html,
        timestamp: new Date().toLocaleString(), color: 'amber',
      }]
    }))
    setAddingNoteSection(null)
  }, [])

  const deleteSectionNote = useCallback((noteId) => {
    setSectionNotes(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.filter(n => n.id !== noteId)
      })
      return next
    })
  }, [])

  /* ── Section comment helpers ── */
  const handleAddSectionComment = useCallback((sectionId, text) => {
    const section = SECTIONS.find(s => s.id === sectionId)
    commentary.addComment(sectionId, null, text, section ? `${section.num} ${section.title}` : sectionId)
  }, [commentary])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* TopBar */}
      <TopBar
        title="Coco Editor"
        version="v1.0"
        onAnnotate={() => setAnnotating(!annotating)}
        annotating={annotating}
        onExport={handleExport}
        onToggleSidebar={() => setSidebarOpen(p => !p)}
        glossaryEnabled={false}
        onToggleGlossary={() => {}}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        commentaryMode={commentaryMode}
        onToggleCommentary={() => toggleMode('commentary')}
        starredMode={starredMode}
        onToggleStarred={() => toggleMode('starred')}
        notesMode={notesMode}
        onToggleNotes={() => toggleMode('notes')}
      />

      {/* Left Sidebar */}
      <SidebarBridge
        mode={sidebarMode}
        sidebarOpen={sidebarOpen}
        sections={SECTIONS}
        currentSection={currentSection}
        stars={sectionStars}
        commentCounts={commentCounts}
        collapsed={sectionCollapsed}
        commentary={commentary}
        blockCtx={blockCtx}
        onSelectBlockComment={(comment) => {
          commentary.setSelectedCommentId(null)
          setSelectedBlockComment(comment)
        }}
        onSelectGeneralComment={(id) => {
          setSelectedBlockComment(null)
          commentary.setSelectedCommentId(id)
        }}
        onSelectNote={(note, label) => {
          setSelectedNote(note)
          setSelectedNoteLabel(label)
        }}
      />

      {/* Right Panel */}
      <RightPanelBridge
        commentaryMode={commentaryMode}
        commentary={commentary}
        selectedBlockComment={selectedBlockComment}
        onCloseBlockComment={() => setSelectedBlockComment(null)}
        blockCtx={blockCtx}
        notesMode={notesMode}
        selectedNote={selectedNote}
        selectedNoteLabel={selectedNoteLabel}
        onCloseNote={() => { setSelectedNote(null); setSelectedNoteLabel('') }}
      />

      {/* Main Content */}
      <main className={`max-w-5xl mx-auto px-6 pb-32 transition-all duration-300 ${sidebarOpen ? 'ml-72' : ''}`}>

        {/* ═══ Part 1: Welcome ═══ */}
        <ScrollSection
          id="part-1" num="01" title="Welcome to Coco Editor"
          variant="knowledge"
          starred={sectionStars['part-1']}
          onStar={() => toggleStar('part-1')}
          commentCount={commentCounts['part-1']}
          onComment={() => setShowSectionComments(p => p === 'part-1' ? null : 'part-1')}
          showComments={showSectionComments === 'part-1'}
          comments={commentary.getCommentsForSection('part-1')}
          onAddComment={handleAddSectionComment}
          onResolve={(id) => commentary.toggleResolve(id)}
          onAddReply={(id, text) => commentary.addReply(id, text)}
          onDeleteComment={(id) => commentary.deleteComment(id)}
          onNote={() => setAddingNoteSection(p => p === 'part-1' ? null : 'part-1')}
          notes={sectionNotes['part-1'] || []}
          onDeleteNote={deleteSectionNote}
          addingNote={addingNoteSection === 'part-1'}
          onSaveNote={(html) => addSectionNote('part-1', html)}
          onCancelNote={() => setAddingNoteSection(null)}
          collapsed={sectionCollapsed['part-1']}
          onToggleCollapse={() => toggleCollapse('part-1')}
        >
          <InteractiveBlock id="sub-welcome-intro">
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Coco Editor is a portable framework for transforming markdown documents into rich interactive web experiences. Every piece of content you see on this page was built using the patterns described in the DesignSense specification.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              This example document demonstrates the core features: dual-register content, interactive blocks with star/note/comment capability, Scaligraph diagrams, glossary tooltips, annotation overlays, and print-quality PDF export. Replace this content with your own document to get started.
            </p>
          </InteractiveBlock>

          <InteractiveBlock id="sub-welcome-diagram">
            <ExampleDiagram />
          </InteractiveBlock>

          <InteractiveBlock id="sub-welcome-callout">
            <Callout type="info">
              <strong>Tip:</strong> Hover over any content block to see the star, comment, and note icons in the top-right corner. Try starring this callout or adding a note to it.
            </Callout>
          </InteractiveBlock>
        </ScrollSection>

        {/* ═══ Part 2: Content Structure ═══ */}
        <ScrollSection
          id="part-2" num="02" title="Content Structure"
          variant="knowledge"
          starred={sectionStars['part-2']}
          onStar={() => toggleStar('part-2')}
          commentCount={commentCounts['part-2']}
          onComment={() => setShowSectionComments(p => p === 'part-2' ? null : 'part-2')}
          showComments={showSectionComments === 'part-2'}
          comments={commentary.getCommentsForSection('part-2')}
          onAddComment={handleAddSectionComment}
          onResolve={(id) => commentary.toggleResolve(id)}
          onAddReply={(id, text) => commentary.addReply(id, text)}
          onDeleteComment={(id) => commentary.deleteComment(id)}
          onNote={() => setAddingNoteSection(p => p === 'part-2' ? null : 'part-2')}
          notes={sectionNotes['part-2'] || []}
          onDeleteNote={deleteSectionNote}
          addingNote={addingNoteSection === 'part-2'}
          onSaveNote={(html) => addSectionNote('part-2', html)}
          onCancelNote={() => setAddingNoteSection(null)}
          collapsed={sectionCollapsed['part-2']}
          onToggleCollapse={() => toggleCollapse('part-2')}
        >
          <InteractiveBlock id="sub-pyramid-rule">
            <SubSection title="2.1 The Pyramid Rule">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Every document starts with orientation before depth. The reader should understand what they are looking at, why it exists, and what success looks like before encountering any technical content.
              </p>
            </SubSection>
          </InteractiveBlock>

          <InteractiveBlock id="sub-dual-register">
            <SubSection title="2.2 Dual-Register Pattern">
              <InteractiveBlock id="eng-reg-example">
                <EngineeringRegister>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500">Pattern</div>
                      <div className="font-mono font-bold text-slate-800">Dual-Register</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Audience</div>
                      <div className="font-mono font-bold text-slate-800">Technical + Executive</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Minimum IL Depth</div>
                      <div className="font-mono font-bold text-slate-800">3-5 sentences</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Required Elements</div>
                      <div className="font-mono font-bold text-slate-800">Analogy + "So What?"</div>
                    </div>
                  </div>
                </EngineeringRegister>
              </InteractiveBlock>

              <InteractiveBlock id="intuit-example">
                <IntuitionLayer>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Think of the dual-register pattern like a museum exhibit. The Engineering Register is the detailed placard with dates, materials, and dimensions - what an art historian would read. The Intuition Layer is the audio guide that tells you the story behind the painting in words anyone can understand.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Both exist side by side because different people need different entry points to the same information. A CTO glances at the specs; a product manager reads the story. Neither has to switch documents or ask for a "simplified version."
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <strong className="text-cyan-700">So what?</strong> A single document that serves both audiences eliminates the "dumbed down executive summary" anti-pattern where the simplified version goes stale because nobody updates it.
                  </p>
                </IntuitionLayer>
              </InteractiveBlock>
            </SubSection>
          </InteractiveBlock>
        </ScrollSection>

        {/* ═══ Part 3: Interactive Features ═══ */}
        <ScrollSection
          id="part-3" num="03" title="Interactive Features"
          variant="action"
          starred={sectionStars['part-3']}
          onStar={() => toggleStar('part-3')}
          commentCount={commentCounts['part-3']}
          onComment={() => setShowSectionComments(p => p === 'part-3' ? null : 'part-3')}
          showComments={showSectionComments === 'part-3'}
          comments={commentary.getCommentsForSection('part-3')}
          onAddComment={handleAddSectionComment}
          onResolve={(id) => commentary.toggleResolve(id)}
          onAddReply={(id, text) => commentary.addReply(id, text)}
          onDeleteComment={(id) => commentary.deleteComment(id)}
          onNote={() => setAddingNoteSection(p => p === 'part-3' ? null : 'part-3')}
          notes={sectionNotes['part-3'] || []}
          onDeleteNote={deleteSectionNote}
          addingNote={addingNoteSection === 'part-3'}
          onSaveNote={(html) => addSectionNote('part-3', html)}
          onCancelNote={() => setAddingNoteSection(null)}
          collapsed={sectionCollapsed['part-3']}
          onToggleCollapse={() => toggleCollapse('part-3')}
        >
          <InteractiveBlock id="sub-interactive-block">
            <SubSection title="3.1 InteractiveBlock">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Every content block in the document is wrapped with <GlossaryText>InteractiveBlock</GlossaryText>. This <GlossaryText>Component</GlossaryText> adds hover-visible star, comment, and note icons to any piece of content. The icons are subtle and non-intrusive - they appear only when you hover over the block.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                State is managed via React context (<code className="px-1 py-0.5 bg-slate-100 rounded text-xs font-mono">InteractiveBlockProvider</code>) with <GlossaryText>localStorage</GlossaryText> persistence. Each block has a unique ID that ties its stars, notes, and comments to it across page reloads.
              </p>
            </SubSection>
          </InteractiveBlock>

          <InteractiveBlock id="sub-commentary">
            <SubSection title="3.2 Commentary System">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The commentary system provides a complete review workflow. Click "Commentary" in the toolbar to switch the sidebar to commentary mode. You can add general comments (document-level) or inline comments (anchored to specific blocks).
              </p>
              <Callout type="success">
                <strong>Try it:</strong> Click the "Commentary" button in the toolbar, then add a general comment using the input at the top of the sidebar.
              </Callout>
            </SubSection>
          </InteractiveBlock>

          <InteractiveBlock id="sub-annotations">
            <SubSection title="3.3 Annotations">
              <p className="text-sm text-slate-600 leading-relaxed">
                Click "Annotations" in the toolbar to enter annotation mode. Pick a highlighting tool (yellow, pink, or underline), then select text anywhere in the document. The tool stays active until you stop annotating - just like picking up a real highlighter and marking pages as you read.
              </p>
            </SubSection>
          </InteractiveBlock>
        </ScrollSection>

        {/* ═══ Part 4: Diagrams ═══ */}
        <ScrollSection
          id="part-4" num="04" title="Diagrams & Visuals"
          variant="action"
          starred={sectionStars['part-4']}
          onStar={() => toggleStar('part-4')}
          commentCount={commentCounts['part-4']}
          onComment={() => setShowSectionComments(p => p === 'part-4' ? null : 'part-4')}
          showComments={showSectionComments === 'part-4'}
          comments={commentary.getCommentsForSection('part-4')}
          onAddComment={handleAddSectionComment}
          onResolve={(id) => commentary.toggleResolve(id)}
          onAddReply={(id, text) => commentary.addReply(id, text)}
          onDeleteComment={(id) => commentary.deleteComment(id)}
          onNote={() => setAddingNoteSection(p => p === 'part-4' ? null : 'part-4')}
          notes={sectionNotes['part-4'] || []}
          onDeleteNote={deleteSectionNote}
          addingNote={addingNoteSection === 'part-4'}
          onSaveNote={(html) => addSectionNote('part-4', html)}
          onCancelNote={() => setAddingNoteSection(null)}
          collapsed={sectionCollapsed['part-4']}
          onToggleCollapse={() => toggleCollapse('part-4')}
        >
          <InteractiveBlock id="sub-scaligraph">
            <SubSection title="4.1 Scaligraph Diagrams">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Diagrams are built entirely with <GlossaryText>Tailwind CSS</GlossaryText> utility classes and inline SVGs. Zero custom CSS. Zero image assets. Every node has ambient glow on hover, every connector has animated data flow, and every diagram has a dot-grid background for depth.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The diagram above (in Part 1) shows the basic pattern: nodes with hover glows, animated connectors with protocol labels, and metric badges in the header.
              </p>
            </SubSection>
          </InteractiveBlock>

          <InteractiveBlock id="sub-visual-ratio">
            <Callout type="warning">
              <strong>50/50 Rule:</strong> Text content and visual content should be approximately 50/50. Every concept that can be diagrammed should be diagrammed. For a real document, aim for 15+ diagrams.
            </Callout>
          </InteractiveBlock>
        </ScrollSection>

        {/* ═══ Part 5: Print ═══ */}
        <ScrollSection
          id="part-5" num="05" title="Print & Export"
          variant="knowledge"
          starred={sectionStars['part-5']}
          onStar={() => toggleStar('part-5')}
          commentCount={commentCounts['part-5']}
          onComment={() => setShowSectionComments(p => p === 'part-5' ? null : 'part-5')}
          showComments={showSectionComments === 'part-5'}
          comments={commentary.getCommentsForSection('part-5')}
          onAddComment={handleAddSectionComment}
          onResolve={(id) => commentary.toggleResolve(id)}
          onAddReply={(id, text) => commentary.addReply(id, text)}
          onDeleteComment={(id) => commentary.deleteComment(id)}
          onNote={() => setAddingNoteSection(p => p === 'part-5' ? null : 'part-5')}
          notes={sectionNotes['part-5'] || []}
          onDeleteNote={deleteSectionNote}
          addingNote={addingNoteSection === 'part-5'}
          onSaveNote={(html) => addSectionNote('part-5', html)}
          onCancelNote={() => setAddingNoteSection(null)}
          collapsed={sectionCollapsed['part-5']}
          onToggleCollapse={() => toggleCollapse('part-5')}
        >
          <InteractiveBlock id="sub-print-rules">
            <SubSection title="5.1 Print is a Separate Product">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Click "Export PDF" in the toolbar to print. The document prints like a professional publication - not a web page. Notes appear as yellow cards inline. Comments, stars, and interactive controls are hidden. Collapsed sections print expanded. Diagrams print static (no animations).
              </p>
            </SubSection>
          </InteractiveBlock>

          <InteractiveBlock id="sub-print-table">
            <EngineeringRegister>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-mono text-slate-400 uppercase tracking-wider pb-2">Element</th>
                    <th className="text-left text-xs font-mono text-slate-400 uppercase tracking-wider pb-2">Print Behavior</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Document text</td><td className="py-2">Full content, compressed spacing</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Diagrams</td><td className="py-2">Static, full color, no animations</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Notes</td><td className="py-2">Yellow cards inline</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Annotations</td><td className="py-2">Highlights visible</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Comments</td><td className="py-2">Hidden (interactive only)</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Stars</td><td className="py-2">Hidden</td></tr>
                  <tr><td className="py-2 font-medium">Sidebar/Topbar</td><td className="py-2">Hidden</td></tr>
                </tbody>
              </table>
            </EngineeringRegister>
          </InteractiveBlock>
        </ScrollSection>

        {/* Glossary */}
        <GlossarySection />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center pb-8">
          <p className="text-xs text-slate-400 font-mono">
            Built with Coco Editor - Rich Interactive Document Framework
          </p>
        </div>

        {/* Color coding legend */}
        <div className="no-print fixed bottom-4 left-4 z-[100] bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-2 flex items-center gap-4 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyan-300 rounded" />
            Action
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-300 rounded" />
            Knowledge
          </div>
        </div>
      </main>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   App Root - Wraps with providers
   ═══════════════════════════════════════════════════════ */

export default function App() {
  return (
    <AnnotationProvider>
      <InteractiveBlockProvider>
        <DocumentApp />
      </InteractiveBlockProvider>
    </AnnotationProvider>
  )
}
