import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { addCategory,getCategory} from "../controllers/categoryController.js";
export const categoryRouter = express.Router()

categoryRouter.get("/getProducts-category/:id",authMiddleware,checkRoleMiddleware(['Customer']),getCategory)

categoryRouter.post("/add-category",authMiddleware,checkRoleMiddleware(['Admin']),addCategory)

