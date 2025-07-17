import { addProduct, getAllProducts, getSingleProduct, updateProduct,deleteProduct} from "../controllers/adminController.js";
import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const adminRouter = express.Router()

adminRouter.post('/add-product',authMiddleware,checkRoleMiddleware(['Admin']),addProduct)

adminRouter.get('/get-products',authMiddleware,checkRoleMiddleware(['Admin']),getAllProducts)

adminRouter.get('/get-product/:id',authMiddleware,checkRoleMiddleware(['Admin']),getSingleProduct)

adminRouter.put('/update-product/:id',authMiddleware,checkRoleMiddleware(['Admin']),updateProduct)

adminRouter.delete('/delete-product/:id',authMiddleware,checkRoleMiddleware(['Admin']),deleteProduct)