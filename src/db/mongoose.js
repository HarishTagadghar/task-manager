const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect( process.env.MONGOOSE_URL , { useNewUrlParser:true ,useCreateIndex:true ,useUnifiedTopology: true})


