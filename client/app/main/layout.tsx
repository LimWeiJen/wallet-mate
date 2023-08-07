'use client'

import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, LogOut, Home, CreditCard, BarChart2, Archive } from 'react-feather'

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
  const pathname = usePathname().toString().replace('/main/', '');

  return (
    <div lang="en">
      <div>
        <div className='flex lg:justify-center justify-between m-5'>
          <div className='mx-1'>
            <h1 className='text-primaryWhite font-bold text-xl'>Lim</h1>
            <h1 className='text-primaryWhite font-thin opacity-80 text-sm'>@Lim</h1>
          </div>
          <div className='flex justify-center align-middle'>
            <div title='add new post' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><Plus size={30} className='h-full text-primaryWhite' /></div>
            <div title='sign out' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><LogOut size={30} className='h-full text-primaryWhite' /></div>
          </div>
        </div>
      </div>
      <div className='grid place-content-center'>
        <div className='w-[calc(100vw-20rem)] rounded-lg h-96' >
          <div className='flex z-10'>
            <Link href={'/main/home'}>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'home' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><Home className='mr-2' /> Home</div>
            </Link>
            <Link href={'/main/accounts'}>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'accounts' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><CreditCard className='mr-2' /> Accounts</div>
            </Link>
            <Link href='/main/reports'>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'reports' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><BarChart2 className='mr-2' /> Reports</div>
            </Link>
            <Link href={'/main/records'}>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'records' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><Archive className='mr-2' /> Records</div>
            </Link>
          </div>
          <div className='bg-primaryBlack h-[calc(100vh-10rem)]' style={{boxShadow: '0px 0px 20px 20px rgba(0, 0, 0, 0.25);'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
