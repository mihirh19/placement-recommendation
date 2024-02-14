'use client'

import UserInfo from "../../components/UserInfo";
import Dash from "@/components/Dashboard/Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
   const { status, data } = useSession();
   const router = useRouter();

   if (status === "unauthenticated") {

      router.push("/login");
   }
   if (status === "authenticated") return (
      // <UserInfo username={data?.username} email={data?.email} />
      <Dash/>
   )

}