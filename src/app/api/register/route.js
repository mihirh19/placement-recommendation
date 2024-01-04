import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';




export async function POST(req, res) {

   try {
      const { username, password } = await req.json();

      const hashedPassword = await bcrypt.hash(password, 10);
      // save the user to database
      await prisma.user.create({
         data: {
            username,
            password: hashedPassword
         }
      });
      return NextResponse.json({
         message: "user Registerd"
      }, { status: 201 })
   } catch (err) {
      return NextResponse.json({ message: "error occuered while registering user" }, { status: 500 })
   }

}