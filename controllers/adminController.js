import { productModel } from "../models/productModel.js";
export const addProduct = async(req,res)=>{
    try{
        const {name,price,image,description,stock,categoryId}=req.body;
        if(!name || !price || !image || !description || !categoryId || !stock)
        {
            return res.status(401).json({
            success:false,
            message:"All Fields Are Required"
        })
        }
        const newProduct = new productModel({
            name,
            price,
            image,
            description,
            category:categoryId,
            stock
        })
        await newProduct.save();
        return res.status(200).json({
            success:true,
            message:"Product Added Successfully"
        })
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Error In Adding Product"
        })
    }
}
export const getAllProducts = async(req,res) =>{
    try{
        const allproducts = await productModel.find();
        return res.status(200).json({
            success:true,
            message:"All Products Fetched Successfully",
            allproducts
        })
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Error In Fetching Products"
        })
    }
    
}
export const getSingleProduct = async(req,res) =>{
    try{
        const productId = req.params.id;
        const singleProduct = await productModel.findById(productId);
        if(!singleProduct)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid ID"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Products Fetched",
            singleProduct
        })
    }
    catch(error)
    {
        return res.status(401).json({
                success:false,
                message:"Error In Fetching Product"
        })
    }

}
export const updateProduct = async(req,res) =>{
try{
        const productId = req.params.id;
        const product = await productModel.findById(productId)
        product.name=req.body.name || product.name;
        product.price=req.body.price || product.price;
        product.image=req.body.image || product.image;
        product.description=req.body.description || product.description;
        product.category=req.body.category || product.category;
        product.stock=req.body.stock || product.stock;
        await product.save();
        return res.status(200).json({
            success:true,
            message:"Product Updated Successfully",
            product
        })
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Error In Updating Product"
        })
    }
}
export const deleteProduct =async(req,res) =>{
try{
        const productId = req.params.id;
        const product = await productModel.findByIdAndDelete(productId)
        return res.status(200).json({
            success:true,
            message:"Product Deleted Successfully",
            product
        })
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Error In Deleting Product"
        })
    }
}