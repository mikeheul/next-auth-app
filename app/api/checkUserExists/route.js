import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email } = await req.json();
        
        await connectMongoDB();
        const user = await User.findOne({ email: email });
        
        if(user) {
            console.log("User already exists")
            return NextResponse.json({message: "User already exists"}, {status: 200});
        } else {
            return NextResponse.json({message: "User doesn't exists"}, {status: 409});
        }
    } catch (error) {
        return NextResponse.json({ message: "An error occured while finding user"}, {status: 500})
    }
}