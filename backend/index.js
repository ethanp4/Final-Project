const express = require('express')
const app = express()
const allRoutes = require('./routes/allRoutes.js')

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

// convert form data to javascript object and put into request body
app.use(express.urlencoded({ extended: false }))

// convert json to javascript object and put into request body
app.use(express.json())
app.use(allRoutes)
app.listen(7000, () => {
  console.log('Server is running........')
})