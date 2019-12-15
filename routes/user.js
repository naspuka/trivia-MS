const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi')



const mongoose = require('mongoose');
const newschema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        minlenght: 3,
        maxlenght: 50,
        index: true
    },
    email:{
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        minlenght: 5,
        maxlenght: 50,
        index: true
    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlenght: 100
    },
    isAdmin: Boolean
},
{
    timestamps: true
});

// custom method to generate autotoken

schema.methods.generateAuthtoken = ()=>{
    const token = jwt.sign({_id: this._id, isAdmin}, config.get('myPrivateKey'));
    return token;
}
const User = mongoose.model('User', newschema)
//function to validate user

validateUser = (user)=>{
    const validSchema = {
        name:Joi.string().min(3).max(70).required(),
        email:Joi.string().min(3).max(200).required().email(),
        password:Joi.string().min(3).max(200).required()
    };
    return Joi.validate(user, validSchema );
}

exports.User = User;
exports.validate = validateUser;





