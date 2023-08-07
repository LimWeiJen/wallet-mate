import React from 'react'

const Records = () => {
  return (
    <div className='overflow-y-scroll h-full'>
      <div className='flex justify-between border-primaryGreen m-5 border-2 p-5 bg-secondaryBlack rounded-lg'>
        <div>
          <div className='text-4xl font-bold'>Movie Fee</div>
          <div>Entertainment | Cash</div>
        </div>
        <div className='flex flex-col justify-center text-4xl'>+$500.00</div>
      </div>
    </div>
  )
}

export default Records