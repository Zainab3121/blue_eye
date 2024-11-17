import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaLockOpen } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const LoginPage = () => {
  const [action, setAction] = useState('Login')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const navigate = useNavigate()
  const loginUser = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (loginUser) {
      navigate('/dashboard')
    }else{
      navigate('/login-page')
    }
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()
    console.log({emailAddress, password})

    if (!emailAddress || !password) {
      toast.error('Please fill in both fields')
      return
    }else {
      
      const loginInfo = {
        email: emailAddress,
        password
      }
      setLoading(true)
      const response = await fetch('https://mytaskz.onrender.com/login', {
        method: 'POST', 
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response) setLoading(false)
      const data = await response.json()
      if (!response.ok){
        toast.error(data.message)
      }
      if (response.ok){
        localStorage.setItem('user', JSON.stringify(data))
  
         window.location.href = '/dashboard'
      }
      console.log({response, data})
    }

  
  }



  return (
    <section className='bg-gradient-to-b from-blue-800 to-purple-500 h-[100dvh]'>
      <div className="container m-auto max-w-2xl py-24">
      <div className=" p-2 mb-4  m-4 md:m-0">

      <form onSubmit={submitForm}>
        <div className='flex flex-col items-center'>
          <h2 className="text-4xl text-center font-semibold mb-6 text-white"> {action} </h2>
        </div>

        <div className='text-gray-50 font-lg mb-2 mt-4 shadow-md flex bg-indigo-600 
        items-center w-[400px] mx-auto px-4'>
          <FaUser className='text-[1.5rem] cursor-pointer' />

          <input
            type="text"
            id='emailAddress'
            className="bg-transparent outline-none p-2 placeholder:text-gray-50 w-full"
            placeholder="Email Address"
            onChange={(e) => setEmailAddress(e.target.value) }

          />
        </div>

          <div className="mt-14">
            <div className='text-gray-50 font-lg mb-2 shadow-md flex bg-indigo-600 
          items-center w-[400px] mx-auto px-4'>

              {
                passwordType === 'password'&& <FaLock className='cursor-pointer' onClick={() => setPasswordType('text')} />
              }

              {
                passwordType === 'text'&& <FaLockOpen onClick={() => setPasswordType('password')} />
              } 
        
              <input
                type={passwordType}
                id='password'
                className="bg-transparent outline-none p-2 placeholder:text-gray-50"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value) }
              />

            </ div>
          </div>

          {
            loading?

          <button className="block bg-indigo-300  text-white text-center mx-auto mt-14 p-2
          shadow-md rounded-full gray-700 w-[400px]">
          Loading...
          </button>

          :
          
          <button className="block bg-indigo-300  text-white text-center mx-auto mt-14 p-2
          shadow-md rounded-full gray-700 w-[400px]">
          Login
          </button>
          
          }


          <p className='pt-4  text-white text-center mx-auto'>
            Don't have an account? <Link to='/registration-page' className='text-blue-800 '>Register here</Link>
          </p>
      </form>

      </div>

      </div>

      <ToastContainer />

    </section>
  )
}

export default LoginPage

