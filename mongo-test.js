// ENV
require('dotenv').config()
// get mongoose package
const mongoose = require('mongoose')
const express = require('express')
// const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4500

// connect to MongoDB / the name of DB is set to 'myDB'
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useMongoClient: true
}

mongoose.connect(process.env.MONGO_URI, option, (err, db) => {
  if (err) {
    console.error('error occured while connecting db')
    return
  }
  console.log('connected db successfully : ' + process.env.MONGO_URI)
})

// creates DB schema
var userSchema = mongoose.Schema({
  username: 'string',
  pwd: 'string',
  lat: 'number',
  lng: 'number'
})

// compiels our schema into a model
var User = mongoose.model('User', userSchema)

// add user1 and user2 to "User" model
var user1 = new User({ username: 'cbsong', pwd: 'test', lat: 33.135, lng: 35.357 })
var user2 = new User({ username: 'mnkwon', pwd: 'test', lat: 33.357, lng: 35.579 })

// save user1
user1.save(function (err, user1) {
  // TODO handle the error
  if (err) {
    console.log('error')
    return
  }
  console.log('user1 saved!')
})

// save user2
user2.save(function (err, user2) {
  // TODO handle the error
  if (err) {
    console.log('error')
    return
  }
  console.log('user2 saved!')
})

app.listen(port, () => console.log(`Server listening on port ${port}`))

// User.find().then(doc => {
//   console.log(doc)
// }).then(() =>
//   mongoose.connection.close()
// )
