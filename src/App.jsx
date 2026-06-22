import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header, Sidebar } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-16 md:pb-0">
            <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  ) : null;
}

export default App