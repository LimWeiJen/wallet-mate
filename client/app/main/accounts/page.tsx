'use client'

import { context } from '@/app/contexts';
import React, { useContext } from 'react'

const Accounts = () => {
  const ctx = useContext(context)

  return (
    <div className='grid h-full place-items-center justify-center overflow-y-scroll'>
      {ctx?.accounts.map(account =>
      <div className={`my-5 lg:w-96 w-72 flex flex-col place-items-center rounded-lg`} style={{backgroundColor: account.color}}>
        <div className='px-10 lg:py-10 py-8'>
          <div>{account.name}</div>
          <div className='text-4xl font-bold'>${account.startingAmount + account.income - account.expenses}</div>
        </div>
        <div className='flex'>
          <div className='p-5 w-36 border-t border-r'>
            <div>Income</div>
            <div className='text-2xl font-bold'>${account.income}</div>
          </div>
          <div className='p-5 w-36 border-t'>
            <div>Expenses</div>
            <div className='text-2xl font-bold'>${account.expenses}</div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Accounts