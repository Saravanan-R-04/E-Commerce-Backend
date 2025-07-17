import { registerController,loginController} from "../controllers/authController.js";
import express from 'express'

export const authRouter = express.Router();

authRouter.post('/register',registerController)
authRouter.post('/login',loginController)