'use client'

import { Account } from '@/interfaces';
import React, { useEffect, useRef, useState } from 'react'

const NewTransaction = () => {
  const [isIncome, setIsIncome] = useState(true);
  const amount = useRef<any>(null);
  const description = useRef<any>(null);
  const account = useRef<any>(null);
  const category = useRef<any>(null);
  const [error, setError] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState<Array<string>>([]);

  useEffect(() => {
    fetchAccountsData().then((data: Array<Account>) => {
      setAvailableAccounts(data.map(account => account.name))
    })
  }, [])

  const addTransaction = async () => {
    // Check if all required fields are filled
    if (!amount.current.value || !description.current.value || !account.current.value) {
      setError('missing required fields');
      return;
    }

    // Send a POST request to the server with the new account data
    const res = await fetch('http://localhost:3001/transactions', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')!
      },
      body: JSON.stringify({
        transaction: {
          description: description.current.value!,
          accountId: account.current.value!,
          amount: amount.current.value!,
          type: isIncome ? 'income' : 'expenses',
          category: category.current.value!
        }
      })
    })

    // If the request is successful, redirect to the main page
    if (res.ok) {
      window.location.href = '/main/home';
    } else {
      setError('Unexpected error occurred. Please wait for some time and try again.')
    }
  }

  /**
   * fetch the user's account data from the server
   * @returns [Account Object]
   */
  const fetchAccountsData = async () => {
    const res = await fetch('http://localhost:3001/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')!
      },
    })

    if (res.ok) return (await res.json())['accounts'];
  }

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <input ref={amount} className='p-3 w-11/12 font-bold text-2xl bg-primaryBlack bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-t-lg' type="number" placeholder='Amount' />
      <div className='h-1 w-11/12 gradient-1 mb-3'></div>
      <input ref={description} className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg' type="text" placeholder="What's the income for?" />
      <div className='flex justify-between w-11/12'>
        <select ref={account} className='p-3 w-11/12 mr-4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#1edfdf1f] rounded-lg focus:outline-none focus:border-none'>
          {availableAccounts.map(account => <option value={account}>{account}</option>)}
        </select>
        <select ref={category} className='p-3 w-11/12 ml-4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#1edfdf1f] rounded-lg focus:outline-none focus:border-none'>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Shopping">Shopping</option>
          <option value="Housing">Housing</option>
          <option value="Transportation">Transportation</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Life & Entertainment">Life & Entertainment</option>
          <option value="Communication, PC">Communication, PC</option>
          <option value="Financial Expenses">Financial Expenses</option>
          <option value="Investments">Investments</option>
          <option value="Income">Income</option>
          <option value="Others">Others</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div className='flex w-11/12 my-3 transition-all'>
        <div className={`p-0.5 ${isIncome ? 'gradient-border-1' : ''} mr-6 transition-all hover:-translate-y-1`}>
          <button onClick={() => setIsIncome(true)} className={`p-3 px-12 bg-secondaryBlack ${isIncome ? '' : 'rounded-lg opacity-50'}`}>Income</button>
        </div>
        <div className={`p-0.5 ${!isIncome ? 'gradient-border-1' : ''} transition-all hover:-translate-y-1`}>
          <button onClick={() => setIsIncome(false)} className={`p-3 px-12 bg-secondaryBlack ${!isIncome ? '' : 'rounded-lg opacity-50'}`}>Expenses</button>
        </div>
      </div>
      {error ? <div className='p-3 text-red-500'>{error}</div> : null}
      <button onClick={addTransaction} className='gradient-1 w-11/12 my-3 p-3 text-2xl font-bold rounded-lg transition-all hover:rotate-1 hover:scale-105'>Confirm</button>
    </div>
  )
}

export default NewTransaction