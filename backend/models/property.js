const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  ownerID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  squareFt: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  parkingGarage: {
    type: Boolean,
    required: true
  },
  publicTransit: {
    type: Boolean,
    required: true
  },
  smoking: {
    type: Boolean,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  ratingCount: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { collection: 'properties' })

module.exports = mongoose.model('Property', propertySchema)