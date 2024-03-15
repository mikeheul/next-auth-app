"use client"; // Indicates that this file should run only on the client-side

import { signOut } from "next-auth/react"; // Importing the signOut function from next-auth/react
import { useSession } from "next-auth/react"; // Importing the useSession hook from next-auth/react

const UserInfo = () => { // Defining a functional component named UserInfo

  const { data: session } = useSession(); // Getting the session data using useSession hook
  
  return (
    <div className="grid place-items-center h-screen"> {/* Grid layout */}
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6"> {/* Styling for user info container */}
            <div>
                Name : <span className="font-bold">{session?.user?.name}</span> {/* Displaying user's name */}
            </div>
            <div>
                Email : <span className="font-bold">{session?.user?.email}</span> {/* Displaying user's email */}
            </div>
            <button
                onClick={() => signOut()} // Event handler to sign out the user when the button is clicked
                className="bg-red-500 text-white font-bold px-6 py-2 mt-3"> {/* Styling for logout button */}
                Log Out
            </button>
        </div>
    </div>
  )
}

export default UserInfo; // Exporting the UserInfo component as default
