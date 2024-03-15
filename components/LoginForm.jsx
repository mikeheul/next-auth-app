"use client"; // Indicates that this file should run only on the client-side

import Link from "next/link"; // Importing the Link component from next/link
import { useState } from "react"; // Importing the useState hook from React
import { signIn } from "next-auth/react"; // Importing the signIn function from next-auth/react
import { useRouter } from "next/navigation"; // Importing the useRouter hook from next/navigation

export default function LoginForm() { // Defining a functional component named LoginForm

  // State variables to manage email, password, and error messages
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Initializing the useRouter hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    try {
      const res = await signIn("credentials", { // Signing in with email and password credentials
        email,
        password,
        redirect: false, // Disabling automatic redirection after sign-in
      });

      if (res.error) { // If there's an error during sign-in
        setError("Invalid Credentials"); // Setting error message
        return;
      }

      router.replace("dashboard"); // Redirecting to the dashboard page
    } catch (error) {
      console.log(error); // Logging any errors to the console
    }
  };

  // JSX for the login form
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-slate-200">
        <h1 className="text-xl font-bold my-4">Login</h1>

        {/* Form for email and password input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border-neutral-400 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="border-neutral-400 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-lg">
            Login
          </button>
          {error && (
            // Displaying error message if exists
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          {/* Link to register page */}
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}