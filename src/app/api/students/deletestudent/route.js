import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(req, res) {
   try {
      const session = await getServerSession(authOptions);
      if (!session) {
         return NextResponse.json({ message: "you are not allowed to delete students" }, { status: 401 })
      }
      if (session.role !== Role.ADMIN) {
         return NextResponse.json({ message: "you are not allowed to delete students" }, { status: 401 })
      }
      const { id } = await req.json();
      await prisma.user.delete({
         where: {
            id: id
         }
      });
      return NextResponse.json({ message: "Student deleted sucessfull" }, { status: 200 })
   } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 })
   }
}