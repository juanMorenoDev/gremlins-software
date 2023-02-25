const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')
const verify = require('../auth/verification')

// GET ALL
router.get('/', verify, (req, res) => {
  UserModel.find()
    .then((persons) => res.json(persons))
    .catch((error) =>
      res.status(400).json({ message: 'error looking for persons', error })
    )
})
// GET BY ID
router.get('/:id', verify, (req, res) => {
  UserModel.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) =>
      res
        .status(503)
        .json({ message: `error looking for id ${req.params.id}`, error })
    )
})

// DELETE BY ID
router.delete('/:id', verify, (req, res) => {

  UserModel.deleteOne({ _id: req.params.id })
    .then((person) => {
      res.json(person)
    })
    .catch((error) =>
      res
        .status(503)
        .json({ message: `error deleting id ${req.params.id}`, error })
    )
})

module.exports = router
