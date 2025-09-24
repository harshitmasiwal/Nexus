const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        minLength : 2 ,
        maxLength : 20 ,
        required  : true ,
        trim : true,
        uppercase : true
    },
    lastName : {
        type : String ,
        minLength : 2,
        maxLength : 20, 
        trim : true,
        uppercase : true
    },
    emailID : {
        type : String ,
        unique : true ,
        required : true ,
        trim : true , 
        lowercase : true ,
        immutable : true ,
    },
    password : {
        type : String ,
        required : true 
    },
    age : {
        type : Number , 
        min : 10 , 
        max : 100
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    problemSolved : {
        type : [{
            type: Schema.Types.ObjectId,
            ref : 'problem',
        }],
        unique : true
    }

} , {
    timestamps : true 
})          

const User = mongoose.model("User",userSchema)

module.exports = User