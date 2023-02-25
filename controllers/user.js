import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel.js'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const userFound = await UserModel.findOne({
      email: req.body.username,
      document: req.body.password
    })

    if (userFound === null) return res.status(401).json({ message: 'Email or password are wrong' })

    const token = jwt.sign({ _id: userFound._id }, process.env.SECRET)
    return res.json({ message: 'success', token })
  } catch (err) {
    return res.status(400).json({ message: `Error during sign in: ${err}` })
  }
})

router.post('/register', async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      email,
      userId
    } = req.body

    const person = new UserModel({
      name,
      email,
      phone,
      address,
      userId
    })

    const data = await person.save()

    return res.json(data)
  } catch (error) {
    if (error.code === 11000) return res.status(500).json({ message: 'person already registered' })

    return res.status(400).json({ message: 'error registering data', error })
  }
})

export const userController = router
