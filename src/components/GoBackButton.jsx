import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'

const GoBackButton = () => {
  return (
    <div>
        <div className='flex gap-2 items-center text-xs pt-2 mb-4 cursor-pointer'>
            <FaArrowCircleLeft className='text-xs ' />
            <button>
                Go back 
            </button> 
        </div>
    </div>
  )
}

export default GoBackButton