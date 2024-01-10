import React from 'react'
import Image from 'next/image'
import styles from '../app/login/page.module.css'
const loading = () => {
   return (
      <div className="relative">


         <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
               <span className="text-3xl mr-4">Loading</span>
               <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
               </svg>
            </div>
         </div>


         <form className={styles.bg} >
            <div className={styles.loginContainer} style={{ opacity: 1 }}>
               <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                     <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Login into your account
                     </p><div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                           Your username
                        </label>
                        <input

                           placeholder="JohnDoe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" />
                     </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                           Password
                        </label>
                        <input

                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" />
                     </div>


                     <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                        Login
                     </button>
                  </div>
               </div>
            </div></form>
      </div >
   )
}

export default loading