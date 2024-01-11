'use client'
import useSWR from 'swr';
import axios from 'axios';
// import { useState, useEffect } from 'react';

const GetUser = () => {
   // const [data, setData] = useState([]);
   const { data, isLoading } = useSWR('/api', (url) => axios.get(url).then((res) => res.data));


   return (
      <>
         <h1>Users</h1>
         <ul>
            {isLoading && <p>Loading...</p>}
            {data && data.users.map((user) => (
               <li key={user.id}>
                  {user.username}
               </li>
            ))}
         </ul>

      </>

   )
}

export default GetUser