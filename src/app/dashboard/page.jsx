'use client'

import UserInfo from "../../components/UserInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Dashboard() {
   const { status, data } = useSession();
   const router = useRouter();

   if (status === "unauthenticated") {

      router.push("/login");
   }
   if (status === "authenticated") return (
      <UserInfo username={data?.username} email={data?.email} />
   )

}