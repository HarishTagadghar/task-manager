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
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    }
})

module.exports = tasks