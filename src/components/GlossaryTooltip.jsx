import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { glossary } from '../data/glossary'

/* ────────────────────────────────────────────
   Sorted terms  -  longest first to prevent
   partial matches (e.g. "E2B" inside "E2B on Jetson")
   ──────────────────────────────────────────── */
const sortedTerms = Object.keys(glossary).sort((a, b) => b.length - a.length)

/**
 * Build a regex that matches any glossary term at word boundaries.
 * Uses alternation with longest-first ordering.
 */
function buildTermRegex(terms) {
  const escaped = terms.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  // Word boundaries prevent false matches inside longer words
  // e.g. "PLE" inside "samPLEd", "E2B" inside "RE2BUILD", "INT4" inside "PRINT4"
  return new RegExp(`\\b(?:${escaped.join('|')})\\b`, 'g')
}

const termRegex = buildTermRegex(sortedTerms)

/* ────────────────────────────────────────────
   Tooltip Portal  -  the floating definition card
   ──────────────────────────────────────────── */
function Tooltip({ term, anchorRect, onClose }) {
  const tipRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!anchorRect || !tipRef.current) return

    const tip = tipRef.current
    const tipRect = tip.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Default: centered below the term
    let left = anchorRect.left + anchorRect.width / 2
    let top = anchorRect.bottom + 8

    // Clamp horizontally
    const halfTip = tipRect.width / 2
    if (left - halfTip < 12) left = halfTip + 12
    if (left + halfTip > viewportWidth - 12) left = viewportWidth - halfTip - 12

    // If tooltip goes below viewport, show above instead
    if (top + tipRect.height > viewportHeight - 12) {
      top = anchorRect.top - tipRect.height - 8
    }

    setPosition({ top, left })
  }, [anchorRect])

  if (!term || !glossary[term]) return null

  return (
    <div
      ref={tipRef}
      className="fixed z-[210] w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4 transition-opacity duration-150"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
      }}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      {/* Arrow */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45"
        aria-hidden
      />

      <div className="font-bold text-slate-800 text-sm mb-2">{term}</div>

      <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
        Technical
      </div>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        {glossary[term].technical}
      </p>

      <div className="text-xs text-cyan-500 font-mono uppercase tracking-wider mb-1">
        In Plain English
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {glossary[term].plain}
      </p>
    </div>
  )
}

/* ────────────────────────────────────────────
   GlossaryTerm  -  wraps a single known term
   ──────────────────────────────────────────── */
export function GlossaryTerm({ term, children }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [anchorRect, setAnchorRect] = useState(null)
  const spanRef = useRef(null)
  const hideTimer = useRef(null)

  const handleMouseEnter = useCallback(() => {
    clearTimeout(hideTimer.current)
    if (spanRef.current) {
      setAnchorRect(spanRef.current.getBoundingClientRect())
    }
    setShowTooltip(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    hideTimer.current = setTimeout(() => setShowTooltip(false), 200)
  }, [])

  const handleClose = useCallback(() => {
    hideTimer.current = setTimeout(() => setShowTooltip(false), 150)
  }, [])

  useEffect(() => {
    return () => clearTimeout(hideTimer.current)
  }, [])

  if (!glossary[term]) {
    return <>{children || term}</>
  }

  return (
    <>
      <span
        ref={spanRef}
        className="glossary-term border-b border-dotted border-cyan-300 cursor-help relative inline"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children || term}
        <sup className="text-[9px] text-cyan-400 ml-0.5 font-bold select-none">
          ?
        </sup>
      </span>
      {showTooltip && (
        <Tooltip term={term} anchorRect={anchorRect} onClose={handleClose} />
      )}
    </>
  )
}

/* ────────────────────────────────────────────
   GlossaryText  -  auto-detects terms in string content
   ──────────────────────────────────────────── */
