'use client'

import { Account, Transaction } from '@/interfaces';
import React, { useEffect, useState } from 'react'

const Records = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  // fetch all the required user data
  useEffect(() => {
    fetchTransactionData().then(transactionData => {
      setTransactions(transactionData);
    });
  }, [])

  /**
   * fetch the user's transaction data from the server
   * @returns [Transaction Object]
   */
  const fetchTransactionData = async () => {
    const res = await fetch('http://localhost:3001/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')!
      },
    })

    if (res.ok) return (await res.json())['transactions'];
  }

  return (
    <div className='overflow-y-scroll h-full'>
      {transactions.map(transaction => 
      <div className='flex justify-between border-primaryGreen m-5 border-2 p-5 bg-secondaryBlack rounded-lg'>
        <div>
          <div className='text-4xl font-bold'>{transaction.description}</div>
          <div>{transaction.category} | {transaction.accountId}</div>
        </div>
        <div className={`flex flex-col justify-center text-4xl ${transaction.type === 'income' ? 'text-primaryGreen' : ''}`}>{transaction.type === 'expenses' ? '-$' : '+$'}{transaction.amount}</div>
      </div>
      )}
    </div>
  )
}

export default Records