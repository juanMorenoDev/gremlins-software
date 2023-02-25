const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  
  const now = new Date()
  const day = now.getDay()
  const token = req.header('token')
  if (!token) res.status(401).json({ message: 'unauthorized' })
  try {
    const validated = jwt.verify(token, process.env.SECRET)
    req.user = validated
    next()
  } catch (error) {
    res.status(401).json({ message: 'invalid token' })
  }
}
module.exports = verify