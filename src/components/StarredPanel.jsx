import { useMemo } from 'react'

function formatBlockId(id) {
  if (!id) return 'Unknown'
  // Convert IDs like "part-1-the-vision" or "sub-my-block" into readable labels
  return id
    .replace(/^(sub|eng-reg|intuit|part)-\d*-?/, '')
    .replace(/-+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim() || id
}

function scrollToBlock(blockId) {
  // Try direct ID match first
  let el = document.getElementById(blockId)
  if (!el) {
    // Try finding an InteractiveBlock wrapper with a matching data attribute or child
    el = document.querySelector(`[data-block-id="${blockId}"]`)
  }
  if (!el) {
    // Try a partial match - find any element whose id contains the blockId
    const all = document.querySelectorAll(`[id*="${blockId}"]`)
    if (all.length > 0) el = all[0]
  }
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Briefly highlight the block
    el.style.outline = '2px solid #fbbf24'
    el.style.outlineOffset = '4px'
    el.style.borderRadius = '8px'
    setTimeout(() => {
      el.style.outline = ''
      el.style.outlineOffset = ''
    }, 2000)
  }
}

export default function StarredPanel({
  isOpen,
  blockStars = {},
  blockNotes = {},
  blockComments = {},
}) {
  // Gather all starred blocks
  const starredBlocks = useMemo(() => {
    const items = []
    Object.entries(blockStars).forEach(([blockId, isStarred]) => {
      if (!isStarred) return
      const noteCount = (blockNotes[blockId] || []).length
      const commentCount = (blockComments[blockId] || []).length
      items.push({ id: blockId, label: formatBlockId(blockId), noteCount, commentCount, type: 'block' })
    })
    return items
  }, [blockStars, blockNotes, blockComments])

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
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Starred Items
            </div>
            <span className="ml-auto text-[10px] font-mono text-slate-400">
              {starredBlocks.length} item{starredBlocks.length !== 1 ? 's' : ''}
            </span>
          </div>

          {starredBlocks.length === 0 && (
            <div className="text-center py-8">
              <svg className="w-8 h-8 text-slate-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-xs text-slate-400">No starred items yet.</p>
              <p className="text-[10px] text-slate-300 mt-1">Star blocks to see them here.</p>
            </div>
          )}

          {/* Starred blocks */}
          {starredBlocks.length > 0 && (
            <div className="mb-4">
              <div className="text-[11px] font-mono text-violet-500 uppercase tracking-wider mb-2">
                Blocks
              </div>
              <div className="space-y-1">
                {starredBlocks.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToBlock(item.id)}
                    className="w-full text-left p-2 rounded-lg hover:bg-amber-50 transition-colors border-l-2 border-violet-300 flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-slate-700 leading-tight truncate block">{item.label}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        {item.commentCount > 0 && (
                          <span className="text-[10px] text-slate-400 font-mono">{item.commentCount} comment{item.commentCount !== 1 ? 's' : ''}</span>
                        )}
                        {item.noteCount > 0 && (
                          <span className="text-[10px] text-slate-400 font-mono">{item.noteCount} note{item.noteCount !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
