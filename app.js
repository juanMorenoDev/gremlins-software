const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')

const app = express()
const cors = require('cors')
const server = http.createServer(app)
if (process.env.NODE_ENV !== 'production') require('dotenv/config')

app.use(bodyParser.json())
app.use(cors())
// import routes
app.get('/', (req, res) => {
  // TODO: remove this
  res.status(200).json({
    status: 'OK'
  })
})

const personRoute = require('./routes/person')
app.use('/person', personRoute)

const userRoute = require('./routes/user')
app.use('/user', userRoute)

// DB
mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (error) => {
    if (error) return console.log('Error connecting DB', error)
    console.log('db connected')

  }
)
// Start server
app.set('port', process.env.PORT || 3001)
server.listen(app.get('port'), () => console.log('ready on port: ' + app.get('port')))