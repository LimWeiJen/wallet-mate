'use client'

import React, { useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { context } from '@/app/contexts'

ChartJS.register(ArcElement, Tooltip, Legend)

const Reports = () => {
  const ctx = useContext(context);

  return (
    <div className='overflow-y-scroll h-full p-5'>
      <div className='text-4xl font-bold relative w-full h-60 mb-5'>
        <h1>Income</h1>
        <Doughnut data={ctx?.incomeChartData!} width={"50%"} options={{maintainAspectRatio: false}}/>
      </div>
      <div className='text-4xl font-bold relative w-full h-60 my-10'>
        <h1>Expenses</h1>
        <Doughnut data={ctx?.expensesChartData!} width={"50%"} options={{maintainAspectRatio: false}}/>
      </div>
      <div>
        <h1 className='text-4xl font-bold text-center p-5'>Income And Expenses Report</h1>
        <div className='bg-secondaryBlack p-5 my-2 text-xl'>
          <div className='flex justify-between font-bold'>
            <h1>Total Income</h1>
            <p>${ctx?.income}</p>
          </div>
          {ctx?.incomeChartData!.datasets[0].data.map((v, i) => 
            <div className='flex justify-between opacity-50'>
              <h1>{ctx?.incomeChartData!.labels![i]}</h1>
              <p>${v}</p>
            </div>
          )}
        </div>
        <div className='bg-secondaryBlack p-5 my-2 text-xl'>
          <div className='flex justify-between font-bold'>
            <h1>Total Expenses</h1>
            <p>${ctx?.expenses}</p>
          </div>
          {ctx?.expensesChartData!.datasets[0].data.map((v, i) => 
            <div className='flex justify-between opacity-50'>
              <h1>{ctx?.expensesChartData!.labels![i]}</h1>
              <p>${v}</p>
            </div>
          )}
        </div>
        <div className='bg-secondaryBlack p-5 text-xl'>
          <div className='flex justify-between font-bold'>
            <h1>Cash Flow</h1>
            <p>{ctx?.cashFlow! > 0 ? '+' : '-'}${Math.abs(ctx?.cashFlow!)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports