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

app.patch('/users/:id' , async (req,res) => {

    const updateUser = Object.keys(req.body);
    const updateIncludes = ['name','email','password','age'];
    let validKey = updateUser.every((user)=>updateIncludes.includes(user))
    if(!validKey){
        return res.status(404).send({error:'invalid object keys'})
    }


    try {
     let user = await User.findByIdAndUpdate(req.params.id , req.body ,{new:true , runValidators : true})
    if(!user){
       return res.status(404).send()
    }
    res.send(user)
    }catch (e) {
    res.status(500).send(e)
    }
});

app.delete('/users/:id' , async (req,res) =>{
    try{
    let user = await User.findByIdAndDelete(req.params.id) 
    if(!user) {
      return  res.status(404).send({error:'not found'})
    }
    res.send(user)
    }catch(e){
    res.status(500).send()
    }
})

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
});

app.patch('/tasks/:id' , async (req,res) => {

    const updateUser = Object.keys(req.body);
    const updateIncludes = ['discription','completed'];
    let validKey = updateUser.every((user)=>updateIncludes.includes(user))
    if(!validKey){
        return res.status(400).send({error:'invalid object keys'})
    }


    try {
     let task = await Task.findByIdAndUpdate(req.params.id , req.body ,{new:true , runValidators : true})
    if(!task){
       return res.status(404).send()
    }
    res.send(task)
    }catch (e) {
    res.status(500).send(e)
    }
});

app.delete('/tasks/:id' , async (req,res) =>{
    try{
    let task = await Task.findByIdAndDelete(req.params.id) 
    if(!task) {
      return  res.status(404).send({error:'not found'})
    }
    res.send(task)
    }catch(e){
    res.status(500).send()
    }
})

    
let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server is running on port ' + port);
    
})