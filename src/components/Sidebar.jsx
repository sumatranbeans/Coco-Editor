import { useState } from 'react'

export default function Sidebar({ isOpen, onClose }) {
  const [tab, setTab] = useState('comments')
  const [comments, setComments] = useState([])
  const [notes, setNotes] = useState([])
  const [newComment, setNewComment] = useState('')
  const [newNote, setNewNote] = useState('')

  const addComment = () => {
    if (!newComment.trim()) return
    setComments(prev => [...prev, {
      id: Date.now(), text: newComment, author: 'Waqas',
      timestamp: new Date().toLocaleString(), status: 'open', replies: [],
    }])
    setNewComment('')
  }

  const addNote = () => {
    if (!newNote.trim()) return
    setNotes(prev => [...prev, {
      id: Date.now(), text: newNote, color: 'amber',
      pinned: false, timestamp: new Date().toLocaleString(),
    }])
    setNewNote('')
  }

  const resolveComment = (id) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'open' ? 'resolved' : 'open' } : c))
  }

  const togglePin = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
  }

  if (!isOpen) return null

  return (
    <div className="no-print fixed right-0 top-[52px] bottom-0 w-80 bg-white border-l border-slate-200 shadow-xl z-[150] flex flex-col">
      <div className="flex border-b border-slate-200">
        <button onClick={() => setTab('comments')} className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider ${tab === 'comments' ? 'text-cyan-600 border-b-2 border-cyan-500 bg-cyan-50/50' : 'text-slate-400'}`}>
          Comments {comments.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-[10px]">{comments.length}</span>}
        </button>
        <button onClick={() => setTab('notes')} className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider ${tab === 'notes' ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50' : 'text-slate-400'}`}>
          Notes {notes.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px]">{notes.length}</span>}
        </button>
        <button onClick={onClose} className="px-3 text-slate-400 hover:text-slate-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tab === 'comments' && (
          <>
            {comments.map(c => (
              <div key={c.id} className={`p-3 rounded-lg border text-sm ${c.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-700 text-xs">{c.author}</span>
                  <button onClick={() => resolveComment(c.id)} className="text-[10px] text-slate-400 hover:text-emerald-600">
                    {c.status === 'resolved' ? 'Reopen' : 'Resolve'}
                  </button>
                </div>
                <p className="text-slate-600 text-xs">{c.text}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{c.timestamp}</span>
              </div>
            ))}
            {comments.length === 0 && <p className="text-xs text-slate-400 text-center py-8">No comments yet</p>}
          </>
        )}
        {tab === 'notes' && (
          <>
            {notes.map(n => (
              <div key={n.id} className={`p-3 rounded-lg border text-sm ${n.pinned ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-200' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-start mb-1">
                  <button onClick={() => togglePin(n.id)} className="text-[10px] text-slate-400 hover:text-amber-600">
                    {n.pinned ? '📌 Pinned' : 'Pin'}
                  </button>
                </div>
                <p className="text-slate-600 text-xs">{n.text}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
              </div>
            ))}
            {notes.length === 0 && <p className="text-xs text-slate-400 text-center py-8">No notes yet</p>}
          </>
        )}
      </div>

      <div className="border-t border-slate-200 p-3">
        {tab === 'comments' ? (
          <div className="flex gap-2">
            <input value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComment()} placeholder="Add a comment..." className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            <button onClick={addComment} className="px-3 py-2 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-600">Add</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input value={newNote} onChange={e => setNewNote(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNote()} placeholder="Add a note..." className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
            <button onClick={addNote} className="px-3 py-2 bg-amber-500 text-white text-xs rounded-lg hover:bg-amber-600">Add</button>
          </div>
        )}
      </div>
    </div>
  )
}
