'use client'

import React, { useState } from 'react'

const NewTransaction = () => {
  const [isIncome, setIsIncome] = useState(true);

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <input className='p-3 w-11/12 font-bold text-2xl bg-primaryBlack bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-t-lg' type="number" placeholder='Amount' />
      <div className='h-1 w-11/12 gradient-1 mb-3'></div>
      <input className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg' type="text" placeholder="What's the income for?" />
      <input className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Account' />
      <div className='flex w-11/12 my-3 transition-all'>
        <div className={`p-0.5 ${isIncome ? 'gradient-border-1' : ''} mr-6 transition-all hover:-translate-y-1`}>
          <button onClick={() => setIsIncome(true)} className={`p-3 px-12 bg-secondaryBlack ${isIncome ? '' : 'rounded-lg opacity-50'}`}>Income</button>
        </div>
        <div className={`p-0.5 ${!isIncome ? 'gradient-border-1' : ''} transition-all hover:-translate-y-1`}>
          <button onClick={() => setIsIncome(false)} className={`p-3 px-12 bg-secondaryBlack ${!isIncome ? '' : 'rounded-lg opacity-50'}`}>Expenses</button>
        </div>
      </div>
      <button className='gradient-1 w-11/12 my-3 p-3 text-2xl font-bold rounded-lg transition-all hover:rotate-1 hover:scale-105'>Confirm</button>
    </div>
  )
}

export default NewTransaction