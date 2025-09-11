const mongoose = require('mongoose')

const url = "mongodb+srv://harshit_masiwal:Harshit%4012@masiwalcluster.sqljlah.mongodb.net/Nexus"

const main = async ()=>{

    //connecting with the database 
    await mongoose.connect(url)


}

module.exports = {main}