import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';


export async function PUT(req, res) {
   try {
      const session = await getServerSession(authOptions);
      if (!session) {
         return NextResponse.json({ message: "you are not allowed to edit Recruiter" }, { status: 401 })
      }
      if (session.role !== Role.ADMIN) {
         return NextResponse.json({ message: "you are not allowed to edit Recruiter" }, { status: 401 })
      }
      const { id, name, email, dateofbirth, phonenumber } = await req.json();
      await prisma.user.update({
         where: {
            id: id
         },
         data: {
            name: name,
            email: email,
            dateofbirth: dateofbirth,
            phonenumber: phonenumber
         }
      });
      return NextResponse.json({ message: "recruiter updated successful" }, { status: 200 })
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 })
   }
}