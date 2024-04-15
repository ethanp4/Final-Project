const express = require('express')
const app = express()
const allRoutes = require('./routes/allRoutes')
const connectToMongoDB = require('./connectDB')
const PORT = 7000

connectToMongoDB()

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`)
  next()
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(allRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})