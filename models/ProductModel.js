import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ProductSchema = new Schema(
  {
    partnerId: {
      type: Number,
      required: true,
      unique: true
    },
    /*    productId: {
      type: ID,
      required: true
    }, */
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }

  },
  { timestamps: true }
)

export const ProductModel = model('product', ProductSchema, 'product')
