import React from 'react'
import SideBar from '../../components/SideBar'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const EditPostPage = () => {
  const {id} = useParams() //it is use to get extra parameters from the url
  const loginUser = JSON.parse(localStorage.getItem('user')) // getting the user from d local storage
  const navigate = useNavigate()
  const [title, setTitle ] = useState('') // initial state
  const [description, setDescription ] = useState('')
  const [ loading, setLoading ] = useState(false)


  useEffect(() => {  // use to prevent unauthenticated users from accessing authenticated page
    getPost()
    if (loginUser) {
      navigate(`/edit-post/${id}`)
    }else{
      navigate('/login-page')
    }
  }, [])

  async function getPost() {
    const response = await fetch(`https://mytaskz.onrender.com/tasks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginUser.token}`
      }
    })
    const data = await response.json()
    console.log(data)

    if(response.ok){
      setTitle(data.title)
      setDescription(data.description)
    }
    
  }

  async function updatePost() {
    if (!title || !description) {
      toast.error('Please fill in both fields')
      return
    }else {
      
      setLoading(true)

      const response = await fetch(`https://mytaskz.onrender.com/tasks/${id}`, {
        method: 'PUT', 
        body: JSON.stringify({title, description}),
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
          toast.success('Post Successfully Updated')
        }
        console.log({response, data}) 
    }

    
  }

  console.log(id)
  return (
    <section>
      <div className='flex '>

       <div>
        <SideBar />
       </div>

        <div className='w-[80%] ml-auto items-center mt-[5rem] sticky'>
          <div className='flex gap-2 items-center text-xs pt-2 mb-4 cursor-pointer'>
              <FaArrowCircleLeft className='text-xs ' />
              <Link to='/post-page'>
                  Go back to posts
              </Link> 
          </div>
            
          <div>
            <h1 className='font-extrabold'>
                Edit Post
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
                  value={title}
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
                  value={description}
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
                loading...
              </button>
            </div>
            :
            <div className='mt-8'>
              <button
                onClick={updatePost}
                className="bg-sky-950 hover:bg-sky-900 text-white 
                font-bold py-2 px-4 rounded-full w-[70%] focus:outline-none focus:shadow-outline"
              >
                Update Post
              </button>
            </div>
            }


          </div>

        </div>
      </div>

      <ToastContainer />
      
    </section>
  )
}

export default EditPostPage