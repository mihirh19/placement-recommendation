'use client'
import useSWR from 'swr';

const GetUser = () => {
   const { data, isLoading } = useSWR('/api', (url) => fetch(url, { cache: 'no-store', next: { revalidate: 0 } }).then(res => res.json()))
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