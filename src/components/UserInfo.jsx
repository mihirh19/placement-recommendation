'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function UserInfo({ username, email }) {

   const router = useRouter();

   return (
      <div className="grid place-items-center h-screen">
         <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
            <div>
               Name  : <span className="font-bold">{username}</span>
            </div>
            <div>
               Email : <span className="font-bold">{email}</span>
            </div>
            <button onClick={() => signOut({ redirect: false }).then(() => {
               router.push("/login")
            })} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
               Log Out
            </button>
         </div>
      </div>
   )
}