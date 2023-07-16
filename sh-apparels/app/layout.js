import ProductPage from '@/pages/product'
import './globals.css'
import Navbar from '@/components/Navbar'



export const metadata = {
  title: 'shApparels',
  description: 'Bringing you the best of the best',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar />
        {children}
        <ProductPage />
      </body>
    </html>
  )
}
