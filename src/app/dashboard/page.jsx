'use client'

import DashboardLoading from "@/components/Loading/DashboardLoading";
// import Dash from "@/components/Dashboard/Dashboard";  
import RecruiterDash from "../../components/RecruiterDashboard/RecruiterDash";
import Dash from "@/components/AdminDashboard/Dashboard";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
   const { status, data } = useSession();
   const router = useRouter();

   if (status === "unauthenticated") {

      router.push("/login");
   }
   if (status === "authenticated" && data?.role === Role.ADMIN) {
      return (
         <Dash />
      )
   }
   if (status === "authenticated" && data?.role === Role.RECRUITER) {
      return (
         <RecruiterDash />
      )
   }
   if (status === "authenticated" && data?.role === Role.STUDENT) {
      router.push("/editprofile");
   }
   else {
      return (
         <DashboardLoading />
      )
   }

}