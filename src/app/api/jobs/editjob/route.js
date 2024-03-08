import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function PUT(req, res) {
   const session = await getServerSession(authOptions);

   if (session) {
      if (session.role !== Role.ADMIN && session.role !== Role.RECRUITER) {
         return NextResponse.json({ message: "you are not allowed to edit jobs" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to edit jobs" }, { status: 401 })
   }

   try {
      const { id, title, description, company, companyUrl, role, location, salary, skills,
         cpi, english_level, logical_reasoning_level, experience_gained, extra_curricular_activities,
         easy_leetcode_questions, medium_leetcode_questions, hard_leetcode_questions } = await req.json();

      const criskills = Object.assign({}, ...skills.map((item) => ({ [item]: 1 })));

      await prisma.criteria.update({
         where: {
            Job: {
               id: id
            },
            userId: session.id
         },
         data: {
            cpi,
            english_level,
            logical_reasoning_level,
            experience_gained,
            extra_curricular_activities,
            easy_leetcode_questions,
            medium_leetcode_questions,
            hard_leetcode_questions,
            ...criskills
         }
      })


      await prisma.job.update({
         where: {
            id: id,
            recruiterId: session.id
         },
         data: {
            title,
            description,
            company,
            companyUrl,
            role,
            location,
            salary,
            skills
         }
      })

      return NextResponse.json({ message: "Job Updated" }, { status: 200 });
   } catch (err) {
      console.log(err.message);
      return NextResponse.json({ message: err.message }, { status: 500 });
   }

}