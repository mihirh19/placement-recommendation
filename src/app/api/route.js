import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req, res) {
	try {

		const session = await getServerSession(authOptions)
		if (session) {
			if (session.role !== 'ADMIN') {
				return NextResponse.json({ message: "you are not allowed to Get users" }, { status: 401 })
			}
		}
		else {
			return NextResponse.json({ message: "you are not allowed to Get users" }, { status: 401 })
		}
		let users = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
			}
		})
		return NextResponse.json({ users }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ message: err.message }, { status: 500 })
	}
}
