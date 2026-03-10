import { useEffect, useRef, useState } from 'react'

export default function LeftSidebar({ sections, isOpen, currentSection, stars = {}, commentCounts = {}, collapsed = {} }) {
  const navRef = useRef(null)
  const [starredOnly, setStarredOnly] = useState(false)

  /* Scroll the active item into view within the sidebar */
  useEffect(() => {
    if (!navRef.current || !currentSection) return
    const active = navRef.current.querySelector(`[data-section="${currentSection}"]`)
    if (active) {
      active.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [currentSection])

  const hasStars = Object.values(stars).some(Boolean)
  const filteredSections = starredOnly ? sections.filter(s => stars[s.id]) : sections

  return (
    <>
      {/* ── Mobile backdrop overlay ── */}
      {isOpen && (
        <div className="no-print fixed inset-0 bg-black/20 z-[140] md:hidden" />
      )}

      {/* ── Interactive sidebar (hidden from print) ── */}
      <aside
        className={`no-print fixed left-0 top-[52px] bottom-0 z-[150]
          bg-white border-r border-slate-200 overflow-y-auto transition-all duration-300
          ${isOpen ? 'w-72' : 'w-0 -translate-x-full'}`}
        ref={navRef}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Contents
            </div>

            {/* Star filter toggle  -  only visible when stars exist */}
            {hasStars && (
              <button
                onClick={() => setStarredOnly(prev => !prev)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  starredOnly
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50'
                }`}
                title={starredOnly ? 'Show all sections' : 'Show starred only'}
              >
                <svg className="w-3 h-3" fill={starredOnly ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {starredOnly ? 'Starred' : 'Filter'}
              </button>
            )}
          </div>

          {filteredSections.length === 0 && starredOnly && (
            <p className="text-xs text-slate-400 px-3">No starred sections.</p>
          )}

          {filteredSections.map(section => {
            const isActive = currentSection === section.id
            const isStarred = stars[section.id]
            const count = commentCounts[section.id]
            const isCollapsed = collapsed[section.id]
            const isAction = section.variant === 'action'

            return (
              <div key={section.id}>
                {/* Group header divider */}
                {section.group && !starredOnly && (
                  <div className="flex items-center gap-2 py-1 my-1">
                    <div className="flex-1 border-t border-slate-200" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 whitespace-nowrap">
                      {section.group}
                    </span>
                    <div className="flex-1 border-t border-slate-200" />
                  </div>
                )}

                <div data-section={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors
                      ${isAction ? 'border-l-2 border-l-cyan-300' : 'border-l-2 border-l-slate-300'}
                      ${isActive
                        ? 'bg-cyan-50 text-cyan-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    {/* Collapse state chevron indicator */}
                    <svg
                      className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                        isCollapsed ? '-rotate-90' : 'rotate-0'
                      } ${isActive ? 'text-cyan-500' : 'text-slate-300'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <span className={`text-xs font-mono w-6 flex-shrink-0 ${isActive ? 'text-cyan-600' : 'text-cyan-500'}`}>
                      {section.num}
                    </span>
                    <span className="leading-tight truncate">{section.short || section.title}</span>

                    {/* Comment count badge */}
                    {count > 0 && (
                      <span className="ml-auto flex-shrink-0 px-1.5 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-mono font-bold">
                        {count}
                      </span>
                    )}

                    {/* Star indicator */}
                    {isStarred && (
                      <svg
                        className={`w-3 h-3 text-amber-400 flex-shrink-0 ${count > 0 ? '' : 'ml-auto'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </a>
                </div>
              </div>
            )
          })}

        </div>
      </aside>

      {/* ── Print-only Table of Contents ── */}
      <aside className="hidden print:block mb-8 page-break-after">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-slate-900 mb-1">Document Title</div>
          <div className="text-sm font-mono text-slate-400">Generated with Coco Editor</div>
        </div>
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
          Table of Contents
        </div>
        <ol className="list-none space-y-1">
          {sections.map(section => (
            <li key={section.id} className="flex items-center gap-2 text-sm text-slate-700 py-1 border-b border-slate-100">
              <span className="text-xs font-mono text-cyan-600 w-6 flex-shrink-0">{section.num}</span>
              <span className="flex-1">{section.title}</span>
              {stars[section.id] && (
                <span className="text-amber-500 star-indicator">&#9733;</span>
              )}
            </li>
          ))}
        </ol>
      </aside>
    </>
  )
}
