import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wallet Mate',
  description: 'Personal Expense Tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en">
	<div>Navbar</div>
      	<div className='bg-blue-700'>
		{children}
	</div>
    </div>
  )
}
