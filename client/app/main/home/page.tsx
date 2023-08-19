import React, { useEffect } from 'react'

const Home = () => {
  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <div className='font-bold text-6xl'>$1,000,000.00</div>
      <div className='flex'>
        <div className='bg-secondaryBlack text-2xl shadow-2xl m-5 p-5 w-72 h-40 flex flex-col justify-center rounded-lg'>
          <div>Income</div>
          <div className='font-bold text-primaryGreen'>+$1,000,000.00</div>
        </div>
        <div className='bg-secondaryBlack text-2xl shadow-2xl m-5 p-5 w-72 h-40 flex flex-col justify-center rounded-lg'>
          <div>Expenses</div>
          <div className='font-bold'>-$500.00</div>
        </div>
      </div>
      <div className='text-2xl'>Cash Flow: <span className='text-primaryGreen'>+$900</span></div>
    </div>
  )
}

export default Home