const mongoose = require('mongoose')

let tasks = mongoose.model('Tasks' , {
    discription:{
        type: String,
        require:true,
        trim: true
    },
    completed:{
        default:false,
        type:Boolean
    }
})

module.exports = tasks