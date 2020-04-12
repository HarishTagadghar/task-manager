require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/users')
const Task = require('./models/tasks')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

let app = express();

 app.use(bodyParser());
app.use(userRouter)
app.use(taskRouter)



    
let port = process.env.PORT 
app.listen(port, ()=>{
    console.log('server is running on port ' + port);
    
})