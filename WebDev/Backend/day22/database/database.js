const mongoose = require('mongoose')
require('dotenv').config()


const mongo_uri = process.env.MONGO_URI

async function main(){
    await mongoose.connect(mongo_uri)
    console.log("connected to DB")
}

module.exports = {
    main
}