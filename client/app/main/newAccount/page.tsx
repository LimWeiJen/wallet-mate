'use client'

import React, { useRef, useState } from 'react'

const NewAccount = () => {
  const name = useRef<any>(null);
  const accountType = useRef<any>(null);
  const color = useRef<any>(null);
  const startingAmount = useRef<any>(null);
  const [error, setError] = useState('');

  const addAccount = async () => {
    // Check if all required fields are filled
    if (!name.current.value || !color.current.value || !accountType.current.value || !startingAmount.current.value) {
      setError('missing required fields');
      return;
    }

    // Send a POST request to the server with the new account data
    const res = await fetch('http://localhost:3001/accounts', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')!
      },
      body: JSON.stringify({
        account: {
          name: name.current.value!,
          color: color.current.value!,
          accountType: accountType.current.value!,
          startingAmount: startingAmount.current.value!
        }
      })
    })

    // If the request is successful, redirect to the main page
    if (res.ok) {
      window.location.href = '/main/accounts';
    } else {
      setError('Unexpected error occurred. Please wait for some time and try again.')
    }
  }

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <input ref={name} className='p-3 w-11/12 font-bold bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Name' />
      <select ref={accountType} className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg focus:outline-none focus:border-none'>
        <option value="Account Type">Account Type</option>
        <option value="General">General</option>
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
      {error ? <div className='p-3 text-red-500'>{error}</div> : null}
      <button onClick={addAccount} className='gradient-1 w-11/12 my-3 p-3 text-2xl font-bold rounded-lg transition-all hover:rotate-1 hover:scale-105'>Confirm</button>
    </div>
  )
}

export default NewAccount