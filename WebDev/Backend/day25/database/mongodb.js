const mongoose = require('mongoose')
require('dotenv').config()


const mongo_uri = process.env.MONGO_URI

const connectMongoDB = async()=>{
    await mongoose.connect(mongo_uri)
}

module.exports = {
    connectMongoDB
}