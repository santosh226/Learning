import mongoose from "mongoose";

async function connectDB () {
    try {
       const response = await mongoose.connect(process.env.MONGODB_URI)
       console.log(`MongoDB Connected: ${response.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Failed: ${error.message}`);
    }
}

export default connectDB;