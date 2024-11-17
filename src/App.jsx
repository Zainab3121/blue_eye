import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PostPage from './pages/Posts/PostPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useState } from 'react'
import EditPostPage from './pages/Posts/EditPostPage'
import AddPostPage from './pages/Posts/AddPostPage'
import ViewPostPage from './pages/Posts/ViewPostPage'

const App = () => {
  const [mode, setMode] = useState("homeLightMode")

  function changemode(){

    if(mode === 'homeDarkMode'){
      setMode('homeLightMode')
    }else{
      setMode('homeDarkMode')
    }
    return mode
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
     <Route  path='/' element={<MainLayout />}>
       <Route index element={<HomePage />} />
       <Route path='/registration-page' element={<RegistrationPage />} />
       <Route path='/login-page' element={<LoginPage />} />
       <Route path='/dashboard' element={<Dashboard />} />
       <Route path='/post-page' element={<PostPage />} /> 
       <Route path='/profile-page' element={<ProfilePage />} />
       <Route path='/settings' element={<SettingsPage />} />
       <Route path='/edit-post/:id' element={<EditPostPage />} />
       <Route path='/add-post' element={<AddPostPage />} /> 
       <Route path='/view-post/:id' element={<ViewPostPage />} /> 
    </Route>
    )
 ) 

  return <RouterProvider router={router} />
}

export default App