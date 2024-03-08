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
      const { title, description, company, companyUrl, role, location, salary, skills, cpi,
         english_level,
         logical_reasoning_level,
         experience_gained,
         extra_curricular_activities,
         easy_leetcode_questions,
         medium_leetcode_questions,
         hard_leetcode_questions, } = await req.json();

      if (!title || !description || !company || !role || !location || !salary || !skills) {
         return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
      }
      const criskills = Object.assign({}, ...skills.map((item) => ({ [item]: 1 })));

      console.log(criskills);
      const crite = await prisma.criteria.create({
         data: {
            cpi,
            english_level,
            logical_reasoning_level,
            experience_gained,
            extra_curricular_activities,
            easy_leetcode_questions,
            medium_leetcode_questions,
            hard_leetcode_questions,
            ...criskills,
            userId: session.id
         }
      })


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
            criteriaId: crite.id
         }
      })
      return NextResponse.json({ message: "Job  Created" }, { status: 200 });
   } catch (err) {
      console.log(err.message);
      return NextResponse.json({ message: err.message }, { status: 500 });
   }

}