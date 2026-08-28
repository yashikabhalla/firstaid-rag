export default function CrisisBanner({ answer }) {
  return (
    <div className="bg-teal-50 border border-teal-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">♥</span>
        </div>
        <span className="text-xs font-semibold text-teal-700">Support Resources</span>
      </div>
      <div className="text-sm text-teal-900 leading-relaxed whitespace-pre-wrap">
        {answer}
      </div>
    </div>
  )
}