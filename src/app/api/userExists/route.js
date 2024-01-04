import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";



export async function POST(req) {
   try {
      const { username } = await req.json();
      const user = await prisma.user.findUnique({
         where: {
            username
         },
         select: {
            username: true
         }
      })

      return NextResponse.json({ userExists: user ? true : false });

   } catch (err) {
      console.log(err);
   }


}