'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { signIn } from 'next-auth/react'
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { Button, Input } from "@nextui-org/react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {

  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false
    }).then((res) => {
      if (res.error) {
        toast.error("Invalid Username or password", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } else {
        toast.success("Successful SignIn", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push('/dashboard')
      }
    })


  }



  return (
    <form className={styles.bg} >
      <div className={styles.loginContainer} style={{ opacity: 1 }}>
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login to your account
            </p><div>
              {/* <label className="block mb-2 text-sm font-medium text-gray-900">
                Your username
              </label> */}
              {/* <input
                onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                placeholder="JohnDoe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" /> */}
              <Input
                isClearable={"true"}
                type='text'
                variant='faded'
                label='Username'
                id='username'
                value={userInfo.username}
                onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                onClear={(e) => setUserInfo({ ...userInfo, username: "" })} />

            </div>
            <div>
              {/* <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label> */}

              <Input

                variant='faded'
                label='Password'
                value={userInfo.password}
                id='password'
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}

                endContent={
                  <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                    {isVisible ? <LuEye /> : <LuEyeOff />}
                  </button>
                }
                type={isVisible ? "text" : "password"}

              />
              {/* <input
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" /> */}
            </div>


            {/* <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
              Login
            </button> */}
            <Button onClick={handleSubmit} color="primary" className='w-full' type='submit'>
              Login
            </Button>
          </div>
        </div>
      </div></form>
  )
}

export default Login