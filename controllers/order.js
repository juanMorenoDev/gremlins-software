import express from 'express'
import { OrderModel } from '../models/OrderModel.js'
// import verify from '../auth/verification.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const partners = await OrderModel.find().populate('products.product').populate('clientId')

    return res.json(partners)
  } catch (error) {
    return res.status(500).json({ message: 'error looking for partners', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const order = new OrderModel(req.body)

    const data = await order.save()

    return res.json(data)
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(500).json({ message: 'order already registered' })

    return res.status(400).json({ message: 'error registering order', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await OrderModel.deleteOne({ _id: req.params.id })
    return res.json(result)
  } catch (error) {
    res.status(500).json({ message: `error deleting id ${req.params.id}`, error })
  }
})

export const orderController = router