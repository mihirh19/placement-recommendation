'use client'

import React, { Fragment, useEffect, useState } from 'react'
import styles from '../app/jobsList/page.module.css'
import { Button, Select, SelectItem } from "@nextui-org/react"
import SelectTech from "../components/SelectTech"
import axios from "axios"
import JobsTable from './Jobs/JobsTable/JobsTable'


const JobListing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bg_image}></div>
            <div style={{ margin: "3rem" }}>

                <JobsTable />
            </div>

        </div >
    )
}

export default JobListing