export function GlossaryText({ children, enabled = true }) {
  const processedContent = useMemo(() => {
    // Only process string children
    if (!enabled || typeof children !== 'string') {
      return children
    }

    const text = children
    const parts = []
    let lastIndex = 0
    // track character indices already matched via overlap filtering below

    // Find all matches, longest-first via sorted regex
    const allMatches = []
    let match
    // Reset regex state
    termRegex.lastIndex = 0
    while ((match = termRegex.exec(text)) !== null) {
      allMatches.push({
        term: match[0],
        start: match.index,
        end: match.index + match[0].length,
      })
    }

    // Filter out overlapping matches (keep first occurrence, longest-first via regex ordering)
    const filtered = []
    for (const m of allMatches) {
      let overlaps = false
      for (const f of filtered) {
        if (m.start < f.end && m.end > f.start) {
          overlaps = true
          break
        }
      }
      if (!overlaps) {
        filtered.push(m)
      }
    }

    // Sort by position for sequential building
    filtered.sort((a, b) => a.start - b.start)

    // Only annotate first occurrence of each term
    const seenTerms = new Set()

    for (const m of filtered) {
      if (seenTerms.has(m.term)) {
        // Leave subsequent occurrences as plain text
        continue
      }
      seenTerms.add(m.term)

      // Push any text before this match
      if (m.start > lastIndex) {
        parts.push(text.slice(lastIndex, m.start))
      }

      parts.push(
        <GlossaryTerm key={`${m.term}-${m.start}`} term={m.term}>
          {m.term}
        </GlossaryTerm>
      )
      lastIndex = m.end
    }

    // Push remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : children
  }, [children, enabled])

  return <>{processedContent}</>
}

/* ────────────────────────────────────────────
   GlossaryProvider  -  DOM-level glossary term detection
   When enabled, scans <main> for text nodes containing
   glossary terms and wraps them with interactive tooltip spans.
   ──────────────────────────────────────────── */
const GLOSSARY_ATTR = 'data-glossary-term'
const GLOSSARY_PROCESSED = 'data-glossary-processed'

function scanAndWrapTerms(root) {
  if (!root) return
  const seenTerms = new Set()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      /* Skip nodes inside glossary spans, scripts, styles, buttons, inputs, SVGs, code */
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (parent.closest(`[${GLOSSARY_ATTR}], script, style, button, input, textarea, svg, code, pre, .no-glossary`)) {
        return NodeFilter.FILTER_REJECT
      }
      /* Only process nodes with actual text content */
      if (node.textContent.trim().length < 2) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    }
  })

  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)

  for (const textNode of textNodes) {
    const text = textNode.textContent
    termRegex.lastIndex = 0
    const matches = []
    let m
    while ((m = termRegex.exec(text)) !== null) {
      if (!seenTerms.has(m[0])) {
        matches.push({ term: m[0], start: m.index, end: m.index + m[0].length })
      }
    }
    if (matches.length === 0) continue

    /* Filter overlapping, keep longest-first */
    const filtered = []
    for (const match of matches) {
      let overlaps = false
      for (const f of filtered) {
        if (match.start < f.end && match.end > f.start) { overlaps = true; break }
      }
      if (!overlaps) filtered.push(match)
    }
    filtered.sort((a, b) => a.start - b.start)

    /* Build replacement fragment */
    const frag = document.createDocumentFragment()
    let lastIdx = 0
    for (const match of filtered) {
      if (match.start > lastIdx) {
        frag.appendChild(document.createTextNode(text.slice(lastIdx, match.start)))
      }
      const span = document.createElement('span')
      span.setAttribute(GLOSSARY_ATTR, match.term)
      span.className = 'glossary-term border-b border-dotted border-cyan-300 cursor-help relative inline'
      span.textContent = match.term
      /* Add the ? superscript */
      const sup = document.createElement('sup')
      sup.className = 'text-[9px] text-cyan-400 ml-0.5 font-bold select-none'
      sup.textContent = '?'
      span.appendChild(sup)
      frag.appendChild(span)
      seenTerms.add(match.term)
      lastIdx = match.end
    }
    if (lastIdx < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIdx)))
    }
    textNode.parentNode.replaceChild(frag, textNode)
  }
  root.setAttribute(GLOSSARY_PROCESSED, 'true')
}

function removeGlossaryWraps(root) {
  if (!root) return
  root.querySelectorAll(`[${GLOSSARY_ATTR}]`).forEach(el => {
    /* Get original term text (without the ? superscript) */
    const term = el.getAttribute(GLOSSARY_ATTR)
    const textNode = document.createTextNode(term)
    el.parentNode.replaceChild(textNode, el)
    textNode.parentNode.normalize()
  })
  root.removeAttribute(GLOSSARY_PROCESSED)
}

