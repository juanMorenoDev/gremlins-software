import { Router } from 'express'
//import jwt from 'jsonwebtoken'
import { ProductModel } from '../models/ProductModel.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const product = new ProductModel(req.body)

    const data = await product.save()

    return res.json(data)
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(500).json({ message: 'product already registered' })

    return res.status(400).json({ message: 'error registering data', error })
  }
 
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await ProductModel.deleteOne({ _id: req.params.id })
    return res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `error deleting id ${req.params.id}`, error })
  }
})

export const productController = router
