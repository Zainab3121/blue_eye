import React from 'react'
import { useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
   

const RegistrationPage = () => {
  const [action, setAction] = useState('Sign Up')
  
  const [emailAddress, setEmailAddress] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [allcountries, setAllcountries] = useState([])
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/ 
  const [loading, setLoading] = useState(false)
  const loginUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (loginUser) {
      navigate('/dashboard')
    }else{
      navigate('/registration-page')
    }
  }, [])


  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()

    if (!emailAddress || !userName || !password || !ConfirmPassword) {
      toast.error('Please fill in all fields')
      return
    }else if (password !== ConfirmPassword){
      toast.error('Please both password should match')
      return
    }else if (!password.match(passwordRegex)){
      toast.error('Password should contain at least 8 characters, most have special character, a number, an uppercase and a lowercase character')
      return
    }

    const newSignUp = {
      email: emailAddress,
      username: userName,
      password
    }
    setLoading(true)
    const response = await fetch('https://mytaskz.onrender.com/signup', {
      method: 'POST', 
      body: JSON.stringify(newSignUp),
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
    
    // localStorage.setItem('user', JSON.stringify(newSignUp))

    // window.location.href = '/dashboard'
}

  async function getCountries(){
    const response = await fetch(`https://restcountries.com/v3.1/all`, {
        method: "GET"
    })
    const data = await response.json() 

    const sortedData = data?.sort((a,b) => {
      const nameA = a.name.common.toLowerCase()
      const nameB = b.name.common.toLowerCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0

    })

    setAllcountries(sortedData)
  
}

useEffect(() => {
  getCountries()
  //write your code to perform an action here
},[])


  return (
    <section className=" bg-gradient-to-b from-blue-800 to-purple-500">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">

            <form onSubmit={submitForm}>
              
              <div className='flex flex-col items-center gap-2'>
                <h2 className="text-3xl text-center font-semibold mb-6 text-blue-800"> {action} </h2>
                <h2 className='w-16 min-h-2 bg-blue-800 rounded-lg text-center'></h2>
              </div>

              <div className="mb-4">
              <label
                htmlFor="email_address"
                className="block text-gray-700 font-bold mb-2"
                >Email Address</label
              >
              <input
                type="email"
                id='emailAddress'
                className="border rounded w-full py-2 px-3"
                placeholder="adepojuzainab@gmail.com"
                onChange={(e) => setEmailAddress(e.target.value) }

              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold mb-2"
                >User Name</label
              >
              <input
                type="text"
                id='UserName'
                className="border rounded w-full py-2 px-3"
                placeholder="User Name"
                onChange={(e) => setUserName(e.target.value) }
              />
            </div>

            <div className="mb-4">
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


            <div className="mb-4">
              <label
                htmlFor="confirm_password"
                className="block text-gray-700 font-bold mb-2"
                >Confirm Password</label
              >
              <div className='flex border rounded w-full py-2 px-3'>
                <input
                  type={passwordType}
                  id='confirmPassword'
                  className="w-full outline-none"
                  placeholder="********"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value) }
                />

                {
                  passwordType === 'password'&& <FaEye className='cursor-pointer' onClick={() => setPasswordType('text')} />
                }

                {
                  passwordType === 'text'&& <FaEyeSlash onClick={() => setPasswordType('password')} />
                }
                

              </div>
            </div>

            {/* <div className='m-4 '>
                    <select  
                    name="keys" id="keys" 
                    className="w-full h-10 pl-4 pr-[3rem]"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value) }

                     >

                      <option value="" className='w-full border py-2 px-3'>

                        --Select a country--
                        
                      </option> 

                     {
                      allcountries?.map(country => {

                        return(
                          <option key={country.name.common} className='w-full' 
                          value={ country.name.common }>{ country.name.common }</option>

                        )
                      }) 
                     }
                        
                    </select>
                </div>  */}

                {/* <div className='m-4 cursor-pointer'>
                  Lost Password? <span> Click Here! </span>
                </div> */}


              <div className='flex-col justify-center text-center gap-10'>

                {
                  loading?  
                  <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white 
                  font-bold py-2 px-4 rounded-full w-56 focus:outline-none focus:shadow-outline cursor-not-allowed"
                >
                  Loading...
                </button>
                :

                <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white 
                font-bold py-2 px-4 rounded-full w-56 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>


                }
        
                <p className='pt-4'>
                  Already have an account? <Link to='/login-page' className='text-blue-800 '>Login here</Link>
                </p>
            
            </div>
            
            </form>

          </div>

        </div>

        <ToastContainer />

    
    </section>
  )
}

export default RegistrationPage