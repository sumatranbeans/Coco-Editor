import { useState, useCallback, useMemo } from 'react'

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

function truncate(text, len = 50) {
  if (!text) return ''
  // Strip HTML tags for display
  const stripped = text.replace(/<[^>]*>/g, '')
  return stripped.length > len ? stripped.slice(0, len) + '...' : stripped
}

function formatBlockId(id) {
  if (!id) return 'Unknown'
  return id
    .replace(/^(sub|eng-reg|intuit|part)-\d*-?/, '')
    .replace(/-+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim() || id
}

function scrollToBlock(blockId) {
  let el = document.getElementById(blockId)
  if (!el) {
    el = document.querySelector(`[data-block-id="${blockId}"]`)
  }
  if (!el) {
    const all = document.querySelectorAll(`[id*="${blockId}"]`)
    if (all.length > 0) el = all[0]
  }
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.style.outline = '2px solid #06b6d4'
    el.style.outlineOffset = '4px'
    el.style.borderRadius = '8px'
    setTimeout(() => {
      el.style.outline = ''
      el.style.outlineOffset = ''
    }, 2000)
  }
}

export default function CommentaryPanel({
  groupedComments,
  unresolvedCount,
  resolvedCount,
  selectedCommentId,
  onSelectComment,
  showUnresolvedOnly,
  onToggleUnresolvedOnly,
  showInlineComments,
  onToggleInlineComments,
  generalComments,
  onAddGeneralComment,
  onDeleteGeneralComment,
  onEditGeneralComment,
  isOpen,
  // Block-level data from InteractiveBlockProvider
  blockComments = {},
  // Callback to open thread for block comment
  onSelectBlockComment,
  // Callback to delete a block comment from the sidebar
  onDeleteBlockComment,
}) {
  const [collapsedDates, setCollapsedDates] = useState({})
  const [collapsedSections, setCollapsedSections] = useState({})
  const [newGeneralText, setNewGeneralText] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const toggleDate = useCallback((date) => {
    setCollapsedDates(prev => ({ ...prev, [date]: !prev[date] }))
  }, [])

  const toggleSection = useCallback((section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const handleAddGeneral = () => {
    const trimmed = newGeneralText.trim()
    if (!trimmed) return
    onAddGeneralComment(trimmed)
    setNewGeneralText('')
  }

  const handleGeneralKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddGeneral()
    }
  }

  const scrollToSection = (sectionId) => {
    if (!sectionId) return
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Flatten all block comments for display
  const flatBlockComments = useMemo(() => {
    const items = []
    Object.entries(blockComments).forEach(([blockId, commentArr]) => {
      if (!commentArr || commentArr.length === 0) return
      commentArr.forEach(comment => {
        if (showUnresolvedOnly && comment.status !== 'open') return
        items.push({ ...comment, blockId, blockLabel: formatBlockId(blockId) })
      })
    })
    // Sort: open first, then by timestamp descending
    items.sort((a, b) => {
      if (a.status === 'open' && b.status !== 'open') return -1
      if (a.status !== 'open' && b.status === 'open') return 1
      return 0
    })
    return items
  }, [blockComments, showUnresolvedOnly])

  // Compute combined counts (general + block-level)
  const blockUnresolved = useMemo(() => {
    let count = 0
    Object.values(blockComments).forEach(arr => {
      if (arr) arr.forEach(c => { if (c.status === 'open') count++ })
    })
    return count
  }, [blockComments])

  const blockResolved = useMemo(() => {
    let count = 0
    Object.values(blockComments).forEach(arr => {
      if (arr) arr.forEach(c => { if (c.status === 'resolved') count++ })
    })
    return count
  }, [blockComments])

  const totalUnresolved = unresolvedCount + blockUnresolved
  const totalResolved = resolvedCount + blockResolved

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
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            Comments
          </div>

          {/* Counts - combined general + block-level */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-[11px] font-mono border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Unresolved: {totalUnresolved}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-mono border border-emerald-200">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              Resolved: {totalResolved}
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-slate-100">
            <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={showUnresolvedOnly}
                onChange={onToggleUnresolvedOnly}
                className="w-3.5 h-3.5 rounded border-slate-300 text-amber-500 focus:ring-amber-300"
              />
              Show unresolved only
            </label>
            <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={showInlineComments}
                onChange={onToggleInlineComments}
                className="w-3.5 h-3.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-300"
              />
              Show inline comments on page
            </label>
          </div>

          {/* General Comments Section */}
          <div className="mb-4 pb-4 border-b border-slate-100">
            <div className="text-[11px] font-mono text-violet-500 uppercase tracking-wider mb-2">
              General Comments
            </div>

            {/* Add general comment input */}
            <div className="sticky top-0 z-10 bg-white pb-2">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newGeneralText}
                  onChange={(e) => setNewGeneralText(e.target.value)}
                  onKeyDown={handleGeneralKeyDown}
                  placeholder="Add a general comment..."
                  className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
                <button
                  onClick={handleAddGeneral}
                  disabled={!newGeneralText.trim()}
                  className="px-2.5 py-1.5 bg-violet-500 text-white text-xs rounded-lg hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {generalComments.filter(c => !showUnresolvedOnly || c.status === 'open').map(comment => (
              <div key={comment.id} className="group/note relative mb-1.5">
                {editingCommentId === comment.id ? (
                  <div className="p-2 rounded-lg border-l-2 border-violet-400 bg-violet-50">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          const trimmed = editingText.trim()
                          if (trimmed && onEditGeneralComment) {
                            onEditGeneralComment(comment.id, trimmed)
                          }
                          setEditingCommentId(null)
                          setEditingText('')
                        }
                        if (e.key === 'Escape') {
                          setEditingCommentId(null)
                          setEditingText('')
                        }
                      }}
                      autoFocus
                      className="w-full px-2 py-1 text-xs border border-violet-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
                    />
                    <div className="flex gap-1.5 mt-1.5">
                      <button
                        onClick={() => {
                          const trimmed = editingText.trim()
                          if (trimmed && onEditGeneralComment) {
                            onEditGeneralComment(comment.id, trimmed)
                          }
                          setEditingCommentId(null)
                          setEditingText('')
                        }}
                        className="px-2 py-0.5 bg-violet-500 text-white text-[10px] rounded hover:bg-violet-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingCommentId(null); setEditingText('') }}
                        className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] rounded hover:bg-slate-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectComment(comment.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors border-l-2 border-violet-400 ${
                      selectedCommentId === comment.id
                        ? 'bg-violet-50 border-l-violet-600'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {comment.status === 'open' ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      ) : (
                        <svg className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono flex-1">
                        {formatTime(comment.timestamp)}
                      </span>
                      {/* Edit and Delete icons */}
                      <span className="opacity-0 group-hover/note:opacity-100 transition-opacity flex items-center gap-0.5">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingCommentId(comment.id)
                            setEditingText(comment.text)
                          }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setEditingCommentId(comment.id); setEditingText(comment.text) } }}
                          className="p-0.5 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                          title="Edit comment"
                        >
                          <svg className="w-3 h-3 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onDeleteGeneralComment) onDeleteGeneralComment(comment.id)
                          }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); if (onDeleteGeneralComment) onDeleteGeneralComment(comment.id) } }}
                          className="p-0.5 rounded hover:bg-red-100 transition-colors cursor-pointer"
                          title="Delete comment"
                        >
                          <svg className="w-3 h-3 text-slate-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-snug">
                      {truncate(comment.text)}
                    </p>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Inline / Block-level Comments Section */}
          {flatBlockComments.length > 0 && (
            <div className="mb-4 pb-4 border-b border-slate-100">
              <button
                onClick={() => toggleSection('inline-comments')}
                className="w-full flex items-center gap-2 mb-2"
              >
                <svg
                  className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    collapsedSections['inline-comments'] ? '-rotate-90' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="text-[11px] font-mono text-cyan-500 uppercase tracking-wider">
                  Inline Comments
                </span>
                <span className="text-[10px] text-slate-300 font-mono ml-auto">
                  ({flatBlockComments.length})
                </span>
              </button>

              {!collapsedSections['inline-comments'] && (
                <div className="space-y-1.5 ml-1">
                  {flatBlockComments.map(comment => (
                    <div key={`block-${comment.id}`} className="group/block relative">
                      <button
                        onClick={() => {
                          scrollToBlock(comment.blockId)
                          if (onSelectBlockComment) onSelectBlockComment(comment)
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors border-l-2 ${
                          comment.status === 'open'
                            ? 'border-amber-400'
                            : 'border-emerald-400'
                        } bg-white hover:bg-slate-50`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {comment.status === 'open' ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          ) : (
                            <svg className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span className="text-[10px] font-mono text-cyan-500 truncate flex-1">
                            {comment.blockLabel}
                          </span>
                          {/* Hover delete icon */}
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (onDeleteBlockComment) onDeleteBlockComment(comment.id)
                            }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); if (onDeleteBlockComment) onDeleteBlockComment(comment.id) } }}
                            className="opacity-0 group-hover/block:opacity-100 p-0.5 rounded hover:bg-red-100 transition-all cursor-pointer flex-shrink-0"
                            title="Delete comment"
                          >
                            <svg className="w-3 h-3 text-slate-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                          <span className="text-[9px] text-slate-300 font-mono flex-shrink-0">
                            {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-snug">
                          {truncate(comment.text)}
                        </p>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Date-grouped section comments */}
          {groupedComments.length === 0 && flatBlockComments.length === 0 && generalComments.length === 0 && (
            <p className="text-xs text-slate-400 px-1 py-4">No comments yet.</p>
          )}

          {groupedComments.map(group => {
            const isCollapsed = collapsedDates[group.date]
            /* Only show section-anchored comments here (general shown above) */
            const sectionComments = group.comments.filter(c => c.sectionId)
            if (sectionComments.length === 0) return null

            return (
              <div key={group.date} className="mb-3">
                {/* Date header */}
                <button
                  onClick={() => toggleDate(group.date)}
                  className="w-full flex items-center gap-2 py-1.5 text-left group"
                >
                  <svg
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                      isCollapsed ? '-rotate-90' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors">
                    {group.date}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    ({sectionComments.length})
                  </span>
                </button>

                {/* Comment entries */}
                {!isCollapsed && (
                  <div className="ml-2 mt-1 space-y-1.5">
                    {sectionComments.map(comment => (
                      <button
                        key={comment.id}
                        onClick={() => {
                          onSelectComment(comment.id)
                          scrollToSection(comment.sectionId)
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors border-l-2 ${
                          comment.status === 'open'
                            ? 'border-amber-400'
                            : 'border-emerald-400'
                        } ${
                          selectedCommentId === comment.id
                            ? 'bg-slate-100'
                            : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {comment.status === 'open' ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          ) : (
                            <svg className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span className="text-[10px] font-mono text-cyan-500 truncate">
                            {comment.sectionLabel || comment.sectionId}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-snug">
                          {truncate(comment.text)}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}
