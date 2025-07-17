import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js'
import { cartAddProduct, cartAllProduct, cartRemoveProduct, checkOut } from '../controllers/cartController.js'

export const cartRouter=express.Router()

cartRouter.post("/add-product",authMiddleware,checkRoleMiddleware(['Customer']),cartAddProduct)

cartRouter.delete("/remove/:id",authMiddleware,checkRoleMiddleware(['Customer']),cartRemoveProduct)

cartRouter.get("/all-product",authMiddleware,checkRoleMiddleware(['Customer']),cartAllProduct)

cartRouter.post("/checkout",authMiddleware,checkRoleMiddleware(['Customer']),checkOut)