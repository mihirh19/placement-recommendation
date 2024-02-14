'use client'
import React, { useState } from 'react'
import styles from '../app/login/page.module.css'
import { signIn } from 'next-auth/react'
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { Button, Input } from "@nextui-org/react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {Spinner} from "@nextui-org/react";

const LoginUser = () => {
   const [allState, setAllState] = useState({
      userInfo : {username: '', password: ''},
      loading: false,
      isVisible: false
   })
   const router = useRouter()
   const toggleVisibility = () => setAllState({ ...allState, isVisible: !allState.isVisible });

   const handleSubmit = async (e) => {
      e.preventDefault()
      setAllState({ ...allState, loading: true })
      const res = await signIn('credentials', {
         username: allState.userInfo.username,
         password: allState.userInfo.password,
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
            setAllState({ ...allState, loading: false })
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
            setAllState({ ...allState, loading: false })
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

                     <Input
                        isClearable={"true"}
                        type='text'
                        variant='faded'
                        label='Username'
                        id='username'
                        value={allState.userInfo.username}
                        onChange={(e) => setAllState({ ...allState, userInfo: { ...allState.userInfo, username: e.target.value } })}
                        onClear={(e) => setAllState({ ...allState, userInfo: { ...allState.userInfo, username: "" } })} />

                  </div>
                  <div>

                     <Input

                        variant='faded'
                        label='Password'
                        value={allState.userInfo.password}
                        id='password'
                        onChange={(e) => setAllState({ ...allState, userInfo: { ...allState.userInfo, password: e.target.value } })}

                        endContent={
                           <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                              {allState.isVisible ? <LuEye /> : <LuEyeOff />}
                           </button>
                        }
                        type={allState.isVisible ? "text" : "password"}

                     />
                  </div>



                  <Button onClick={handleSubmit} style={{ backgroundColor: '#F55734', color: '#FFFFFF' }} className='w-full' type='submit' isDisabled={allState.loading}>
                     {allState.loading ? <Spinner size={"sm"} color={'default'}/>: "Login"}
                  </Button>
               </div>
            </div>
         </div></form>
   )
}

export default LoginUser