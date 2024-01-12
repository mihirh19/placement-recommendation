'use client'
import { Inter } from 'next/font/google'
import { useSession } from "next-auth/react";
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import Navbar from '@/components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { NextUIProvider } from "@nextui-org/react";


export default function RootLayout({ children }) {
  // const { status, data } = useSession();
  return (
    
    <SessionProvider>
       
      <html lang="en">
        <body>
        <NavbarWrapper />
          {/* {status === "authenticated" && data?.role === "ADMIN" && (<Navbar userRole={'ADMIN'}/>)}
          {status === "authenticated" && data?.role === "STUDENT" && (<Navbar userRole={'STUDENT'}/>)} */}
        
          <NextUIProvider>
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            {children}
          </NextUIProvider>
        </body>
      </html>

    </SessionProvider>


  )
}

function NavbarWrapper() {
  const { status, data } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      {status === "authenticated" && data?.role === "ADMIN" && (
        <Navbar userRole={'ADMIN'} />
      )}
      {status === "authenticated" && data?.role === "STUDENT" && (
        <Navbar userRole={'STUDENT'} />
      )}
    </>
  );
}
