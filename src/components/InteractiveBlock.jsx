import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import SectionComments from './SectionComments'
import InlineNote, { NoteEditor } from './InlineNote'
import { triggerSync, importAgentResponses, mergeBlockCommentReplies } from '../utils/commentSync'

/* ────────────────────────────────────────────
   InteractiveBlockContext  -  State management
   for block-level comments, notes, and stars.
   Keyed by block ID for arbitrary nesting.
   ──────────────────────────────────────────── */

const InteractiveBlockContext = createContext(null)

const STORAGE_KEY_STARS = 'coco-editor-block-stars'
const STORAGE_KEY_COMMENTS = 'coco-editor-block-comments'
const STORAGE_KEY_NOTES = 'coco-editor-block-notes'

function loadFromStorage(key) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : {}
  } catch (_e) {
    return {}
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (_e) {
    /* storage full  -  silently ignore */
  }
}

export function InteractiveBlockProvider({ children, hideInlineOnPage = false }) {
  const [blockStars, setBlockStars] = useState(() => loadFromStorage(STORAGE_KEY_STARS))
  const [blockComments, setBlockComments] = useState(() => loadFromStorage(STORAGE_KEY_COMMENTS))
  const [blockNotes, setBlockNotes] = useState(() => loadFromStorage(STORAGE_KEY_NOTES))
  const [showBlockComments, setShowBlockComments] = useState(null)
  const [addingBlockNote, setAddingBlockNote] = useState(null)

  /* Import agent responses on mount (once) */
  const importedRef = useRef(false)
  useEffect(() => {
    if (importedRef.current) return
    importedRef.current = true
    importAgentResponses().then(remote => {
      if (!remote?.blockComments) return
      setBlockComments(prev => {
        const merged = mergeBlockCommentReplies(prev, remote.blockComments)
        return merged || prev
      })
    })
  }, [])

  /* Persist to localStorage */
  useEffect(() => { saveToStorage(STORAGE_KEY_STARS, blockStars); triggerSync() }, [blockStars])
  useEffect(() => { saveToStorage(STORAGE_KEY_COMMENTS, blockComments); triggerSync() }, [blockComments])
  useEffect(() => { saveToStorage(STORAGE_KEY_NOTES, blockNotes); triggerSync() }, [blockNotes])

  const toggleBlockStar = useCallback((id) => {
    setBlockStars(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const toggleBlockComments = useCallback((id) => {
    setShowBlockComments(prev => prev === id ? null : id)
  }, [])

  const addBlockComment = useCallback((blockId, text) => {
    setBlockComments(prev => ({
      ...prev,
      [blockId]: [...(prev[blockId] || []), {
        id: Date.now(), blockId, author: 'Waqas', text,
        status: 'open', timestamp: new Date().toLocaleString(), replies: [],
      }]
    }))
  }, [])

  const resolveBlockComment = useCallback((commentId) => {
    setBlockComments(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.map(c => c.id === commentId
          ? { ...c, status: c.status === 'open' ? 'resolved' : 'open' } : c)
      })
      return next
    })
  }, [])

  const addBlockReply = useCallback((commentId, text) => {
    setBlockComments(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.map(c => c.id === commentId ? {
          ...c,
          replies: [...(c.replies || []), {
            id: Date.now(), author: 'Waqas', text,
            timestamp: new Date().toLocaleString(),
          }]
        } : c)
      })
      return next
    })
  }, [])

  const deleteBlockComment = useCallback((commentId) => {
    setBlockComments(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.filter(c => c.id !== commentId)
      })
      return next
    })
  }, [])

  const updateBlockComment = useCallback((commentId, newText) => {
    setBlockComments(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.map(c => c.id === commentId ? { ...c, text: newText } : c)
      })
      return next
    })
  }, [])

  const startBlockNote = useCallback((id) => {
    setAddingBlockNote(prev => prev === id ? null : id)
  }, [])

  const saveBlockNote = useCallback((blockId, htmlText) => {
    setBlockNotes(prev => ({
      ...prev,
      [blockId]: [...(prev[blockId] || []), {
        id: Date.now(), blockId, text: htmlText,
        timestamp: new Date().toLocaleString(), color: 'amber',
      }]
    }))
    setAddingBlockNote(null)
  }, [])

  const deleteBlockNote = useCallback((noteId) => {
    setBlockNotes(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.filter(n => n.id !== noteId)
      })
      return next
    })
  }, [])

  const updateBlockNote = useCallback((noteId, htmlText) => {
    setBlockNotes(prev => {
      const next = {}
      Object.entries(prev).forEach(([key, arr]) => {
        next[key] = arr.map(n => n.id === noteId ? { ...n, text: htmlText } : n)
      })
      return next
    })
  }, [])

  const value = useMemo(() => ({
    blockStars,
    blockComments,
    blockNotes,
    showBlockComments,
    addingBlockNote,
    hideInlineOnPage,
    toggleBlockStar,
    toggleBlockComments,
    addBlockComment,
    resolveBlockComment,
    addBlockReply,
    deleteBlockComment,
    updateBlockComment,
    startBlockNote,
    saveBlockNote,
    deleteBlockNote,
    updateBlockNote,
  }), [
    blockStars, blockComments, blockNotes, showBlockComments, addingBlockNote,
    hideInlineOnPage,
    toggleBlockStar, toggleBlockComments, addBlockComment, resolveBlockComment,
    addBlockReply, deleteBlockComment, updateBlockComment, startBlockNote, saveBlockNote,
    deleteBlockNote, updateBlockNote,
  ])

  return (
    <InteractiveBlockContext.Provider value={value}>
      {children}
    </InteractiveBlockContext.Provider>
  )
}

