const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Organization = require('../models/Organization');
const Contact = require('../models/Contact');


router.get('/organizations', (req, res, next) => {
    Organization.find().populate('members')
      .then(allTheOrganizations => {
        res.json(allTheOrganizations);
      })
      .catch(err => {
        res.json(err);
      })
});

// POST route => to create a new organization
router.post('/organizations', (req, res, next)=>{
 
  Organization.create({
    title: req.body.title,
    description: req.body.description,
    members: [],
    owner: req.user._id 
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/organizations/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // our organizations have array of members' ids and 
    // we can use .populate() method to get the whole task objects
    //                                   ^
    //                                   |
    //                                   |
    Organization.findById(req.params.id).populate('members')
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.json(err);
      })
})
  
// PUT route => to update a specific project
router.put('/organizations/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Organization.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
})
  
// DELETE route => to delete a specific project
router.delete('/organization/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
      Organization.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is removed successfully.` });
      })
      .catch( err => {
        res.json(err);
      })
})
  

module.exports = router;