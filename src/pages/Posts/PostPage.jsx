import React from 'react'
import SideBar from '../../components/SideBar'
import { Link } from 'react-router-dom'
import GoBackButton from '../../components/GoBackButton'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const PostPage = () => {
  const loginUser = JSON.parse(localStorage.getItem('user')) // getting the user from d local storage
  const [loading, setLoading] = useState(false)
  const [AllPost, setAllPost] = useState()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)

  useEffect(() => {  // use to prevent unauthenticated users from accessing authenticated page
    getAllPost()
    if (loginUser) {
      navigate('/post-page')
    }else{
      navigate('/')
    }
  }, [])

  async function getAllPost() {
    setLoading(true)
    const response = await fetch('https://mytaskz.onrender.com/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginUser.token}`

      }
    })

    if (response) setLoading(false)
      const data = await response.json()
    console.log(data)
      if (!response.ok){
        toast.error(data.message)
      }
      if (response.ok){
        setAllPost(data)
        
      }
      console.log({response, data})
    }
    console.log(AllPost)

    async function deletePost() {
      setLoading(true)
      const response = await fetch(`https://mytaskz.onrender.com/tasks/${modal}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${loginUser.token}`
  
        }
      })
      if (response.ok){
        setLoading(false)
        setModal(false)
        toast.success('Post Successfully Deleted')
        getAllPost()
      }
      
    }
  
  
  

  return (
    <section>
      <div className='flex'>

        <SideBar />

        <div className='w-[80%] ml-auto items-center sticky mt-[5rem] '>

          <GoBackButton />        

         <div className='flex justify-between  w-[80%] my-5'>
          <div className='font-extrabold'>
              Posts
            </div>

            <Link to='/add-post' className='bg-gray-400 rounded p-2 text-white hover:scale-105 transition-all' style={{boxShadow: '0 0 10px  gray'}}>
              Create a Post
            </Link>
         </div>

         {
            loading?
              <img 
              className='w-[10%] mr-auto ml-[30rem] mt-[15rem]'
              src='../img/loader.gif' />

              :


         <table className='w-[80%] text-left text-sm rtl:text-left'>
              <thead className='text-[12px]'>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>data</th>
                  <th>Action</th>
                </tr>
              </thead>

              
              <tbody>
                {
                  AllPost?.todos?.map((post,index) => (
                    <tr className='border-b' key={index}>
                      <td>{index + 1}</td>
                      <td>{post.title}</td>
                      <td>{new Date( post.createdAt).toDateString()}</td>
                      <td>
                      <div className='flex gap-2'>

                        <Link to={`/edit-post/${post._id}`}
                        className='bg-blue-600 text-white px-4 text-sm py-1 rounded cursor-pointer hover:scale-105 transition-all'>
                          Edit
                        </Link>

                        <button onClick={() => setModal(post._id)} className='bg-red-600 text-white px-4 text-sm py-1 rounded cursor-pointer hover:scale-105 transition-all'>
                          Delete Post
                        </button>

                      </div>
                      </td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
              }

        </div>
      </div>

      {
            modal  &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
                <div className="bg-white md:w-[400px] w-[80%] flex flex-col fixed top-[50%] left-[50%] pb-[1rem] z-[100] login-modal" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className='flex items-center justify-between pt-3 px-6 w-full'>
                        <p className='text-[20px] font-[500]'>Confirm Delete</p>
                        <p onClick={() => setModal(false)} className='text-gray-500 text-[28px] cursor-pointer'>&times;</p>
                    </div>
                    <p className='text-center py-6'>Are you sure you want to delete this post?</p>
                    <div className='flex justify-between w-[80%] mx-auto gap-4 '>
                      <button className='w-full bg-red-600 text-white px-4 text-sm py-1 rounded cursor-pointer'>No</button>
                      <button onClick={deletePost} className='w-full bg-blue-600 text-white px-4 text-sm py-1 rounded cursor-pointer'>Yes</button>
                    </div>
                    {
                      modal
                    }
                </div>
            </div>
        }

<ToastContainer />
    </section>
  )
}

export default PostPage