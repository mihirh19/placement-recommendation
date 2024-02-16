
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(req, res) {
   const jobId = req.query.id;

   const session = await getServerSession(authOptions);
   if (session) {
      if (session.role !== Role.ADMIN && session.role !== Role.RECRUITER) {
         return NextResponse.json({ message: "you are not allowed to delete jobs" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to delete jobs" }, { status: 401 })
   }


   try {
      await prisma.job.delete({
         where: {
            id: jobId
         }
      })
      return NextResponse.json({ message: "Job Deleted" }, { status: 200 });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}