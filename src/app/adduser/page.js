'use client'
import React, { useState } from 'react'




const Page = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')


   const handleClick = () => {
      console.log('handleClick')
      fetch('/api/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name,
            email
         })
      })
         .then(res => res.json())
         .then(data => {
            console.log(data)
         })
         .catch(err => {
            console.log(err)
         })
   }
   
   return (
      <>
         <h1>Add User</h1>
         <label>Name</label>
         <input type="text" value={name} onChange={e => setName(e.target.value)} />
         <label>Email</label>
         <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
         <button type="submit" onClick={handleClick}>Add User</button>

      </>
   )
}

export default Page