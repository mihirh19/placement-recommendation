import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req, res) {
   const session = await getServerSession(authOptions);

   if (session) {
      if (session.role !== Role.STUDENT && session.role !== Role.RECRUITER) {
         return NextResponse.json({ message: "you are not allowed to edit criteria" }, { status: 401 })
      }
   }
   else {
      return NextResponse.json({ message: "you are not allowed to edit criteria" }, { status: 401 })
   }

   try {
      const { cpi, english_level, logical_reasoning_level, experience_gained, extra_curricular_activities, easy_leetcode_questions, medium_leetcode_questions, hard_leetcode_questions,
         Angular, CPP, Django, ExpressJS, Flask, Java, JavaScript, Laravel, NodeJS, PHP, Python, React, SpringBoot, VueJS } = await req.json();
      console.log("data received");


      const created = await prisma.criteria.findMany({
         where: {
            userId: session.id
         },
      });

      if (created.length === 0) {

         await prisma.criteria.create({
            data: {
               cpi,
               english_level,
               logical_reasoning_level,
               experience_gained,
               extra_curricular_activities,
               easy_leetcode_questions,
               medium_leetcode_questions,
               hard_leetcode_questions,
               Angular,
               CPP,
               Django,
               ExpressJS,
               Flask,
               Java,
               JavaScript,
               Laravel,
               NodeJS,
               PHP,
               Python,
               React,
               SpringBoot,
               VueJS,
               userId: session.id
            }
         });

      }

      await prisma.criteria.update({
         where: {
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
            Angular,
            CPP,
            Django,
            ExpressJS,
            Flask,
            Java,
            JavaScript,
            Laravel,
            NodeJS,
            PHP,
            Python,
            React,
            SpringBoot,
            VueJS
         }
      })

      return NextResponse.json({ message: "Criteria Updated" }, { status: 200 });

   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }


}