'use client'

import { Account, Transaction } from '@/interfaces';
import React, { useEffect, useState } from 'react'

interface ClientAccount extends Account {
  income: number,
  expenses: number,
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<Array<ClientAccount>>([]);

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
    const newAccountData: Map<string | undefined, ClientAccount> = new Map();

    accountData.forEach(account => {
      console.log(account.color)
      const cAccount: ClientAccount = {
        color: account.color,
        income: 0,
        expenses: 0,
        name: account.name,
        accountType: account.accountType,
        startingAmount: account.startingAmount
      }

      newAccountData.set(cAccount.name, cAccount);
    })

    transactionData.forEach((transaction) => {
      let acc = newAccountData.get(transaction.accountId);
      if (!acc) return;

      if (transaction.type === 'expenses') {
        acc.expenses += transaction.amount!;
      } else if (transaction.type === 'income') {
        acc.income += transaction.amount!;
      }

      newAccountData.set(acc.name, acc);
    })

    const newClientAccount: Array<ClientAccount> = [];

    newAccountData.forEach((v, k) => {
      newClientAccount.push(v);
    })

    setAccounts(newClientAccount);
  }

  return (
    <div className='flex flex-col h-full place-items-center justify-center overflow-y-scroll pt-48'>
      {accounts.map(account =>
      <div className={`my-5 w-96 flex flex-col place-items-center rounded-lg`} style={{backgroundColor: account.color}}>
        <div className='px-10 py-10'>
          <div>{account.name}</div>
          <div className='text-4xl font-bold'>${account.startingAmount + account.income - account.expenses}</div>
        </div>
        <div className='flex'>
          <div className='p-5 w-48 border-t border-r'>
            <div>Income</div>
            <div className='text-2xl font-bold'>${account.income}</div>
          </div>
          <div className='p-5 w-48 border-t'>
            <div>Expenses</div>
            <div className='text-2xl font-bold'>${account.expenses}</div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Accounts