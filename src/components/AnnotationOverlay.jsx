import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { triggerSync } from '../utils/commentSync'

/* ────────────────────────────────────────────
   Annotation System  -  Text Highlighting & Underlining
   Uses browser Selection API for inline markup
   Supports persistent highlighter mode with auto-apply
   ──────────────────────────────────────────── */

const STORAGE_KEY = 'coco-editor-annotations'

const AnnotationContext = createContext(null)

export function useAnnotation() {
  const ctx = useContext(AnnotationContext)
  if (!ctx) throw new Error('useAnnotation must be used within AnnotationProvider')
  return ctx
}

/* Generate a unique ID for each annotation */
let _annotationCounter = Date.now()
function uid() {
  return `ann-${++_annotationCounter}`
}

/* Tool definitions shared between FloatingToolbar and AnnotationToolbar */
const TOOLS = [
  { type: 'highlight', color: '#fef08a', label: 'Yellow', icon: 'bg-yellow-200 border-yellow-400', activeLabel: 'Yellow Highlight' },
  { type: 'highlight', color: '#fbcfe8', label: 'Pink', icon: 'bg-pink-200 border-pink-400', activeLabel: 'Pink Highlight' },
  { type: 'underline', color: '#3b82f6', label: 'Underline', icon: 'bg-blue-100 border-blue-400', activeLabel: 'Blue Underline' },
  { type: 'remove', color: null, label: 'Eraser', icon: 'bg-slate-100 border-slate-300', activeLabel: 'Eraser' },
]

