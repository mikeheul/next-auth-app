import mongoose, { Schema, models } from "mongoose"; // Importing mongoose and Schema from mongoose

// Defining a schema for the user model
const userSchema = new Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    email: {
        type: String,
        required: true, // Email is required
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    },
    { timestamps: true } // Adding timestamps for createdAt and updatedAt
);

// Defining the User model
const User = models.User || mongoose.model("User", userSchema); // Checking if the User model already exists, if not, create it using the userSchema
export default User; // Exporting the User model