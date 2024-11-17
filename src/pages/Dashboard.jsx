import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { FaSignsPost } from 'react-icons/fa6'
import { FaHeadSideMask } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const loginUser = JSON.parse(localStorage.getItem('user')) // getting the user from d local storage
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [AllPost, setAllPost] = useState()
  
  useEffect(() => {  // use to prevent unauthenticated users from accessing authenticated page
    getAllPost()
    if (loginUser) {
      navigate('/dashboard')
    }else{
      navigate('/login-page')
    }
  }, [])

  async function getAllPost() {
    const response = await fetch('https://mytaskz.onrender.com/', {
      method: 'GET'
    })

    if (response) setLoading(false)
      const data = await response.json()
      if (!response.ok){
        toast.error(data.message)
      }
      if (response.ok){
        setAllPost(data)
        
      }
      console.log({response, data})
    }
    console.log(AllPost)
    
  return  (
    <section>
      <div className='flex'>

       <div>
        <SideBar />
       </div>

        <div className='w-[80%] h-[100dvh] ml-auto items-center sticky mt-[5rem] mr-8 py-[2rem]'>
          <div className='flex'>

             <div className='gap-8 bg-slate-300 absolute rounded font-bold left-[6%]
              text-gray-600'
             style={{boxShadow: '0 0 10px  gray'}}>
              <h1 className='text-3xl text-center mt-4'>
                  All Posts
                </h1>

              <div className='flex gap-12 items-center m-12 text-5xl'>
                <FaSignsPost />
                <h2 className='text-4xl'>
                  {AllPost?.length}
                </h2>
              </div>
             </div>

             <div className='bg-slate-300 absolute rounded font-bold left-[55%]
              text-gray-600'
             style={{boxShadow: '0 0 10px  gray'}}>
              <h1 className='text-3xl text-center mt-4'>
                  All Users
                </h1>

              <div className='flex gap-12 items-center m-12 text-5xl'>
                <FaHeadSideMask />
                <h2 className='text-4xl'>
                  23
                </h2>
              </div>
             </div>

          </div>

          <div className='w-[100%] ml-auto items-center absolute top-[50%] left-[6%]'>       

            <div className='font-extrabold mb-4'>
              Latest Posts
            </div>

            <table className='w-[80%] text-left text-sm rtl:text-left mb-5'>
              <thead className='text-[12px]'>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>data</th>
                  <th>Action</th>
                </tr>
              </thead>

              {
                loading?

              <tbody>
                {
                  AllPost?.map((post,index) => (
                    <tr className='border-b' key={index}>
                      <td>{index + 1}</td>
                      <td>{post.title}</td>
                      <td>{new Date( post.createdAt).toDateString()}</td>
                      <td>
                      <button className='bg-blue-600 text-white px-4 text-sm mb-4 py-1 rounded cursor-pointer'>
                        loading...
                      </button>
                      </td>

                    </tr>
                  ))
                }
              </tbody>

              :

              <tbody>
                {
                  AllPost?.map((post,index) => (
                    <tr className='border-b' key={index}>
                      <td className='py-1'>{index + 1}</td>
                      <td>{post.title}</td>
                      <td>{new Date( post.createdAt).toDateString()}</td>
                      <td>
                      <Link to={`/view-post/${post._id}`} className='bg-blue-600 text-white px-4 text-sm py-1 rounded cursor-pointer'>
                        View Post
                      </Link>
                      </td>

                    </tr>
                  ))
                }
              </tbody>
              }

            </table>

        </div>

        </div>
      </div>

      
    </section>
  )
}

export default Dashboard