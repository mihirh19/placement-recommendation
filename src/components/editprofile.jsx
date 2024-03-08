'use client'
import React, { useState } from 'react'
import { Card, CardBody } from "@nextui-org/react"
import { Input, Button } from "@nextui-org/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Today } from '@mui/icons-material';
import { RadioGroup, Radio } from "@nextui-org/react";
import styles from "../app/editprofile/page.module.css"

const tech_known = [
    {
        id: 1,
        name: 'Angular'
    },
    {
        id: 2,
        name: 'C++'
    },
    {
        id: 3,
        name: 'Django'
    },
    {
        id: 4,
        name: 'Express.js'
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
        name: 'Node.js'
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
        name: 'Spring Boot'
    },
    {
        id: 14,
        name: 'Vue.js'
    }
]
const EditProf = () => {
    const initialInfo = {
        'fullName': '',
        'email': '',
        'phoneNo': '',
        'dob': '',
        'english': '',
        'logical': '',
        'experience': '',
        'extracur': '',
        'easy': '',
        'medium': '',
        'hard': '',
        'angular': '',
        'c++': '',
        'django': '',
        'express.js': '',
        'flask': '',
        'java': '',
        'javascript': '',
        'laravel': '',
        'node.js': '',
        'php': '',
        'python': '',
        'react': '',
        'spring boot': '',
        'vue.js': ''
    }
    const [info, setInfo] = useState(initialInfo)
    const [conpany, setCompany] = useState('')

    function handleChange(name, value) {
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
    function handleSave(e) {
        e.preventDefault();
        console.log(info)
        fetch('http://127.0.0.1:8080/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        })
            .then(response => response.json())
            .then(data => {
                setCompany(data.predicted_company)
            })
            .catch(error => console.error('Error:', error));
    }
    return (
        <div className={styles.container}>
            <Card className={styles.mycard}>
                <CardBody>
                    <p className={styles.header}>Edit your details</p><br />
                    <p>Student ID</p>
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
                    <hr />
                    <p>CPI</p>
                    <Input
                        type="float"
                        label="CPI"
                        name='cpi'
                        onChange={handleChange}
                        className="max-w-full"
                    /><br />
                    <hr />
                    <p>English level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.english}
                        onChange={(e) => handleRadioChange('english', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Logical Reasoning</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.logical}
                        onChange={(e) => handleRadioChange('logical', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Experience Gained</p>
                    <RadioGroup
                        label="0-Yes | 1-No"
                        orientation="horizontal"
                        value={info.experience}
                        onChange={(e) => handleRadioChange('experience', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Involvement in Extra Curricular Activities</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.extracur}
                        onChange={(e) => handleRadioChange('extracur', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Leetcode Questions Solved Of Easy Level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.easy}
                        onChange={(e) => handleRadioChange('easy', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Leetcode Questions Solved Of Medium Level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.medium}
                        onChange={(e) => handleRadioChange('medium', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <p>Leetcode Questions Solved Of Hard Level</p>
                    <RadioGroup
                        label="0-0% | 1-100%"
                        orientation="horizontal"
                        value={info.hard}
                        onChange={(e) => handleRadioChange('hard', e.target.value)}
                    >
                        <Radio value="0">0</Radio>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                    </RadioGroup><br />
                    <hr />
                    <div>
                        <p>Technologies Known</p>
                        {tech_known.map((tech, index) => (
                            <RadioGroup
                                key={index}
                                label={tech.name}
                                orientation="horizontal"
                                value={info[tech.name.toLowerCase()]}
                                onChange={(e) => handleRadioChange(tech.name.toLowerCase(), e.target.value)}
                            >
                                <Radio value="0">0</Radio>
                                <Radio value="1">1</Radio>
                            </RadioGroup>
                        ))}
                    </div>
                    <br />
                    <Button className={styles.btn} variant="ghost" onClick={handleSave}>
                        Save
                    </Button>
                </CardBody>
            </Card>
            <Card className={styles.secCard}>
                <CardBody>
                    Predict the company in which you are likely to get placed
                    <Input
                        isDisabled
                        type="text"
                        label="Predicted Company"
                        defaultValue={conpany}
                        className="max-w-full"
                    />
                    <Button className={styles.btn} variant="ghost">
                        Predict
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default EditProf