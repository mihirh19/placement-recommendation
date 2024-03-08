import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';


export async function GET(req, res) {
   try {
      const session = await getServerSession(authOptions);

      if (session) {
         if (session.role !== Role.RECRUITER && session.role !== Role.ADMIN) {
            return NextResponse.json({ message: "you are not allowed to get jobs" }, { status: 401 })
         }
      }
      else {
         return NextResponse.json({ message: "you are not allowed to get jobs" }, { status: 401 })
      }

      const jobs = await prisma.job.findMany({
         where: {
            recruiterId: session.id

         },
         select: {
            id: true,
            title: true,
            description: true,
            company: true,
            companyUrl: true,
            role: true,
            location: true,
            salary: true,
            skills: true,
            Criteria: {
               select: {
                  cpi: true,
                  english_level: true,
                  logical_reasoning_level: true,
                  experience_gained: true,
                  extra_curricular_activities: true,
                  easy_leetcode_questions: true,
                  medium_leetcode_questions: true,
                  hard_leetcode_questions: true,
               }
            }
         },
      });

      return NextResponse.json(jobs, { status: 200 });


   } catch (err) {
      console.log(err.message);
      return NextResponse.json({ message: err.message }, { status: 500 });
   }

}