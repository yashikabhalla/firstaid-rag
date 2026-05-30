export default function SourceCard({ source }) {
  return (
    <a
      href={source.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-sm">📋</span>

        <div>
          <p className="text-xs font-semibold text-blue-800">
            {source.source}
          </p>

          <p className="text-xs text-blue-600 truncate max-w-[200px]">
            {source.topic}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-blue-500 font-medium">
          {source.relevanceScore}%
        </span>

        <span className="text-blue-400 text-xs">↗</span>
      </div>
    </a>
  )
}