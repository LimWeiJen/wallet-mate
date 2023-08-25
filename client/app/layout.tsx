import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ContextProvider } from './contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wallet Mate',
  description: 'Personal Expense Tracker',
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/ico'
    },
    shortcut: {url: '/favicon.ico', type: 'image/ico'}
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={inter.className}>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          {children}
          <div>
            <div className="circle gradient-1 top-0" style={{animation: 'circleAnimation1 10s infinite ease-in-out'}}></div>
            <div className="circle gradient-1 top-32 left-36" style={{animation: 'circleAnimation2 10s infinite ease-in-out'}}></div>
            <div className="circle gradient-1 top-48 left-96" style={{animation: 'circleAnimation3 10s infinite ease-in-out'}}></div>
          </div>
        </body>
      </ContextProvider>
    </html>
  )
}
