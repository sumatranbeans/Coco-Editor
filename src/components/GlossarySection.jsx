
import { glossary as defaultGlossary } from '../data/glossary'

/* ────────────────────────────────────────────
   GlossarySection  -  printable glossary at end of document

   Alphabetically sorted. Dual-register format
   (technical + plain English) matching Scaligraph system.
   Includes print-break class for page break in print mode.
   ──────────────────────────────────────────── */
export default function GlossarySection({ glossary = defaultGlossary }) {
  const sortedEntries = Object.entries(glossary).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  )

  return (
    <section className="glossary-section print-break mt-20 pt-8 border-t border-slate-200">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-cyan-50 border border-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-cyan-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Glossary</h2>
      </div>

      <p className="text-sm text-slate-500 mb-8">
        {sortedEntries.length} terms covering edge AI, language models, vision
        systems, safety standards, and hardware. Each entry includes a precise
        technical definition and a plain-English explanation.
      </p>

      {/* Two-column grid for print efficiency, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {sortedEntries.map(([term, defs]) => (
          <div
            key={term}
            className="mb-4 pb-4 border-b border-slate-100 break-inside-avoid"
          >
            <div className="font-bold text-cyan-700 font-mono text-sm">
              {term}
            </div>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">
              {defs.technical}
            </p>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              {defs.plain}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
