import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose

const OrderSchema = new Schema(
  {
    clientId: {
      type: Types.ObjectId,
      required: true,
      ref: 'partner'
    },
    deliveryDate: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Pendiente'
    },
    products: [{
      product: {
        type: Types.ObjectId,
        ref: 'product'
      },
      quantity: Number
    }]

  },
  { timestamps: true }
)

export const OrderModel = model('order', OrderSchema, 'order')
