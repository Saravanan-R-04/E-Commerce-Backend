import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { allOrder, myOrder } from "../controllers/orderController.js";

export const orderRouter = express.Router();

orderRouter.get("/my-order",authMiddleware,checkRoleMiddleware(['Customer']),myOrder)

orderRouter.get("/all-orders",authMiddleware,checkRoleMiddleware(['Admin']),allOrder)