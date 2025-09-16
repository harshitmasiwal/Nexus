const bcrypt = require('bcrypt')
const {Student} = require('../models/student')


async function verifyPassword(data){

    const student = await Student.findOne({email: data.email})

    if(!student){
        throw new Error("invalid crediantials")
    }
    const isValid = await bcrypt.compare(data.password,student.password)
    
    return isValid
}

module.exports = {
    verifyPassword
}