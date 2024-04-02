const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  created: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' })

module.exports = mongoose.model('User', userSchema)
