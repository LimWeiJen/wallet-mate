import React from 'react'

const NewAccount = () => {
  return (
    <div className='h-full flex flex-col justify-center place-items-center'>
      <input className='p-3 w-11/12 font-bold bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Name' />
      <input className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg' type="text" placeholder="Account Type" />
      <input className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223d3d1e] rounded-lg' type="text" placeholder="Color" />
      <input className='p-3 w-11/12 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="number" placeholder='Starting Amount' />
      <button className='gradient-1 w-11/12 my-3 p-3 text-2xl font-bold rounded-lg transition-all hover:rotate-1 hover:scale-105'>Confirm</button>
    </div>
  )
}

export default NewAccount