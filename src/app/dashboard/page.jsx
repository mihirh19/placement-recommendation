'use client'

import UserInfo from "../../components/UserInfo";
import Dash from "@/components/Dashboard/Dashboard";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
   const { status, data } = useSession();
   const router = useRouter();

   if (status === "unauthenticated") {

      router.push("/login");
   }
   if (status === "authenticated") {
      <Dash />
   }

}