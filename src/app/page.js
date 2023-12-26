
import Image from 'next/image'
import { PrismaClient } from "@prisma/client";
import axios from 'axios';

async function getData() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return users;
}


export default async function Home() {
  const { data } = await axios.get(`${process.env.API_URL}/api`)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