export function useInteractiveBlock() {
  return useContext(InteractiveBlockContext)
}

/* ────────────────────────────────────────────
   BlockActionIcons  -  Compact hover icons
   (star, comment, note) for subsection-level
   interactivity. Smaller than section-level.
   ──────────────────────────────────────────── */

function BlockActionIcons({ id, ctx }) {
  const starred = ctx.blockStars[id]
  const commentCount = (ctx.blockComments[id] || []).length
  const noteCount = (ctx.blockNotes[id] || []).length

  return (
    <div className="no-print flex items-center gap-0.5 opacity-0 group-hover/iblock:opacity-100 transition-opacity duration-150">
      {/* Star */}
      <button
        onClick={(e) => { e.stopPropagation(); ctx.toggleBlockStar(id) }}
        title="Star this block"
        className="p-0.5 rounded hover:bg-slate-100 transition-colors"
      >
        <svg
          className={`w-3.5 h-3.5 ${starred ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
          viewBox="0 0 20 20"
          fill={starred ? 'currentColor' : 'none'}
          stroke="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>

      {/* Comment toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); ctx.toggleBlockComments(id) }}
        title="Comments"
        className="relative p-0.5 rounded hover:bg-slate-100 transition-colors"
      >
        <svg
          className="w-3.5 h-3.5 text-slate-300 hover:text-cyan-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
        {commentCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-500 text-white text-[8px] rounded-full flex items-center justify-center">
            {commentCount}
          </span>
        )}
      </button>

      {/* Add note */}
      <button
        onClick={(e) => { e.stopPropagation(); ctx.startBlockNote(id) }}
        title="Add note"
        className="relative p-0.5 rounded hover:bg-slate-100 transition-colors"
      >
        <svg
          className="w-3.5 h-3.5 text-slate-300 hover:text-amber-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        {noteCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 text-white text-[8px] rounded-full flex items-center justify-center">
            {noteCount}
          </span>
        )}
      </button>
    </div>
  )
}

/* ────────────────────────────────────────────
   BlockInteractiveContent  -  Renders the
   note editor, inline notes, and comment
   thread for a block (shown below block content).
   ──────────────────────────────────────────── */

function BlockInteractiveContent({ id, ctx }) {
  const isAddingNote = ctx.addingBlockNote === id
  const blockNotes = ctx.blockNotes[id] || []
  const showComments = ctx.showBlockComments === id
  const blockCommentsList = ctx.blockComments[id] || []
  const commentsRef = useRef(null)
  const hideOnPage = ctx.hideInlineOnPage

  useEffect(() => {
    if (showComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [showComments])

  // When hideInlineOnPage is active, hide block comments/notes from the page
  // (they remain visible in the sidebar)
  if (hideOnPage) return null

  if (!isAddingNote && blockNotes.length === 0 && !showComments) return null

  return (
    <div className="mt-2">
      {/* Note editor */}
      {isAddingNote && (
        <NoteEditor
          onSave={(html) => ctx.saveBlockNote(id, html)}
          onCancel={() => ctx.startBlockNote(id)}
        />
      )}

      {/* Inline notes */}
      {blockNotes.map((note) => (
        <InlineNote
          key={note.id}
          note={note}
          onDelete={ctx.deleteBlockNote}
          onUpdate={ctx.updateBlockNote}
        />
      ))}

      {/* Comment thread */}
      {showComments && (
        <div ref={commentsRef}>
          <SectionComments
            sectionId={id}
            comments={blockCommentsList}
            onAddComment={ctx.addBlockComment}
            onResolve={ctx.resolveBlockComment}
            onAddReply={ctx.addBlockReply}
            onDeleteComment={ctx.deleteBlockComment}
          />
        </div>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────
   InteractiveBlock  -  Generic wrapper that adds
   hover-visible star/comment/note icons to any
   content block. Used by SubSection,
   EngineeringRegister, IntuitionLayer.
   ──────────────────────────────────────────── */

export default function InteractiveBlock({ id, children }) {
  const ctx = useInteractiveBlock()

  /* If provider is not mounted, render without interactivity */
  if (!ctx) return children

  return (
    <div id={id} data-block-id={id} className="group/iblock relative">
      {/* Hover icons  -  positioned top-right */}
      <div className="absolute top-1 right-1 z-10">
        <BlockActionIcons id={id} ctx={ctx} />
      </div>

      {/* Block content */}
      {children}

      {/* Interactive content below (notes, comments) */}
      <BlockInteractiveContent id={id} ctx={ctx} />
    </div>
  )
}
