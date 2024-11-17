import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGolfBall } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'
import { FaMoon, FaSignOutAlt, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
  const [dropDown, setDropDown] = useState (false)
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  
  function Logout(){
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div className={`dark:bg-black ${darkMode && "dark"}`}>
    <nav className='flex justify-between w-full bg-gray-800 py-2 px-6 fixed z-10 dark:bg-black'>

        <div className='cursor-pointer my-auto'>
          <Link to='/dashboard' className='flex gap-2'>
          <img 
              className='w-[18%] rounded-full'
              src='../img/Logo.jpeg' />
              <h2 className='font-mono italic text-white my-auto text-2xl'>
                BlueEye
                </h2>
          </Link>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='text-white'>
             {/* {
              mode === 'homeDarkMode'?
                  <div onClick={changemode} className="flex justify-between items-center gap-2 cursor-pointer">
                      <FaSun />
                      <h3>Light Mode</h3>
                  </div>
              :
                  <div onClick={changemode} className="flex justify-between items-center gap-2 cursor-pointer">
                      <FaMoon />
                      <h3>Dark Mode</h3>
                  </div>

                }  */}

            <button onClick={toggleDarkMode} 
            className='p-2 rounded-md font-semibold border-2 border-dark hover:scale-105 transition-all duration-300'>
              {darkMode ? "Light" : "Dark" } Mode
            </button>
          </div>

          { dropDown === 'Logout' &&
            <div className='bg-gray-300 p-4 rounded-lg absolute top-[70px] right-0 z-[1000]' style={{boxShadow: '0  0 5px gray'}}>
            <div className='flex gap-4 items-center cursor-pointer' onClick={Logout}>
              <FaSignOutAlt />
              <p>Logout from your application</p>
            </div>
          </div>
          }

          <FaGolfBall onClick={() => setDropDown(dropDown === 'Logout' ? false : 'Logout')} 
          className='bg-gradient-to-b from-blue-800 to-purple-500 text-4xl rounded-full 
          cursor-pointer hover:scale-105 transition-all'/>
          
        </div>


      </nav>
    </div>
      
  )
}

export default NavBar