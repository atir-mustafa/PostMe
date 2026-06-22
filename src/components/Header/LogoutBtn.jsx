import React from 'react';
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return(
    <div className='text-center'>
      <button className='inline-block px-3 py-2 duration-200 text-slate-200 hover:bg-violet-500 hover:text-white rounded-full' onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn