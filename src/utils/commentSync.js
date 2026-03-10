let syncTimer = null
let lastSyncHash = ''

function computeHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return String(hash)
}

export function triggerSync() {
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(() => {
    try {
      const data = {
        exportedAt: new Date().toISOString(),
        commentary: JSON.parse(localStorage.getItem('coco-editor-commentary') || '{"comments":[]}'),
        blockComments: JSON.parse(localStorage.getItem('coco-editor-block-comments') || '{}'),
        blockNotes: JSON.parse(localStorage.getItem('coco-editor-block-notes') || '{}'),
        blockStars: JSON.parse(localStorage.getItem('coco-editor-block-stars') || '{}'),
        annotations: JSON.parse(localStorage.getItem('coco-editor-annotations') || '[]'),
        sectionStars: JSON.parse(localStorage.getItem('coco-editor-stars') || '{}'),
        sectionNotes: JSON.parse(localStorage.getItem('coco-editor-notes') || '{}'),
        sectionComments: JSON.parse(localStorage.getItem('coco-editor-comments') || '{}'),
      }
      const body = JSON.stringify(data, null, 2)
      const hash = computeHash(body)
      if (hash === lastSyncHash) return
      lastSyncHash = hash

      fetch('/api/sync-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }).catch(() => {
        /* Server not available - silently ignore */
      })
    } catch (_e) {
      /* Parse error - silently ignore */
    }
  }, 1500)
}

/* Import: Fetch agent responses from the JSON file.
   Additive only - never deletes user data. */
export async function importAgentResponses() {
  try {
    const res = await fetch('/api/sync-comments')
    if (!res.ok) return null
    const data = await res.json()
    if (!data || !data.exportedAt) return null
    return data
  } catch (_e) {
    return null
  }
}

/* Merge agent replies into commentary comments array.
   PRINCIPLE: Only the user resolves comments. Agents add replies only. */
export function mergeCommentaryReplies(localComments, remoteComments) {
  if (!remoteComments || remoteComments.length === 0) return null
  let changed = false
  const merged = localComments.map(local => {
    const remote = remoteComments.find(r => r.id === local.id)
    if (!remote) return local
    const localReplyIds = new Set((local.replies || []).map(r => r.id))
    const newReplies = (remote.replies || []).filter(r => !localReplyIds.has(r.id))
    if (newReplies.length === 0) return local
    changed = true
    return {
      ...local,
      replies: [...(local.replies || []), ...newReplies],
      /* Never import status changes - only the user resolves */
    }
  })
  return changed ? merged : null
}

/* Merge agent replies into block comments (keyed by blockId). */
export function mergeBlockCommentReplies(localBlocks, remoteBlocks) {
  if (!remoteBlocks || Object.keys(remoteBlocks).length === 0) return null
  let changed = false
  const merged = {}

  Object.keys(localBlocks).forEach(blockId => {
    const localArr = localBlocks[blockId] || []
    const remoteArr = remoteBlocks[blockId] || []
    if (remoteArr.length === 0) {
      merged[blockId] = localArr
      return
    }
    merged[blockId] = localArr.map(local => {
      const remote = remoteArr.find(r => r.id === local.id)
      if (!remote) return local
      const localReplyIds = new Set((local.replies || []).map(r => r.id))
      const newReplies = (remote.replies || []).filter(r => !localReplyIds.has(r.id))
      if (newReplies.length === 0) return local
      changed = true
      return {
        ...local,
        replies: [...(local.replies || []), ...newReplies],
      }
    })
  })

  Object.keys(remoteBlocks).forEach(blockId => {
    if (!localBlocks[blockId]) {
      const remoteArr = remoteBlocks[blockId]
      if (remoteArr && remoteArr.length > 0) {
        changed = true
        merged[blockId] = remoteArr
      }
    }
  })

  return changed ? merged : null
}
