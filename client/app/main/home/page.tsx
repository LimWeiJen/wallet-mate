'use client'

import { context } from '@/app/contexts';
import { Account, Transaction } from '@/interfaces';
import React, { useContext, useEffect, useState } from 'react'

const Home = () => {
  const ctx = useContext(context);

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <div className='font-bold text-6xl'>${ctx?.totalAmount}</div>
      <div className='flex'>
        <div className='bg-secondaryBlack text-2xl shadow-2xl m-5 p-5 w-72 h-40 flex flex-col justify-center rounded-lg'>
          <div>Income</div>
          <div className='font-bold text-primaryGreen'>+${ctx?.income}</div>
        </div>
        <div className='bg-secondaryBlack text-2xl shadow-2xl m-5 p-5 w-72 h-40 flex flex-col justify-center rounded-lg'>
          <div>Expenses</div>
          <div className='font-bold'>-${ctx?.expenses}</div>
        </div>
      </div>
      <div className='text-2xl'>Cash Flow: <span className='text-primaryGreen'>${ctx?.cashFlow}</span></div>
    </div>
  )
}

export default Home