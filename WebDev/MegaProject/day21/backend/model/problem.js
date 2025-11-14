const mongoose = require('mongoose')
const { Schema } = mongoose

const problemSchema = new Schema({

    title : {
        type : String ,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    difficulty : {
        type: String,
        enum : ['Easy','Medium','Hard'],
        required : true
    },
    tags : {
        type : String ,
        enum : ['Array','Maths','Stack','Graph','BFS','Queue','Linked List','String',`Dynamic Programming`],
        required : true
    },
    visibleTestCases : [
        {
            input : {
                type : String,
                required : true
            },
            output : {
                type : String,
                required : true
            },
            explanation : {
                type : String,
                required : true
            }
        }
    ],
    hiddenTestCases : [
        {
            input : {
                type : String,
                required : true
            },
            output : {
                type : String,
                required : true
            }
        }
    ],
    boilerCode : [
        {
            language : {
                type : String,
                enum : ["C++","Java","Javascript"],
                required : true
            },
            code : {
                type : String,
                required : true
            }
        }
    ],
    referenceSolution : [
        {
            language : {
                type : String,
                enum : ["C++","Java","Javascript"],
                required : true
            },
            completeCode : String
        }
    ],
    problemCreator : {
        type : Schema.Types.ObjectId ,
        ref : 'user',
        required : true 
    }

} , {timestamps : true}) 


const Problem = mongoose.model('problem',problemSchema)

module.exports = Problem
