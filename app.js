// import lib
import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import parser from 'body-parser'
import { createServer } from 'http'
import cors from 'cors'

// import controllers
// simport { personController } from './controllers/person.js'
import { userController } from './controllers/user.js'
import { partnerController } from './controllers/partner.js'
import { productController } from './controllers/product.js'

// config express
dotenv.config()
const app = express()
app.use(parser.json())
app.use(cors())
app.set('port', process.env.PORT || 3001)

// app.use('/person', personController)
app.use('/user', userController)
app.use('/partner', partnerController)
app.use('/product', productController)

// DB
mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (error) => {
    if (error) return console.log('Error connecting DB', error)
    console.log('db connected')
  }
)

// Start server
const server = createServer(app)
server.listen(app.get('port'), () => console.log('ready on port: ' + app.get('port')))
