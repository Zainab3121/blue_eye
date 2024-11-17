import React from 'react'
import { Link } from 'react-router-dom'
import { FaIcons } from 'react-icons/fa'
import { FaSignsPost } from 'react-icons/fa6'
import { FaHeadSideMask } from 'react-icons/fa'
import { FaTools } from 'react-icons/fa'
import { CiSearch } from "react-icons/ci";

const SideBar = () => {
  return (
    <div className='bg-slate-200 fixed h-[100dvh] w-1/6 pt-[6rem]'>
          {/* <div className="flex justify-between font-medium "
            style={{boxShadow: '0  1px 0 gray'}}>
            <CiSearch className='text-black cursor-pointer font-bold ' />
            <input type="text" onChange={e => setSearch(e.target.value)} 
            placeholder=" Type a command or search..." className="text-xs bg-transparent text-gray-500 pr-[7.5rem]
            outline-none"/>
        </div> */}

         <div style={{boxShadow: '0  1px 0 gray'}}>
          <div className='text-xl text-gray-500 p-3 font-mono'>
              Suggestions
            </div>

            <div className='flex gap-2 items-center pt-0 p-3 text-gray-700 text-sm my-4 hover:scale-105 transition-all '>
              <FaIcons />
            <Link to='/dashboard'>
                  Dashboard
            </Link>
            </div>

            <div className='flex gap-2 items-center pt-0 p-3 text-gray-700 text-sm mb-4 hover:scale-105 transition-all'>
              <FaSignsPost />
            <Link to='/post-page'>
                  Post
            </Link>
            </div>

         </div>

         <div>
          <div className='text-xl font-mono text-gray-500 p-3'>
              Settings
            </div>

            <div className='flex gap-2 items-center pt-0 p-3 text-gray-700 text-sm my-4 hover:scale-105 transition-all'>
              <FaHeadSideMask />
            <Link to='/profile-page'>
                  Profile
            </Link>
            </div>

            <div className='flex gap-2 items-center pt-0 p-3 text-gray-700 text-sm hover:scale-105 transition-all'>
              <FaTools />
            <Link to='/settings'>
                  Settings
            </Link>
            </div>
         </div>

        </div>
  )
}

export default SideBar