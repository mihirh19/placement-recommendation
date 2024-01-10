'use client'

import React, { useState } from 'react';
import styles from '../app/register/page.module.css';
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

const RegisterUser = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    studentid: '',
    emailaddress: '',
    dateofbirth: new Date(),
    phonenumber: '',
  });

  const [loading, setLoading] = useState(false);
  const today = dayjs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userInfo)

    if (userInfo.username === "" || userInfo.password === "") {
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

      await axios.post('/api/register', userInfo).then((res) => {
        if (res.status === 200) {
          setUserInfo({
            username: '',
            password: '',
            studentid: '',
            emailaddress: '',
            dateofbirth: '',
            phonenumber: '',
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
    { na: 'Password', type: 'password' },
    { na: 'Student ID', type: 'text' },
    { na: 'Email Address', type: 'email' },
    { na: 'DateOfBirth', type: 'text' },
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
              Register Student
            </p>

            <div className={styles.formFieldsContainer}>
              {details.map((detail, index) => (
                <div key={index} className={styles.formField}>
                  <div className={styles.formLabel}>{detail.na}</div>
                  {detail.na.toLowerCase().includes('dateofbirth') ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // calendarIcon={<CiCalendarDate />}
                        maxDate={today}
                        // clearIcon={<MdOutlineClear />}
                        // // format="dd-MM-y"
                        // maxDate={new Date()}
                        // value={userInfo.dateofbirth}
                        onChange={(date) =>
                          setUserInfo({ ...userInfo, dateofbirth: date })
                        }

                        // placeholderText={`Enter ${detail}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        id={detail.na.toLowerCase().replace(' ', '-')}
                      />
                    </LocalizationProvider>

                  ) : (

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


                    // <input
                    //   value={userInfo[detail.toLowerCase().replace(' ', '')]}
                    //   onChange={(e) =>
                    //   setUserInfo({ ...userInfo, [detail.toLowerCase().replace(' ', '')]: e.target.value })
                    // }
                    //   placeholder={`Enter ${detail}`}
                    //   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    //   id={detail.toLowerCase().replace(' ', '-')}
                    //   type={detail.toLowerCase().includes('password') ? 'password' : 'text'}
                    // />
                  )}

                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              color='primary'
              className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
              type="submit"
            >
              {loading ? <Spinner size='sm' color='white' /> : 'Register Student'}

            </Button>
          </div>
        </div>
      </div>
    </form >
  );


};

export default RegisterUser;
