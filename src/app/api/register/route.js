import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function POST(req, res) {

   try {
      const { username, password, emailaddress, studentid, dateofbirth, phonenumber } = await req.json();
      console.log(username, password, emailaddress, studentid, dateofbirth, phonenumber);

      // check if user exists
      // const user = await fetch(`${process.env.API_URL}/api/userExists`, {
      //    method: 'POST',
      //    headers: {
      //       'Content-Type': 'application/json'
      //    },
      //    body: JSON.stringify({
      //       username
      //    })
      // })

      // const { userExists } = await user.json();
      // console.log(userExists);
      // if (userExists) {
      //    return NextResponse.json({ message: "user already exists" }, { status: 400 })
      // }

      const session = await getServerSession(authOptions)
      console.log(session);
      if (session) {
         if (session.role !== 'ADMIN') {
            return NextResponse.json({ message: "you are not allowed to register users" }, { status: 401 })
         }
      }
      else {
         return NextResponse.json({ message: "you are not allowed to register users" }, { status: 401 })
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      // save the user to database
      await prisma.user.create({
         data: {
            username,
            password: hashedPassword,
            email: emailaddress,
            role: "STUDENT",
            studentId: studentid,
            dateofbirth: dateofbirth,
            phonenumber: phonenumber
         }
      });
      console.log("user created");
      return NextResponse.json({
         message: "user Registerd"
      }, { status: 200 })
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 })
   }

}