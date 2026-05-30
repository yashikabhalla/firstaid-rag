import './globals.css'

export const metadata = {
  title: 'FirstAid RAG Assistant',
  description: 'AI-powered first aid guidance from verified medical sources',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}