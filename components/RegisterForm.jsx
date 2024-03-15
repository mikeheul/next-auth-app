"use client"; // Indicates that this file should run only on the client-side

import Link from "next/link"; // Importing the Link component from next/link
import { useState } from "react"; // Importing the useState hook from React
import { useRouter } from "next/navigation"; // Importing the useRouter hook from next/navigation

export default function RegisterForm() { // Defining a functional component named RegisterForm

  // State variables to manage name, email, password, passwordRepeat, and error messages
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Initializing the useRouter hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    if (!name || !email || !password) { // Checking if required fields are not empty
      setError("All fields are necessary.");
      return;
    }

    if(password !== passwordRepeat) { // Checking if password and repeated password match
        setError("Passwords do not match");
        return;
    }

    // Regular expression for password requirements
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

    // Check if password meets the requirements
    if (!passwordPattern.test(password)) {
      setError("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", { // Checking if user already exists
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", { // Registering the user
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) { // If registration is successful
        const form = e.target;
        form.reset(); // Resetting the form
        router.push("/"); // Redirecting to the home page
      } else {
        console.log("User registration failed."); // Logging if registration fails
      }
    } catch (error) {
      console.log("Error during registration: ", error); // Logging any errors during registration
    }
  };

  // JSX for the registration form
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-slate-200">
        <h1 className="text-xl font-bold my-4">Register</h1>

        {/* Form for registration */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border-neutral-400 rounded-lg"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            />
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
          <input
            className="border-neutral-400 rounded-lg"
            onChange={(e) => setPasswordRepeat(e.target.value)}
            type="password"
            placeholder="Repeat Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-lg">
            Register
          </button>

          {/* Displaying error message if exists */}
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          {/* Link to login page */}
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}