import bcrypt from 'bcrypt'
import { userModel } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
export const registerController = async (req,res) =>{
    try{
        const{name,email,password,role}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
            role
        })
        await newUser.save();
        return res.status(201).json({
            success:true,
            message:"User Registered Successfully"
        })
    }
    catch(error)
    {
        return res.status(404).json({
            success:false,
            message:"Error In Registering"
        })
    }
}
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email }).select("+password");

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "You need to Register"
            });
        }

        const cmd = await bcrypt.compare(password, existingUser.password);

        if (!cmd) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            "secretkey",
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error In Log In"
        });
    }
};
