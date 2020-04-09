const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req,res,next) => {


    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token);
        const decode = jwt.verify(token,'nodejscourse')
        // console.log(decode)
        const user = await User.findOne({_id:decode._id, 'tokens.token':token})
        // console.log(user);
        if(!user) {
            throw new Error()
        }
        req.user = user
        next()
    }catch (e){
        res.status(401).send({error:'please authorise'})
    }



}

module.exports = auth