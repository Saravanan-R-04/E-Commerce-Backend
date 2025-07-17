import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/E-Commerce")
        console.log("DB Connected");
    }
    catch(error)
    {
        console.log("Error in Connection");
    }
    
}