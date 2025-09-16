var validator = require('validator');

function validate(data){

    const manatoryFeilds = ["name","age","email","password","phone","gender"]
    const isValid = manatoryFeilds.every(key => key in data)

    if(!isValid){
        throw new Error("mandatory feilds are missing")
    }

    if(!(validator.isEmail(data.email))){
        throw new Error("email format is invalid")
    }

    if(!(validator.isStrongPassword(data.password))){
        throw new Error("password should contain 1 uppercase and 1 symbol with min length of 8 charaters")
    }

    if(!(validator.isAlpha(data.name))){
        throw new Error("invalid name entry")
    }

    if(!(data.name.length > 3 && data.name.length < 25) ){
        throw new Error("the first name should have atleast 3 and less than 25 characters")
    }

    if(!(data.age > 5 && data.age < 25)){
        throw new Error("invalid age entry")
    }

    if(!(data.gender === "male" || data.gender === "female" || data.gender === "other")){
        throw new Error("invalid gender entry")
    }

    if(!(data.phone.length === 10)){
        throw new Error("invalid phone entry")
    }
    
}

module.exports = {
    validate
}