'use client'

import { context } from '@/app/contexts';
import React, { useContext, useRef } from 'react'

const NewAccount = () => {
  const name = useRef<any>(null);
  const accountType = useRef<any>(null);
  const color = useRef<any>(null);
  const startingAmount = useRef<any>(null);

  const ctx = useContext(context);

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <input ref={name} className='p-3 w-11/12 font-bold bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Name' />
      <select ref={accountType} className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg focus:outline-none focus:border-none'>
        <option value="General Account">General Account</option>
        <option value="E Wallet">E Wallet</option>
        <option value="Cash">Cash</option>
        <option value="Current Account">Current Account</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Saving Account">Saving Account</option>
        <option value="Bonus">Bonus</option>
        <option value="Insurance">Insurance</option>
        <option value="Investment">Investment</option>
        <option value="Loan">Loan</option>
        <option value="Mortgage">Mortgage</option>
      </select>
      <div className='flex p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg'>
        <div className='mr-4'>Color:</div>
        <input ref={color} className='bg-transparent outline-none border-none rounded-lg' type="color" />
      </div>
      <input ref={startingAmount} min='0.00' step='0.01' className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="number" placeholder='Starting Amount' />
      {ctx?.error ? <div className='p-3 text-red-500'>{ctx?.error}</div> : null}
      <button onClick={() => ctx?.addAccount(
        name.current.value,
        color.current.value,
        accountType.current.value,
        startingAmount.current.value
      )} className='gradient-1 w-11/12 my-3 p-3 text-2xl font-bold rounded-lg transition-all hover:rotate-1 hover:scale-105'>Confirm</button>
    </div>
  )
}

export default NewAccount