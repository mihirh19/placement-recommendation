'use client'

import React from 'react'
import styles from '../app/register/page.module.css';
import { TextField } from '@mui/material';
import { Button, Input } from "@nextui-org/react";

const ContactUs = () => {
  return (
        <form className={styles.bg}>
        <div className={styles.loginContainer} style={{ opacity: 1 }}>
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Contact Us
            </p>

            <div>
                <div className={styles.formField}>
                    <div className={styles.formLabel}>What can we help you with?</div>
                    <Input
                        required={'true'}
                        isClearable={"true"}
                        type="text"
                        variant='faded'
                        width="100%"
                        label={"Enter message..."} />
                </div>
            </div>

            <Button
                style={{ backgroundColor: '#F55734', color: '#FFFFFF' }}
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                type="submit"
            >
                Send
            </Button>
            </div>
        </div>
        </div>
    </form >
  )
}

export default ContactUs