import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const loginUser = JSON.parse(localStorage.getItem('user')) // getting the user from d local storage
  const navigate = useNavigate()

  useEffect(() => {
    if (loginUser) {
      navigate('/profile-page')
    }else{
      navigate('/')
    }
    console.log(loginUser)
  }, [])

  return (
    <section>
      <div className='flex'>

        <SideBar />

        <div className='w-[40%] left-[35%] items-center sticky mt-[8rem]'>
          <div className='w-[80%] items-center sticky left-[35%]'>

          <img 
                className='w-[50%] rounded-lg mb-4 items-center border-4 sticky'
                src='../img/profile.jpg' />

              <button className='top-[-1%] left-[45%] absolute hover:scale-105 transition-all '>
              <img className='w-[40%] rounded-full'
              src='../img/del.jpeg' />
              </button>

              <div className='font-mono text-2xl'>
                <h1>
                User Name: {loginUser.user.username}
                </h1>
                <h3 className='my-4'>
                  Email: {loginUser.user.email}
                </h3>
                </div>

                <button className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 my-6">
                  Upload Picture
                </button>

            </div>
            
        </div>

        {/* <div className='w-[45%] bg-slate-200 ml-[20rem] items-center sticky mt-[8rem]'>
          <div className='w-[80%] ml-[20rem] items-center sticky '>
             <h1 className='font-mono text-2xl'>
              Adepoju Zainab
              </h1>
              <h3 className='text-sm ml-[3rem] my-5'>
                @adeyinka
              </h3>

              <img 
              className='w-[30%] rounded-full mb-4 items-center border-4 border-slate-300 sticky'
              src='../img/profile.jpg' />

          </div>
        </div> */}
      </div>

      
    </section>
  )
}

export default ProfilePage