import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { addReview,editReview,deleteReview } from "../controllers/reviewController.js";
import express from 'express'

export const reviewRouter = express.Router()

reviewRouter.post('/add-review',authMiddleware,checkRoleMiddleware(['Customer']),addReview)

reviewRouter.put('/edit-review/:id',authMiddleware,checkRoleMiddleware(['Customer']),editReview)

reviewRouter.delete('/delete-review/:id',authMiddleware,checkRoleMiddleware(['Customer']),deleteReview)