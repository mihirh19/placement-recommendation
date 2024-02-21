import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(req, res) {

   const session = await getServerSession(authOptions);

   if (session) {
      if (session.role !== Role.STUDENT && session.role !== Role.ADMIN) {
         return NextResponse.json({ message: "you are not allowed to get jobs" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to get jobs" }, { status: 401 })
   }
   try {
      const jobs = await prisma.job.findMany({
         include: {
            recruiter: {
               select: {
                  id: true,
                  username: true,
                  email: true,
                  name: true,
               }
            }
         }
      });
      return NextResponse.json(jobs, { status: 200 });
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}