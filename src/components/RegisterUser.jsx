
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const RegisterUser = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')



   const handleSubmit = async (e) => {

      e.preventDefault()

      if (!username || !password) {
         alert('Please fill in all fields')
         return
      }

      try {
         const res = await fetch("/api/userExists", {
            method: "POST",
            body: JSON.stringify({ username }),
            headers: { "Content-Type": "application/json" },
         })
         const { userExists } = await res.json()

         if (userExists) {
            alert('Username already exists')
            return
         }


         const resp = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
         })
         if (resp.ok) {
            const form = e.target
            form.reset()

         } else {
            console.log("user registered failed");
         }
         if (data) {
            const form = e.target
            form.reset()
         }
         else {
            console.log("user registered failed");
         }
      } catch (err) {

      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                     Create an account


                  </p><div>
                     <label className="block mb-2 text-sm font-medium text-gray-900">
                        Your username
                     </label>
                     <input onChange={e => setUsername(e.target.value)} placeholder="JohnDoe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" />
                  </div>
                  <div>
                     <label className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                     </label>
                     <input onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" />
                  </div>

                  <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                     Create an account
                  </button>

               </div>
            </div>
         </div></form>
   )
}

export default RegisterUser