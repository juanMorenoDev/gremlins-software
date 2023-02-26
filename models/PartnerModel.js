import mongoose from 'mongoose'
const { Schema, model } = mongoose

export const types = {
  CLIENTE: 'CLIENTE',
  DISTRIBUIDOR: 'DISTRIBUIDOR'
}

const PartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    documentType: {
      type: String,
      required: true
    },
    partnerId: {
      type: Number,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: Object.keys(types),
      required: true
    }
  },
  { timestamps: true }
)

export const PartnerModel = model('partner', PartnerSchema, 'partner')
