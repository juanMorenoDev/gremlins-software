import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    document: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

export const UserModel = model('user', UserSchema, 'user')
