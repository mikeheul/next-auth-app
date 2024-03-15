"use client"; // Indicates that this file should run only on the client-side

import { SessionProvider } from "next-auth/react"; // Importing the SessionProvider component from next-auth/react

export const AuthProvider = ({ children }) => { // Defining a functional component named AuthProvider that takes children as a parameter
    return <SessionProvider>{ children }</SessionProvider>; // Wrapping children with SessionProvider
}
