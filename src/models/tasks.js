const mongoose = require('mongoose')

let taskschema = new mongoose.Schema({
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
},{
    timestamps:true
})

let tasks = mongoose.model('Tasks' , taskschema )

module.exports = tasks