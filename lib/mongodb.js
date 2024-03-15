import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions

// Function to connect to the MongoDB database
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // Connecting to MongoDB using the provided URI from environment variables
        console.log("Connected to MongoDB"); // Logging successful connection
    } catch (error) {
        console.log("Error connecting to MongoDB", error); // Logging error if connection fails
    }
}
