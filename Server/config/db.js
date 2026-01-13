const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Connection error:", error.message)
    }
}
module.exports = connectDB
