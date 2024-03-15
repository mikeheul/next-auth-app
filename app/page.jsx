import LoginForm from "@/components/LoginForm"; // Importing the LoginForm component from the components directory
import { getServerSession } from "next-auth"; // Importing the getServerSession function from next-auth
import { redirect } from "next/navigation"; // Importing the redirect function from next/navigation
import { authOptions } from "./api/auth/[...nextauth]/route"; // Importing the authOptions from the authentication route

export default async function Home() { // Defining an asynchronous function named Home, which is the default export of this module

  const session = await getServerSession(authOptions); // Retrieving the session using getServerSession and passing authOptions
  
  if(session) redirect("/dashboard"); // If a session exists, redirect the user to the dashboard page
  
  return (
      <LoginForm />
  );
}