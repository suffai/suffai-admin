import { Inter } from 'next/font/google'
import './ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SUFF.AI Admin',
  description: 'SUFF.AI Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/favicon2_192x192.png" sizes="any" />
        {children}
      </body>
    </html>
  )
}
