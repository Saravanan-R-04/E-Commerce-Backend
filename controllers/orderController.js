import { orderModel } from "../models/orderModel.js";

export const myOrder = async(req,res) =>{
    const userId=req.user.id;
    const order=await orderModel.findOne({userId}).populate("products.productId");
    if(!order)
    {
        return res.status(400).json({
            success:false,
            message:"Not placed an order"
        })
    }
    return res.status(200).json({
        success:true,
        messsage:"Your Order Details",
        order,

    })
}
export const allOrder = async(req,res) =>{
    const allOrder=await orderModel.find({})
    if(!allOrder)
    {
        return res.status(400).json({
            success:false,
            message:"Order is Empty"
        })
    }
    return res.status(200).json({
        success:true,
        message:"All Orders",
        allOrder
    })
}