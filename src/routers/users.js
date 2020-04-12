const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const sharp = require('sharp')
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
  // dest:'images',
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

router.post('/user/me/image' , auth , upload.single('upload') ,async (req,res) => {
  let buffer = await sharp(req.file.buffer).resize({width:250 , height:250}).png().toBuffer();
  req.user.image = buffer
  await req.user.save()
  res.send()
} , (error,req,res,next) => {
  res.status(400).send({error: error.message})
}) // another cb function to handel proper error

router.delete('/user/me/image' , auth , async (req,res) => {
  req.user.image = undefined;
  await req.user.save()
  res.send()
});

router.get('/user/:id/image' , async (req,res) => {
  try{
    let user = await User.findById(req.params.id);

    if(!user || !user.image){
      throw new Error('cant find image')
    }
    res.set('Content-Type','image/png')
    res.send(user.image)
  }catch(e) {
    res.status(404).send(e)
  }
})

module.exports = router;
