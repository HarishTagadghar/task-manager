const express = require("express");
const Task = require("../models/tasks");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  let task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

router.get("/tasks/:id", (req, res) => {
  let _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.patch("/tasks/:id", async (req, res) => {
  const updateUser = Object.keys(req.body);
  const updateIncludes = ["discription", "completed"];
  let validKey = updateUser.every((user) => updateIncludes.includes(user));
  if (!validKey) {
    return res.status(400).send({ error: "invalid object keys" });
  }

  try {
    let task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "not found" });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
