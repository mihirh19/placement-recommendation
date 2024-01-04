import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';


export async function POST(req, res) {

   try {
      const { username, password, email, role } = await req.json();


      const hashedPassword = await bcrypt.hash(password, 10);
      // save the user to database
      await prisma.user.create({
         data: {
            username,
            password: hashedPassword,
            email,
            role
         }
      });
      console.log("user created");
      return NextResponse.json({
         message: "user Registerd"
      }, { status: 201 })
   } catch (err) {
      return NextResponse.json({ message: "error occuered while registering user" }, { status: 500 })
   }

}