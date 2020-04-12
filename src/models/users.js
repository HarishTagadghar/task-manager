const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const userschema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    image:{
    type: Buffer
    },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
} , {
    timestamps:true
})

userschema.methods.generateAuthToken = async function () {
    user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET_KEY);

    user.tokens = user.tokens.concat({token});
    await user.save()

    return token
} 

userschema.methods.toJSON = function () {
    const user = this
    let userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.image
    return userObject
}

const Users = mongoose.model('Users',userschema)

module.exports = Users