'use client'

import { Account, Transaction } from '@/interfaces';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // fetch all the required user data
  useEffect(() => {
    fetchTransactionData().then(transactionData => {
      fetchAccountsData().then(accountData => {
        modifyData(transactionData, accountData);
      })
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

  /**
   * takes in two arrays of transaction and account data and calculates the sum of income, sum of expenses, starting amount, and cash flow.
   * @param transactionData the json result of transaction data from the server
   * @param accountData the json result of account data from the server
   */
  const modifyData = (transactionData: Array<Transaction>, accountData: Array<Account>) => {
    // Initialize variables to store the sum of income, sum of expenses, and starting amount
    let sumOfIncome = 0, sumOfExpenses = 0, sumOfStartingAmount = 0;
    
    transactionData.forEach(transaction => {
      // If the transaction is an income, add its amount to the sumOfIncome variable
      if (transaction.type === 'income') sumOfIncome += transaction.amount!;
      // If the transaction is an expense, add its amount to the sumOfExpenses variable
      else sumOfExpenses += transaction.amount!;
    })
    accountData.forEach(account => sumOfStartingAmount += account.startingAmount)

    // Set the calculated values for each variable
    setIncome(sumOfIncome);
    setExpenses(sumOfExpenses);
    setCashFlow(sumOfIncome - sumOfExpenses);
    setTotalAmount(sumOfStartingAmount + sumOfIncome - sumOfExpenses);
  }

  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <div className='font-bold text-6xl'>${totalAmount}</div>
      <div className='flex'>
        <div className='bg-secondaryBlack text-2xl shadow-2xl m-5 p-5 w-72 h-40 flex flex-col justify-center rounded-lg'>
          <div>Income</div>
          <div className='font-bold text-primaryGreen'>+${income}</div>
        </div>
        <div className='bg-secondaryBlack text-2xl shadow-2xl m-5 p-5 w-72 h-40 flex flex-col justify-center rounded-lg'>
          <div>Expenses</div>
          <div className='font-bold'>-${expenses}</div>
        </div>
      </div>
      <div className='text-2xl'>Cash Flow: <span className='text-primaryGreen'>${cashFlow}</span></div>
    </div>
  )
}

export default Home