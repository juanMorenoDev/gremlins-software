const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const mongoose = require('mongoose')

router.post('/login', async (req, res) => {
  try {
    const userFound = await UserModel.findOne({
      email: req.body.username,
      document: req.body.password
    })
    if (userFound !== null) {
      const token = jwt.sign({ _id: userFound._id }, process.env.SECRET)
      res.json({ message: 'success', token })
    } else {
      res.status(401).json({ message: 'Email or password are wrong' })
    }
  } catch (err) {
    res.status(400).json({ message: `Error during sign in: ${err}` })
  }
})

router.post('/register', async (req, res) => {

  try {
    const {
      name,
      phone,
      city,
      email,
      document,
    } = req.body
    const findPerson = await UserModel.findOne({ email })
    if (findPerson) {
      res.status(401).json({ message: 'person already registered' })
      return
    }
    const person = await new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      phone,
      city,
      document,
    })

    const data = await person.save()
    res.json(data)
  } catch (error) {
    console.log('Error: \n', error)
    res.status(400).json({ message: 'error registering data', error })

  }
})

module.exports = router
