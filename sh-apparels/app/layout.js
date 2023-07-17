import { Provider} from './components/provider'
import './globals.css'
import Navbar from '@/app/components/Navbar'

export const metadata = {
  title: 'shApparels',
  description: 'Bringing you the best of the best',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body>
      <Provider>
      <Navbar />
        {children}
      </Provider>
      </body>
    </html>
  )
}