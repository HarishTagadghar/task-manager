require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/users')
const Task = require('./models/tasks')

let app = express();

    app.use(bodyParser());


app.post('/users', async (req,res) => {
let user = new User (req.body)

try{
 await user.save()
 res.status(201).send(user)

}catch(e) {
    res.status(400).send(e)

}
});

app.post('/tasks' , async (req,res) =>{
    let task = new Task (req.body)
    
    try {
    let task = await task.save()
    res.status(201).send(task)

    }catch(e){
        res.status(400).send(e)
    }

});

app.get('/users' , async (req,res) => {
    try{
    let users = await User.find({})
    res.send(users)
    }catch(e){
    res.status(404).send()
    }

})

app.get('/users/:id' , async (req,res) =>{
   let  _id = req.params.id;
   try{
     let user = await  User.findById(_id)

    if(!user) {
        return  res.status(404).send()
      }
      res.send(user)
   }catch(e){
    res.status(500).send(e)     

   }
    
});

app.get('/tasks' , (req,res) => {
    Task.find({}).then((tasks)=>{
res.send(tasks)
    }).catch((e) =>{
        res.status(404).send(e)
    })
});

app.get('/tasks/:id' , (req,res) => {
    let  _id = req.params.id;
    Task.findById(_id).then((task) => {
      if(!task) {
        return  res.status(404).send()
      }
      res.send(task)
    }).catch((e)=> {
        res.status(500).send(e)     
    })
})
    
let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server is running on port ' + port);
    
})