import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(req, res) {
   const session = await getServerSession(authOptions);

   if (session) {
      if (session.role !== Role.STUDENT && session.role !== Role.RECRUITER) {
         return NextResponse.json({ message: "you are not allowed to get criteria" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to get criteria" }, { status: 401 })
   }

   try {

      const criteria = await prisma.criteria.findMany({
         where: {
            userId: session.id
         },
         include: {
            user: {
               select: {
                  id: true,
                  username: true,
                  email: true,
                  name: true,
                  studentId: true
               }
            }
         }

      });
      return NextResponse.json(criteria, { status: 200 });
   } catch (err) {

      return NextResponse.json({ message: err.message }, { status: 500 });
   }


}