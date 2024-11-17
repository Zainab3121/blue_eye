import Registration from '../components/Registration'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const loginUser = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    if (loginUser) {
      navigate('/dashboard')
    }else{
      navigate('/')
    }
  }, [])

  return (
    <section className='bg-slate-50'>
      <nav className='flex justify-between w-full py-[2rem] px-[1.5rem] md:px-[6rem]'>
        <img src='../img/EyeLogo.png' />

        <div className='flex justify-between gap-4'>
          <button className='bg-gray-800 text-white rounded-full px-[2rem] '>
          <Link to='/login-page'>
            Login
          </Link>
          </button>

          <button className='bg-gray-800 text-white rounded-full px-[2rem] '>
          <Link to='/registration-page'>
            Get Started
          </Link>
          </button>
        </div>

      </nav>

      <section className='flex justify-between w-full py-[2rem] px-[1.5rem] flex-col lg:flex-row md:px-[6rem]
        items-center'>
        <div className='w-[95%] lg:w-[48%] text-center lg:text-left'>
          <h1 className='text-gray-800 font-extrabold font-sans text-2xl md:text-5xl leading-[4rem] mb-7'>
            Maximize skill, minimize budget
          </h1>
          <h2 className='text-gray-500 text-lg md:text-xl leading-[2rem] mb-7'>
            Our modern courses across a range of in-demand skills will give you the knowledge you need to live the life you want.
          </h2>

          <button className='bg-gray-800 text-white rounded-full px-[1.5rem] 
          bg-gradient-to-b from-orange-600 to-pink-500 py-[10px] '>
          <Link to='/registration-page'>
            Get Started
          </Link>
          </button>
        </div>

        <img className=' w-full lg:w-[50%] md:mt-[0rem] mt-[4rem]' 
        src="../img/NewWoman.png" alt="image" />

        {/* <div className=''>
          <div className='absolute right-[20%] rounded-full bg-gradient-to-b from-orange-600 to-pink-500 p-[13rem] '></div>  
          <img className='w-[25%] rounded-full absolute bottom-[25%] left-[65%] z-10'
            src='../img/woman.jpeg' />
          <div className='absolute right-[1%] rounded-full bg-gradient-to-b from-purple-600 to-pink-500  p-[13rem]'></div>
        <div className='bg-white rounded-lg px-[2rem] py-[10px] z-10 absolute right-[7%] bottom-[60%]  '>
            <h2 className='text-gray-500 text-lg'>
              Members
            </h2>
            <h1 className='text-gray-800 font-extrabold font-sans text-2xl leading-[3.5rem] '>
              29K
            </h1>
          </div>

          <div className='bg-white rounded-lg px-[2rem] py-[10px] z-10 absolute right-[30%] bottom-[30%]' style={{boxShadow: '0 6px 0px  pink'}}>
            <h2 className='text-gray-500 text-lg'>
              Course hours
            </h2>
            <h1 className='text-gray-800 font-extrabold font-sans text-2xl leading-[3.5rem] '>
              1,451K
            </h1>
          </div>
        </div> */}

      </section>

      <div className='flex w-full py-[5rem] px-[1.5rem] md:px-[4.5rem] flex-col md:flex-row gap-4 justify-center'>
        <div className='md:w-[30%] w-full bg-gradient-to-b from-orange-600 to-pink-500 rounded-lg px-[2rem] py-[2rem]
         'style={{boxShadow: '0 0 10px  pink'}}>
          <h1 className=' text-white font-bold font-sans text-4xl leading-[2.5rem]'>
            Check out our most popular courses!
          </h1>
        </div>

        <div className='md:w-[30%] w-full bg-white rounded-lg px-[2rem] py-[2rem]'style={{boxShadow: '0 0 6px  gray'}}>
          <h1 className=' text-gray-800 font-extrabold font-sans text-2xl mb-4'>
            Animation
          </h1>

          <h3 className='text-gray-500 text-lg mb-8'>
            Learn the latest animation techniques to create stunning motion design and captivate your audience.
          </h3>

          <Link to='/registration-page' className='text-pink-600 font-bold'>
            Get Started
          </Link>

        </div>

        <div className='md:w-[30%] w-full bg-white rounded-lg px-[2rem] py-[2rem]'style={{boxShadow: '0 0 6px  gray'}}>
          <h1 className=' text-gray-800 font-extrabold font-sans text-2xl mb-4'>
            Design
          </h1>

          <h3 className='text-gray-500 text-lg mb-8'>
            Create beautiful, usable interfaces to help shape the future of how the web looks.
          </h3>

          <Link to='/registration-page' className='text-pink-600 font-bold'>
            Get Started
          </Link>
        </div>
      </div>

      <footer className='bg-gray-800 p-[3rem] flex justify-between w-full py-[2rem] px-[1.5rem] md:px-[6rem] items-center'>
        <div className=''>
            <h2 className='font-sans text-white my-auto text-2xl font-black'>
              BlueEye
            </h2>
          </div>

          <button className='bg-gray-800 text-white rounded-full px-[1.5rem] 
          bg-gradient-to-b from-purple-600 to-pink-500 py-[10px] '>
            <Link to='/registration-page'>
              Get Started
            </Link>
          </button>
      </footer>
    </section>
  )
}

export default HomePage;

