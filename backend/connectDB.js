const mongoose = require('mongoose')
const MongoDB_URI = ""
async function connectToMongoDB() {
  try {
    await mongoose.connect(MongoDB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err)
  }
}

module.exports = connectToMongoDB