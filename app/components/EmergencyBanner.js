export default function EmergencyBanner() {
  return (
    <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-lg mb-3 animate-pulse">
      <span className="text-2xl">🚨</span>

      <div>
        <p className="font-bold text-sm">EMERGENCY DETECTED</p>
        <p className="text-xs opacity-90">
          Call 911 immediately — do not wait
        </p>
      </div>

      <a
        href="tel:911"
        className="ml-auto bg-white text-red-600 font-bold text-sm px-3 py-1 rounded-full hover:bg-red-50"
      >
        Call 911
      </a>
    </div>
  )
}