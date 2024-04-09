//this file contains routes and which code they will execute

const express = require('express')
const router = express.Router()
// const { getAllProperties, getSingleProperty, getAllOwnersProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/controller')

const { getAllProperties, createProperty, signup, login, getPropertiesByOwnerID, getPropertyByID, populateExampleData } = require('../controllers/controller')

router.get('/properties', getAllProperties)

router.get('/users/:ownerID/properties', getPropertiesByOwnerID)

router.post("/properties", createProperty)

router.get('/properties/:propertyID', getPropertyByID)
router.get('/users/:ownerID/properties/:propertyID', getPropertyByID)

// router.put("/properties/:id", updateProperty)

// router.delete("/properties/:id", deleteProperty)

router.post('/signup', signup)
router.post('/login', login)

// router.get('/users/:id', getUserInfo)

router.post('/populateExampleData', populateExampleData)

module.exports = router