'use client'

import React, { Fragment, useEffect, useState } from 'react'
import styles from '../app/jobsList/page.module.css'
import { Button, Select, SelectItem } from "@nextui-org/react"
import SelectTech from "../components/SelectTech"
import axios from "axios"

export const types = [
    { id: 1, name: "on-campus" },
    { id: 2, name: "off-campus" }]



const JobListing = () => {
    // const [jobs, setJobs] = useState(null);

    // useEffect(() => {

    //     async function getJobs() {
    //         if (jobs === null) {

    //             const options = {
    //                 method: 'GET',
    //                 url: 'https://jobs-api14.p.rapidapi.com/list',
    //                 params: {
    //                     query: 'Web Developer',
    //                     location: 'United States',
    //                     distance: '1.0',
    //                     language: 'en_GB',
    //                     remoteOnly: 'false',
    //                     datePosted: 'month',
    //                     employmentTypes: 'fulltime;parttime;intern;contractor'
    //                 },
    //                 headers: {
    //                     'X-RapidAPI-Key': '4e7a26a35emsh002c0d37c284535p176d19jsn80fd87d7d1b2',
    //                     'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
    //                 }
    //             };

    //             try {
    //                 const response = await axios.request(options);
    //                 setJobs(response.data.jobs);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         }
    //     }

    //     getJobs();


    // }, [jobs])
    return (
        <div className={styles.container}>
            <div className={styles.bg_image}></div>
            <div className={styles.c1}>
                <SelectTech />
                <Select
                    items={types}
                    variant="bordered"
                    placeholder="placement type"
                    classNames={{
                        base: "max-w-xs",
                        trigger: "min-h-unit-12 py-2",
                    }}
                    style={{ minHeight: '2rem' }}
                >
                    {(type) => (
                        <SelectItem key={type.id} textValue={type.name}>
                            <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                    <span className="text-small">{type.name}</span>
                                </div>
                            </div>
                        </SelectItem>
                    )}
                </Select>
                <Button className={styles.btn} variant='solid' style={{ backgroundColor: "#F55734", color: "white", marginTop: "8px" }}>Search</Button>
            </div>
            {/* {jobs && jobs.map((job) => {
                return (
                    <Fragment key={job.id}>
                        <div className={styles.list_container}>
                            <div className={styles.des_company}>
                                <h1>{jobs.title}</h1>
                                <h2>{jobs.company}</h2>
                            </div>
                            <div className={styles.tech}>
                                <p>{jobs.description}</p>
                            </div>
                            <div className={styles.time_apply}>
                                <p>{jobs.employmentType}</p>
                                <Button variant='light' border='md' style={{ color: "#F55734" }}>apply</Button>
                            </div>
                        </div>
                    </Fragment>
                )
            })} */}

            <div className={styles.list_container}>
                <div className={styles.des_company}>
                    <h1>Full Stack Developer</h1>
                    <h2>Amazon</h2>
                </div>
                <div className={styles.tech}>
                    <p>react js,next js,express,node js,mongo db</p>
                </div>
                <div className={styles.time_apply}>
                    <p>1 min go | Full Time | Remote</p>
                    <Button variant='light' border='md' style={{ color: "#F55734" }}>apply</Button>
                </div>
            </div>
        </div >
    )
}

export default JobListing