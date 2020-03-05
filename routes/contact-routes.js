const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Contact = require('../models/Contact');


router.get('/', (req, res, next) => {
    Contact.find()
      .then(allTheContacts => {
        res.json(allTheContacts);
      })
      .catch(err => {
        res.json(err);
      })
});

// POST route => to create a new contact
router.post("/",(req, res, next) => {

    const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, postalAddresses, socialAccounts } = req.body;
    if (req.file) avatar = req.file.url;
    else avatar = "https://cdn.onlinewebfonts.com/svg/img_258083.png";
    Contact
        .create({
        avatar,
        firstName,
        lastName,
        secondaryEmails,
        phoneNumbers,
        ethAddresses,
        postalAddresses,
        socialAccounts,
        user: req.session.passport.user
        })
        .then((response) => {
        res.status(200).json(response)        // req.flash("success", "contact successfully created");
        // res.redirect("/contacts");
        })
        .catch(next);
})

router.get('/:id', (req, res, next)=>{
    console.log(req.params.id)
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    Contact.findById(req.params.id)
      .then(response => {
        console.log(response)
        res.status(200).json(response);
      })
      .catch(err => {
        res.json(err);
      })
})
  
// PUT route => to update a specific contact
router.put('/:id', (req, res, next)=>{
    console.log(`Put request: ${JSON.stringify(req.body)}`)
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Contact.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Contact with ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
})
  
// DELETE route => to delete a specific project
router.delete('/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
      Contact.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is removed successfully.` });
      })
      .catch( err => {
        res.json(err);
      })
})
  

module.exports = router;