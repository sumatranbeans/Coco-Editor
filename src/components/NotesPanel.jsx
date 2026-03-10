import { useMemo } from 'react'

function formatBlockId(id) {
  if (!id) return 'Unknown'
  return id
    .replace(/^(sub|eng-reg|intuit|part|diag)-\d*-?/, '')
    .replace(/-+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim() || id
}

function scrollToBlock(blockId) {
  let el = document.getElementById(blockId)
  if (!el) el = document.querySelector(`[data-block-id="${blockId}"]`)
  if (!el) {
    const all = document.querySelectorAll(`[id*="${blockId}"]`)
    if (all.length > 0) el = all[0]
  }
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.style.outline = '2px solid #f59e0b'
    el.style.outlineOffset = '4px'
    el.style.borderRadius = '8px'
    setTimeout(() => {
      el.style.outline = ''
      el.style.outlineOffset = ''
    }, 2000)
  }
}

function formatTime(isoString) {
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

function truncate(text, len = 60) {
  if (!text) return ''
  const stripped = text.replace(/<[^>]*>/g, '')
  return stripped.length > len ? stripped.slice(0, len) + '...' : stripped
}

export default function NotesPanel({
  isOpen,
  blockNotes = {},
  onSelectNote,
}) {
  // Flatten all notes, attach blockId and label, sort by timestamp descending
  const allNotes = useMemo(() => {
    const items = []
    Object.entries(blockNotes).forEach(([blockId, notes]) => {
      if (!Array.isArray(notes)) return
      const label = formatBlockId(blockId)
      notes.forEach(note => {
        items.push({ ...note, blockId, blockLabel: label })
      })
    })
    items.sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0
      return tb - ta
    })
    return items
  }, [blockNotes])

  // Group notes by block for display
  const groupedByBlock = useMemo(() => {
    const groups = {}
    allNotes.forEach(note => {
      if (!groups[note.blockId]) {
        groups[note.blockId] = { label: note.blockLabel, notes: [] }
      }
      groups[note.blockId].notes.push(note)
    })
    return groups
  }, [allNotes])

  const totalCount = allNotes.length

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="no-print fixed inset-0 bg-black/20 z-[140] md:hidden" />
      )}

      <aside
        className={`no-print fixed left-0 top-[52px] bottom-0 z-[150]
          bg-white border-r border-slate-200 overflow-y-auto transition-all duration-300
          ${isOpen ? 'w-72' : 'w-0 -translate-x-full'}`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Notes
            </div>
            <span className="ml-auto text-[10px] font-mono text-slate-400">
              {totalCount} note{totalCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Empty state */}
          {totalCount === 0 && (
            <div className="text-center py-8">
              <svg className="w-8 h-8 text-slate-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p className="text-xs text-slate-400">No notes yet.</p>
              <p className="text-[10px] text-slate-300 mt-1">Add notes to blocks using the note icon.</p>
            </div>
          )}

          {/* Notes grouped by block */}
          {Object.entries(groupedByBlock).map(([blockId, group]) => (
            <div key={blockId} className="mb-4">
              <div className="text-[11px] font-mono text-amber-500 uppercase tracking-wider mb-2">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.notes.map(note => (
                  <button
                    key={note.id}
                    onClick={() => {
                      scrollToBlock(blockId)
                      if (onSelectNote) {
                        onSelectNote(note, group.label)
                      }
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-amber-50 transition-colors border-l-2 border-amber-300 flex flex-col gap-1"
                  >
                    <span className="text-xs text-slate-700 leading-tight line-clamp-2">
                      {truncate(note.text)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatTime(note.timestamp)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
