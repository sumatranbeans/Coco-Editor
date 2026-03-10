import { useEffect, useRef } from 'react'
import SectionComments from './SectionComments'
import InlineNote, { NoteEditor } from './InlineNote'

export default function ScrollSection({
  id,
  num,
  title,
  children,
  className = '',
  /* Variant: 'action' = cyan border, 'knowledge' (default) = slate border */
  variant = 'knowledge',
  /* Star */
  starred = false,
  onStar,
  /* Comments */
  onComment,
  commentCount = 0,
  showComments = false,
  comments = [],
  onAddComment,
  onResolve,
  onAddReply,
  onDeleteComment,
  /* Notes */
  notes = [],
  onNote,
  onDeleteNote,
  onUpdateNote,
  /* Note editor */
  addingNote = false,
  onSaveNote,
  onCancelNote,
  /* Collapse */
  collapsed = false,
  onToggleCollapse,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('scroll-visible')
          el.classList.remove('scroll-hidden')
        }
      },
      { threshold: 0.01, rootMargin: '200px 0px 0px 0px' }
    )

    el.classList.add('scroll-hidden')
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hasActions = onStar || onComment || onNote
  const isAction = variant === 'action'
  const dividerColor = isAction ? 'border-cyan-300/60' : 'border-slate-200/80'
  const accentBorder = isAction ? 'border-l-2 border-l-cyan-300 pl-4' : ''

  return (
    <section ref={ref} id={id} className={`scroll-hidden ${accentBorder} ${className}`}>
      {title && (
        <>
        {/* Subtle divider between sections */}
        <div className={`mt-20 mb-8 border-t ${dividerColor}`} />
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-3">
          {/* Collapse/expand chevron toggle */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={collapsed ? 'Expand section' : 'Collapse section'}
              className="no-print p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label={collapsed ? 'Expand section' : 'Collapse section'}
            >
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${collapsed ? '-rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {num && (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 text-sm font-bold font-mono">
              {String(num).padStart(2, '0')}
            </span>
          )}
          <span className="flex-1">{title}</span>

          {/* Print-only star indicator */}
          {starred && (
            <span className="hidden print:inline text-amber-500 star-indicator text-lg leading-none" aria-label="Starred">&#9733;</span>
          )}

          {/* Section action icons */}
          {hasActions && (
            <div className="no-print flex items-center gap-1">
              {/* Star */}
              {onStar && (
                <button
                  onClick={onStar}
                  title="Star this section"
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg
                    className={`w-4 h-4 ${starred ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
                    viewBox="0 0 20 20"
                    fill={starred ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              )}

              {/* Comment toggle */}
              {onComment && (
                <button
                  onClick={onComment}
                  title="Comments"
                  className="relative p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-slate-400 hover:text-cyan-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  {commentCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {commentCount}
                    </span>
                  )}
                </button>
              )}

              {/* Add note */}
              {onNote && (
                <button
                  onClick={onNote}
                  title="Add note"
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-slate-400 hover:text-amber-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </h2>
        </>
      )}

      {/* Collapsible section content */}
      <div className={collapsed ? 'hidden print:block' : ''}>
        {/* Section content */}
        {children}

        {/* Note editor  -  shown when user clicks "Add note" */}
        {addingNote && (
          <NoteEditor onSave={onSaveNote} onCancel={onCancelNote} />
        )}

        {/* Inline notes (yellow cards)  -  rendered below section content */}
        {notes.length > 0 &&
          notes.map((note) => (
            <InlineNote
              key={note.id}
              note={note}
              onDelete={onDeleteNote}
              onUpdate={onUpdateNote}
            />
          ))}

        {/* Section comments thread  -  shown when toggled */}
        {showComments && (
          <SectionComments
            sectionId={id}
            comments={comments}
            onAddComment={onAddComment}
            onResolve={onResolve}
            onAddReply={onAddReply}
            onDeleteComment={onDeleteComment}
          />
        )}
      </div>
    </section>
  )
}
