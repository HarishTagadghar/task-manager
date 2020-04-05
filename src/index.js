require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/users')

let app = express();

    app.use(bodyParser());


app.post('/users',(req,res) => {
res.send('testing');
let user = new User (req.body)
user.save().then((resolve)=>{
    res.send(user)
    
}).catch((reject)=>{
    console.log(reject);
    
});
;});


let port = process.env.PORT || 2000
app.listen(port, ()=>{
    console.log('server is running on port ' + port);
    
})