import express from 'express'
import { connectDB } from './config/db.js';
import {authRouter} from './routes/authRoutes.js'
import { adminRouter } from './routes/adminRoutes.js';
import { cartRouter } from './routes/cartRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { categoryRouter } from './routes/categoryRoutes.js';
import { reviewRouter } from './routes/reviewRoutes.js';

const app=express();
const PORT=5000;

await connectDB();

app.use(express.json())

app.use("/",authRouter)
app.use("/admin",adminRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
app.use("/category",categoryRouter)
app.use("/review",reviewRouter)
app.listen(PORT,()=>{
    console.log("Server is Running on",PORT)
});