import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"
import { NextResponse } from "next/server"
export async function POST(req, res) {
   try {
      const { username, password, emailaddress, confirmpassword, phonenumber, name } = await req.json()

      if (username === "" || password === "" || emailaddress === "" || confirmpassword === "") {
         return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 })
      }
      if (password !== confirmpassword) {
         return NextResponse.json({ message: "Password and Confirm Password does not match" }, { status: 400 })
      }
      await prisma.user.create({
         data: {
            username: username,
            name: name,
            email: emailaddress,
            role: Role.RECRUITER,
            studentId: username,
            dateofbirth: new Date(),
            phonenumber: phonenumber,
            password: await bcrypt.hash(password, 10),
         },
      })

      return NextResponse.json({ message: "Recruiter Registered" }, { status: 200 })

   } catch (e) {
      return NextResponse.json({ message: e.message },
         { status: 500 })
   }
}