import express from 'express'
import { UserModel } from '../models/UserModel.js'
import verify from '../auth/verification.js'

const router = express.Router()

router.get('/', verify, async (req, res) => {
  try {
    const persons = await UserModel.find()

    return res.json(persons)
  } catch (error) {
    return res.status(500).json({ message: 'error looking for persons', error })
  }
})
router.get('/:id', verify, async (req, res) => {
  try {
    const person = await UserModel.findById(req.params.id)
    return res.json(person)
  } catch (error) {
    return res
      .status(500)
      .json({ message: `error looking for id ${req.params.id}`, error })
  }
})

router.delete('/:id', verify, async (req, res) => {
  try {
    const result = UserModel.deleteOne({ _id: req.params.id })
    return res.json(result)
  } catch (error) {
    res.status(500).json({ message: `error deleting id ${req.params.id}`, error })
  }
})

export const personController = router
