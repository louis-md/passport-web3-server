const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/User");
const Contact = require('../models/Contact');
const Organization = require('../models/Organization');
const protectUserRoute = require("../middlewares/protectUserRoute");
const protectRoute = require("../middlewares/protectRoute");
const router  = express.Router();

router.get("/contact-create", protectRoute, (req, res) => {
  User
    .findById(req.session.currentUser._id)
    .then(dbResults => {
      res.json(dbResults);
    });
});


// GET route => to retrieve a specific contact in an organization
// router.get('/organizations/:organizationId/publicContacts/:contactId', (req, res, next) => {
//   Task.findById(req.params.taskId)
//   .then(theTask =>{
//       res.json(theTask);
//   })
//   .catch( err =>{
//       res.json(err);
//   })
// });

// POST route => to create a new task
router.post('/tasks', (req, res, next)=>{
  
  Task.create({
      title: req.body.title,
      description: req.body.description,  
      organization: req.body.organizationID
  })
    .then(response => {
        organization.findByIdAndUpdate(req.body.organizationID, { $push:{ tasks: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific task
router.put('/tasks/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific task
router.delete('/tasks/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;