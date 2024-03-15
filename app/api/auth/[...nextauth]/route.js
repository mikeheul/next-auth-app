import { connectMongoDB } from "@/lib/mongodb"; // Importing the connectMongoDB function from the mongodb library
import User from "@/models/user"; // Importing the User model from the user module
import NextAuth from "next-auth/next"; // Importing the NextAuth module
import CredentialsProvider from "next-auth/providers/credentials"; // Importing the CredentialsProvider from the next-auth/providers/credentials module
import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing

export const authOptions = { // Defining authentication options
  providers: [ // Array of authentication providers
    CredentialsProvider({ // Configuring the CredentialsProvider
      name: "credentials", // Provider name
      credentials: {}, // Initial credentials object

      async authorize(credentials) { // Authorize function to handle authentication
        const { email, password } = credentials; // Destructuring email and password from credentials

        try { // Handling errors with try-catch block
          await connectMongoDB(); // Connecting to MongoDB
          const user = await User.findOne({ email }); // Finding a user by email in the database

          if (!user) { // If user is not found
            return null; // Return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password); // Comparing hashed password with stored hashed password

          if (!passwordsMatch) { // If passwords don't match
            return null; // Return null
          }

          return user; // Return user object if authentication successful
        } catch (error) { // Catching errors
          console.log("Error: ", error); // Logging error to console
        }
      },
    }),
  ],
  session: { // Session configuration
    strategy: "jwt", // Using JWT for session strategy
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
  pages: { // Configuring pages
    signIn: "/", // Redirecting sign-in page to root
  },
};

const handler = NextAuth(authOptions); // Creating a NextAuth handler with provided options

export { handler as GET, handler as POST }; // Exporting the NextAuth handler as GET and POST