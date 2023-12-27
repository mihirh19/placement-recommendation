'use client'
import Image from 'next/image'
import { PrismaClient } from "@prisma/client";
import axios from 'axios';
import useSWR, { unstable_serialize } from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json())
// export const getData = async () => {
//   // const { data } = await axios.get(`${process.env.API_URL}/api`)

//   return data
// }
export default function Home() {
  const { data } = useSWR('/api', fetcher)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data && data.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
