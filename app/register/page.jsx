import RegisterForm from "@/components/RegisterForm"; // Importing the RegisterForm component from the components directory
import { getServerSession } from "next-auth"; // Importing the getServerSession function from next-auth
import { redirect } from "next/navigation"; // Importing the redirect function from next/navigation
import { authOptions } from "../api/auth/[...nextauth]/route"; // Importing the authOptions from the authentication route

const page = async () => { // Defining an asynchronous arrow function named page
  const session = await getServerSession(authOptions); // Retrieving the session using getServerSession and passing authOptions

  if(session) redirect("/dashboard"); // If a session exists, redirect the user to the dashboard page

  return (
    <RegisterForm /> // Rendering the RegisterForm component
  );
};

export default page; // Exporting the page component as the default export
