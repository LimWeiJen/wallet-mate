import React from 'react'

const Accounts = () => {
  return (
    <div className='flex flex-col h-full place-items-center justify-center overflow-y-scroll'>
      <div className='bg-[#652C2C] my-5 flex flex-col place-items-center rounded-lg'>
        <div className='px-10 py-10'>
          <div>Cash</div>
          <div className='text-4xl font-bold'>$1,000,000.00</div>
        </div>
        <div className='flex'>
          <div className='p-5 border-t border-r'>
            <div>Income This Month</div>
            <div className='text-2xl font-bold'>$1,000.00</div>
          </div>
          <div className='p-5 border-t'>
            <div>Expenses This Month</div>
            <div className='text-2xl font-bold'>$1,000.00</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts