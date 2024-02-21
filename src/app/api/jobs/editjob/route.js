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
      const { id, title, description, company, companyUrl, role, location, salary, skills } = await req.json();

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
      return NextResponse.json({ message: err.message }, { status: 500 });
   }

}