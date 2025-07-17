import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",      
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true
      },
      quantity: {
        type: Number,
        required:true,
        default: 1        
      }
    }
  ],
  totalPrice:{
    type:Number,
    required:true
  },
  status:{
    type:String,
     enum: ['pending', 'shipped', 'cancelled', 'delivered'],
    default:"pending"
  }
}, { timestamps: true });

export const orderModel = mongoose.model("Orders", orderSchema);
