import express from 'express'
import { PartnerModel } from '../models/PartnerModel.js'
// import verify from '../auth/verification.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const partners = await PartnerModel.find()
    return res.json(partners)
  } catch (error) {
    return res.status(500).json({ message: 'error looking for partners', error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const partnerbyId = await PartnerModel.findById(
      req.params.id
    )
    console.log(partnerbyId)
    if (partnerbyId === null) return res.status(401).json({ message: 'id no encontrado' })
    return res.json({ message: 'success', partnerbyId })
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `error looking for id ${req.params.id
          }`,
        error
      })
  }
})

router.post('/login', async (req, res) => {
  try {
    const partner = await PartnerModel.findOne({
      email: req.body.email
    })
    if (partner === null) return res.status(401).json({ message: 'Email or password are wrong' })
    return res.json({ message: 'success', partner })
  } catch (error) {
    return res
      .status(500)
      .json({ message: `error looking for id ${req.params.id}`, error })
  }
})

router.post('/', async (req, res) => {
  try {
    const partner = new PartnerModel(req.body)

    const data = await partner.save()

    return res.json(data)
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(500).json({ message: 'partner already registered' })

    return res.status(400).json({ message: 'error registering data', error })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const data = await PartnerModel.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true,
        runValidators: true
      })

    return res.json(data)
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(500).json({ message: 'partner already registered' })

    return res.status(400).json({ message: 'error registering data', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await PartnerModel.deleteOne({ _id: req.params.id })
    return res.json(result)
  } catch (error) {
    res.status(500).json({ message: `error deleting id ${req.params.id}`, error })
  }
})

export const partnerController = router
