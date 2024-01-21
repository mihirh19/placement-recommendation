'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import Navbar from '@/components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Footer from '@/components/Footer';


export default function RootLayout({ children }) {

    const { asPath } = useRouter();
    const transitionSpringPhysics = {
        type: "spring",
        mass: 0.2,
        stiffness: 80,
        damping: 10,
    };
    const variants = {
        scaleDown: {
            scale: 0.8,
            y: 100,
            transition: {
                duration: 0.2
            }
        },
        out: {
            x: "-100%",
            transition: {
                duration: 0.2,
                delay: 0.2
            }
        },
        in: {
            scale: 0.8,
            y: 100,
            x: "100%",
            transition: {
                duration: 0.2
            }
        },
        center: {
            x: 0,
            scale: 0.8,
            transformOrigin: 'top',
            transition: {
                duration: 0.3
            }
        },
        scaleUp: {
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                delay: 0.2
            }
        },
    };
    const transitionColor = "black";
    // const { status, data } = useSession();
    return (

        <SessionProvider>

            <html lang="en">
                <body>
                    {/*<NavbarWrapper />*/}
                    <Navbar />
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
                        <Footer />
                    </NextUIProvider>

                </body>
            </html>
        </SessionProvider>


    )
}
