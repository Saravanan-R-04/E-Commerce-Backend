import { categoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";
export const getCategory = async(req,res) =>{
    try{
        const categoryId=req.params.id;
        const products = await productModel.find({category:categoryId})
        if(!products)
        {
            return res.status(400).json({
            success:false,
            message:"Invalid Id"
        })
        }
        return res.status(200).json({
            success:true,
            message:"Get Products Based on Category",
            products
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error"
        })
    }
}
export const addCategory = async(req,res) =>{
    try{
        const{name,slug}=req.body;
        const newCategory=new categoryModel({
            name,slug
        })
        await newCategory.save();
        return res.status(200).json({
            success:true,
            message:"Category Added"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error In Adding Category"
        })
    }
}
