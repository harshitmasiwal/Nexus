const mongoose = require('mongoose')



async function connectMongo(){
    await mongoose.connect(process.env.MONGO_URI)
}

module.exports = {
    connectMongo
}

