const joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = data =>{
    //make validate to data
    const schema ={ 
        name : joi
            .string()
            .required()
            .min(6),
    
        email : joi
            .string()
            .required()
            .min(4)
            .email(),
    
        password : joi.
            string().
            required().
            min(6),
    };
    // if there is an error
    return joi.validate(data,schema);
}

//LOGIN VALIDATION
const loginValidation = data =>{
    //make validate to data
    const schema ={ 
        email : joi
            .string()
            .required()
            .min(4)
            .email(),
    
        password : joi.
            string().
            required().
            min(6),
    };
    // if there is an error
    return joi.validate(data,schema);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
