const userData = require('../models/user')
const propertyData = require('../models/property')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

//servers access secret for generating and verifying tokens
const accessSecret = process.env.ACCESS_TOKEN_SECRET

const updateProperty = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1]

  try {
    await jwt.verify(accessToken, accessSecret)

    await propertyData.findByIdAndUpdate(req.params.propertyID, req.body)
    res.status(201).json({ message: 'Property updated successfully' })
  } catch (err) {
    // console.log(err)
    res.status(400).json({ message: err.message })
  }
}

const deleteProperty = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1]

  try {
    await jwt.verify(accessToken, accessSecret)

    await propertyData.findByIdAndDelete(req.params.propertyID)
    res.status(204).json({ message: 'Property deleted successfully' })
  } catch (error) {
    res.status(401).json(error)
  }
}

const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyData.find({ forRent: true })
    res.json(properties)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createProperty = async (req, res) => {
  const property = new propertyData({
    ownerID: req.body.ownerID,
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
    description: req.body.description,
    squareFt: req.body.squareFt,
    price: req.body.price,
    parkingGarage: req.body.parkingGarage,
    publicTransit: req.body.publicTransit,
    smoking: req.body.smoking,
    forRent: req.body.forRent,
    rating: 0,
    ratingCount: 0
  })

  try {
    const newProperty = await property.save()
    res.json(newProperty)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getPropertyByID = async (req, res) => {
  const propertyID = req.params.propertyID
  try {
    const property = await propertyData.findById(propertyID)
    const owner = await userData.findById(property.ownerID)
    const ownerInfo = {
      firstName: owner.firstName,
      lastName: owner.lastName,
      email: owner.email,
      phone: owner.phone
    }
    res.json({ property, ownerInfo })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const signup = async (req, res) => {
  if (await userData.findOne({ username: req.body.username })) {
    console.log("User already exists")
    return res.status(400).json({ message: "User already exists" })
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new userData({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      type: req.body.type
    })

    await user.save()

    // console.log(res)

    res = await postAuthenticate(user, res)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const login = async (req, res) => {
  try {
    const user = await userData.findOne({ username: req.body.username })
    if (!user) {
      console.log("User not found")
      return res.status(400).json({ message: "Invalid username or password" })
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
      console.log("Password incorrect")
      return res.status(400).json({ message: "Invalid username or password" })
    }

    res = await postAuthenticate(user, res)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getPropertiesByOwnerID = async (req, res) => {
  try {
    const properties = await propertyData.find({ ownerID: req.params.ownerID })
    res.json(properties)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const submitPropertyRating = async (req, res) => {
  try {
    var property = await propertyData.findById(req.params.propertyID)
    property.rating += parseInt(req.body.rating)
    property.ratingCount++
    await propertyData.findByIdAndUpdate(req.params.propertyID, property)
    // console.log(property)
    res.status(201).json({ message: 'Rating submitted successfully', newRating: (property.rating / property.ratingCount).toFixed(1) + "/5", newCount: property.ratingCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



//common functionality after login/signup
const postAuthenticate = async (user, res) => {
  const userJWT = { username: user.username, type: user.type }
  const accessToken = jwt.sign(userJWT, accessSecret, { expiresIn: '1h' })

  return res.status(201).json({
    user: {
      username: user.username,
      type: user.type,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      id: user._id
    },
    accessToken: accessToken
  })
}

module.exports = { getAllProperties, createProperty, signup, login, getPropertiesByOwnerID, submitPropertyRating, getPropertyByID, updateProperty, deleteProperty }