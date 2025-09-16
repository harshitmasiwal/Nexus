const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true ,
        minLength : 3 , 
        maxLength : 25,
        trim : true
    },
    age : {
        type : Number ,
        min : 5 ,
        max : 25 ,
        required : true
    },
    email : {
        type : String, 
        maxLength : 50,
        required : true,
        unique : true,
        trim : true
    },
    phone : {
        type : String,
        maxLength : 10,
        required : true,
    },
    gender:{
        type : String,
        enum : ["male","female","other"],
        required : true
    },
    password : {
        type : String ,
        required : true,
    },
    studentData : {
        type : String,
        maxLength : 200,
        default : "empty"
    }
} , {
    timestamps : true
} 
)

studentSchema.methods.getData = function(){
    return this.studentData
}

const Student = mongoose.model("student",studentSchema)

module.exports = {
    Student
}