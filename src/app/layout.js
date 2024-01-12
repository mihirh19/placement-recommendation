'use client'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import Navbar from '@/components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { NextUIProvider } from "@nextui-org/react";


export default function RootLayout({ children }) {
  return (
    
    <SessionProvider>

      <html lang="en">
        <body>
        <Navbar userRole={'STUDENT'}/>
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
