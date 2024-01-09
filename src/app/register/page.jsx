'use client'
import { useSession } from "next-auth/react";
import RegisterUser from "../../components/RegisterUser"
import React from "react"
import { useRouter } from "next/navigation";

const Register = () => {
   const { status, data } = useSession();
   const router = useRouter();
   if (status === "unauthenticated") {

      router.push("/login");
   }
   if (status === "authenticated") {

      if (data?.role === "ADMIN") {
         return (
            <RegisterUser />
         )
      }
      else {
         router.push("/login")
      }
   }

}

export default Register