/* ─── Floating Toolbar (appears near selected text  -  fallback when no active tool) ─── */
function FloatingToolbar({ position, onApply, onClose }) {
  if (!position) return null

  return (
    <div
      className="fixed z-[250] flex items-center gap-1 bg-white border border-slate-200 rounded-xl shadow-xl px-2 py-1.5 animate-in"
      style={{
        left: Math.min(position.x, window.innerWidth - 220),
        top: Math.max(position.y - 48, 8),
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {TOOLS.map((tool, i) => (
        <button
          key={i}
          onClick={() => onApply(tool.type, tool.color)}
          title={tool.label}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all hover:scale-105 ${
            tool.type === 'remove'
              ? 'text-slate-500 hover:bg-red-50 hover:text-red-600'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          {tool.type === 'underline' ? (
            <span className="w-4 border-b-2 border-blue-500 inline-block">&nbsp;</span>
          ) : tool.type === 'remove' ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <span className={`w-4 h-4 rounded border ${tool.icon}`} />
          )}
          <span>{tool.label}</span>
        </button>
      ))}

      <button
        onClick={onClose}
        className="ml-1 p-1 rounded text-slate-300 hover:text-slate-600 transition-colors"
        title="Close"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

/* ─── Annotation Sub-Toolbar (below TopBar when annotating) ─── */
export function AnnotationToolbar({ annotating, onClearAll, annotationCount, activeTool, onSetActiveTool }) {
  if (!annotating) return null

  const isToolActive = (tool) => {
    if (!activeTool) return false
    return activeTool.type === tool.type && activeTool.color === tool.color
  }

  const handleToolClick = (tool) => {
    if (isToolActive(tool)) {
      /* Deselect if already active */
      onSetActiveTool(null)
    } else {
      onSetActiveTool({ type: tool.type, color: tool.color })
    }
  }

  const activeToolLabel = activeTool
    ? TOOLS.find(t => t.type === activeTool.type && t.color === activeTool.color)?.activeLabel
    : null

  return (
    <div className="no-print sticky top-[52px] z-[199] bg-violet-50/90 backdrop-blur-xl border-b border-violet-200 flex items-center px-4 gap-3 py-1.5">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-violet-600">Annotation mode</span>
      </div>

      <span className="text-xs text-violet-400">|</span>

      {/* Tool toggle buttons */}
      <div className="flex items-center gap-1">
        {TOOLS.map((tool, i) => {
          const active = isToolActive(tool)
          return (
            <button
              key={i}
              onClick={() => handleToolClick(tool)}
              title={`${tool.label}${active ? ' (active  -  click to deselect)' : ''}`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                active
                  ? 'bg-violet-500 text-white shadow-md ring-2 ring-violet-300 scale-105'
                  : tool.type === 'remove'
                    ? 'bg-white/70 text-slate-500 hover:bg-red-50 hover:text-red-600 border border-slate-200'
                    : 'bg-white/70 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tool.type === 'underline' ? (
                <span className={`w-4 border-b-2 ${active ? 'border-white' : 'border-blue-500'} inline-block`}>&nbsp;</span>
              ) : tool.type === 'remove' ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <span className={`w-4 h-4 rounded border ${active ? 'border-white/50' : ''} ${tool.icon}`} />
              )}
              <span>{tool.label}</span>
            </button>
          )
        })}
      </div>

      <span className="text-xs text-violet-400">|</span>

      {/* Active tool indicator */}
      {activeToolLabel ? (
        <span className="text-xs font-mono text-violet-600">
          Auto-applying: <span className="font-bold">{activeToolLabel}</span>
        </span>
      ) : (
        <span className="text-xs text-slate-500">Pick a tool or select text for manual toolbar</span>
      )}

      <div className="flex-1" />

      {/* Undo hint */}
      <span className="text-xs text-slate-400 font-mono hidden sm:inline">
        {navigator.platform?.includes('Mac') ? '\u2318' : 'Ctrl'}+Z undo
      </span>

      {annotationCount > 0 && (
        <span className="text-xs font-mono text-violet-400">{annotationCount} annotation{annotationCount !== 1 ? 's' : ''}</span>
      )}
      {annotationCount > 0 && (
        <button
          onClick={onClearAll}
          className="px-2 py-0.5 rounded text-xs font-mono text-red-500 hover:bg-red-50 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  )
}

/* ─── Provider ─── */
export function AnnotationProvider({ children, annotating }) {
  const [annotations, setAnnotations] = useState([])
  const [toolbarPos, setToolbarPos] = useState(null)
  const [activeTool, setActiveTool] = useState(null)
  const undoStackRef = useRef([])
  const selectionRef = useRef(null)
  const activeToolRef = useRef(activeTool)

  /* Keep ref in sync with state so the mouseup handler always sees the latest value */
  useEffect(() => {
    activeToolRef.current = activeTool
  }, [activeTool])

  /* Clear active tool when leaving annotation mode */
  useEffect(() => {
    if (!annotating) {
      setActiveTool(null)
    }
  }, [annotating])

  /* Load annotations from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setAnnotations(parsed)
      }
    } catch (_e) { /* ignore corrupt storage */ }
  }, [])

  /* Persist annotations to localStorage */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations))
    } catch (_e) { /* quota exceeded  -  silent */ }
    triggerSync()
  }, [annotations])

  /* Restore annotations into DOM on mount only  -  live annotations applied by applyAnnotation */
  useEffect(() => {
    restoreAnnotations(annotations)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Apply an annotation to selected text */
  const applyAnnotation = useCallback((type, color) => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
      setToolbarPos(null)
      return
    }

    if (type === 'remove') {
      removeAnnotationsInRange(selection.getRangeAt(0))
      /* Remove from state as well  -  any annotation whose text is within the selection */
      const selText = selection.toString()
      setAnnotations(prev => prev.filter(a => !selText.includes(a.text)))
      selection.removeAllRanges()
      setToolbarPos(null)
      return
    }

    try {
      const range = selection.getRangeAt(0)
      const text = selection.toString()

      /* Find which section this belongs to */
      const sectionEl = findParentSection(range.commonAncestorContainer)
      const sectionId = sectionEl ? sectionEl.id : 'unknown'

      const id = uid()
      const wrapper = document.createElement(type === 'highlight' ? 'mark' : 'span')
      wrapper.className = type === 'highlight' ? 'annotation-highlight' : 'annotation-underline'
      wrapper.style.cssText = type === 'highlight'
        ? `background-color: ${color}; border-radius: 2px; padding: 0 1px;`
        : `border-bottom: 2px solid ${color}; padding-bottom: 1px;`
      wrapper.dataset.annotationId = id
      wrapper.dataset.annotationType = type
      wrapper.dataset.annotationColor = color

      range.surroundContents(wrapper)
      selection.removeAllRanges()

      const newAnnotation = {
        id,
        sectionId,
        text: text.substring(0, 200),
        type,
        color,
        timestamp: Date.now(),
      }
      setAnnotations(prev => [...prev, newAnnotation])
      undoStackRef.current.push(id)
    } catch (_e) {
      /* surroundContents fails on cross-element selections  -  use extractContents approach */
      try {
        const range = selection.getRangeAt(0)
        const text = selection.toString()
        const sectionEl = findParentSection(range.commonAncestorContainer)
        const sectionId = sectionEl ? sectionEl.id : 'unknown'
        const id = uid()

        const fragment = range.extractContents()
        const wrapper = document.createElement(type === 'highlight' ? 'mark' : 'span')
        wrapper.className = type === 'highlight' ? 'annotation-highlight' : 'annotation-underline'
        wrapper.style.cssText = type === 'highlight'
          ? `background-color: ${color}; border-radius: 2px; padding: 0 1px;`
          : `border-bottom: 2px solid ${color}; padding-bottom: 1px;`
        wrapper.dataset.annotationId = id
        wrapper.dataset.annotationType = type
        wrapper.dataset.annotationColor = color
        wrapper.appendChild(fragment)
        range.insertNode(wrapper)
        selection.removeAllRanges()

        const newAnnotation = {
          id,
          sectionId,
          text: text.substring(0, 200),
          type,
          color,
          timestamp: Date.now(),
        }
        setAnnotations(prev => [...prev, newAnnotation])
        undoStackRef.current.push(id)
      } catch (_e2) {
        /* If all else fails, silently ignore */
      }
    }

    setToolbarPos(null)
  }, [])

  /* Listen for text selection when annotating */
  useEffect(() => {
    if (!annotating) {
      setToolbarPos(null)
      return
    }

    const handleMouseUp = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setToolbarPos(null)
        return
      }

      /* Only allow selections inside <main> (document content) */
      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      const mainEl = document.querySelector('main')
      if (!mainEl || !mainEl.contains(container.nodeType === 3 ? container.parentElement : container)) {
        setToolbarPos(null)
        return
      }

      const rect = range.getBoundingClientRect()
      selectionRef.current = { range: range.cloneRange(), text: selection.toString() }

      /* F9: If an active tool is pre-selected, auto-apply immediately */
      const currentTool = activeToolRef.current
      if (currentTool) {
        applyAnnotation(currentTool.type, currentTool.color)
        return
      }

      /* F8 FIX: Use rect.top directly (viewport-relative) since toolbar has position: fixed.
         Previously used rect.top + window.scrollY which pushed toolbar off-screen at bottom sections. */
      setToolbarPos({ x: rect.left + rect.width / 2 - 100, y: rect.top })
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [annotating, applyAnnotation])

  /* Undo last annotation with Ctrl+Z / Cmd+Z */
  useEffect(() => {
    if (!annotating) return

    const handleKeyDown = (e) => {
      const isMac = navigator.platform?.includes('Mac')
      const isUndo = (isMac ? e.metaKey : e.ctrlKey) && e.key === 'z' && !e.shiftKey

      if (!isUndo) return

      e.preventDefault()
      e.stopPropagation()

      const lastId = undoStackRef.current.pop()
      if (!lastId) return

      /* Remove from DOM */
      const el = document.querySelector(`[data-annotation-id="${lastId}"]`)
      if (el) {
        const parent = el.parentNode
        while (el.firstChild) parent.insertBefore(el.firstChild, el)
        parent.removeChild(el)
        parent.normalize()
      }

      /* Remove from state */
      setAnnotations(prev => prev.filter(a => a.id !== lastId))
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [annotating])

  /* Clear all annotations */
  const clearAll = useCallback(() => {
    document.querySelectorAll('[data-annotation-id]').forEach(el => {
      const parent = el.parentNode
      while (el.firstChild) parent.insertBefore(el.firstChild, el)
      parent.removeChild(el)
      parent.normalize()
    })
    setAnnotations([])
    undoStackRef.current = []
  }, [])

  const closeToolbar = useCallback(() => {
    setToolbarPos(null)
    window.getSelection()?.removeAllRanges()
  }, [])

  const value = {
    annotations,
    annotating,
    clearAll,
    annotationCount: annotations.length,
    activeTool,
    setActiveTool,
  }

  return (
    <AnnotationContext.Provider value={value}>
      {children}
      {annotating && (
        <FloatingToolbar
          position={toolbarPos}
          onApply={applyAnnotation}
          onClose={closeToolbar}
        />
      )}
    </AnnotationContext.Provider>
  )
}

/* ─── Helpers ─── */

function findParentSection(node) {
  let el = node.nodeType === 3 ? node.parentElement : node
  while (el) {
    if (el.tagName === 'SECTION' && el.id) return el
    el = el.parentElement
  }
  return null
}

function removeAnnotationsInRange(range) {
  const container = range.commonAncestorContainer
  const parent = container.nodeType === 3 ? container.parentElement : container

  /* Collect all annotation elements to unwrap */
  const toUnwrap = new Set()

  /* 1. Check if the selection is inside an annotation (parent or ancestor IS the annotation) */
  let ancestor = parent
  while (ancestor && ancestor !== document.body) {
    if (ancestor.dataset && ancestor.dataset.annotationId) {
      toUnwrap.add(ancestor)
    }
    ancestor = ancestor.parentElement
  }

  /* 2. Check for annotation elements contained within or overlapping the selection */
  const searchRoot = parent.closest ? (parent.closest('section') || parent.closest('main') || parent) : parent
  const annotationEls = searchRoot.querySelectorAll
    ? searchRoot.querySelectorAll('[data-annotation-id]')
    : []

  annotationEls.forEach(el => {
    try {
      const elRange = document.createRange()
      elRange.selectNodeContents(el)
      /* Unwrap if annotation overlaps the selection in any way */
      const startsBeforeEnd = range.compareBoundaryPoints(Range.START_TO_END, elRange) <= 0
      const endsBeforeStart = range.compareBoundaryPoints(Range.END_TO_START, elRange) >= 0
      if (!(startsBeforeEnd || endsBeforeStart)) {
        /* Ranges overlap  -  not disjoint */
        toUnwrap.add(el)
      }
      /* Also catch fully contained */
      if (range.compareBoundaryPoints(Range.START_TO_START, elRange) <= 0 &&
          range.compareBoundaryPoints(Range.END_TO_END, elRange) >= 0) {
        toUnwrap.add(el)
      }
    } catch (_e) { /* ignore range errors */ }
  })

  /* 3. Unwrap all collected annotations */
  toUnwrap.forEach(el => {
    const p = el.parentNode
    if (!p) return
    while (el.firstChild) p.insertBefore(el.firstChild, el)
    p.removeChild(el)
    p.normalize()
  })
}

function restoreAnnotations(_annotations) {
  /* Annotations are applied to the DOM via surroundContents  -  on page reload
     we cannot perfectly restore them (text positions may shift). We skip
     restoration for now and rely on localStorage to track the metadata.
     The DOM annotations persist through the session since they are applied
     inline. On fresh page loads, the highlights won't be re-applied.

     For a production system, you'd store character offsets or XPath ranges.
     For this MVP, session-based inline annotations are sufficient. */
}

export default AnnotationProvider
