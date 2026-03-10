import { useState } from 'react'

function formatTimestamp(isoString) {
  try {
    const d = new Date(isoString)
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch (_e) {
    return isoString
  }
}

export default function NoteThread({
  note,
  blockLabel,
  onClose,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')

  if (!note) return null

  const handleEdit = () => {
    setEditText(note.text || '')
    setIsEditing(true)
  }

  const handleSave = () => {
    const trimmed = editText.trim()
    if (!trimmed) return
    if (onUpdate) onUpdate(note.id, trimmed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText('')
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (onDelete) onDelete(note.id)
  }

  return (
    <aside
      className="no-print fixed right-0 top-[52px] bottom-0 z-[150] w-80
        bg-white border-l border-slate-200 shadow-lg overflow-y-auto
        animate-slide-in-right"
    >
      <div className="p-4">
        {/* Header with close button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Block Note
            </div>
            <div className="text-sm font-bold text-amber-700 leading-tight">
              {blockLabel || 'Unknown Block'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 ml-2"
            title="Close note"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Timestamp */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono bg-amber-50 text-amber-700 border border-amber-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTimestamp(note.timestamp)}
          </span>
        </div>

        {/* Note content */}
        <div className="border-t border-slate-100 pt-4">
          <div className="p-3 rounded-lg border-l-2 border-amber-400 bg-amber-50/30 mb-4">
            {isEditing ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none bg-white"
                autoFocus
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {note.text}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!editText.trim()}
                  className="px-3 py-1.5 bg-amber-500 text-white text-xs font-mono rounded-lg hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={handleEdit}
                  className="px-3 py-1.5 bg-amber-500 text-white text-xs font-mono rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
