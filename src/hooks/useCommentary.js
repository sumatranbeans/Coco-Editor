import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { triggerSync, importAgentResponses, mergeCommentaryReplies } from '../utils/commentSync'

const STORAGE_KEY = 'coco-editor-commentary'

function loadCommentary() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : { comments: [] }
  } catch (_e) {
    return { comments: [] }
  }
}

function saveCommentary(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (_e) {
    /* storage full */
  }
}

export default function useCommentary() {
  const [data, setData] = useState(loadCommentary)
  const [selectedCommentId, setSelectedCommentId] = useState(null)
  const [showInlineComments, setShowInlineComments] = useState(true)
  const [showUnresolvedOnly, setShowUnresolvedOnly] = useState(true)

  /* Import agent responses on mount (once) */
  const importedRef = useRef(false)
  useEffect(() => {
    if (importedRef.current) return
    importedRef.current = true
    importAgentResponses().then(remote => {
      if (!remote?.commentary?.comments) return
      setData(prev => {
        const merged = mergeCommentaryReplies(prev.comments, remote.commentary.comments)
        if (!merged) return prev
        return { ...prev, comments: merged }
      })
    })
  }, [])

  /* Persist on every change */
  useEffect(() => {
    saveCommentary(data)
    triggerSync()
  }, [data])

  const addComment = useCallback((sectionId, blockId, text, sectionLabel) => {
    const comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sectionId: sectionId || null,
      blockId: blockId || null,
      sectionLabel: sectionLabel || 'General Comment',
      author: 'Reader',
      text,
      status: 'open',
      timestamp: new Date().toISOString(),
      replies: [],
    }
    setData(prev => ({
      ...prev,
      comments: [...prev.comments, comment],
    }))
    return comment.id
  }, [])

  const addReply = useCallback((commentId, text, author = 'Reader') => {
    const reply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author,
      text,
      timestamp: new Date().toISOString(),
    }
    setData(prev => ({
      ...prev,
      comments: prev.comments.map(c =>
        c.id === commentId
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      ),
    }))
  }, [])

  const toggleResolve = useCallback((commentId) => {
    setData(prev => ({
      ...prev,
      comments: prev.comments.map(c =>
        c.id === commentId
          ? { ...c, status: c.status === 'open' ? 'resolved' : 'open' }
          : c
      ),
    }))
  }, [])

  const selectedComment = useMemo(() => {
    if (!selectedCommentId) return null
    return data.comments.find(c => c.id === selectedCommentId) || null
  }, [data.comments, selectedCommentId])

  const groupedComments = useMemo(() => {
    let filtered = data.comments
    if (showUnresolvedOnly) {
      filtered = filtered.filter(c => c.status === 'open')
    }
    const groups = {}
    filtered.forEach(comment => {
      const date = new Date(comment.timestamp).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
      if (!groups[date]) groups[date] = []
      groups[date].push(comment)
    })
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => {
        if (a.status === 'open' && b.status === 'resolved') return -1
        if (a.status === 'resolved' && b.status === 'open') return 1
        return new Date(b.timestamp) - new Date(a.timestamp)
      })
    })
    const sortedDates = Object.keys(groups).sort((a, b) => new Date(b) - new Date(a))
    return sortedDates.map(date => ({ date, comments: groups[date] }))
  }, [data.comments, showUnresolvedOnly])

  const unresolvedCount = useMemo(
    () => data.comments.filter(c => c.status === 'open').length,
    [data.comments]
  )
  const resolvedCount = useMemo(
    () => data.comments.filter(c => c.status === 'resolved').length,
    [data.comments]
  )

  const getCommentsForSection = useCallback((sectionId) => {
    return data.comments.filter(c => c.sectionId === sectionId)
  }, [data.comments])

  const deleteComment = useCallback((commentId) => {
    setData(prev => ({
      ...prev,
      comments: prev.comments.filter(c => c.id !== commentId),
    }))
  }, [])

  const editComment = useCallback((commentId, newText) => {
    setData(prev => ({
      ...prev,
      comments: prev.comments.map(c =>
        c.id === commentId ? { ...c, text: newText } : c
      ),
    }))
  }, [])

  const generalComments = useMemo(
    () => data.comments.filter(c => !c.sectionId),
    [data.comments]
  )

  const importLegacyComments = useCallback((oldComments, sections) => {
    if (!oldComments || Object.keys(oldComments).length === 0) return
    setData(prev => {
      const existingIds = new Set(prev.comments.map(c => c.id))
      const newComments = []
      Object.entries(oldComments).forEach(([sectionId, arr]) => {
        const section = sections.find(s => s.id === sectionId)
        arr.forEach(c => {
          const commentId = `legacy-${c.id}`
          if (existingIds.has(commentId)) return
          newComments.push({
            id: commentId,
            sectionId,
            blockId: null,
            sectionLabel: section ? `${section.num} ${section.title}` : sectionId,
            author: c.author || 'Reader',
            text: c.text,
            status: c.status || 'open',
            timestamp: c.timestamp ? new Date(c.timestamp).toISOString() : new Date().toISOString(),
            replies: (c.replies || []).map(r => ({
              id: `legacy-reply-${r.id}`,
              author: r.author || 'Reader',
              text: r.text,
              timestamp: r.timestamp ? new Date(r.timestamp).toISOString() : new Date().toISOString(),
            })),
          })
        })
      })
      if (newComments.length === 0) return prev
      return { ...prev, comments: [...prev.comments, ...newComments] }
    })
  }, [])

  return {
    comments: data.comments,
    groupedComments,
    selectedComment,
    selectedCommentId,
    setSelectedCommentId,
    addComment,
    addReply,
    toggleResolve,
    deleteComment,
    editComment,
    unresolvedCount,
    resolvedCount,
    showInlineComments,
    setShowInlineComments,
    showUnresolvedOnly,
    setShowUnresolvedOnly,
    getCommentsForSection,
    generalComments,
    importLegacyComments,
  }
}
