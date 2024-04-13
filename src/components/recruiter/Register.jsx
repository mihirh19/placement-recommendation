"use client"

import React, { useState } from 'react'
import styles from "@/app/register/page.module.css"
import axios from 'axios';
import { toast } from "react-toastify";
// import DatePicker from 'react-date-picker';
import dayjs from 'dayjs';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Button, Input } from "@nextui-org/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Spinner } from "@nextui-org/react";
const Register = () => {
   const [userInfo, setUserInfo] = useState({
      username: '',
      password: '',
      emailaddress: '',
      confirmpassword: "",
      phonenumber: "",
      name: ""
   });

   const [loading, setLoading] = useState(false);
   const today = dayjs();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (userInfo.username === "" || userInfo.password === "" || userInfo.emailaddress === "" || userInfo.confirmpassword === "") {
         toast.info("Fill All the field", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
         })
         setLoading(false);
         return;
      }

      try {
         const userExistsRes = await axios.post('/api/userExists', {
            username: userInfo.username,
         });
         const { userExists } = userExistsRes.data;

         if (userExists) {
            toast.info("user Already Exists", {
               position: "top-center",
               autoClose: 1500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
            })
            setLoading(false);
            return;
         }

         await axios.post('api/recruiter/register', userInfo).then((res) => {
            if (res.status === 200) {
               setUserInfo({
                  username: '',
                  password: '',
                  emailaddress: '',
                  confirmpassword: "",
                  phonenumber: "",
                  name: ""

               });
               toast.success("Registered Successfully", {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
               })
               return res;
            }
         }).catch((err) => {
            if (err.response.status === 401) {
               toast.info("Something went wrong", {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
               })
            }
         });

         setLoading(false);

      } catch (err) {
         setLoading(false);
      }
   };

   const details = [
      { na: 'User Name', type: 'text' },
      { na: "name", type: "text" },
      { na: 'Email Address', type: 'email' },
      { na: 'Password', type: 'password' },
      { na: "Confirm password", type: "password" },
      { na: 'Phone Number', type: 'number' },

      // 'User Name',
      // 'Password',
      // 'Student ID',
      // 'DateOfBirth',
      // 'Email Address',
      // 'Phone Number',
   ];

   // Inside your RegisterUser component
   return (
      <form className={styles.bg}>
         <div className={styles.loginContainer} style={{ opacity: 1 }}>
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                     Register Recruiter
                  </p>

                  <div className={styles.formFieldsContainer}>
                     {details.map((detail, index) => (
                        <div key={index} className={styles.formField}>
                           <div className={styles.formLabel}>{detail.na}</div>


                           <Input
                              required={'true'}
                              isClearable={"true"}
                              type={detail.type}
                              variant='faded'
                              label={`Enter ${detail.na}`}
                              id={detail.na.toLowerCase().replace(' ', '-')}
                              value={userInfo[detail.na.toLowerCase().replace(' ', '')]}
                              onChange={(e) =>
                                 setUserInfo({ ...userInfo, [detail.na.toLowerCase().replace(' ', '')]: e.target.value })
                              }
                              onClear={(e) => setUserInfo({ ...userInfo, [detail.na.toLowerCase().replace(' ', '')]: "" })} />

                        </div>
                     ))}
                  </div>

                  <Button
                     onClick={handleSubmit}
                     style={{ backgroundColor: '#F55734', color: '#FFFFFF' }}
                     className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                     type="submit"
                  >
                     {loading ? <Spinner size='sm' color='white' /> : 'Register Recruiter'}

                  </Button>
               </div>
            </div>
         </div>
      </form >
   );
}

export default Register