import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken' 

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();

	//mongodb fetch user
	const user = {};

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
}