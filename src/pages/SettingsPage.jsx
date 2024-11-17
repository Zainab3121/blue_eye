import React from 'react'
import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const loginUser = JSON.parse(localStorage.getItem('user'))
  const [userName, setUserName] = useState(loginUser.user.username)
  const [password, setPassword] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
  const navigate = useNavigate('')
  
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    console.log(loginUser)
    if (loginUser) {
      navigate('/settings')
    }else{
      navigate('/')
    }
  }, [])

  const updatePassword = async (e) => {
    e.preventDefault()

    if ( !userName ) {
      toast.error('Please fill in all fields')
      return
    // }else if (password !== ConfirmPassword){
    //   toast.error('Please both password should match')
    //   return
    // }else if (!password.match(passwordRegex)){
    //   toast.error('Password should contain at least 8 characters, most have special character, a number, an uppercase and a lowercase character')
    //   return
    }

    const updateInfo = {
      email:loginUser.user.email, 
      username: userName,
      password,
      new_password: NewPassword
    }
    console.log(updateInfo,`https://mytaskz.onrender.com/update-profile/${loginUser.user._id}`)
    setLoading(true)
    const response = await fetch(`https://mytaskz.onrender.com/update-profile/${loginUser.user._id}`,{
      method: 'PUT', 
      body: JSON.stringify(updateInfo),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginUser.token}`
      }
    })
    if (response) setLoading(false)
    const data = await response.json()
    if (!response.ok){
      toast.error(data.message)
    }
    if (response.ok){
      toast.success('Profile Successfully Updated!')
    }
    console.log({response, data})
}



  return (
    <section>
      <div className='flex'>

        <SideBar />

        <div className='w-[80%] mr-auto ml-[10rem] items-center sticky mt-[6rem]'>
          
        <div className='w-[80%] ml-auto items-center sticky'>
            
          <form onSubmit={updatePassword}>
            <h1 className='font-extrabold mb-9'>
                Update Profile
            </h1>

            <div className="mb-9">
              <label
                htmlFor="email_address"
                className="block text-gray-700 font-bold mb-2"
                >Email Address</label
              >
              <input
                type="email"
                id='emailAddress'
                className="border rounded w-full py-2 px-3 outline-none"
                placeholder="adepojuzainab@gmail.com"
                // onChange={(e) => setEmailAddress(e.target.value) }
                value={loginUser.user.email}
              />
            </div>

            <div className="mb-9">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold mb-2"
                >User Name</label
              >
              <input
                type="text"
                id='UserName'
                className="border rounded w-full py-2 px-3 outline-none"
                placeholder="User Name"
                onChange={(e) => setUserName(e.target.value) }
                value={userName}
              />
            </div>

            <div className="mb-9">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
                >Password</label
              >
              <div className='flex border rounded w-full py-2 px-3'>
                <input
                  type={passwordType}
                  id='password'
                  className="w-full outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }
                />

                {
                  passwordType === 'password'&& <FaEye className='cursor-pointer' onClick={() => setPasswordType('text')} />
                }

                {
                  passwordType === 'text'&& <FaEyeSlash onClick={() => setPasswordType('password')} />
                }

              </ div>
            </div>


            <div className="mb-9">
              <label
                htmlFor="new_password"
                className="block text-gray-700 font-bold mb-2"
                >New Password</label
              >
              <div className='flex border rounded w-full py-2 px-3'>
                <input
                  type={passwordType}
                  id='NewPassword'
                  className="w-full outline-none"
                  placeholder="********"
                  onChange={(e) => setNewPassword(e.target.value) }
                />

                {
                  passwordType === 'password'&& <FaEye className='cursor-pointer' onClick={() => setPasswordType('text')} />
                }

                {
                  passwordType === 'text'&& <FaEyeSlash onClick={() => setPasswordType('password')} />
                }
                

              </div>
            </div>

            {
              loading?

              <div className='mt-8'>
              <button 
                className="bg-sky-950 hover:bg-sky-900 text-white cursor-not-allowed
                font-bold py-2 px-4 rounded-full w-[70%] focus:outline-none focus:shadow-outline"
              >
                Loading...
              </button>
            </div>

            :

            <div className='mt-9 ml-[10rem] '>
            <button 
              className="bg-sky-950 hover:bg-sky-900 text-white 
              font-bold py-2 px-4 rounded-full w-[70%] focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Password
            </button>
          </div>

            }

          </form>

        </div>
        </div>
      </div>

      <ToastContainer />

      
    </section>
  )
}

export default SettingsPage