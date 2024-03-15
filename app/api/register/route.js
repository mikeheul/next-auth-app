import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // hash password with BCrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // connect to DB
        await connectMongoDB();
        // create a new user
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error occured while registering user"}, {status: 500})
    }
}