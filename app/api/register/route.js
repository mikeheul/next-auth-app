import { connectMongoDB } from "@/lib/mongodb"; // Importing the connectMongoDB function from the mongodb library
import User from "@/models/user"; // Importing the User model from the user module
import { NextResponse } from "next/server"; // Importing NextResponse from the next/server module
import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing

export async function POST(req) { // Declaring an asynchronous function named POST which takes a request object as parameter
    try { // Beginning of try block for error handling
        const { name, email, password } = await req.json(); // Destructuring name, email, and password from the JSON body of the request

        // hash password with BCrypt
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password using bcrypt with a salt factor of 10
        // connect to DB
        await connectMongoDB(); // Connecting to MongoDB
        // create a new user
        await User.create({ name, email, password: hashedPassword }); // Creating a new user in the database with hashed password

        return NextResponse.json({ message: "User registered" }, { status: 201 }); // Returning a JSON response with message "User registered" and status code 201 (Created)
    } catch (error) { // Catching errors
        return NextResponse.json({ message: "An error occurred while registering user" }, { status: 500 }); // Returning a JSON response with error message and status code 500 (Internal Server Error)
    }
}