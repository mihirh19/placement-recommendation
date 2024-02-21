import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';
import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
export async function POST(req, res) {

   const session = await getServerSession(authOptions);

   if (session) {
      if (session.role !== Role.ADMIN && session.role !== Role.RECRUITER) {
         return NextResponse.json({ message: "you are not allowed to add jobs" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to add jobs" }, { status: 401 })
   }

   try {
      const { title, description, company, companyUrl, role, location, salary, skills } = await req.json();

      if (!title || !description || !company || !role || !location || !salary || !skills) {
         return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
      }

      const user = await prisma.job.create({
         data: {
            title,
            description,
            company,
            companyUrl,
            role,
            location,
            salary,
            skills,
            recruiterId: session.id,
         }
      })



      return NextResponse.json({ message: "Job  Created" }, { status: 200 });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }

}