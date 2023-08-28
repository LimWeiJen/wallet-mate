'use client'

import { context } from '@/app/contexts';
import React, { useContext } from 'react'

const Home = () => {
  const ctx = useContext(context);

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <div className='font-bold text-6xl'>${ctx?.totalAmount}</div>
      <div className='lg:flex w-screen lg:w-fit'>
        <div className='lg:bg-secondaryBlack bg-primaryBlack text-2xl lg:shadow-2xl m-5 lg:mx-5 mx-24 p-5 lg:w-72 lg:h-40 flex flex-col justify-center rounded-lg'>
          <div>Income</div>
          <div className='font-bold text-primaryGreen'>+${ctx?.income}</div>
        </div>
        <div className='lg:bg-secondaryBlack bg-primaryBlack text-2xl lg:shadow-2xl m-5 lg:mx-5 mx-24 p-5 lg:w-72 lg:h-40 flex flex-col justify-center rounded-lg'>
          <div>Expenses</div>
          <div className='font-bold'>-${ctx?.expenses}</div>
        </div>
      </div>
      <div className='text-2xl'>Cash Flow: <span className={`${ctx?.cashFlow! > 0 ? 'text-primaryGreen' : ''}`}>${ctx?.cashFlow}</span></div>
    </div>
  )
}

export default Home