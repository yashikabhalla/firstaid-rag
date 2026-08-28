export default function LowConfidenceBanner({ answer }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">?</span>
        </div>
        <span className="text-xs font-semibold text-amber-700">Not in database</span>
      </div>
      <div className="text-sm text-amber-900 leading-relaxed whitespace-pre-wrap">
        {answer}
      </div>
    </div>
  )
}