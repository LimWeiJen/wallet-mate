'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { Plus, LogOut, Home, CreditCard, BarChart2, Archive } from 'react-feather'
import { context } from '../contexts'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname().toString().replace('/main/', '');
  const ctx = useContext(context);

  const signOut = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/'
  }

  const addNewData = () => {
    if (pathname === 'accounts') window.location.href = '/main/newAccount';
    else window.location.href = '/main/newTransaction'
  }

  return (
    <div lang="en">
      <div>
        <div className='flex lg:justify-center justify-between m-5'>
          <div className='mx-1'>
            <h1 className='text-primaryWhite font-bold text-xl'>Lim</h1>
            <h1 className='text-primaryWhite font-thin opacity-80 text-sm'>@Lim</h1>
          </div>
          <div className='flex justify-center align-middle'>
            <div onClick={addNewData} title='add new post' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><Plus size={30} className='h-full text-primaryWhite' /></div>
            <div onClick={signOut} title='sign out' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><LogOut size={30} className='h-full text-primaryWhite' /></div>
          </div>
        </div>
      </div>
      <div className='grid place-content-center'>
        <div className='lg:w-[calc(100vw-20rem)] w-screen rounded-lg h-96' >
          <div className='lg:flex z-10 hidden'>
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
          <div className='flex z-10 lg:hidden absolute bottom-0 left-0 w-screen justify-evenly'>
            <Link href={'/main/home'}>
            <div className={`flex px-6 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'home' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><Home className='mr-2' /></div>
            </Link>
            <Link href={'/main/accounts'}>
            <div className={`flex px-6 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'accounts' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><CreditCard className='mr-2' /></div>
            </Link>
            <Link href='/main/reports'>
            <div className={`flex px-6 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'reports' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><BarChart2 className='mr-2' /></div>
            </Link>
            <Link href={'/main/records'}>
            <div className={`flex px-6 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg ${pathname === 'records' ? 'bg-primaryGreen': 'bg-secondaryBlack opacity-50'}`}><Archive className='mr-2' /></div>
            </Link>
          </div>
          <div className='lg:bg-primaryBlack bg-[#0000008b] h-[calc(100vh-10rem)]' style={{boxShadow: '0px 0px 20px 20px rgba(0, 0, 0, 0.25);'}}>
            {ctx?.isBusy ? null : children}
          </div>
        </div>
      </div>
    </div>
  )
}
