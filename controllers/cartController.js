import { cartModel } from "../models/cartModel.js";
import {productModel} from "../models/productModel.js";
import { orderModel } from "../models/orderModel.js";
export const cartAddProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Not Found",
      });
    }

   
    let cart = await cartModel.findOne({ userId });

    if (cart) {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;

        await cart.save(); 
        return res.status(200).json({
          success: true,
          message: "Product quantity updated in cart",
          cart,
        });
      } else {
        cart.products.push({ productId, quantity });

        await cart.save(); 
        return res.status(200).json({
          success: true,
          message: "Product added to cart",
          cart,
        });
      }
    } else {
      
      cart = new cartModel({
        userId,
        products: [{ productId, quantity }],
      });

      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Cart created and product added",
        cart,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error
    })
  }
}
export const cartRemoveProduct = async (req, res) => {
  try {
    const productId = req.params.id;

   
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const cart = await cartModel.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

   
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const cartAllProduct = async(req,res) =>{
    try{
        const allProducts=await cartModel.findOne({userId:req.user.id})
        if(!allProducts)
        {
            return res.status(401).json({
                success:false,
                message:"Cart is Empty"
            })
        }
        else
        {
            return res.status(200).json({
                success:true,
                message:"Got All Products",
                allProducts
            })
        }
    }
    catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"Error"
        })
    }
}
export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;
    const orderProducts = cart.products.map((item) => {
      const price = item.productId.price;
      const quantity = item.quantity;
      totalPrice += price * quantity;

      return {
        productId: item.productId._id,
        quantity,
      };
    });

   
    const newOrder = new orderModel({
      userId,
      products: orderProducts,
      totalPrice,
      status: "pending",
    });

    await newOrder.save();

    
    await cartModel.findOneAndDelete({ userId });

   
    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Checkout failed",
      error: error.message,
    });
  }
};