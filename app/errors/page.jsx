import React from 'react'
import { ErrorIcon } from 'react-hot-toast'

function page() {
  return (
    <div className='w-full h-full flex items-center justify-center '>
        <div className='w-fit h-fit p-6 flex flex-col'>
            <h2 className='text-4xl font-bold text-neutral-600'>Ha ocurrido un error...</h2>
        
        <ErrorIcon/>
        </div>
    </div>
  )
}

export default page