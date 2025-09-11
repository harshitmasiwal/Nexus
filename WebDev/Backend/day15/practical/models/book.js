const mongoose = require('mongoose')
const {Schema} = mongoose 

const bookSchema = new Schema(
    {
        name : String,
        author : String,
        price : Number,
        edition : Date
    }
)

const book = mongoose.model("book",bookSchema)

module.exports = {book}