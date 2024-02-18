import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';
export async function GET(req, res) {
   try {
      const session = await getServerSession(authOptions);
      if (!session) {
         return NextResponse.json({ message: "you are not allowed to view students" }, { status: 401 })
      }
      if (session.role !== Role.ADMIN) {
         return NextResponse.json({ message: "you are not allowed to view students" }, { status: 401 })
      }
      const students = await prisma.user.findMany({
         where: {
            role: Role.STUDENT
         },
         select: {
            id: true,
            username: true,
            email: true,
            name: true,
            studentId: true,
            dateofbirth: true,
            phonenumber: true
         }
      });

      return NextResponse.json(students, { status: 200 })

   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 })
   }
}