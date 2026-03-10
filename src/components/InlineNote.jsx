import { useRef, useCallback } from 'react'

/* ───────────────────────────────────────────
   InlineNote  -  Yellow sticky-note card
   ─────────────────────────────────────────── */

export default function InlineNote({ note, onDelete, onUpdate: _onUpdate }) {
  return (
    <div className="my-4 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm print:bg-yellow-50 print:border-yellow-300">
      <div className="flex items-start gap-2 mb-2">
        <svg
          className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" />
        </svg>
        <div className="text-xs font-mono text-amber-600 uppercase tracking-wider">Note</div>
        <span className="text-[10px] text-amber-400 ml-auto">{note.timestamp}</span>
        <button
          onClick={() => onDelete?.(note.id)}
          className="text-amber-300 hover:text-red-400 transition-colors no-print ml-1"
          title="Delete note"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: note.text }}
      />
    </div>
  )
}

/* ───────────────────────────────────────────
   NoteEditor  -  Rich text editor for creating
   / editing notes with formatting toolbar
   ─────────────────────────────────────────── */

export function NoteEditor({ onSave, onCancel }) {
  const editorRef = useRef(null)

  const execCommand = useCallback((command) => {
    document.execCommand(command, false, null)
    editorRef.current?.focus()
  }, [])

  const handleSave = () => {
    const html = editorRef.current?.innerHTML?.trim()
    if (!html || html === '<br>') return
    onSave?.(html)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel?.()
    }
  }

  return (
    <div className="my-4 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm no-print">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="w-4 h-4 text-amber-500 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" />
        </svg>
        <div className="text-xs font-mono text-amber-600 uppercase tracking-wider">New Note</div>
      </div>

      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg mb-2">
        <button
          onClick={() => execCommand('bold')}
          className="p-1.5 rounded hover:bg-slate-100 transition-colors"
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold text-xs text-slate-600">B</span>
        </button>
        <button
          onClick={() => execCommand('underline')}
          className="p-1.5 rounded hover:bg-slate-100 transition-colors"
          title="Underline (Ctrl+U)"
        >
          <span className="underline text-xs text-slate-600">U</span>
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <button
          onClick={() => execCommand('insertUnorderedList')}
          className="p-1.5 rounded hover:bg-slate-100 transition-colors text-sm text-slate-600"
          title="Bullet list"
        >
          &bull;
        </button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        onKeyDown={handleKeyDown}
        className="min-h-[60px] p-3 border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
        data-placeholder="Write your note..."
        suppressContentEditableWarning
      />

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-amber-400">
          Ctrl+Enter to save &middot; Esc to cancel
        </span>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-xs bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  )
}
