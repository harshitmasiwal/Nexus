const mongoose = require('mongoose')

const url = "mongo_db_uri/Nexus"

const main = async ()=>{

    //connecting with the database 
    await mongoose.connect(url)


}

module.exports = {main}