
import { useAnnotation, AnnotationToolbar } from './AnnotationOverlay'

export default function TopBar({ title = "Document", version = "v1.0", onAnnotate, annotating, onExport, onToggleSidebar, glossaryEnabled, onToggleGlossary, onExpandAll, onCollapseAll, commentaryMode, onToggleCommentary, starredMode, onToggleStarred, notesMode, onToggleNotes }) {
  const { clearAll, annotationCount, activeTool, setActiveTool } = useAnnotation()

  return (
    <>
      <header className="no-print sticky top-0 z-[200] h-[52px] bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center px-4 gap-3">
        {/* Sidebar toggle (hamburger) */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Toggle navigation"
          aria-label="Toggle navigation sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Branding */}
        <div className="flex items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-slate-900 tracking-tight text-sm whitespace-nowrap hover:text-cyan-700 transition-colors cursor-pointer"
          >
            {title} <span className="text-slate-400 font-mono text-xs font-normal">{version}</span>
          </button>
        </div>

        <div className="flex-1" />

        {/* Toolbar actions - Order: Expand/Collapse | Annotations | Notes | Starred | Commentary | Technical Aid | Export PDF */}
        <div className="flex items-center gap-2">
          {/* Expand/Collapse All controls */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={onExpandAll}
              className="px-2.5 py-1.5 text-xs font-mono text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors border-r border-slate-200"
              title="Expand all sections"
            >
              <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              Expand
            </button>
            <button
              onClick={onCollapseAll}
              className="px-2.5 py-1.5 text-xs font-mono text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              title="Collapse all sections"
            >
              <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
              </svg>
              Collapse
            </button>
          </div>

          {/* Annotations - highlighter/pen icon */}
          <button
            onClick={onAnnotate}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              annotating
                ? 'bg-violet-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            {annotating ? 'Stop Annotating' : 'Annotations'}
          </button>

          {/* Notes - pencil/note icon */}
          <button
            onClick={onToggleNotes}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              notesMode
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={notesMode ? 'Exit notes mode' : 'View and manage notes'}
          >
            <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Notes
          </button>

          {/* Starred - star icon */}
          <button
            onClick={onToggleStarred}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              starredMode
                ? 'bg-amber-400 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={starredMode ? 'Exit starred view' : 'View starred items'}
          >
            <svg className="w-3.5 h-3.5 inline-block mr-1" fill={starredMode ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Starred
          </button>

          {/* Commentary - speech bubble icon */}
          <button
            onClick={onToggleCommentary}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              commentaryMode
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={commentaryMode ? 'Exit commentary mode' : 'View and manage comments'}
          >
            <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {commentaryMode ? 'Exit Commentary' : 'Commentary'}
          </button>

          {/* Technical Aid - book/question icon */}
          <button
            onClick={onToggleGlossary}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              glossaryEnabled
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle glossary highlights"
          >
            <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Technical Aid
          </button>

          {/* Export PDF */}
          <button
            onClick={onExport}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-mono transition-all"
          >
            <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </header>

      {/* Annotation sub-toolbar with persistent tool selection */}
      <AnnotationToolbar
        annotating={annotating}
        onClearAll={clearAll}
        annotationCount={annotationCount}
        activeTool={activeTool}
        onSetActiveTool={setActiveTool}
      />
    </>
  )
}
