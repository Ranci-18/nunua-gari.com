import React from 'react'

export default function Header() {
  return (
    <div className='flex flex-col justify-between items-center bg-white p-4 shadow-md'>
      <div>
        <h3 className='text-2xl'>nunua-gari</h3>
      </div>
      <div className='flex gap-4'>
        <span className='mr-2'>Sell your car</span>
        <span className='ml-2'>Contact us</span>
      </div>
    </div>
  )
}
