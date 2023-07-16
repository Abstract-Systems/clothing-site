import './globals.css'


export const metadata = {
  title: 'shApparels',
  description: 'Bringing you the best of the best',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
