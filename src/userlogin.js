const bcrypt = require("bcryptjs");
const User = require('./models/users')

let findByCreadentials = async (email,password) =>{
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('cannot login')
    }

    const ismatch  = await bcrypt.compare(password,user.password)
    if(!ismatch){ 
        throw new Error('cannot login')
    }
    return user
}

module.exports = findByCreadentials