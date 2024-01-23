'use client'

import React from 'react'
import styles from '../app/jobsList/page.module.css'
import { Button, Select, SelectItem } from "@nextui-org/react"
import SelectTech from "../components/SelectTech"

export const types = [
    { id: 1, name: "on-campus" },
    { id: 2, name: "off-campus" }]

const JobListing = () => {
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
        </div>
    )
}

export default JobListing