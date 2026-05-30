import SourceCard from './SourceCard'
import EmergencyBanner from './EmergencyBanner'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%]">
        {/* Emergency banner */}
        {message.isEmergency && <EmergencyBanner />}

        {/* Answer bubble */}
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          {/* Bot header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div>
            <span className="text-xs font-semibold text-gray-500">FirstAid Assistant</span>
          </div>

          {/* Answer text — render line breaks */}
          <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-2">SOURCES</p>
              <div className="flex flex-col gap-2">
                {message.sources.map((source, i) => (
                  <SourceCard key={i} source={source} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}