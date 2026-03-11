import { useState } from 'react'

function formatTimestamp(isoString) {
  try {
    const d = new Date(isoString)
    return d.toLocaleString('en-US', {
      year: 'numeric',
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

function AuthorBadge({ author }) {
  const isUser = author === 'Reader'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
        isUser
          ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
          : 'bg-slate-100 text-slate-600 border border-slate-200'
      }`}
    >
      {author}
    </span>
  )
}

export default function CommentaryThread({
  comment,
  onClose,
  onAddReply,
  onToggleResolve,
  onDelete,
  onEdit,
}) {
  const [replyText, setReplyText] = useState('')
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState('')

  if (!comment) return null

  const handleSubmitReply = () => {
    const trimmed = replyText.trim()
    if (!trimmed) return
    onAddReply(comment.id, trimmed)
    setReplyText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitReply()
    }
  }

  const isGeneral = !comment.sectionId && !comment.blockId
  const isInline = !!comment.blockId
  const isResolved = comment.status === 'resolved'

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
            <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${
              isInline ? 'text-cyan-500' : isGeneral ? 'text-violet-500' : 'text-slate-400'
            }`}>
              {isInline ? 'Inline Comment' : isGeneral ? 'General Comment' : 'Section Comment'}
            </div>
            <div className={`text-sm font-bold leading-tight ${
              isInline ? 'text-cyan-700' : isGeneral ? 'text-violet-700' : 'text-slate-800'
            }`}>
              {isInline ? (comment.blockLabel || comment.blockId) : (comment.sectionLabel || 'General Comment')}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 ml-2"
            title="Close thread"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono ${
              isResolved
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isResolved ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
            {isResolved ? 'Resolved' : 'Open'}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-4">
          {/* Original comment */}
          <div className={`p-3 rounded-lg border-l-2 mb-3 ${
            isInline
              ? 'border-cyan-400 bg-cyan-50/30'
              : isGeneral
                ? 'border-violet-400 bg-violet-50/50'
                : comment.status === 'open'
                  ? 'border-amber-400 bg-amber-50/30'
                  : 'border-emerald-400 bg-emerald-50/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <AuthorBadge author={comment.author} />
              <span className="text-[10px] text-slate-400 font-mono">
                {formatTimestamp(comment.timestamp)}
              </span>
              {onEdit && !editing && (
                <button
                  onClick={() => { setEditing(true); setEditText(comment.text) }}
                  className="ml-auto p-1 rounded hover:bg-slate-200 transition-colors"
                  title="Edit comment"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
            {editing ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  autoFocus
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
                />
                <div className="flex gap-1.5 mt-1.5">
                  <button
                    onClick={() => {
                      const trimmed = editText.trim()
                      if (trimmed && onEdit) {
                        onEdit(comment.id, trimmed)
                      }
                      setEditing(false)
                      setEditText('')
                    }}
                    className="px-2.5 py-1 bg-cyan-500 text-white text-xs font-mono rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setEditing(false); setEditText('') }}
                    className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-mono rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {comment.text}
              </p>
            )}
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-2 mb-4">
              {comment.replies.map(reply => (
                <div
                  key={reply.id}
                  className="ml-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AuthorBadge author={reply.author} />
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatTimestamp(reply.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {reply.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Reply input */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="mb-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Add reply
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a reply..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() => onToggleResolve(comment.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isResolved
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {isResolved ? 'Reopen' : 'Resolve'}
              </button>
              <button
                onClick={() => onDelete && onDelete(comment.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all"
              >
                Delete
              </button>
              <button
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
                className="px-3 py-1.5 bg-cyan-500 text-white text-xs font-mono rounded-lg hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
