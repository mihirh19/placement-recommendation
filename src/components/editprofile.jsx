'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardBody } from "@nextui-org/react"
import { Input, Button } from "@nextui-org/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Today } from '@mui/icons-material';
import { RadioGroup, Radio } from "@nextui-org/react";
import styles from "../app/editprofile/page.module.css"
import useSWR from 'swr'
import axios from 'axios'
import { toast } from "react-toastify";
import MatchedCompanies from './MatchedCompanies';
const fetcher = (...args) => fetch(...args).then(res => res.json())


const tech_known = [
    {
        id: 1,
        name: 'Angular'
    },
    {
        id: 2,
        name: 'CPP'
    },
    {
        id: 3,
        name: 'Django'
    },
    {
        id: 4,
        name: 'ExpressJS'
    },
    {
        id: 5,
        name: 'Flask'
    },
    {
        id: 6,
        name: 'Java'
    },
    {
        id: 7,
        name: 'JavaScript'
    },
    {
        id: 8,
        name: 'Laravel'
    },
    {
        id: 9,
        name: 'NodeJS'
    },
    {
        id: 10,
        name: 'PHP'
    },
    {
        id: 11,
        name: 'Python'
    },
    {
        id: 12,
        name: 'React'
    },
    {
        id: 13,
        name: 'SpringBoot'
    },
    {
        id: 14,
        name: 'VueJS'
    }
]
const EditProf = () => {
    const [info, setInfo] = useState({

    })
    useEffect(() => {
        async function fetchData() {
            await fetch('api/criteria/getcriteria').then((res) => {
                return res.json()
            }).then((data) => {
                if (data.length === 0) {
                    setInfo({
                        cpi: 0,
                        english_level: 0,
                        logical_reasoning_level: 0,
                        experience_gained: 0,
                        extra_curricular_activities: 0,
                        easy_leetcode_questions: 0,
                        medium_leetcode_questions: 0,
                        hard_leetcode_questions: 0,
                        Angular: 0,
                        CPP: 0,
                        Django: 0,
                        ExpressJS: 0,
                        Flask: 0,
                        Java: 0,
                        JavaScript: 0,
                        Laravel: 0,
                        NodeJS: 0,
                        PHP: 0,
                        Python: 0,
                        React: 0,
                        SpringBoot: 0,
                        VueJS: 0
                    })
                }


                setInfo(data[0])
            })
        }
        fetchData()
    }, [])

    const [company, setCompany] = useState('')

    function handleChange(e) {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }
    function handleRadioChange(name, value) {
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    }

    async function handlePredict(e) {
        let newInfo = {
            cpi: info.cpi,
            english_level: info.english_level,
            logical_reasoning_level: info.logical_reasoning_level,
            experience_gained: info.experience_gained,
            extra_curricular_activities: info.extra_curricular_activities,
            easy_leetcode_questions: info.easy_leetcode_questions,
            medium_leetcode_questions: info.medium_leetcode_questions,
            hard_leetcode_questions: info.hard_leetcode_questions,
            Angular: info.Angular,
            "C++": info.CPP,
            Django: info.Django,
            "Express.js": info.ExpressJS,
            Flask: info.Flask,
            Java: info.Java,
            JavaScript: info.JavaScript,
            Laravel: info.Laravel,
            "Node.js": info.NodeJS,
            PHP: info.PHP,
            Python: info.Python,
            React: info.React,
            "Spring Boot": info.SpringBoot,
            "Vue.js": info.VueJS

        }

        await fetch('https://placement-recommendation-flask.onrender.com/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newInfo)
        })
            .then(response => response.json())
            .then(data => {
                setCompany(data.predicted_company)
            })
            .catch(error => console.error('Error:', error));
    }

    async function handleSave(e) {
        e.preventDefault();
        await axios.put("api/criteria/editCriteria", info).then((res) => {
            toast.success("saved  Successfully", {
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
        }).catch((err) => {
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
        });

        // console.log(info)

    }
    return (
        <div className={styles.container}>
            <Card className={styles.mycard}>
                <CardBody>
                    <p className={styles.header}>Edit your details</p><br />
                    {/* <p>Student ID</p>
                    <Input
                        isDisabled
                        type="text"
                        label="Student ID"
                        defaultValue="21ITUOS034"
                        className="max-w-full"
                    /><br />
                    <hr />
                    <p>Full Name</p>
                    <Input
                        type="text"
                        name="fullName"
                        label="Full Name"
                        onChange={handleChange}
                        className="max-w-full"
                    /><br />
                    <hr />
                    <p>Email</p>
                    <Input
                        type="email"
                        label="Email"
                        name='email'
                        onChange={handleChange}
                        className="max-w-full"
                    /><br />
                    <hr />
                    <p>Phone Number</p>
                    <Input
                        type="number"
                        name='phoneNo'
                        label="Phone Number"
                        onChange={handleChange}
                        className="max-w-full"
                    /><br />
                    <hr />
                    <p>DOB</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            maxDate={Today}
                            name='dob'
                            onChange={(date) => handleChange('dob', date)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                    </LocalizationProvider><br />
                    <hr /> */}
                    <p>CPI</p>
                    <Input
                        type="number"
                        label="CPI"
                        inputMode='decimal'
                        name='cpi'
                        value={info.cpi}

                        id='cpi'
                        onChange={(e) => {
                            setInfo((prevInfo) => ({
                                ...prevInfo,
                                cpi: parseFloat(e.target.value),
                            }));
                        }}
                        className="max-w-full"
                    /><br />
                    <hr />
                    <p>English level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        id='english_level'
                        name='english_level'
                        value={info.english_level}
                        onValueChange={(e) => handleRadioChange('english_level', parseInt(e))}
                    >
                        <Radio value={0} >0</Radio>
                        <Radio value={1}  >1</Radio>
                        <Radio value={2} >2</Radio>
                        <Radio value={3} >3</Radio>
                        <Radio value={4} >4</Radio>
                        <Radio value={5} >5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Logical Reasoning</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        name="logical_reasoning_level"
                        value={info.logical_reasoning_level}
                        onValueChange={(e) => handleRadioChange('logical_reasoning_level', parseInt(e))}
                    >
                        <Radio value={0} >0</Radio>
                        <Radio value={1} >1</Radio>
                        <Radio value={2} >2</Radio>
                        <Radio value={3} >3</Radio>
                        <Radio value={4} >4</Radio>
                        <Radio value={5} >5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Experience Gained</p>
                    <RadioGroup
                        label="0-Yes | 1-No"
                        orientation="horizontal"
                        name='experience_gained'
                        value={info.experience_gained}
                        onValueChange={(e) => handleRadioChange('experience_gained', parseInt(e))}
                    >
                        <Radio value={0} >0</Radio>
                        <Radio value={1}>1</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Involvement in Extra Curricular Activities</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        name="extra_curricular_activities"
                        value={info.extra_curricular_activities}
                        onValueChange={(e) => handleRadioChange('extra_curricular_activities', parseInt(e))}
                    >
                        <Radio value={0} >0</Radio>
                        <Radio value={1} >1</Radio>
                        <Radio value={2} >2</Radio>
                        <Radio value={3} >3</Radio>
                        <Radio value={4} >4</Radio>
                        <Radio value={5} >5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Leetcode Questions Solved Of Easy Level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.easy_leetcode_questions}
                        onValueChange={(e) => handleRadioChange('easy_leetcode_questions', parseInt(e))}
                    >
                        <Radio value={0} >0</Radio>
                        <Radio value={1} >1</Radio>
                        <Radio value={2} >2</Radio>
                        <Radio value={3} >3</Radio>
                        <Radio value={4} >4</Radio>
                        <Radio value={5} >5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Leetcode Questions Solved Of Medium Level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.medium_leetcode_questions}
                        onValueChange={(e) => handleRadioChange('medium_leetcode_questions', parseInt(e))}
                    >
                        <Radio value={0}>0</Radio>
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                        <Radio value={5}>5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Leetcode Questions Solved Of Hard Level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.hard_leetcode_questions}
                        onValueChange={(e) => handleRadioChange('hard_leetcode_questions', parseInt(e))}
                    >
                        <Radio value={0}>0</Radio>
                        <Radio value={1}>1</Radio>
                        <Radio value={2}>2</Radio>
                        <Radio value={3}>3</Radio>
                        <Radio value={4}>4</Radio>
                        <Radio value={5}>5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <div>
                        <p>Technologies Known</p>
                        {tech_known.map((tech, index) => (
                            <RadioGroup
                                key={index}
                                label={tech.name}
                                orientation="horizontal"
                                value={info[tech.name]}
                                onValueChange={(e) => handleRadioChange(tech.name, parseInt(e))}
                            >
                                <Radio value={0}>0</Radio>
                                <Radio value={1}>1</Radio>
                            </RadioGroup>
                        ))}
                    </div>
                    <br />
                    <Button className={styles.btn} variant="ghost" onClick={handleSave}>
                        Save
                    </Button>
                </CardBody>
            </Card>
            <div className={styles.rightContainer}>
                <Card className={styles.secCard}>
                    <CardBody>
                        Predict the company in which you are likely to get placed
                        <Input
                            isDisabled
                            type="text"
                            label="Predicted Company"
                            defaultValue={company}
                            value={company}
                            className="max-w-full"
                        />
                        <Button className={styles.btn} variant="ghost" onClick={handlePredict}>
                            Predict
                        </Button>
                    </CardBody>
                </Card>
                <Card className={styles.matchedCard}>
                    <CardBody>
                        Matched companies
                        <MatchedCompanies info={info} />
                    </CardBody>
                </Card>
            </div>

        </div>
    )
}

export default EditProf