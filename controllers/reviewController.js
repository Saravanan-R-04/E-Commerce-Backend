import { productModel } from "../models/productModel.js";
import { reviewModel } from "../models/reviewModel.js";
export const addReview = async(req,res) =>{
    try{
        const{productId,rating,comment}=req.body;
    const product = await productModel.findById(productId)
    if(!product)
    {
        return res.status(400).json({
            success:"false",
            message:"Invalid Product Id"
        })
    }
    else
    {
        const newReview = new reviewModel({
            user:req.user.id,
            productId,
            rating,
            comment
        })
        await newReview.save()
        return res.status(200).json({
            success:"false",
            message:"Review Added"
        })
    }
    }
    catch(error)
    {
        return res.status(400).json({
            success:"false",
            message:"Error"
        })
    }
    
}
export const editReview = async(req,res) =>{
    try{
        const productId=req.params.id;
        const particularReview = await reviewModel.findById(productId);
        if(!particularReview)
        {
            return res.status(200).json({
                success:false,
                message:"Invalid Review Id"
            })
        }
        particularReview.rating=req.body.rating || particularReview.rating;
        particularReview.comment=req.body.comment || particularReview.body;
        await particularReview.save();
        return res.status(200).json({
            success:true,
            message:"Updated Review"
        })
    }
    catch(error)
    {
        return res.status(200).json({
            success:false,
            message:"Error in updating"
        })
    }
}
export const deleteReview = async(req,res) =>{
    try{
        const reviewId=req.params.id;
        await reviewModel.findByIdAndDelete(reviewId);
        return res.status(200).json({
            success:false,
            message:"Review Deleted Successfully"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:"false",
            message:"Error"
        })
    }
}