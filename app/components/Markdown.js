import ReactMarkdown from 'react-markdown'

// The model answers in markdown (**bold**, ### headings, 1. lists).
// Tailwind removes the default look of those elements, so we style each one.
// react-markdown does not render raw HTML, so model output can't inject markup.
const components = {
  h1: ({ children }) => <h3 className="text-sm font-bold text-gray-900 mt-3 mb-1">{children}</h3>,
  h2: ({ children }) => <h3 className="text-sm font-bold text-gray-900 mt-3 mb-1">{children}</h3>,
  h3: ({ children }) => <h3 className="text-sm font-bold text-gray-900 mt-3 mb-1">{children}</h3>,
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
      {children}
    </a>
  ),
}

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}