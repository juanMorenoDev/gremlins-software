const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


const UserModel = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
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
      required: true
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('user', UserModel, 'user')
