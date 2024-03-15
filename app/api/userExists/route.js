import { connectMongoDB } from "@/lib/mongodb"; // Importing the connectMongoDB function from the mongodb library
import User from "@/models/user"; // Importing the User model from the user module
import { NextResponse } from "next/server"; // Importing NextResponse from the next/server module

export async function POST(req) { // Defining an asynchronous function named POST which takes a request object as parameter
  try { // Beginning of try block for error handling
    await connectMongoDB(); // Connecting to MongoDB
    const { email } = await req.json(); // Extracting the email from the JSON body of the request
    const user = await User.findOne({ email }).select("_id"); // Finding a user by email in the database and selecting only the _id field
    
    return NextResponse.json({ user }); // Returning a JSON response with the found user
  } catch (error) { // Catching errors
    console.log(error); // Logging the error to the console
  }
}
