import React from 'react'
import SideBar from '../../components/SideBar'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const AddPostPage = () => {
  const [title, setTitle ] = useState('') // initial state
  const [description, setDescription ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const loginUser = JSON.parse(localStorage.getItem('user'))
  console.log(loginUser.token)

  const postInfo = {
    title,
    description
  }
  
  async function addPost(e) {
    e.preventDefault()
    
    if (!title || !description) {
      toast.error('Please fill in both fields')
      return
    }else {
      
      setLoading(true)

      const response = await fetch('https://mytaskz.onrender.com/add-todo', {
        method: 'POST', 
        body: JSON.stringify(postInfo),
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
          toast.success('Post Successfully Created')
        }
        console.log({response, data}) 
    }

    
  }


  return (
    <section>
      <div className='flex '>

       <div>
        <SideBar />
       </div>

        <div className='w-[80%] ml-auto items-center sticky'>
          <div className='flex gap-2 items-center text-xs pt-2 mb-4 cursor-pointer'>
              <FaArrowCircleLeft className='text-xs ' />
              <Link to='/post-page'>
                  Go back to posts
              </Link> 
          </div>
            
          <form onSubmit={addPost}>
            <h1 className='font-extrabold'>
                Add Post
            </h1>

            <div className="mb-4 mt-4">
                <label className="block text-gray-700 mb-2 text-sm "
                  >TITLE</label
                >
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-[70%] py-2 px-3 mb-2 bg-slate-200 text-sm outline-none"
                  placeholder="eg. Full Stack Developer"
                  required
                  onChange={(e) => setTitle(e.target.value) }
                />
            </div>

            <div className="mb-4 mt-4">
                <label className="block text-gray-700 mb-2 text-sm "
                  >Body</label
                >
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-[70%] py-2 px-3  bg-slate-200 text-gray-700 mb-2 text-sm outline-none "
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  onChange={(e) => setDescription(e.target.value) }
                ></textarea>
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

            <div className='mt-8'>
            <button 
              className="bg-sky-950 hover:bg-sky-900 text-white 
              font-bold py-2 px-4 rounded-full w-[70%] focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post
            </button>
          </div>

            }

          </form>

        </div>
      </div>

      <ToastContainer />
      
    </section>
  )
}

export default AddPostPage