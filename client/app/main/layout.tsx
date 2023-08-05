import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg bg-primaryGreen`}><Home className='mr-2' /> Home</div>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg opacity-50 bg-secondaryBlack`}><CreditCard className='mr-2' /> Accounts</div>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg opacity-50 bg-secondaryBlack`}><BarChart2 className='mr-2' /> Reports</div>
            <div className={`flex p-5 py-2 transition-all hover:-translate-y-1 hover:cursor-pointer rounded-t-lg shadow-lg opacity-50 bg-secondaryBlack`}><Archive className='mr-2' /> Records</div>
          </div>
          <div className='bg-primaryBlack h-[calc(100vh-10rem)]' style={{boxShadow: '0px 0px 20px 20px rgba(0, 0, 0, 0.25);'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
