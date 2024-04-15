const express = require('express')
const router = express.Router()

const { getAllProperties, createProperty, signup, login, submitPropertyRating, getPropertiesByOwnerID, updateProperty, deleteProperty, getPropertyByID } = require('../controllers/controller')

router.get('/properties', getAllProperties)
router.get('/users/:ownerID/properties', getPropertiesByOwnerID)

//both of these routes serve the same purpose, ownerID is ignored
router.get('/properties/:propertyID', getPropertyByID)
router.get('/users/:ownerID/properties/:propertyID', getPropertyByID)

router.post("/properties", createProperty)
router.post('/signup', signup)
router.post('/login', login)
router.post('/properties/:propertyID/submitrating', submitPropertyRating)

router.put('/users/:ownerID/properties/:propertyID', updateProperty)
router.delete('/users/:ownerID/properties/:propertyID', deleteProperty)

module.exports = router