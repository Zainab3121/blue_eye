import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const MainLayout = ({changemode, mode}) => {
const loginUser = JSON.parse(localStorage.getItem('user'))
console.log(loginUser)

  return (
    <>
      {
        loginUser && <NavBar changemode={changemode} mode={mode} />
      }
        
        <Outlet />
    </>
  )
}

export default MainLayout