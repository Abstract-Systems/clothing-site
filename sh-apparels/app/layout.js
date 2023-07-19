import './globals.css'
import { Inter } from 'next/font/google'
import SessionProviders from './context/AuthProvider'
import Navbar from './components/Navbar'
import Slider from './components/Slider'
import ContextProvidex from './context/ContextProvidex'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <SessionProviders>
      <ContextProvidex>
        <Navbar />
        {/* <Slider /> */}
        <div>
        {children}
        </div>  
        </ContextProvidex>
    </SessionProviders>
        </body>
    </html>
  )
}
