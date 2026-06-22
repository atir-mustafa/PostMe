import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState("")

  const login = async(data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if(session) {
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return(
    <div className='m-4 flex items-center justify-center'>
      <div className='mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-violet-500'>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-40'>
            <Logo width='100px' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-violet-400'>
          Don&apos;t have an account?&nbsp;
          <Link 
          to="/signup" 
          className='font-medium text-primary text-violet-500 transition-all duration-200 hover:underline'>
            Sign up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <div className="w-full max-w-xl mx-auto">
          <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
              <Input 
              label="Email: " 
              className="inline-block mb-1 pl-1 text-slate-200"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Email address must be a valid address"
                }
              })}
              />
              <Input 
              label="Password: " 
              className="inline-block mb-1 pl-1 text-slate-200"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true
              })}
              />
              <Button
              type='submit'
              className='w-full bg-violet-500 hover:bg-violet-600 cursor-pointer'
              >Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login