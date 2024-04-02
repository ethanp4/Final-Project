//this file contains routes and which code they will execute

const express = require('express')
const router = express.Router()
const { getAllProperties, getSingleProperty, getAllOwnersProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/controller')

router.get('/properties', getAllProperties)
router.get('/properties/:id', getSingleProperty)
router.get('/properties/:ownerid', getAllOwnersProperties)

router.post("/properties", createProperty)

router.put("/properties/:id", updateProperty)

router.delete("/properties/:id", deleteProperty)

module.exports = router