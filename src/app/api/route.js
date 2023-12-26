import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GET(req) {
	// const users = await prisma.user.findMany()
	// return NextResponse.json(users)
	return NextResponse.json({ name: "John", email: "mihrt" });
}

export async function POST(req, res) {
	const data = await req.json()
	await prisma.user.create({ data: data })
	return NextResponse.json(data);
}

