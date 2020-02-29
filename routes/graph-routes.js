const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const File = require('../models/File');
const Organization = require('../models/Organization');


router.get('/', (req, res, next) => {
    const getUsers = User.find()
    const getContacts = Contact.find();
    const getFiles = File.find();
    const getOrganizations = Organization.find();

    Promise.all([getUsers, getContacts, getFiles, getOrganizations])
      .then(graph => {
        res.json(graph);
      })
      .catch(err => {
        res.json(err);
      })
});

// router.get('/:id', (req, res, next)=>{
//     console.log(req.params.id)
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       res.status(400).json({ message: 'Specified id is not valid' });
//       return;
//     }
//     Contact.findById(req.params.id)
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.json(err);
//       })
// })
  

module.exports = router;