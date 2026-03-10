import { useState } from 'react'

export default function SectionComments({ sectionId, comments = [], onAddComment, onResolve, onAddReply, onDeleteComment }) {
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')

  const handleAddComment = () => {
    const trimmed = newComment.trim()
    if (!trimmed) return
    onAddComment?.(sectionId, trimmed)
    setNewComment('')
  }

  const handleAddReply = (commentId) => {
    const trimmed = replyText.trim()
    if (!trimmed) return
    onAddReply?.(commentId, trimmed)
    setReplyText('')
    setReplyingTo(null)
  }

  const handleCommentKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  const handleReplyKeyDown = (e, commentId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddReply(commentId)
    }
  }

  return (
    <div className="section-comments no-print my-4 bg-white border border-slate-200 rounded-xl p-4">
      <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-3">
        Comments on this section ({comments.length})
      </div>

      {comments.length === 0 && (
        <p className="text-sm text-slate-400 mb-3">No comments yet.</p>
      )}

      {comments.map((comment) => (
        <div
          key={comment.id}
          className={`p-3 rounded-lg border mb-2 transition-colors ${
            comment.status === 'resolved'
              ? 'bg-emerald-50 border-emerald-200 opacity-60'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-bold text-slate-700 text-xs">{comment.author}</span>
            <div className="flex items-center gap-2 no-print">
              <button
                onClick={() => onResolve?.(comment.id)}
                className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                {comment.status === 'resolved' ? 'Reopen' : 'Resolve'}
              </button>
              <button
                onClick={() => onDeleteComment?.(comment.id)}
                title="Delete comment"
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-slate-600 text-sm">{comment.text}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">{comment.timestamp}</span>

          {/* Replies */}
          {comment.replies?.map((reply) => (
            <div key={reply.id} className="ml-4 mt-2 pl-3 border-l-2 border-cyan-200">
              <span className="font-bold text-slate-700 text-xs">{reply.author}</span>
              <p className="text-slate-600 text-xs mt-0.5">{reply.text}</p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">{reply.timestamp}</span>
            </div>
          ))}

          {/* Reply input */}
          {replyingTo === comment.id ? (
            <div className="ml-4 mt-2 pl-3 border-l-2 border-cyan-200 no-print">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => handleReplyKeyDown(e, comment.id)}
                  placeholder="Write a reply..."
                  className="flex-1 px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  autoFocus
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="px-2 py-1.5 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Reply
                </button>
                <button
                  onClick={() => { setReplyingTo(null); setReplyText('') }}
                  className="px-2 py-1.5 text-slate-400 text-xs rounded-lg hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            comment.status !== 'resolved' && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-[10px] text-cyan-500 hover:text-cyan-600 mt-1 no-print transition-colors"
              >
                Reply
              </button>
            )
          )}
        </div>
      ))}

      {/* Add new comment */}
      <div className="flex gap-2 mt-3 no-print">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleCommentKeyDown}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="px-3 py-2 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}
