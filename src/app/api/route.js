import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req) {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			username: true,
		}
	})
	return NextResponse.json(users)

	// return NextResponse.json({ name: "John", email: "mihrt" });
}
