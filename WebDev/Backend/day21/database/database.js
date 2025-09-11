const mongoose = require('mongoose')

const mongo_uri = "mongodb+srv://harshit_masiwal:Harshit%4012@masiwalcluster.sqljlah.mongodb.net/School"

async function main(){
    await mongoose.connect(mongo_uri)
    console.log("connected to DB")
}

module.exports = {
    main
}