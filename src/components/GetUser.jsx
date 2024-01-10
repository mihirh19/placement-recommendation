'use client'
import useSWR from 'swr';
// import { useState, useEffect } from 'react';

const GetUser = () => {
   // const [data, setData] = useState([]);
   const { data, isLoading } = useSWR('/api', (url) => fetch(url).then(res => res.json()), { refreshInterval: 100 })
   console.log(data);


   return (
      <>
         <h1>Users</h1>
         <ul>
            {isLoading && <p>Loading...</p>}
            {data && data.map((user) => (
               <li key={user.id}>
                  {user.username}
               </li>
            ))}
         </ul>

      </>

   )
}

export default GetUser