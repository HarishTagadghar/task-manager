const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require('multer')
const User = require('../models/users')
const findByCreadentials = require('../login/userlogin')
const auth = require('../middleware/auth')

const router = new express.Router();

router.post("/users",  (req, res) => {
  bcrypt.hash(req.body.password, 8, function (err, hash) {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    user.save()

      .then((user) => {
       const token =  user.generateAuthToken()
        res.status(201).send({user,token});

      })
      .catch((e) => {
    res.status(400).send(e)
    });
  });
});

router.post('/users/logout' , auth , async(req,res) => {
  try {
  req.user.tokens = req.user.tokens.filter((token) =>{
    return token.token !== req.token
  })
  await req.user.save()
  res.send()
  }catch(e) {
  res.status(500).send()
  }
});

router.post('/users/logoutAll' , auth ,async (req,res) =>{
  try{
  req.user.tokens = []
  await req.user.save()
  res.send()
  }catch(e) {
  res.status(500).send(e)
  }
})

router.post('/users/login' , async (req,res) => {

try{
 
  const user = await findByCreadentials(req.body.email,req.body.password);
  const token = await user.generateAuthToken()
  res.send({user,token})
}catch(e){
 res.status(404).send(e)
 
}


})

router.get("/users", auth , async (req, res) => {
  // try {
  //   let users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(404).send();
  // } //this is to show all users data

  res.send(req.user)
});



router.patch("/users/me", auth ,  async (req, res) => {
  const updateUser = Object.keys(req.body);
  const updateIncludes = ["name", "email", "password", "age"];
  let validKey = updateUser.every((user) => updateIncludes.includes(user));
  if (!validKey) {
    return res.status(404).send({ error: "invalid object keys" });
  }

  try {
    let user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/me", auth , async (req, res) => {
  try {
    req.user.remove()
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  dest:'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req,file,cb) {
    if(!file.originalname.match(/\.(jpg|jpge|pdf)$/)){
      return cb(new Error('file mulst be in jpg or PDF formet'))
    }
    cb(undefined,true)
  }
})

router.post('/user/me/upload' , upload.single('upload') , (req,res) => {
  res.send()
} , (error,req,res,next) => {
  res.status(400).send({error: error.message})
})

module.exports = router;
