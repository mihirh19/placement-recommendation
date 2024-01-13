'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import LoginUser from '@/components/LoginUser';

const Login = () => {

  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }
  else if (status === "unauthenticated") {
    return <LoginUser />
  }
}

export default Login