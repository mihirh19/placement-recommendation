import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, res) {
   try {
      const session = await getServerSession(authOptions);
      if (!session) {
         return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      if (session.role !== Role.ADMIN) {
         return NextResponse.json({ message: 'You are not allowed to get recruiter' }, { status: 401 });
      }
      const allRecruiters = await prisma.user.findMany({
         where: {
            role: Role.RECRUITER,
         },
         select: {
            id: true,
            name: true,
            username: true,
            email: true,
            phonenumber: true,
            dateofbirth: true,
         }
      });
      return NextResponse.json(allRecruiters, { status: 200 });

   } catch (e) {
      return NextResponse.json({ message: e.message },
         { status: 500 })
   }
}