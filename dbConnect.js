const mongoose = require('mongoose')

const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true }
  const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster10.vknr6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10`
  mongoose.connect(DB_URI, connectionParams)

  mongoose.connection.on('connected', () => {
    console.log('Connected to database sucessfully')
  })

  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to database :' + err)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongodb connection disconnected')
  })
}

module.exports = dbConnect
