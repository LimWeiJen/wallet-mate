'use client'

import { context } from '@/app/contexts';
import React, { useContext } from 'react'

const Records = () => {
  const ctx = useContext(context);

  return (
    <div className='overflow-y-scroll h-full'>
      {ctx?.transactions.map(transaction => 
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