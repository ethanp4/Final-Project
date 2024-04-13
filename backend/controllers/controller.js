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
    const properties = await propertyData.find()
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
    res.json(property)
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
    console.log(property)
    res.status(201).json({ message: 'Rating submitted successfully', newRating: (property.rating / property.ratingCount).toFixed(1) + "/5", newCount: property.ratingCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const populateExampleData = async (req, res) => {

  var exampleListingsData = [
    {
      ownerID: " ",
      name: "House",
      address: "123 Main St",
      capacity: 4,
      description: "A beautiful house",
      squareFt: 1000,
      price: 100,
      parkingGarage: true,
      publicTransit: false,
      smoking: false,
      rating: 0,
      ratingCount: 0
    },
    {
      ownerID: " ",
      name: "Apartment",
      address: "456 Main St",
      capacity: 2,
      description: "A beautiful apartment",
      squareFt: 500,
      price: 50,
      parkingGarage: false,
      publicTransit: true,
      smoking: false,
      rating: 15,
      ratingCount: 3
    },
    {
      ownerID: " ",
      name: "Office",
      address: "789 Main St",
      capacity: 10,
      description: "A beautiful office",
      squareFt: 2000,
      price: 200,
      parkingGarage: true,
      publicTransit: true,
      smoking: true,
      rating: 3,
      ratingCount: 1
    },
    {
      ownerID: " ",
      name: "Cottage",
      address: "987 Main St",
      capacity: 3,
      description: "A beautiful cottage",
      squareFt: 1200,
      price: 150,
      parkingGarage: false,
      publicTransit: false,
      smoking: false,
      rating: 0,
      ratingCount: 0
    },
    {
      ownerID: " ",
      name: "Cabin",
      address: "654 Main St",
      capacity: 5,
      description: "A beautiful cabin",
      squareFt: 1500,
      price: 250,
      parkingGarage: true,
      publicTransit: true,
      smoking: true,
      rating: 0,
      ratingCount: 0
    },
    {
      ownerID: " ",
      name: "Villa",
      address: "321 Main St",
      capacity: 7,
      description: "A beautiful villa",
      squareFt: 3000,
      price: 300,
      parkingGarage: true,
      publicTransit: true,
      smoking: true,
      rating: 0,
      ratingCount: 0
    },
    {
      ownerID: " ",
      name: "Chalet",
      address: "123 Main St",
      capacity: 8,
      description: "A beautiful chalet",
      squareFt: 4000,
      price: 400,
      parkingGarage: true,
      publicTransit: true,
      smoking: true,
      rating: 0,
      ratingCount: 0
    }
  ]

  for (var i = 0; i < exampleListingsData.length; i++) {
    var property = new propertyData(exampleListingsData[i])
    await property.save()
  }
  res.status(200).json({ message: "Data populated" })
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

//wrote this but i dont need it for now
// const getUserInfo = async (req, res) => {
//   //check if authorization header exists before this
//   const accessToken = req.headers.authorization.split(' ')[1]

//   try {
//     const decoded = jwt.verify(accessToken, accessSecret)
//     const user = await userData.find(decoded.username)

//     res.status(200).json({
//       username: user.username,
//       type: user.type,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       id: user._id
//     })
//   } catch (error) {
//     //or error: 'Unauthorised'
//     res.status(401).json(error)
//   }
// }

module.exports = { getAllProperties, createProperty, signup, login, getPropertiesByOwnerID, submitPropertyRating, getPropertyByID, updateProperty, deleteProperty, populateExampleData }