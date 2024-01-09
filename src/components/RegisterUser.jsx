'use client'

import React, { useState } from 'react';
import styles from '../app/register/page.module.css';
import axios from 'axios';

const RegisterUser = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    studentID: '',
    emailAddress: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.username || !userInfo.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const userExistsRes = await axios.post('/api/userExists', {
        username: userInfo.username,
      });
      const { userExists } = userExistsRes.data;

      if (userExists) {
        alert('Username already exists');
        return;
      }

      const registerRes = await axios.post('/api/register', userInfo);

      if (registerRes.ok) {
        const form = e.target;
        form.reset();
      } else {
        console.log('User registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
    }
  };

  const details = [
    'User Name',
    'Password',
    'Student ID',
    'Date Of Birth',
    'Email Address',
    'Phone Number',
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
                <div className={styles.formLabel}>{detail}</div>
                <input
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, [detail.toLowerCase()]: e.target.value })
                  }
                  placeholder={`Enter ${detail}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id={detail.toLowerCase().replace(' ', '-')}
                  type={detail.toLowerCase().includes('password') ? 'password' : 'text'}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
            type="submit"
          >
            Register Student
          </button>
        </div>
      </div>
    </div>
  </form>
);

 
};

export default RegisterUser;
