const mongoose = require("mongoose");


const citizenSchema = new mongoose.Schema(
    {
        firstname : {
            type : String,
            required : true ,
            trim : true,
            minLength : 3,
            maxLength : 20,
            uppercase : true
        },
        lastname : {
            type : String,
            trim : true,
            maxLength : 20,
            uppercase : true
        },
        city : {
            type : String ,
            trim : true,
            maxLength : 50
        },
        gender : {
            type : String ,
            // enum : ['male','female','others'] 

            //using the validator function 
            validate(value){
                if(!['male','female','others'].includes(value))
                    throw new Error("please enter valid gender")
            }
        },
        age : {
            type : Number , 
            min : 18 , 
            max : 80 
        },
        email : {
            type : String ,
            required : true,
            unique : true ,
            trim : true ,
            maxLength : 50,
            immutable : true
        },
        password: {
            type : String,
            required : true
        },
        photo : {
            type : String ,
            default : "this is users phto"
        }
    }  , 
    {
        timestamps : true
    }
)

const Citizens = mongoose.model("citzen",citizenSchema)

module.exports = {
    Citizens
}