export function GlossaryProvider({ children, enabled = true }) {
  const tooltipRef = useRef(null)
  const [activeTerm, setActiveTerm] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const hideTimerRef = useRef(null)

  /* Scan DOM for glossary terms when enabled changes */
  useEffect(() => {
    const mainEl = document.querySelector('main')
    if (!mainEl) return

    /* Small delay to let React finish rendering */
    const timer = setTimeout(() => {
      if (enabled) {
        /* Only scan if not already processed */
        if (!mainEl.hasAttribute(GLOSSARY_PROCESSED)) {
          scanAndWrapTerms(mainEl)
        }
      } else {
        removeGlossaryWraps(mainEl)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [enabled])

  /* Re-scan when new sections become visible (scroll-visible class added) */
  useEffect(() => {
    if (!enabled) return
    const mainEl = document.querySelector('main')
    if (!mainEl) return

    const observer = new MutationObserver((mutations) => {
      let needsRescan = false
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target
          if (target.classList && target.classList.contains('scroll-visible')) {
            needsRescan = true
            break
          }
        }
      }
      if (needsRescan) {
        /* Re-scan only un-processed sections */
        mainEl.querySelectorAll('section.scroll-visible').forEach(section => {
          if (!section.querySelector(`[${GLOSSARY_ATTR}]`)) {
            scanAndWrapTerms(section)
          }
        })
      }
    })

    observer.observe(mainEl, { attributes: true, subtree: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [enabled])

  /* Hover event delegation for glossary terms */
  useEffect(() => {
    if (!enabled) return

    const showTooltip = (e) => {
      const termEl = e.target.closest(`[${GLOSSARY_ATTR}]`)
      if (!termEl) return
      clearTimeout(hideTimerRef.current)
      const term = termEl.getAttribute(GLOSSARY_ATTR)
      const rect = termEl.getBoundingClientRect()
      const tooltipWidth = 288 // w-72 = 18rem = 288px
      const halfTip = tooltipWidth / 2

      // Use viewport-relative coordinates (fixed positioning)
      let left = rect.left + rect.width / 2
      let top = rect.bottom + 8

      // Clamp horizontally to keep tooltip within viewport
      if (left - halfTip < 12) left = halfTip + 12
      if (left + halfTip > window.innerWidth - 12) left = window.innerWidth - halfTip - 12

      // If tooltip would go below viewport, show above instead (estimate ~200px height)
      if (top + 200 > window.innerHeight - 12) {
        top = rect.top - 200 - 8
      }

      setActiveTerm(term)
      setTooltipPos({ top, left })
    }

    const hideTooltip = (e) => {
      const termEl = e.target.closest(`[${GLOSSARY_ATTR}]`)
      if (termEl) {
        hideTimerRef.current = setTimeout(() => setActiveTerm(null), 200)
      }
    }

    document.addEventListener('mouseenter', showTooltip, true)
    document.addEventListener('mouseleave', hideTooltip, true)

    return () => {
      document.removeEventListener('mouseenter', showTooltip, true)
      document.removeEventListener('mouseleave', hideTooltip, true)
      clearTimeout(hideTimerRef.current)
    }
  }, [enabled])

  /* Click-outside handler */
  useEffect(() => {
    const handleClick = () => {
      document.dispatchEvent(new CustomEvent('glossary-close-all'))
      setActiveTerm(null)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {children}
      {enabled && activeTerm && glossary[activeTerm] && (
        <div
          ref={tooltipRef}
          className="fixed z-[210] w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4 transition-opacity duration-150"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            transform: 'translateX(-50%)',
          }}
          onMouseEnter={() => clearTimeout(hideTimerRef.current)}
          onMouseLeave={() => {
            hideTimerRef.current = setTimeout(() => setActiveTerm(null), 150)
          }}
        >
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45"
            aria-hidden
          />
          <div className="font-bold text-slate-800 text-sm mb-2">{activeTerm}</div>
          <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
            Technical
          </div>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            {glossary[activeTerm].technical}
          </p>
          <div className="text-xs text-cyan-500 font-mono uppercase tracking-wider mb-1">
            In Plain English
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {glossary[activeTerm].plain}
          </p>
        </div>
      )}
    </>
  )
}

export default GlossaryText
