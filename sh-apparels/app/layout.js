import './globals.css'
import Provider from './components/Provider'
import Navbar from '@/app/components/Navbar'



export const metadata = {
  title: 'shApparels',
  description: 'Bringing you the best of the best',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex h-full flex-col'>
      <Provider>
        <Navbar />
        <main className='flex flex-col justify-center items-center'>
          {children}
        </main>
        </Provider>
        
      </body>
    </html>
  )
}
