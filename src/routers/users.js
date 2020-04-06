const express = require("express");
const bcrypt = require("bcryptjs");
const findByCreadentials = require('../userlogin')

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
        res.status(201).send(user);
      })
      .catch((e) => {
    res.status(400).send(e)
    });
  });
});

router.post('/users/login' , async (req,res) => {

try{
 
  const user = await findByCreadentials(req.body.email,req.body.password);
res.send(user)
}catch(e){
 console.log(error);
 
}


})

router.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/users/:id", async (req, res) => {
  let _id = req.params.id;
  try {
    let user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updateUser = Object.keys(req.body);
  const updateIncludes = ["name", "email", "password", "age"];
  let validKey = updateUser.every((user) => updateIncludes.includes(user));
  if (!validKey) {
    return res.status(404).send({ error: "invalid object keys" });
  }

  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "not found" });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
