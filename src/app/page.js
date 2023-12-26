import Image from 'next/image'
import {PrismaClient} from "@prisma/client";



export default function Home() {
  return (
    <div>
      <h1>Next.js + Tailwind CSS</h1>
      <p>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={72}
          height={16}
        />
      </p>
    </div>
  )
}
