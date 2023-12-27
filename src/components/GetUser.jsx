'use client'
import useSWR from 'swr';

const GetUser = () => {
   const { data, isLoading } = useSWR('/api', (url) => fetch(url).then(res => res.json()))
   return (
      <>
         <h1>Users</h1>
         <ul>
            {isLoading && <p>Loading...</p>}
            {data && data.map((user) => (
               <li key={user.id}>
                  {user.name}
               </li>
            ))}
         </ul>

      </>

   )
}

export default GetUser