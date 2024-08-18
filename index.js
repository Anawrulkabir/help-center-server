require('dotenv').config()
const express = require('express')
const dbConnect = require('./dbConnect')
const cardsRoutes = require('./routes/cardsRoute')
const cors = require('cors')
const app = express()

dbConnect()

app.use(express.json())
app.use(cors())

app.use('/api', cardsRoutes)

const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  res.send('Hello from help-center-server!')
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
