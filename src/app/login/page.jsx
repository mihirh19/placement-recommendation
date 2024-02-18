'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import LoginUser from '@/components/LoginUser';
import { Role } from '@prisma/client';
const Login = () => {

  const { status, data } = useSession();
  const router = useRouter();

  if (status === "authenticated" && data?.role === Role.ADMIN) {
    router.push("/dashboard");
  }
  else if (status === "authenticated" && data?.role === Role.RECRUITER) {
    router.push("/dashboard");
  }
  else if (status === "authenticated" && data?.role === Role.STUDENT) {
    router.push("/");
  }
  else if (status === "unauthenticated") {
    return <LoginUser />
  }
}

export default Login